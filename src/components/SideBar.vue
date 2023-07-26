<!--SideBar.vue-->
<template>
    <div id="side-bar">
        <h-menu theme="dark" active-name="1" :open-names="['1']" :collapse="isCollapse === 'true'" accordion height="auto"
            width="auto">

        <h-submenu name="1">
            <template slot="title">
                <h-icon name="computer"></h-icon>
                <span slot="title">客户管理</span>
            </template>
            <h-menu-item name="1-1">客户列表</h-menu-item>
            <h-menu-item name="1-2">新增客户</h-menu-item>
        </h-submenu>

            <h-submenu name="2">
                <template slot="title">
                    <h-icon name="android-contacts"></h-icon>
                    <span slot="title">产品管理</span>
                </template>
                <h-menu-item name="2-1">产品管理</h-menu-item>
            </h-submenu>

            <h-submenu name="3">
                <template slot="title">
                    <h-icon name="cash"></h-icon>
                    <span slot="title">申购赎回</span>
                </template>
                <h-menu-item name="3-1">申购</h-menu-item>
                <h-menu-item name="3-2">赎回</h-menu-item>
            </h-submenu>
        </h-menu>
        <br />
    </div>
</template>
<script>
export default {
    data() {
        return {
            isCollapse: "false",
        };
    },
};
</script>
<style>
#side-bar {
    background-color: rgb(28, 35, 47);
    height: 100vh;
}
</style>