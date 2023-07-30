<template>
  <div class="table">
    <h-table
      :data="tData"
      :columns="columns"
      headAlgin="center"
      bodyAlgin="center"
      stripe
      border
    ></h-table>
    <h-page
      class="fund-page-button"
      :total="totalNum"
      @on-change="dataChange"
      show-elevator
      show-total
      :page-size="5"
    ></h-page>
    <h-button type="info" @click="createFund">新增</h-button>
    <NavGraph
      @close="closeModal"
      :visible="showModal"
      :fund="selectedFund"
    ></NavGraph>
    <FundEditModal
      @closeEdit="closeEditModal"
      :editVisible="showEditModal"
      :editFund="editedFund"
    ></FundEditModal>
    <FundCreate
      @closeCreate="closeCreateModal"
      @save="addFund"
      :createVisible="showCreateModal"
    > </FundCreate>
  </div>
</template>

<script>
import NavGraph from "./NavGraph.vue";
import FundCreate from "./FundCreate.vue";
import FundEditModal from "./FundEditModal.vue";
var data = [
  {
    fundNumber: "123452145323",
    fundName: "恒生训练营",
    fundType: "股票基金",
    fundRisk: "R1",
  },
  {
    fundNumber: "123452145324",
    fundName: "恒生训练营2",
    fundType: "货币基金",
    fundRisk: "R1",
  },
  {
    fundNumber: "123452145325",
    fundName: "恒生训练营3",
    fundType: "股票基金",
    fundRisk: "R1",
  },
  {
    fundNumber: "123452145326",
    fundName: "恒生训练营4",
    fundType: "股票基金",
    fundRisk: "R1",
  },
  {
    fundNumber: "123452145327",
    fundName: "恒生训练营5",
    fundType: "股票基金",
    fundRisk: "R1",
  },
  {
    fundNumber: "123452145328",
    fundName: "恒生训练营6",
    fundType: "股票基金",
    fundRisk: "R1",
  },
  {
    fundNumber: "123452145329",
    fundName: "恒生训练营7",
    fundType: "股票基金",
    fundRisk: "R1",
  },
  {
    fundNumber: "123452145330",
    fundName: "恒生训练营8",
    fundType: "股票基金",
    fundRisk: "R1",
  },
  {
    fundNumber: "123452145331",
    fundName: "恒生训练营9",
    fundType: "股票基金",
    fundRisk: "R1",
  },
  {
    fundNumber: "123452145332",
    fundName: "恒生训练营10",
    fundType: "股票基金",
    fundRisk: "R1",
  },
];
export default {
  name: "FundTable",
  components: {
    NavGraph,
    FundCreate,
    FundEditModal,
  },
  data() {
    return {
      tData: data.slice(0, 5),
      totalNum: data.length,
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
            console.log(this);
            const fund = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "confirm",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      console.log(fund);
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
                    type: "confirm",
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
                    type: "confirm",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      console.log(fund);
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
      showEditModal: false,
      showCreateModal: false,
      selectedFund: {},
      editedFund: {},
      curPage: 1,
    };
  },
  methods: {
    dataChange(i) {
      this.tData = data.slice((i - 1) * 5, i * 5);
      this.curPage = i;
      console.log(this.curPage);
    },
    addFund(newFund) {
      let newF = JSON.parse(JSON.stringify(newFund));
      data.push(newF);
      console.log(this.curPage);
      this.showCreateModal = false;
      this.totalNum = this.totalNum + 1;
      this.tData = data.slice((this.curPage - 1) * 5, this.curPage * 5);
    },
    viewFund(fund) {
      this.showModal = true;
      this.selectedFund = fund;
    },
    editFund(fund) {
      this.showEditModal = true;
      this.editedFund = fund;
    },
    createFund() {
      this.showCreateModal = true;
    },
    closeModal() {
      console.log("123");
      this.showModal = false;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    closeCreateModal() {
      this.showCreateModal = false;
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
  },
};
</script>

<style scoped>
.fund-page-button {
  float: right;
  margin: 1vw;
}
</style>
