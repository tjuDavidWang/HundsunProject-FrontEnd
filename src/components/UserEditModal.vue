<template>
  <h-msg-box
    v-model="editVisible"
    :escClose="true"
    title="顾客信息"
    @on-ok="saveAndClose"
    @on-cancel="closeModal"
    @on-close="closeModal"
    :beforeEscClose="beforetest"
    width="30vw"
  >
    <h-form :label-width="100" inline>
      <h-form-item label="投资人名称">
        <h-input v-model="editUser.name" size="large"></h-input>
      </h-form-item>
      <h-form-item label="投资人类型">
        <h-select v-model="editUser.type">
          <h-option
            v-for="item in investor_type"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</h-option
          >
        </h-select>
      </h-form-item>
      <h-form-item label="投资人证件类型">
        <h-select v-model="editUser.cerType" style="width: 10vw">
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
          v-model="editUser.ID"
          size="large"
          style="width: 10vw"
          disabled
        ></h-input>
      </h-form-item>
    </h-form>
  </h-msg-box>
</template>

<script>
import axios from "axios";
export default {
  name: "UserInfoModal",
  props: {
    editVisible: Boolean,
    editUser: Object,
  },
  data() {
    return {
      investor_type: [
        {
          value: "个人",
          label: "个人",
        },
        {
          value: "机构",
          label: "机构",
        },
        {
          value: "公司",
          label: "公司",
        },
      ],
      certificate_type: [
        {
          value: "身份证",
          label: "身份证",
        },
        {
          value: "港澳居民往来内地通行证",
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
        {
          value: "公司证件",
          label: "公司证件",
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
  methods: {
    closeModal() {
      this.$emit("closeEdit");
    },
    saveAndClose() {

      axios
        .patch(
          `http://127.0.0.1:9091/modifyInvester?user_type=${encodeURIComponent(
            this.editUser.type
          )}&user_name=${encodeURIComponent(
            this.editUser.name
          )}&cer_type=${encodeURIComponent(this.editUser.cerType)}&cer_number=${encodeURIComponent(
            this.editUser.ID)
          }&risk_grade=${this.editUser.riskLevel}`
        )
        .then((response) => {
          
          this.closeModal();
        })
        .catch((error) => {
          console.error("修改失败:", error);
        });
    },
  },
};
</script>
