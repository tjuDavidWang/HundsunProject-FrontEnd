<template>
  <div>
    <h-msg-box v-model="createVisible" :escClose="true" title="新增产品" @on-ok="save" @on-cancel="closeModal"
      @on-close="closeModal" width="30vw">

      <h-form :label-width="100" inline>

        <h-form-item label="基金代码">
          <h-input v-model="fund.fundNumber" size="large" ></h-input>
        </h-form-item>

        <h-form-item label="基金名称">
          <h-input v-model="fund.fundName" size="large" ></h-input>
        </h-form-item>

        <h-form-item label="基金类型">
          <h-select v-model="fund.fundType" style="width: 8em">
            <h-option v-for="item in fundType" :value="item.value" :key="item.value">{{ item.value }}</h-option>
          </h-select>
        </h-form-item>

        <h-form-item label="基金风险等级">
          <h-select v-model="fund.fundRisk" >
            <h-option v-for="item in riskLevel" :value="item.value" :key="item.value">{{ item.label }}</h-option>
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
        fundRisk: 0,
      },
      fundType: [
        {
          value: "货币基金",
        },
        {
          value: "债券基金",
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
          value: 1,
          label: "R1",
        },
        {
          value: 2,
          label: "R2",
        },
        {
          value: 3,
          label: "R3",
        },
        {
          value: 4,
          label: "R4",
        },
        {
          value: 5,
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

