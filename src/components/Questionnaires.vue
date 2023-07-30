<template>
    <div>
      <h2>{{ questionnaireTitle }}</h2>
      <form>
        <div v-for="(question, index) in questions" :key="index" class="question">
          <h3>{{ question.text }}</h3>
          <div v-for="(option, optionIndex) in question.options" :key="optionIndex">
            <input
              type="radio"
              :id="`question-${index}-option-${optionIndex}`"
              :value="option.value"
              v-model="answers[index]"
            >
            <label :for="`question-${index}-option-${optionIndex}`">{{ option.label }}</label>
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
        questionnaireTitle: "这是一个单选题问卷",
        questions: [
          {
            text: "问题1：你喜欢的颜色是？",
            options: [
              { value: "red", label: "红色" },
              { value: "blue", label: "蓝色" },
              { value: "green", label: "绿色" }
            ]
          },
          {
            text: "问题2：你喜欢的水果是？",
            options: [
              { value: "apple", label: "苹果" },
              { value: "banana", label: "香蕉" },
              { value: "orange", label: "橙子" }
            ]
          },
          // 添加更多的问题...
        ],
        answers: [] // 用于存储用户选择的答案
      };
    },
    methods: {
      submitAnswers() {
        // 在这里处理用户提交的答案
        console.log("用户提交的答案：", this.answers);
        // 可以将答案发送到服务器或进行其他处理
      }
    }
  };
  </script>
  
  <style>
  .question {
    margin-bottom: 20px;
  }
  </style>
  