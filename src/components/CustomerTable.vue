<template>
  <div class="table">
    <h-table
      class="cus-table"
      border
      stripe
      size="large"
      headAlgin="center"
      bodyAlgin="center"
      :data="tData"
      :columns="columns"
    ></h-table>
    <h-page
      class="cus-page-button"
      size="small"
      :total="totalNum"
      @on-change="dataChange"
      show-elevator
      show-total
      fastArrival
      page-size="5"
    ></h-page>

    <UserInfoModal
      @close="closeModal"
      :visible="showModal"
      :user="selectedUser"
    ></UserInfoModal>
  </div>
</template>

<script>
import UserInfoModal from "./UserInfoModal.vue";
import UserEditModal from "./UserEditModal.vue"

var data = [
  {
    name: "张小刚1",
    type: "个人",
    cerType: "身份证",
    ID: "012365478",
    riskLevel: "低",
  },
  {
    name: "张小刚2",
    type: "个人",
    cerType: "身份证",
    ID: "112365478",
    riskLevel: "低",
  },
  {
    name: "张小刚3",
    type: "个人",
    cerType: "身份证",
    ID: "212365478",
    riskLevel: "低",
  },
  {
    name: "张小刚4",
    type: "个人",
    cerType: "身份证",
    ID: "312365478",
    riskLevel: "低",
  },
  {
    name: "张小刚5",
    type: "个人",
    cerType: "身份证",
    ID: "412365478",
    riskLevel: "低",
  },
  {
    name: "张小刚6",
    type: "个人",
    cerType: "身份证",
    ID: "512365478",
    riskLevel: "低",
  },
  {
    name: "张小刚7",
    type: "个人",
    cerType: "身份证",
    ID: "612365478",
    riskLevel: "低",
  },
  {
    name: "张小刚8",
    type: "个人",
    cerType: "身份证",
    ID: "712365478",
    riskLevel: "低",
  },
  {
    name: "张小刚9",
    type: "个人",
    cerType: "身份证",
    ID: "812365478",
    riskLevel: "低",
  },
  {
    name: "张小刚10",
    type: "个人",
    cerType: "身份证",
    ID: "912365478",
    riskLevel: "低",
  },
  {
    name: "张小刚11",
    type: "个人",
    cerType: "身份证",
    ID: "1012365478",
    riskLevel: "低",
  },
  {
    name: "张小刚12",
    type: "个人",
    cerType: "身份证",
    ID: "1112365478",
    riskLevel: "低",
  },
];
export default {
  name: "CustomerTable",
  components: {
    UserInfoModal,
    UserEditModal,
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
                    type: "confirm",
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
                    type: "confirm",
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
                    type: "confirm",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      console.log(user);
                      this.handleDelete(user);
                    },
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
      curPage: 1,
    };
  },
  methods: {
    numChange(value) {
      console.log(value);
    },
    dataChange(i) {
      this.tData = data.slice((i - 1) * 5, i * 5);
      this.curPage = i;
    },

    viewUser(user) {
      console.log(user);
      this.showModal = true;
      this.selectedUser = user;
    },
    closeModal() {
      console.log("123");
      this.showModal = false;
    },
    handleDelete(user) {
      data.forEach((item, index) => {
        if (item.ID === user.ID) {
          data.splice(index, 1);
        }
      });
      this.totalNum = this.totalNum - 1;
      this.tData = data.slice((this.curPage - 1) * 5, this.curPage * 5);
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
