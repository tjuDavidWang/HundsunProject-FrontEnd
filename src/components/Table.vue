<template>
    <div>
        <h-table :columns="columns1" :data="data1"></h-table>
        <div id="page-divider">
            <h-page :total="20"></h-page>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            columns1: [
                {
                    title: "产品代码",
                    key: "productId",
                },
                {
                    title: "产品名称",
                    key: "productName",
                },
                {
                    title: "产品类型",
                    key: "productType",
                },
                {
                    title: "产品状态",
                    key: "productState",
                },
                {
                    title: "证件大类",
                    key: "idType",
                },
                {
                    title: "操作"
                }
            ],
            data1: [
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
            ],
        };
    },
};
</script>
<style scoped>
#page-divider {
    margin-right: 0px;
    padding-right: 0;
    padding-left: 100px;
}
</style>