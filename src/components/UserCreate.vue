<template>
  <div class="purchase-page">
    <div>
      <h-form
        ref="invester"
        :model="invester"
        :rules="rule_invester"
        :label-width="100"
        inline
      >
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
              >{{ item.label }}</h-option
            >
          </h-select>
        </h-form-item>
        <h-form-item prop="cer_type" label="投资人证件类型">
          <h-select v-model="invester.cer_type" style="width: 25vw">
            <h-option
              v-for="item in certificate_type"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</h-option
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
      <h-form ref="bank_card" :model="bank_card" :label-width="100" inline>
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
                  >{{ item.label }}</h-option
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
          <h-form-item v-if="Number(invester.bank_num) > 0&&Number(invester.bank_num)<=5">
            <h-button class="next" type="primary">下一步</h-button>
          </h-form-item>
        </div>
      </h-form>
    </div>
    <br /><br />
  </div>
</template>
<script>
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
          value: "person",
          label: "个人",
        },
        {
          value: "institution",
          label: "机构",
        },
      ],
      certificate_type: [
        {
          value: "Identification-card",
          label: "居民身份证",
        },
        {
          value: "HM-card",
          label: "港澳居民往来内地通行证",
        },
        {
          value: "TW-card",
          label: "台湾居民来往大陆通行证",
        },
        {
          value: "passport",
          label: "护照",
        },
      ],
      bank_List: [
        {
          value: "chinaBank",
          label: "中国银行",
        },
        {
          value: "conBank",
          label: "中国建设银行",
        },
        {
          value: "iAndCBank",
          label: "中国工商银行",
        },
        {
          value: "agrBank",
          label: "中国农业银行",
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
  },
};
</script>
<style scoped>
#page-divider {
  margin-right: 0px;
  padding-right: 0;
  padding-left: 100px;
}

.purchase-page {
  width: 100%;
  padding-left: 5vw;
  padding-top: 15%;
}

.next {
  margin-left: 24vw;
  width:6vw;
  margin-top:3vw;
}
</style>
