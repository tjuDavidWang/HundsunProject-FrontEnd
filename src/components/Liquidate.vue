<template>
    <div class="liquidate">
        <h1>产品列表</h1>
        <h-table :data="tData" :columns="columns" style="margin-bottom: 8px;"></h-table>
        <h-page :total="totalNum" @on-change="dataChange" show-elevator show-total :page-size="10"></h-page>
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
        };
    },
    methods: {
        pageChange(index) {
            // console.log(index);
        },
        numChange(value) {
            console.log(value);
        },
        dataChange(i) {
            this.tData = data.slice((i - 1) * 5, i * 5);
        },
    },
};
</script>
<style scoped>
.liquidate {
    width: 80vw;
    padding: 0 5%;
    text-align: center;
}
</style>