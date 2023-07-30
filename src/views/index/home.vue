<template>
  <div class="pt60">
    <div class="bg">
      <div class="logo">
        <img alt="Hundsun Design" :src="logo" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <img alt="Tongji Univ" :src="tjlogo" />
      </div>
      <hello-world class="mt20"></hello-world>
      <div class="tc">
        <h1>同济-恒生训练营3组 基金管理系统</h1>
        <br>
        <p>王蔚达 吴卓航 陈秋为 宋子阳 周澍锦</p>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/logo.png";
import tjlogo from "@/assets/tongji.png";

export default {
  data() {
    return {
      logo, tjlogo
    };
  }
};
</script>

<style lang="less" scoped>
@keyframes breathe {

  0%,
  100% {
    opacity: 1;
    scale: 100%;
  }

  50% {
    opacity: 0.8;
    scale: 95%;
  }
}

.pt60 {
  background: rgb(42,48,122);
  background: radial-gradient(circle, rgba(42,48,122,1) 57%, rgba(28,35,47,1) 100%);
}
.bg{
  padding-top: 25vh;
  height: 100vh;
  background: rgb(42,48,122);
  background: radial-gradient(circle, rgba(42,48,122,1) 57%, rgba(28,35,47,1) 100%); 
  animation: breathe 5s ease-in-out infinite;
  color: #FFF;
}
.mt20 {
  margin-top: 20px;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tc {
  text-align: center;
  font-size: 2.5vh;
  margin: 5vh 0;
}

.tc h1 {
  font-size: 4vh;
  font-weight: bold;
  color: #e0e0e0;
}

.tc p {
  font-size: 2vh;
  color: #b0b0b0;
}

.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 20px 0;
  background: rgba(199, 219, 255, 1);
  text-align: center;
  font-size: 1.5vh;
  color: #a0a0a0;
}

a {
  color: #6ac1ff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 15px;
}
</style>
