<template>
  <div>
    <div class="layout">
      <h-row name="flex">
        <h-col span="5" class="layout-menu-left">
          <SideBar />
        </h-col>
        <h-col span="19" id="left-side">
          <div class="layout-header"></div>
          <div class="layout-content">
            <h-button type="primary">新增</h-button>
            <br><br>
            <div class="layout-content-main">
              <Table />
            </div>
          </div>
          <div class="layout-copy">
            2017-2030 &copy; HUNDSUN
          </div>
        </h-col>
      </h-row>
    </div>
  </div>
</template>
<script>
import SideBar from '../components/SideBar.vue';
import Table from '../components/Table.vue'
export default {
  data() {
    return {
      isCollapse: "false",
    };
  },
  components: {
    SideBar,
    Table
  }
};
</script>
<style>
#right-side {
  background-color: black;
}

#left-side {
  padding-top: 3%;
  padding-right: 20%;
}
</style>