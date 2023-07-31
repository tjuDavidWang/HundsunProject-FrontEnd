<template>
  <div>
    <div>
      <h1>开户界面</h1>
    </div>
    <div class="purchase-page">
      <div>
        <h-form ref="invester" :model="invester" :label-width="100" inline>
          <h-form-item label="投资人名称">
            <h-input
              v-model="invester.user_name"
              size="large"
              style="width: 25vw"
            ></h-input>
          </h-form-item>
          <h-form-item prop="user_type" label="投资人类型">
            <h-select v-model="invester.user_type" style="width: 25vw">
              <h-option
                v-for="item in investor_type"
                :value="item.value"
                :key="item.value"
                >{{ item.value }}</h-option
              >
            </h-select>
          </h-form-item>
          <h-form-item prop="cer_type" label="投资人证件类型">
            <h-select v-model="invester.cer_type" style="width: 25vw">
              <h-option
                v-for="item in certificate_type"
                :value="item.value"
                :key="item.value"
                >{{ item.value }}</h-option
              >
            </h-select>
          </h-form-item>
          <h-form-item label="证件号码">
            <h-input
              v-model="invester.cer_number"
              size="large"
              style="width: 25vw"
            ></h-input>
          </h-form-item>
        </h-form>
        <h-form ref="bank_card" :label-width="100" inline>
          <h-form-item label="银行卡张数">
            <h-input
              v-model="invester.bank_num"
              size="large"
              style="width: 6vw"
            ></h-input>
          </h-form-item>
          <div v-for="(bankCard, index) in filteredBankCards" :key="index">
            <template v-if="Number(invester.bank_num) <= 5">
              <h-form-item label="银行选择">
                <h-select v-model="bankCard.bank_name" style="width: 25vw">
                  <h-option
                    v-for="item in bank_List"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.value }}</h-option
                  >
                </h-select>
              </h-form-item>
              <h-form-item label="银行卡号">
                <h-input
                  v-model="bankCard.card_id"
                  size="large"
                  style="width: 25vw"
                ></h-input> </h-form-item
            ></template>
          </div>
          <div>
            <!--改用编程式导航-->
            <h-form-item
              v-if="
                Number(invester.bank_num) > 0 && Number(invester.bank_num) <= 5
              "
            >
              <h-button @click="nextStep" class="next" type="primary"
                >下一步</h-button
              >
            </h-form-item>
          </div>
        </h-form>
      </div>
      <br /><br />
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      invester: {
        cer_number: "",
        user_name: "",
        user_type: "",
        cer_type: "",
        bank_num: "",
        formDynamic: {
          bank_card: [
            {
              bank_name: "",
              card_id: "",
            },
          ],
        },
      },
      investor_type: [
        {
          value: "个人",
        },
        {
          value: "机构",
        },
      ],
      certificate_type: [
        {
          value: "居民身份证",
          label: "居民身份证",
        },
        {
          value: "港澳居民往来内地通行",
          label: "港澳居民往来内地通行证",
        },
        {
          value: "台湾居民来往大陆通行证",
          label: "台湾居民来往大陆通行证",
        },
        {
          value: "护照",
          label: "护照",
        },
      ],
      bank_List: [
        {
          value: "中国银行",
        },
        {
          value: "中国建设银行",
        },
        {
          value: "中国工商银行",
        },
        {
          value: "中国农业银行",
        },
      ],
    };
  },
  watch: {
    "invester.bank_num"(newValue, oldValue) {
      // 监听 bank_num 的变化，在变化时调整 bank_card 数组的对象个数
      if (newValue > oldValue) {
        const diff = newValue - this.invester.formDynamic.bank_card.length;
        for (let i = 0; i < diff; i++) {
          this.invester.formDynamic.bank_card.push({
            bank_name: "",
            card_id: "",
          });
        }
      } else if (newValue < oldValue) {
        const diff = oldValue - newValue;
        this.invester.formDynamic.bank_card.splice(newValue, diff);
      }
      console.log(this.invester);
    },
  },
  computed: {
    filteredBankCards() {
      const num = Number(this.invester.bank_num);
      return this.invester.formDynamic.bank_card.slice(0, num);
    },
  },
  methods: {
    clickme() {
      console.log(this.bank_card);
    },
    onclick() {
      this.$hMessage.info("icon点击事件");
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$hMessage.success("提交成功!");
        } else {
          this.$hMessage.error("表单验证失败!");
        }
      });
    },
    addCard() {
      console.log(123456);
      console.log(this.invester.formDynamic.bank_card.length);
      this.invester.formDynamic.bank_card.forEach((item) => {
        axios
          .post(
            `http://127.0.0.1:9091/addBankCard?cer_number=${
              this.invester.cer_number
            }&card_number=${item.card_id}&bank_name=${encodeURIComponent(
              item.bank_name
            )}&balance=100.0`
          )
          .then(() => {
            console.log("success");
          })
          .catch((error) => {
            console.error(error);
          });
      });
    },
    nextStep() {
      this.addCard();
      const query = {
        user_name: this.invester.user_name,
        user_type: this.invester.user_type,
        cer_type: this.invester.cer_type,
        cer_number: this.invester.cer_number,
        bank_num: this.invester.bank_num,
      };
      this.$router.push({ path: "/Questionnaires", query });
    },
  },
};
</script>
<style scoped>
#page-divider {
  margin-right: 0px;
  padding-left: 0;
}
h1 {
  padding-top: 10vh;
  padding-bottom: 6vh;
  text-align: center;
}

.purchase-page {
  width: 100%;
  padding-left: 8vw;
}

.next {
  margin-left: 24vw;
  width: 6vw;
  margin-top: 3vw;
}
</style>
