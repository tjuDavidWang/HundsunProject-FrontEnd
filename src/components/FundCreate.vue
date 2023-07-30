<template>
  <div class="purchase-page">
    <h-msg-box
      v-model="createVisible"
      :escClose="true"
      title="新增产品"
      @on-ok="save"
      @on-cancel="closeModal"
      @on-close="closeModal"
      :beforeEscClose="beforetest"
      width="25vw"
    >
      <h-form :label-width="100" inline>
        <h-form-item label="基金代码">
          <h-input
            v-model="fund.fundNumber"
            size="large"
            style="width: 15vw"
          ></h-input>
        </h-form-item>
        <h-form-item label="基金名称">
          <h-input
            v-model="fund.fundName"
            size="large"
            style="width: 15vw"
          ></h-input>
        </h-form-item>
        <h-form-item label="基金类型">
          <h-select v-model="fund.fundType" style="width: 5vw">
            <h-option
              v-for="item in fundType"
              :value="item.value"
              :key="item.value"
              >{{ item.value }}</h-option
            >
          </h-select>
        </h-form-item>
        <h-form-item label="基金风险等级">
          <h-select v-model="fund.fundRisk" style="width: 5vw">
            <h-option
              v-for="item in riskLevel"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</h-option
            >
          </h-select>
        </h-form-item>
      </h-form>
      <br />
    </h-msg-box>
  </div>
</template>
<script>
export default {
  name: "FundCreate",
  props: {
    createVisible: Boolean,
  },
  data() {
    return {
      fund: {
        fundNumber: "",
        fundName: "",
        fundType: "",
        fundRisk: "",
      },
      fundType: [
        {
          value: "货币基金",
        },
        {
          value: "债卷基金",
        },
        {
          value: "股票基金",
        },
        {
          value: "混合基金",
        },
      ],
      riskLevel: [
        {
          value: "R1",
          label: "R1",
        },
        {
          value: "R2",
          label: "R2",
        },
        {
          value: "R3",
          label: "R3",
        },
        {
          value: "R4",
          label: "R4",
        },
        {
          value: "R5",
          label: "R5",
        },
      ],
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeCreate");
    },
    save() {
      this.$emit("save", this.fund);
    },
  },
  watch: {
    createVisible(newVal) {
      if (newVal) {
        this.fund.fundNumber = "";
        this.fund.fundName = "";
        this.fund.fundType = "";
        this.fund.fundRisk = "";
        this.fund.property = "";
        this.fund.share = "";
      }
    },
  },
};
</script>
<style scoped>
#page-divider {
  margin-right: 0px;
  padding-right: 0;
  padding-left: 100px;
}

.purchase-page {
  width: 100%;
  padding-left: 5vw;
  padding-top: 15%;
}

.next {
  margin-left: 24vw;
  width: 6vw;
  margin-top: 3vw;
}
</style>
