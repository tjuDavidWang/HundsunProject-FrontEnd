<template>
  <div class="table">
    <h-table :data="tData" :columns="columns" headAlgin="center" bodyAlgin="center" stripe border></h-table>
    <h-page class="fund-page-button" :total="totalNum" @on-change="dataChange" show-elevator show-total
      :page-size="10"></h-page>
    <div v-for="fund in tData" :key="fund.fundNumber">
      <NavGraph v-if="fund.loadGraph" @close="closeModal" :visible="showModal" :fund="fund"></NavGraph>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavGraph from "./NavGraph.vue";

export default {
  name: "FundTable",
  components: {
    NavGraph,
  },
  data() {
    return {
      tData: [],
      totalNum: 0,
      columns: [
        {
          title: "基金代码",
          key: "fundNumber",
        },
        {
          title: "基金名称",
          key: "fundName",
        },
        {
          title: "基金类型",
          key: "fundType",
        },
        {
          title: "风险等级",
          key: "fundRisk",
        },
        {
          title: "操作",
          key: "action",
          render: (h, params) => {
            const fund = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "ghost",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.viewFund(fund);
                    },
                  },
                },
                "查看"
              ),
              h("span", {}, "  "),
              h(
                "Button",
                {
                  props: {
                    type: "ghost",
                    size: "small",
                  },
                },
                "编辑"
              ),
              h("span", {}, "  "),
              h(
                "Button",
                {
                  props: {
                    type: "ghost",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.handleDelete(fund);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      showModal: false,
      selectedFund: {},
      curPage: 1,
      allData: [],
      loadGraph: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {

    fetchData() {
      axios.get('http://127.0.0.1:9091/getAllProduct')
        .then((response) => {
          this.allData = response.data.map(fund => ({
            ...fund,
            loadGraph: false, // 初始化loadGraph属性为false
          }));
          this.tData = this.allData.slice(0, 10); // Display 10 items
          this.totalNum = this.allData.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    dataChange(i) {
      this.tData = this.allData.slice((i - 1) * 10, i * 10); // Display 10 items
      this.curPage = i;
    },
    
    viewFund(fund) {
      // 在打开新的弹窗前，先确保所有的 loadGraph 都设置为 false
      this.tData.forEach(item => {
        if (item.loadGraph) {
          this.$set(item, 'loadGraph', false);
        }
      });

      // 然后设置选择的基金的 loadGraph 为 true
      const index = this.tData.findIndex(item => item.fundNumber === fund.fundNumber);
      if (index !== -1) {
        this.$set(this.tData[index], 'loadGraph', true);
        this.showModal = true;
        this.selectedFund = this.tData[index];
      }
    },
    closeModal() {
      // 在关闭弹窗时，确保 selectedFund 的 loadGraph 设置为 false
      const index = this.tData.findIndex(item => item.fundNumber === this.selectedFund.fundNumber);
      if (index !== -1) {
        this.$set(this.tData[index], 'loadGraph', false);
      }
      this.showModal = false;
    },

    handleDelete(fund) {
      data.forEach((item, index) => {
        if (item.fundNumber === fund.fundNumber) {
          data.splice(index, 1);
        }
      });
      this.totalNum = this.totalNum - 1;
      this.tData = data.slice((this.curPage - 1) * 5, this.curPage * 5);
    },
    dataChange(i) {
      this.tData = this.allData.slice((i - 1) * 5, i * 5);
      this.curPage = i;
    },
  },
};
</script>

<style scoped>
.fund-page-button {
  float: right;
  margin: 1vw;
}
</style>
