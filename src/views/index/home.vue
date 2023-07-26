<template>
  <div class="pt60">
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
      <div class="footer">
        <p><b>相关资源</b></p>
        <ul>
          <li>
            <a href="http://hui.hundsun.com/" target="_blank" rel="noopener"><u>官网</u></a>
            <a href="http://hui.hundsun.com/2.x/" target="_blank" rel="noopener"><u>文档</u></a>
            <a href="http://hui.hundsun.com/community/" target="_blank" rel="noopener"><u>社区</u></a>
            <a href="https://git01.hundsun.com/HUIOpenSource/hui-pro" target="_blank" rel="noopener"><u>代码示例</u></a>
          </li>
        </ul>
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
.pt60 {
  padding-top: 30vh;
}

.mt20 {
  margin-top: 20px;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #047cf3;
}

.tc {
  text-align: center;
  font-size: 2vh;
}

.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
</style>
