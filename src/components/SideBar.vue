<template>
    <div id="side-bar">
        <h-menu theme="dark" active-name="1-1" :open-names="['1']" :collapse="isCollapse === 'true'" accordion
            height="auto">
            <h3>首页</h3>
            <h-submenu name="1">
                <template slot="title">
                    <h-icon name="computer"></h-icon>
                    <span slot="title">产品管理</span>
                </template>
                <h-menu-item name="1-1">列表</h-menu-item>
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
    width: 72%;
}
</style>