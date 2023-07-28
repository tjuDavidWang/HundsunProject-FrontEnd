<template>
  <div class="table">
    <h-table
      :data="tData"
      :columns="columns"
      headAlgin="center"
      bodyAlgin="center"
      style="margin: 10px"
      stripe
      border
    ></h-table>

    <h-page
      :total="totalNum"
      @on-change="dataChange"
      show-elevator
      show-total
      :page-size="10"
      style="margin: 10%"
    ></h-page>
  </div>
</template>

<script>
var data = [
  {
    fundNumber: "123452145323",
    fundName: "恒生训练营",
    fundType: "股票基金",
    fundRisk: "低",
    property: 10000.0,
    share: 2000,
  },
  {
    fundNumber: "123452145324",
    fundName: "恒生训练营2",
    fundType: "股票基金",
    fundRisk: "低",
    property: 10000.0,
    share: 2000,
  },
  {
    fundNumber: "123452145325",
    fundName: "恒生训练营3",
    fundType: "股票基金",
    fundRisk: "低",
    property: 10000.0,
    share: 2000,
  },
  {
    fundNumber: "123452145326",
    fundName: "恒生训练营4",
    fundType: "股票基金",
    fundRisk: "低",
    property: 10000.0,
    share: 2000,
  },
  {
    fundNumber: "123452145327",
    fundName: "恒生训练营5",
    fundType: "股票基金",
    fundRisk: "低",
    property: 10000.0,
    share: 2000,
  },
  {
    fundNumber: "123452145328",
    fundName: "恒生训练营6",
    fundType: "股票基金",
    fundRisk: "低",
    property: 10000.0,
    share: 2000,
  },
  {
    fundNumber: "123452145329",
    fundName: "恒生训练营7",
    fundType: "股票基金",
    fundRisk: "低",
    property: 10000.0,
    share: 2000,
  },
  {
    fundNumber: "123452145330",
    fundName: "恒生训练营8",
    fundType: "股票基金",
    fundRisk: "低",
    property: 10000.0,
    share: 2000,
  },
  {
    fundNumber: "123452145331",
    fundName: "恒生训练营9",
    fundType: "股票基金",
    fundRisk: "低",
    property: 10000.0,
    share: 2000,
  },
  {
    fundNumber: "123452145332",
    fundName: "恒生训练营10",
    fundType: "股票基金",
    fundRisk: "低",
    property: 10000.0,
    share: 2000,
  },
];
export default {
  name: "FundTable",
  data() {
    return {
      tData: data.slice(0, 10),
      totalNum: data.length,
      columns: [
        {
          title: "基金代码",
          key: "fundNumber",
        },
        {
          title: "基金名称",
          key: "fundName",
        },
        {
          title: "基金类型",
          key: "fundType",
        },
        {
          title: "风险等级",
          key: "fundRisk",
        },
        {
          title: "总资产",
          key: "property",
        },
        {
          title: "总份额",
          key: "share",
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
    };
  },
  methods: {
    dataChange(i) {
      this.tData = data.slice((i - 1) * 5, i * 5);
    },
  },
};
</script>
