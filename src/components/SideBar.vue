<template>
    <div id="side-bar">
        <h-menu theme="dark" :active-name="activeMenuItem" open-names="['1', '2', '3', '4']" width="auto"
            :collapse="isCollapse === 'true'">
            <router-link to="/home">
                <h-menu-item name="0"><h-icon name="homepage"></h-icon>首页</h-menu-item>
            </router-link>

            <h-submenu name="1">
                <template slot="title">
                    <h-icon name="computer"></h-icon>
                    <span slot="title">客户管理</span>
                </template>
                <router-link to="/ListCustomers">
                    <h-menu-item name="1-1">客户列表</h-menu-item>
                </router-link>
                <router-link to="/AddCustomer">
                    <h-menu-item name="1-2">新增客户</h-menu-item>
                </router-link>
            </h-submenu>

            <h-submenu name="2">
                <template slot="title">
                    <h-icon name="android-contacts"></h-icon>
                    <span slot="title">产品管理</span>
                </template>
                <router-link to="/ListFunds">
                    <h-menu-item name="2-1">产品列表</h-menu-item>
                </router-link>
            </h-submenu>

            <h-submenu name="3">
                <template slot="title">
                    <h-icon name="cash"></h-icon>
                    <span slot="title">申购赎回</span>
                </template>
                <router-link to="/purchase">
                    <h-menu-item name="3-1">申购基金</h-menu-item>
                </router-link>
                <router-link to="/redeem">
                    <h-menu-item name="3-2">赎回基金</h-menu-item>
                </router-link>
            </h-submenu>

            <h-submenu name="4">
                <template slot="title">
                    <h-icon name="calculator"></h-icon>
                    <span slot="title">每日清算</span>
                </template>
                <router-link to="/Liquidate">
                    <h-menu-item name="4-1">每日清算</h-menu-item>
                </router-link>
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
    computed: {
        activeMenuItem() {
            switch (this.$route.path) {
                case "/home":
                    return "0";
                case "/ListCustomers":
                    return "1-1";
                case "/AddCustomer":
                    return "1-2";
                case "/ListFunds":
                    return "2-1";
                case "/purchase":
                    return "3-1";
                case "/redeem":
                    return "3-2";
                case "/Liquidate":
                    return "4-1";
                default:
                    return ""; // 如果没有匹配的路径，返回一个空字符串
            }
        },
    },
};
</script>
  
<style>
#side-bar {
    background: rgb(28, 35, 47);
    background: linear-gradient(180deg,
            rgba(28, 35, 47, 1) 0%,
            rgba(28, 35, 47, 1) 60%,
            rgba(42, 48, 122, 1) 100%);
    height: 100vh;
}
</style>
  