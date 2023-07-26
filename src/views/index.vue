<!--index.vue-->
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
            <div class="layout-content-main">
              <TestA />
            </div>
          </div>

        </h-col>
      </h-row>
    </div>
  </div>
</template>
<script>
import SideBar from '../components/SideBar.vue';
import Table from '../components/Table.vue'
import TestA from '../components/TestA.vue';
import TestB from '../components/TestB.vue';
export default {
  data() {
    return {
      isCollapse: "false",
    };
  },
  components: {
    SideBar,
    Table,
    TestA,
    TestB
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