<template>
  <div class="container">
    <h1 class>{{ questionnaireTitle }}</h1>
    <form>
      <div v-for="(question, index) in questions" :key="index" class="question">
        <h3 class="qst">{{ index + 1 + "." + question.text }}</h3>
        <div v-for="(option, optionIndex) in question.options" :key="optionIndex">
          <input type="radio" :id="`question-${index}-option-${optionIndex}`" :value="option.value"
            v-model="answers[index]" />
          <label class="opt" :for="`question-${index}-option-${optionIndex}`">{{
            option.label
          }}</label>
        </div>
      </div>
      <button @click="submitAnswers">提交</button>
    </form>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      investorInfo: null, // 投资人信息
      customerFunds: "",
      questionnaireTitle: "风险等级调查",
      questions: [
        {
          text: "过去是否有信用卡逾期记录",
          options: [
            { value: "1", label: "有" },
            { value: "0", label: "没有" },
          ],
        },
        {
          text: "是否曾经有贷款违约行为",
          options: [
            { value: "1", label: "有" },
            { value: "0", label: "没有" },
          ],
        },
        {
          text: "是否有投资股票、基金或其他金融产品的经验",
          options: [
            { value: "0", label: "有" },
            { value: "1", label: "没有" },
          ],
        },
        {
          text: "是否了解投资风险",
          options: [
            { value: "0", label: "有" },
            { value: "1", label: "没有" },
          ],
        },
        {
          text: "是否了解投资风险",
          options: [
            { value: "0", label: "有" },
            { value: "1", label: "没有" },
          ],
        },
        {
          text: "是否了解投资风险",
          options: [
            { value: "0", label: "有" },
            { value: "1", label: "没有" },
          ],
        },
        {
          text: "投资目标",
          options: [
            { value: "0", label: "资本保值" },
            { value: "1", label: "资本稳健增长" },
            { value: "2", label: "高风险高回报" },
          ],
        },
        {
          text: "对于投资损失的容忍度",
          options: [
            { value: "0", label: "低：不能承受损失" },
            { value: "1", label: "中：能承受一定程度的损失" },
            { value: "2", label: "高：愿意承受较大的损失" },
          ],
        },
        {
          text: "偏好的投资类型是",
          options: [
            { value: "0", label: "保守型：风险较低的固定收益产品" },
            { value: "1", label: "平衡型：固定收益和股票基金等多元投资" },
            { value: "2", label: "进取型：主要投资股票等高风险资产" },
          ],
        },
        {
          text: "对于理财知识的自我评估",
          options: [
            { value: "0", label: "缺乏基本理财知识" },
            { value: "1", label: "了解一些基本理财知识" },
            { value: "2", label: "理财经验丰富" },
          ],
        },
      ],
      answers: [],
    };
  },
  methods: {
    submitAnswers() {
      let goal = 0;
      this.answers.forEach((item) => {
        if (item === "1") goal += 1;
        else if (item === "2") goal += 2;
      });
      if (goal >= 0 && goal <= 3) this.customerFunds = 1;
      else if (goal >= 4 && goal <= 6) this.customerFunds = 2;
      else if (goal >= 7 && goal <= 9) this.customerFunds = 3;
      else if (goal >= 10 && goal <= 11) this.customerFunds = 4;
      else if (goal >= 12) this.customerFunds = 5;
    },
  },
  created() {
    this.investorInfo = this.$route.query;
  }
};
</script>
  
<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.qst {
  font-size: 1.5vw;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.opt {
  font-size: 1vw;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>