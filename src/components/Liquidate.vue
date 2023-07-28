<template>
    <div class="liquidate">

        <h1>清算功能示意</h1>
        <br><br>
        <div class="button-row">
            <h-button type="primary" icon="time" @click="UpdateTime">更新时间</h-button>
            <span style="width:8em"><b>当前日期：</b></span>
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

        <h-table :data="tData" :row-class-name="rowClassName" :columns="columns" headAlgin="center" bodyAlgin="center"
            style="margin:10px;" stripe></h-table>

        <h-page :total="totalNum" @on-change="dataChange" show-elevator show-total :page-size="10"
            style="margin:10%;"></h-page>
    </div>
</template>
<script>
var data = [
    {
        fundNumber: "123452145323",
        fundName: "恒生训练营",
        fundValue: 3.5,
    },
    {
        fundNumber: "123452145324",
        fundName: "恒生训练营2",
        fundValue: 2.3,
    },
    {
        fundNumber: "123452145325",
        fundName: "恒生训练营3",
        fundValue: 1.7,
    },
    {
        fundNumber: "123452145326",
        fundName: "恒生训练营4",
        fundValue: 4.2,
    },
    {
        fundNumber: "123452145327",
        fundName: "恒生训练营5",
        fundValue: 2.9,
    },
    {
        fundNumber: "123452145328",
        fundName: "恒生训练营6",
        fundValue: 3.1,
    },
    {
        fundNumber: "123452145329",
        fundName: "恒生训练营7",
        fundValue: 2.6,
    },
    {
        fundNumber: "123452145330",
        fundName: "恒生训练营8",
        fundValue: 3.8,
    },
    {
        fundNumber: "123452145331",
        fundName: "恒生训练营9",
        fundValue: 2.4,
    },
    {
        fundNumber: "123452145332",
        fundName: "恒生训练营10",
        fundValue: 3.0,
    }
];
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
];
export default {
    data() {
        return {
            tData: data.slice(0, 10),
            columns: columns,
            totalNum: data.length,

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
    methods: {
        dataChange(i) {
            this.tData = data.slice((i - 1) * 5, i * 5);
        },
        toLoading() {
            this.loading2 = true;
            setTimeout(() => {
                this.loading2 = false;
                this.icon = "checkmark-round";
                this.text3 = "当日清算已完成";

                this.disabled = true;
                this.disableUpdate = true;

            }, 3000);
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
        },
        UpdateValue() {
            this.loading1 = true;
            setTimeout(() => {
                this.loading1 = false;
                this.icon = "checkmark-round";
                this.text2 = "净值已更新";
                this.type = "success";
                this.disabled = false;
            }, 3000);
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