<template>
  <h-msg-box
    v-model="visible"
    :escClose="true"
    title="顾客信息"
    @on-ok="closeModal"
    @on-cancel="closeModal"
    @on-close="closeModal"
    :beforeEscClose="beforetest"
  >
    <p><strong>姓名：</strong>{{ user.name }}</p>
    <p><strong>类型：</strong>{{ user.type }}</p>
    <p><strong>证件类型：</strong>{{ user.cerType }}</p>
    <p><strong>证件号码：</strong>{{ user.ID }}</p>
    <p><strong>风险等级：</strong>{{ user.riskLevel }}</p>
    <p><strong>银行卡张数：</strong>{{ user.cardNumber }}</p>
    <div v-for="(item,index) in user.card" :key="index">
      <p><strong>银行：</strong>{{ item.bankName }}</p>
      <p><strong>银卡号：</strong>{{ item.cardNumber }}</p>
    </div>
  </h-msg-box>
</template>

<script>
export default {
  name: "UserInfoModal",
  props: {
    visible: Boolean,
    user: Object,
  },
  methods: {
    closeModal() {
      console.log(this.user)
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
p {
  font-size: 16px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
</style>
