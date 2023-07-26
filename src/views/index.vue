<!--index.vue-->
<template>
  <div>
    <div class="layout">
      <h-row name="flex">
        <h-col span="5" class="layout-menu-left">
          <SideBar />
        </h-col>
        <h-col span="19" class="right-side">
          <div class="layout-header"></div>
          <div class="layout-content">
            <div class="layout-content-main">
              <router-view />
            </div>
          </div>

        </h-col>
      </h-row>
    </div>
  </div>
</template>
<script>
import SideBar from '../components/SideBar.vue';
export default {
  data() {
    return {
      isCollapse: "false",
    };
  },
  components: {
    SideBar,
  }
};
</script>
<style>
.right-side {
  background: rgb(255, 255, 255);
  background: -moz-linear-gradient(185deg, rgba(255, 255, 255, 1) 0%, rgba(199, 219, 255, 1) 100%);
  background: -webkit-linear-gradient(185deg, rgba(255, 255, 255, 1) 0%, rgba(199, 219, 255, 1) 100%);
  background: linear-gradient(185deg, rgba(255, 255, 255, 1) 0%, rgba(199, 219, 255, 1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff", endColorstr="#c7dbff", GradientType=1);
  height: 100vh;
}
</style>