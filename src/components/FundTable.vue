<template>
  <div class="fund-table">
    <h1>产品列表</h1>

    <div class="add-button">
      <h-button type="primary" @click="createFund"><h-icon name="addition"></h-icon>&nbsp;新增</h-button>
    </div>

    <h-table :data="tData" :columns="columns" headAlgin="center" bodyAlgin="center" stripe border></h-table>

    <h-page class="fund-page-button" :total="totalNum" @on-change="dataChange" show-elevator show-total
      :page-size="10"></h-page>

    <div v-for="fund in tData" :key="fund.fundNumber">
      <NavGraph v-if="fund.loadGraph" @close="closeModal" :visible="showModal" :fund="fund"></NavGraph>
      <FundEditModal @closeEdit="closeEditModal" :editVisible="showEditModal" :editFund="editedFund"></FundEditModal>
      <FundCreate @closeCreate="closeCreateModal" @save="addFund" :createVisible="showCreateModal"> </FundCreate>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavGraph from "./NavGraph.vue";
import FundCreate from "./FundCreate.vue";
import FundEditModal from "./FundEditModal.vue";

export default {
  name: "FundTable",
  components: {
    NavGraph,
    FundCreate,
    FundEditModal
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
          render: (h, params) => {
            return h("div", 'R' + params.row.fundRisk);
          },
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
                "详情"
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
                      console.log(fund);
                      this.editFund(fund);
                    },
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
      showEditModal: false,
      showCreateModal: false,
      editedFund: {},
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
    addFund(newFund) {
      this.showCreateModal = false;
      this.fetchData();
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
    editFund(fund) {
      this.showEditModal = true;
      this.editedFund = fund;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    createFund() {
      this.showCreateModal = true;
    },
    closeCreateModal() {
      this.showCreateModal = false;
    },
    handleDelete(fund) {
      // 从传入的基金数据中获取基金编号
      const fundNumber = fund.fundNumber;

      // 发送DELETE请求删除产品
      axios.delete('http://127.0.0.1:9091/deleteProduct', { params: { fund_number: fundNumber } })
        .then(() => {
          this.fetchData();
        })
        .catch(error => {
          // 处理删除失败的情况
          console.error('产品删除失败:', error);
        });
    }

  },
};
</script>

<style scoped>
.add-button {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.fund-page-button {
  float: right;
  margin: 1vw;
}

.fund-table {
  width: 80vw;
  padding: 3% 5%;
  text-align: center;
  height: 100vh;
}
</style>
