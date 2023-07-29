<template>
  <div>
    <h-msg-box v-model="visible" :escClose="true" title="产品详情" @on-ok="closeModal" @on-cancel="closeModal"
      @on-close="closeModal" width="50vw">
      <div class="nav-graph">
        <div>
          产品名称：<b>{{ fund.fundName }}</b>&nbsp;&nbsp;&nbsp;&nbsp;
          产品代码：<b>{{ fund.fundNumber }}</b>&nbsp;&nbsp;
          产品类型：<a :style="{
            backgroundColor: fundTypeColor,
            color: 'black',
            width: '6em',
            borderRadius: '20%',
          }">
            <b>&nbsp;&nbsp;{{ fund.fundType }}&nbsp;&nbsp;</b></a>&nbsp;&nbsp;&nbsp;&nbsp;
          风险等级：<a :style="{ color: fundRiskColor }"><b>R{{ fund.fundRisk }}</b></a>&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <br /><br />
        <div class="graph">
          <div id="main" style="width: 45vw; height: 40vh"></div>
        </div>
      </div>
    </h-msg-box>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from 'axios';

export default {
  name: "NavGraph",
  props: {
    visible: Boolean,
    fund: Object,
  },
  data() {
    return {
      fundDate: [],
      fundValue: [],
      allData: [],
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async fetchData() {
      try {
        let response = await axios.get('http://127.0.0.1:9091/getDailyValue?fund_number=' + this.fund.fundNumber);
        response.data.forEach(item => {
          this.fundDate.push(item.fundDate);
          this.fundValue.push(item.fundValue);
        });
        this.initChart();
        console.log(this.fundDate);


      } catch (error) {
        console.log(error);
      }
    },
    initChart() {
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      var option;
      console.log(this.fundDate);
      option = {
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        title: {
          left: "center",
          text: "净值走势图",
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.fundDate,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100,
          },
          {
            start: 0,
            end: 10,
          },
        ],
        series: [
          {
            name: this.fund.fundName,
            type: "line",
            symbol: "none",
            sampling: "lttb",
            itemStyle: {
              color: "#000080",
            },
            areaStyle: {
              color: this.areaStyleColor,
            },
            data: this.fundValue,
          },
        ],
      };

      option && myChart.setOption(option);
    }
  },
  computed: {
    fundTypeColor() {
      switch (this.fund.fundType) {
        case "货币基金":
          return "rgb(255,207,3)";
        case "混合基金":
          return "rgb(18,206,249)";
        case "股票基金":
          return "rgb(255,75,0)";
        case "债券基金":
          return "#98FB98";
        default:
          return "#000000";  // 默认返回黑色
      }
    },
    fundRiskColor() {
      switch (this.fund.fundRisk) {
        case 1:
          return "rgb(255,207,3)";
        case 2:
        case 3:
          return "rgb(18,206,249)";
        case 4:
        case 5:
          return "rgb(255,75,0)";
        default:
          return "#000000";  // 默认返回黑色
      }
    },
    areaStyleColor() {
      return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: "#000080",
        },
        {
          offset: 1,
          color: this.fundTypeColor,
        },
      ]);
    },
  },
  mounted() {
    this.fetchData();
  }
};
</script>
<style scoped>
.nav-graph {
  text-align: center;
  background-color: white;
  width: auto;
}

.graph {
  padding-bottom: 10px;
  width: 100%;
}
</style>
