<template>
    <div>
        <h-button type="confirm" @click="modal1 = true">详情</h-button>
        <h-msg-box v-model="modal1" :escClose="true" title="产品详情" @on-ok="ok" @on-cancel="cancel"
            :beforeEscClose="beforetest" width="50vw">
            <div class="nav-graph">
                <div>
                    产品名称：<b>{{ fundName }}</b>&nbsp;&nbsp;&nbsp;&nbsp;
                    产品代码：<b>{{ fundNumber }}</b>&nbsp;&nbsp;
                    产品类型：<a :style="{ backgroundColor: fundTypeColor, color: 'black', width: '6em', borderRadius: '20%' }">
                        <b>&nbsp;&nbsp;{{ fundType }}&nbsp;&nbsp;</b></a>&nbsp;&nbsp;&nbsp;&nbsp;
                    风险等级：<a :style="{ color: fundRiskColor }"><b>R{{ fundRisk }}</b></a>&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <br><br>
                <div class="graph">
                    <div id="main" style="width:45vw;height:40vh;"></div>
                </div>

            </div>
        </h-msg-box>
    </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    data() {
        return {
            modal1: false,

            fundName: '恒生训练营',
            fundNumber: '123452145323',
            fundType: '混合基金',
            fundRisk: 5,

            fundDate: ['2023-07-01', '2023-07-02', '2023-07-03', '2023-07-04', '2023-07-05', '2023-07-06', '2023-07-07', '2023-07-08', '2023-07-09', '2023-07-10', '2023-07-11', '2023-07-12', '2023-07-13', '2023-07-14', '2023-07-15', '2023-07-16', '2023-07-17', '2023-07-18', '2023-07-19', '2023-07-20'],
            fundValue: [3.5, 3.3, 2.1, 1.2, 0.5, 1.3, 0.7, 2.3, 1.5, 0.7, 1.2, 0.5, 2.1, 1.3, 0.6, 1.4, 0.6, 2.2, -1.4, 0.8],

        }
    },
    computed: {
        fundTypeColor() {

            switch (this.fundType) {
                case '货币基金':
                    return 'rgb(255,207,3)';
                case '混合基金':
                    return 'rgb(18,206,249)';
                case '股票基金':
                    return 'rgb(255,75,0)';
                case '债券基金':
                    return '#98FB98';
            }
        },
        fundRiskColor() {
            switch (this.fundRisk) {
                case 1:
                    return 'rgb(255,207,3)';
                case 2:
                case 3:
                case 4:
                    return 'rgb(18,206,249)';
                case 5:
                default:
                    return 'rgb(255,75,0)';
            }
        },
        areaStyleColor() {
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: '#000080'
                },
                {
                    offset: 1,
                    color: this.fundTypeColor
                }
            ]);
        }
    },
    mounted() {
        var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: '净值走势图'
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.fundDate
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 100
                },
                {
                    start: 0,
                    end: 10
                }
            ],
            series: [
                {
                    name: this.fundName,
                    type: 'line',
                    symbol: 'none',
                    sampling: 'lttb',
                    itemStyle: {
                        color: '#000080'
                    },
                    areaStyle: {
                        color: this.areaStyleColor
                    },
                    data: this.fundValue
                }
            ]
        };

        option && myChart.setOption(option);

    }

}
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
