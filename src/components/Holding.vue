<template>
    <div class="Holding">
        <h1>持仓查询</h1>
        <br><br>
        <h-input v-model="name" placeholder="请输入客户身份证号" style="width: 80%">
        </h-input>&nbsp;&nbsp;
        <h-button @click="searchCus" type="primary" shape="circle" icon="search">搜索</h-button>
        <h-table :data="tData" :columns="columns" headAlgin="center" bodyAlgin="center" style="margin:10px;" stripe></h-table>
    </div>

</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            name: "", // 用于绑定输入框的值
            tData: [],
            columns: [
                { title: "基金代码", key: "fundNumber" },
                { title: "持仓份额", key: "totalShare" },
                { title: "所属银行卡", key: "cardNumber" },
            ],
        };
    },
    methods: {
        async searchCus() {
            try {
                // 使用axios向服务器发起GET请求，将输入框的值作为cer_number参数
                const response = await axios.get('http://127.0.0.1:9091/getHoldingsByCerNumber', {
                    params: {
                        cer_number: this.name
                    }
                });

                // 将获取到的数据赋值给tData，表格将自动更新
                this.tData = response.data;
            } catch (error) {
                console.error("请求持仓信息出错:", error);
            }
        }
    }
};
</script>

<style>
.Holding {
    width: 80vw;
    padding: 3% 5%;
    text-align: center;
    height: 100vh;
}
</style>