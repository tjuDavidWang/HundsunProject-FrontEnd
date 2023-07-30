<template>
  <h-msg-box v-model="editVisible" :escClose="true" title="产品信息" @on-ok="closeModal" @on-cancel="closeModal"
    @on-close="closeModal" width="30vw">
    <h-form :label-width="100" inline>

      <h-form-item label="基金代码" >
        <h-input v-model="editFund.fundNumber" size="large" disabled></h-input>
      </h-form-item>

      <h-form-item label="基金名称">
        <h-input v-model="editFund.fundName" size="large"></h-input>
      </h-form-item>

      <h-form-item label="基金类型">
        <h-select v-model="editFund.fundType">
          <h-option v-for="item in fundType" :value="item.value" :key="item.value">{{ item.value }}</h-option>
        </h-select>
      </h-form-item>

      <h-form-item label="风险等级">
        <h-select v-model="selectedRiskLevel">
          <h-option v-for="item in riskLevel" :value="item.label" :key="item.value">{{ item.label }}</h-option>
        </h-select>
      </h-form-item>


    </h-form>
  </h-msg-box>
</template>

<script>
export default {
  name: "FundEditModal",
  props: {
    editVisible: Boolean,
    editFund: Object,
  },
  data() {
    return {
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
      this.$emit("closeEdit");
    },
  },
  computed: {
    selectedRiskLevel: {
      get() {
        const item = this.riskLevel.find(item => item.value === this.editFund.fundRisk);
        return item ? item.label : '';
      },
      set(newValue) {
        const item = this.riskLevel.find(item => item.label === newValue);
        this.editFund.fundRisk = item ? item.value : 0; // 如果找不到对应的项，则设置为0
      }
    }
  }


};
</script>

