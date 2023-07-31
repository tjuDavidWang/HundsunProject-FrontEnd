<template>
  <div>
    <h-msg-box v-model="createVisible" :escClose="true" title="新增产品" @on-ok="save" @on-cancel="closeModal"
      @on-close="closeModal" width="30vw">

      <h-form :label-width="100" inline>

        <h-form-item label="基金代码">
          <h-input v-model="fund.fundNumber" size="large"></h-input>
        </h-form-item>

        <h-form-item label="基金名称">
          <h-input v-model="fund.fundName" size="large"></h-input>
        </h-form-item>

        <h-form-item label="基金类型">
          <h-select v-model="fund.fundType" style="width: 8em">
            <h-option v-for="item in fundType" :value="item.value" :key="item.value">{{ item.value }}</h-option>
          </h-select>
        </h-form-item>

        <h-form-item label="基金风险等级">
          <h-select v-model="fund.fundRisk">
            <h-option v-for="item in riskLevel" :value="item.value" :key="item.value">{{ item.label }}</h-option>
          </h-select>
        </h-form-item>
      </h-form>
      <br />
    </h-msg-box>
  </div>
</template>
<script>
import axios from "axios"
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
      const params = {
        fund_number: this.fund.fundNumber,
        fund_name: this.fund.fundName,
        fund_type: this.fund.fundType,
        fund_risk: this.fund.fundRisk,
      };

      axios.post('http://127.0.0.1:9091/createProduct', null, { params })
        .then(response => {
          // 处理响应，例如关闭窗口，刷新列表，显示通知等。
          this.$emit("save", this.fund);
          this.closeModal();
        })
        .catch(error => {
          // 处理错误，例如显示错误消息
          console.error('产品创建失败:', error);
        });
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
