<template>
    <div class="liquidate">

        <h1>清算功能示意</h1>
        <br><br>
        <div class="button-row">
            <h-button type="primary" icon="time" @click="UpdateTime">更新时间</h-button>

            <span style="width:10em"><b>当前日期：</b></span>
            <h-fast-date :value="CurDate" format="yyyy-MM-dd" type="date" placeholder="当前日期"></h-fast-date>

            <h-button :type="type" icon="refresh" :disabled="disableUpdate" @click="UpdateValue" :loading="loading1">
                <span v-if="!loading1">{{ text2 }}</span>
                <span v-else>Loading...</span>
            </h-button>

            <h-button type="primary" :loading="loading2" :icon="icon" @click="toLoading" :disabled="disabled">
                <span v-if="!loading2">{{ text3 }}</span>
                <span v-else>Loading...</span>
            </h-button>
        </div>

        <h-table :data="tData" :columns="columns" headAlgin="center" bodyAlgin="center" style="margin:10px;"
            stripe></h-table>

        <h-page :total="totalNum" @on-change="dataChange" show-elevator show-total :page-size="10"
            style="margin:10%;"></h-page>
    </div>
</template>
<script>
import axios from 'axios';
var columns = [
    {
        title: "产品代码",
        key: "fundNumber",
    },
    {
        title: "产品名称",
        key: "fundName",
    },
    {
        title: "产品净值",
        key: "fundValue",
    },
    {
        title: "日增长率",
        key: "growthRate",
        render: (h, params) => {
            let color = params.row.growthRate >= 0 ? 'red' : 'green';
            let arrow = params.row.growthRate >= 0 ? '↑' : '↓';
            return h('div', {
                style: {
                    color: color,
                }
            }, arrow + ' ' + (params.row.growthRate * 100).toFixed(2) + '%');
        },
    },

];
export default {
    data() {
        return {
            tData: [],
            columns: columns,
            totalNum: 0,

            CurDate: "2023-07-31",

            text2: "更新净值",
            disableUpdate: false,
            type: "primary",
            loading1: false,

            //清算按钮
            loading2: false,
            icon: "calculator",
            text3: "清算",
            disabled: true,
        };
    },
    created() {
        this.fetchTime();
        this.fetchData().then(currentDayData => {
            let previousDate = this.getPreviousWorkingDay(this.CurDate); // Get previous working day
            this.fetchPreviousDayData(previousDate, currentDayData);
        });
    },
    methods: {
        fetchTime() {
            axios.get('http://127.0.0.1:9091/getTime')
                .then((response) => {
                    this.CurDate = response.data.substring(0, 10);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        fetchData() {
            return axios.get(`http://127.0.0.1:9091/getDailyValueByDate?fund_date=${this.CurDate}`)
                .then((response) => {
                    this.tData = response.data.map(item => ({
                        fundName: item.fundName,
                        fundNumber: item.dailyValue.fundNumber,
                        fundValue: item.dailyValue.fundValue,
                        fundDate: item.dailyValue.fundDate,
                    }));
                    this.totalNum = this.tData.length;
                    return this.tData; // Return the fetched data
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getPreviousWorkingDay(dateString) {
            let previousDate = new Date(dateString);
            do {
                previousDate.setDate(previousDate.getDate() - 1); // Subtract one day
            } while (previousDate.getDay() === 0 || previousDate.getDay() === 6); // Skip weekends

            let year = previousDate.getFullYear();
            let month = ("0" + (previousDate.getMonth() + 1)).slice(-2);
            let day = ("0" + previousDate.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
        },
        fetchPreviousDayData(previousDayDateString, currentDayData) {
            axios.get(`http://127.0.0.1:9091/getDailyValueByDate?fund_date=${previousDayDateString}`)
                .then((response) => {
                    let previousDayData = response.data.map(item => item.dailyValue.fundValue);
                    this.tData = currentDayData.map((item, i) => {
                        const previousDayValue = previousDayData[i] ? previousDayData[i] : item.fundValue;
                        let growthRate = ((item.fundValue - previousDayValue) / previousDayValue).toFixed(4);
                        return {
                            ...item,
                            growthRate: growthRate,
                        }
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        dataChange(i) {
            this.fetchData();
        },
        toLoading() {
            this.loading2 = true;
            const startTime = new Date().getTime(); // 记录开始时间

            // 这是一个延迟的Promise，例如3000毫秒
            const delayPromise = new Promise(resolve => setTimeout(resolve, 3000));

            // 这是一个包括两个请求的Promise链
            const requestPromise = axios.patch('http://127.0.0.1:9091/settlement/sub')
                .then(() => axios.patch('http://127.0.0.1:9091/settlement/red'));

            Promise.all([delayPromise, requestPromise])
                .then(() => {
                    const endTime = new Date().getTime(); // 记录结束时间
                    const requestTime = endTime - startTime; // 计算请求所花费的时间

                    this.loading2 = false;
                    this.icon = "checkmark-round";
                    this.text3 = "当日清算已完成";
                    this.disabled = true;
                    this.disableUpdate = true;
                })
                .catch((error) => {
                    // 请求失败，可以在此处添加错误处理逻辑
                    console.error("清算失败:", error);
                    this.loading2 = false;
                    this.icon = "exclamation-mark-round";
                    this.text3 = "清算失败，请重试";
                });
        },
        UpdateTime() {
            let currentDate = new Date(this.CurDate);
            currentDate.setDate(currentDate.getDate() + 1); // add one day

            let year = currentDate.getFullYear();
            let month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // months are 0-indexed in JavaScript
            let day = ("0" + currentDate.getDate()).slice(-2);
            this.CurDate = `${year}-${month}-${day}`;

            this.disabled = true;
            this.disableUpdate = false;
            this.text3 = "清算";
            this.text2 = "更新净值";
            this.type = "primary";

            // 更新时间
            axios.get('http://127.0.0.1:9091/updateTime')
                .then(() => {
                    this.fetchTime();  // Fetch the updated time
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        UpdateValue() {
            this.loading1 = true;
            const startTime = new Date().getTime(); // 记录请求开始时间

            // 这是一个延迟的Promise
            const delayPromise = new Promise(resolve => setTimeout(resolve, 2000)); // 假设延迟3000毫秒

            // 这是一个请求的Promise
            const requestPromise = axios.get('http://127.0.0.1:9091/updateDailyValue');

            Promise.all([delayPromise, requestPromise])
                .then(() => {
                    const endTime = new Date().getTime(); // 记录请求结束时间
                    const requestTime = endTime - startTime; // 计算请求所花费的时间

                    this.loading1 = false;
                    this.icon = "checkmark-round";
                    this.text2 = "净值已更新";
                    this.type = "success";
                    this.disabled = false;

                    // 成功更新净值后，重新获取数据并展示
                    this.fetchData().then(currentDayData => {
                        let previousDate = this.getPreviousWorkingDay(this.CurDate); // Get previous working day
                        this.fetchPreviousDayData(previousDate, currentDayData);
                    });
                })
                .catch((error) => {
                    console.log(error);

                    this.loading1 = false;
                    this.text2 = "更新失败";
                    this.type = "danger";
                });
        }


    },
};
</script>
<style scoped>
.liquidate {
    width: 80vw;
    padding: 3% 5%;
    text-align: center;
    height: 100vh;
}

.button-row {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 70vw;
    padding-left: 3%;
}
</style>