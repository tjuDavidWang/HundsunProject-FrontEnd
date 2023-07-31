<template>
  <div class="table">
    <h1>客户列表</h1>

    <div class="search-container">
      <h-form>
        <h-form-item class="search" prop="key">
          <h-input v-model="keyValue" placeholder="请输入关键字" style="width: 10vw">
          </h-input>
          <h-button @click="searchCus" type="primary" shape="circle" icon="search">搜索</h-button>
        </h-form-item>
      </h-form>
    </div>
    <div class="cus-table">
      <h-table border stripe size="large" headAlgin="center" bodyAlgin="center" :data="tData"
        :columns="columns"></h-table>
    </div>

    <h-page class="cus-page-button" size="small" :total="totalNum" @on-change="dataChange" show-elevator show-total
      fastArrival page-size="10"></h-page>

    <UserInfoModal @close="closeModal" :visible="showModal" :user="selectedUser"></UserInfoModal>

    <UserEditModal @closeEdit="closeEditModal" :editVisible="showEditModal" :editUser="editedUser"></UserEditModal>
  </div>
</template>

<script>
import axios from "axios";
import UserInfoModal from "./UserInfoModal.vue";
import UserEditModal from "./UserEditModal.vue";

export default {
  name: "CustomerTable",
  components: {
    UserInfoModal,
    UserEditModal,
  },
  data() {
    return {
      keyValue: "",
      tData: [],
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
                  on: {
                    click: () => {
                      console.log(user);
                      this.editUser(user);
                    },
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
      totalNum: 0,
      showModal: false,
      showEditModal: false,
      selectedUser: {},
      editedUser: {},
      curPage: 1,
    };
  },
  methods: {
    async searchCus() {
      if (this.keyValue === "") {
        await this.fetehData();
      } else {
        this.tData = [];
        let d = {};
        this.totalNum = 0;

        const response1 = axios.get(`http://127.0.0.1:9091/search/invester/name?key=${this.keyValue}`);
        const response2 = axios.get(`http://127.0.0.1:9091/search/invester/number?key=${this.keyValue}`);

        try {
          const [response1Data, response2Data] = await Promise.all([response1, response2]);

          response1Data.data.forEach((item) => {
            d.name = item.userName;
            d.type = item.userType;
            d.ID = item.cerNumber;
            d.cerType = item.cerType;
            d.riskLevel = item.riskGrade;
            this.tData.push(d);
            d = {};
            this.totalNum++;
          });

          response2Data.data.forEach((item) => {
            d.name = item.userName;
            d.type = item.userType;
            d.ID = item.cerNumber;
            d.cerType = item.cerType;
            d.riskLevel = item.riskGrade;
            this.tData.push(d);
            d = {};
            this.totalNum++;
          });

          for (const item of this.tData) {
            await this.fetehCard(item);
            console.log(this.tData, 12345);
          }
        } catch (error) {
          console.error(error);
        }
      }
    },

    numChange(value) {
      console.log(value);
    },
    dataChange(i) {
      this.tData = data.slice((i - 1) * 5, i * 5);
      this.curPage = i;
    },

    viewUser(user) {
      console.log(user, 123);
      this.showModal = true;
      const customer = this.tData.find((item) => item.ID === user.ID);
      this.selectedUser = customer;
    },
    editUser(user) {
      console.log(user);
      this.showEditModal = true;
      this.editedUser = user;
    },
    closeModal() {
      console.log("123");
      this.showModal = false;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    handleDelete(user) {
      this.deleteCus(user.ID);
      this.totalNum = this.totalNum - 1;
      this.tData = this.tData.slice((this.curPage - 1) * 5, this.curPage * 5);
    },
    fetehData() {
      return new Promise((resolve, reject) => {
        let d = {};
        this.tData = [];
        axios
          .get("http://127.0.0.1:9091/getInvester/all")
          .then((response) => {
            response.data.forEach((item) => {
              d.name = item.userName;
              d.type = item.userType;
              d.ID = item.cerNumber;
              d.cerType = item.cerType;
              d.riskLevel = item.riskGrade;
              this.tData.push(d);
              d = {};
              this.totalNum++;
            });
            resolve();
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    },
    async fetehCard(item) {
      try {
        const response = await axios.get(
          "http://127.0.0.1:9091/getBankCard/all",
          {
            params: { cer_number: item.ID },
          }
        );
        item.cardNumber = response.data.length;
        item.card = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    deleteCus(id) {
      axios
        .delete("http://127.0.0.1:9091/deleteInvester", {
          params: { cer_number: id },
        })
        .then(() => {
          this.tData = this.tData.filter((item) => item.ID !== id);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  async created() {
    await this.fetehData();
    for (const item of this.tData) {
      await this.fetehCard(item);
    }
    console.log(this.tData);
  },
};
</script>

<style>
.search-container {
  display: flex;
  justify-content: flex-end;
}

.table {
  width: 80vw;
  padding: 3% 5%;
  text-align: center;
  height: 100vh;
  margin-block: 1vh;
}

.cus-table {
  margin-bottom: 2vh;
}

.cus-page-button {
  float: right;
}
</style>
