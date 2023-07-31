<template>
  <div class="container">
    <h1 class="title">{{ questionnaireTitle }}</h1>
    <div class="scrollable-container">
      <form>
        <div
          v-for="(question, index) in questions"
          :key="index"
          class="question"
        >
          <h3 class="qst">{{ index + 1 + "." + question.text }}</h3>
          <div
            v-for="(option, optionIndex) in question.options"
            :key="optionIndex"
            class="option-container"
          >
            <input
              type="radio"
              :id="`question-${index}-option-${optionIndex}`"
              :value="option.value"
              v-model="answers[index]"
            />
            <label
              class="opt"
              :for="`question-${index}-option-${optionIndex}`"
              >{{ option.label }}</label
            >
          </div>
        </div>
        <router-link to="/ListCustomers">
          <h-button class="sub-button" @click="submitAnswers" type="info">提交</h-button>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
      console.log(this.investorInfo);
      axios
        .post(
          `http://127.0.0.1:9091/createInvester?user_type=${encodeURIComponent(
            this.investorInfo.user_type
          )}&user_name=${encodeURIComponent(
            this.investorInfo.user_name
          )}&cer_type=${encodeURIComponent(
            this.investorInfo.cer_type
          )}&cer_number=${this.investorInfo.cer_number}&risk_grade=${
            this.customerFunds
          }`
        )

        .then((respone) => {
          console.log(respone);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.investorInfo = this.$route.query;
    console.log(this.investorInfo);
  },
};
</script>

<style>
.title {

  margin-top: 3%;
  margin-block: 3%;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1vh;
  height: 100%;
  width: 100%;
}
.scrollable-container {
  align-items: center;
  justify-content: center;
  height: 80vh;
  width:100%;
  overflow-y: auto;
  flex-direction: column;
}
.question {
  margin-left: 35%;
}
.qst {
  font-size: 15px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  text-align: left;
  margin-left: 10%;
}

.option-container {
  display: flex;
  align-items: center;
  margin-left: 12%;
}

.opt {
  font-size: 10px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  text-align: left;
  margin-left: 2%;
}

.sub-button {
  margin-top: 1%;
  margin-left: 45%
}
</style>
