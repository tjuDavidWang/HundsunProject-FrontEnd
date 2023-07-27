<template>
    <div class="liquidate">
        <h-table :data="tData" :columns="columns" style="margin-bottom: 8px;"></h-table>
        <h-page :total="totalNum" @on-change="dataChange" show-elevator show-total :page-size="5"></h-page>
    </div>
</template>
<script>
var data = [
    {
        name: "王小明",
        age: 18,
        address: "北京市朝阳区芍药居",
    },
    {
        name: "张小刚",
        age: 25,
        address: "北京市海淀区西二旗",
    },
    {
        name: "李小红",
        age: 30,
        address: "上海市浦东新区世纪大道",
    },
    {
        name: "周小伟",
        age: 26,
        address: "深圳市南山区深南大道",
    },
    {
        name: "王小明",
        age: 18,
        address: "北京市朝阳区芍药居",
    },
    {
        name: "张小刚",
        age: 25,
        address: "北京市海淀区西二旗",
    },
    {
        name: "李小红",
        age: 30,
        address: "上海市浦东新区世纪大道",
    },
    {
        name: "周小伟",
        age: 26,
        address: "深圳市南山区深南大道",
    },
    {
        name: "11",
        age: 18,
        address: "北京市朝阳区芍药居",
    },
    {
        name: "12",
        age: 25,
        address: "北京市海淀区西二旗",
    },
    {
        name: "13",
        age: 18,
        address: "北京市朝阳区芍药居",
    },
    {
        name: "14",
        age: 25,
        address: "北京市海淀区西二旗",
    },
    {
        name: "15",
        age: 18,
        address: "北京市朝阳区芍药居",
    },
    {
        name: "16",
        age: 25,
        address: "北京市海淀区西二旗",
    },
    {
        name: "17",
        age: 18,
        address: "北京市朝阳区芍药居",
    },
    {
        name: "18",
        age: 25,
        address: "北京市海淀区西二旗",
    },
    {
        name: "19",
        age: 18,
        address: "北京市朝阳区芍药居",
    },
    {
        name: "20",
        age: 25,
        address: "北京市海淀区西二旗",
    },
    {
        name: "21",
        age: 25,
        address: "北京市海淀区西二旗",
    },
    {
        name: "22",
        age: 25,
        address: "北京市海淀区西二旗",
    },
    {
        name: "23",
        age: 25,
        address: "北京市海淀区西二旗",
    },
    {
        name: "24",
        age: 25,
        address: "北京市海淀区西二旗",
    },
    {
        name: "25",
        age: 25,
        address: "北京市海淀区西二旗",
    },
];
var columns = [
    {
        title: "产品名称",
        key: "name",
    },
    {
        title: "年龄",
        key: "age",
    },
    {
        title: "地址",
        key: "address",
    },
];
export default {
    data() {
        return {
            tData: data.slice(0, 5),
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
.liquidate{
    width: 80vw;
}
</style>