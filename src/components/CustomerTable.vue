<template>
  <div class="table">
    <h-table class="cus-table" border stripe size="large" headAlgin="center" bodyAlgin="center" :data="tData"
      :columns="columns"></h-table>
    <h-page class="cus-page-button" size="small" :total="totalNum" @on-change="dataChange" show-elevator show-total
      fastArrival page-size="5"></h-page>

    <UserInfoModal @close="closeModal" :visible="showModal" :user="selectedUser"></UserInfoModal>
  </div>
</template>

<script>
import UserInfoModal from "./UserInfoModal.vue";

var data = [
  {
    name: "张小刚",
    type: "个人",
    cerType: "身份证",
    ID: "12365478",
    riskLevel: "低",
  },
  {
    name: "张小刚",
    type: "个人",
    cerType: "身份证",
    ID: "12365478",
    riskLevel: "低",
  },
  {
    name: "张小刚",
    type: "个人",
    cerType: "身份证",
    ID: "12365478",
    riskLevel: "低",
  },
  {
    name: "张小刚",
    type: "个人",
    cerType: "身份证",
    ID: "12365478",
    riskLevel: "低",
  },
  {
    name: "张小刚",
    type: "个人",
    cerType: "身份证",
    ID: "12365478",
    riskLevel: "低",
  },
  {
    name: "张小刚",
    type: "个人",
    cerType: "身份证",
    ID: "12365478",
    riskLevel: "低",
  },
  {
    name: "张小刚",
    type: "个人",
    cerType: "身份证",
    ID: "12365478",
    riskLevel: "低",
  },
  {
    name: "张小刚",
    type: "个人",
    cerType: "身份证",
    ID: "12365478",
    riskLevel: "低",
  },
  {
    name: "张小刚",
    type: "个人",
    cerType: "身份证",
    ID: "12365478",
    riskLevel: "低",
  },
  {
    name: "张小刚",
    type: "个人",
    cerType: "身份证",
    ID: "12365478",
    riskLevel: "低",
  },
  {
    name: "张小刚",
    type: "个人",
    cerType: "身份证",
    ID: "12365478",
    riskLevel: "低",
  },
  {
    name: "张小刚",
    type: "个人",
    cerType: "身份证",
    ID: "12365478",
    riskLevel: "低",
  },
];
export default {
  name: "CustomerTable",
  components: {
    UserInfoModal,
  },
  data() {
    return {
      tData: data.slice(0, 5),
      columns: [
        {
          title: "姓名",
          key: "name",
        },
        {
          title: "类型",
          key: "type",
        },
        {
          title: "证件类型",
          key: "cerType",
        },
        {
          title: "证件号码",
          key: "ID",
        },
        {
          title: "风险等级",
          key: "riskLevel",
        },
        {
          title: "操作",
          key: "action",
          render: (h, params) => {
            console.log(this);
            const user = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      console.log(user);
                      this.viewUser(user);
                    },
                  },
                },
                "查看"
              ),
              h("span", {}, "  "),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                  },
                },
                "编辑"
              ),
              h("span", {}, "  "),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      totalNum: data.length,
      showModal: false,
      selectedUser: {},
    };
  },
  methods: {
    numChange(value) {
      console.log(value);
    },
    dataChange(i) {
      this.tData = data.slice((i - 1) * 5, i * 5);
    },

    viewUser(user) {
      console.log(user);
      this.showModal = true;
      this.selectedUser = user;
    },
    closeModal() {
      console.log("123")
      this.showModal = false;
    },
  },
};
</script>

<style>
.cus-table {
  margin-bottom: 2%;
}

.cus-page-button {
  float: right;
}
</style>
