<template>
  <div class="update-trend">
    <Header :title="title"></Header>
    <div class="content-box">
          <div id="updateChart" :style="{width: '100%', height: '400px'}"></div>
    </div>
  </div>
</template>
<script>
let $echarts = require("echarts/lib/echarts");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/chart/line");
require("echarts/lib/component/legend");

import Header from "../common/header";
export default {
  name: "Update",
  components: { Header },
  data() {
    return {
      title: "实时趋势"
    };
  },
  methods: {
    getEcharts() {
      let myChart = $echarts.init(document.getElementById("updateChart"));
      // 绘制图表
      var option = {
          tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(255,255,255,0.8)',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'line', // 默认为直线，可选为：'line' | 'shadow'
                    shadowStyle: {
                        color: 'rgba(150,150,150,0.2)'
                    }
                },
                textStyle: {
                    color: '#666',
                    fontSize: '14px',
                },
                extraCssText: 'width:220px;height:20%;padding:0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);"',
                formatter: function (params) {
                    var htmlStr = "";
                    for (var i = 0; i < params.length; i++) {
                        var tem = params[i].name;
                        var val = params[i].value;
                        if (tem.indexOf('/') < 0) {
                            tem > 9 ? tem = tem + ":00 - " + tem + ":59" : tem = "0" + tem + ":00 - " +
                                "0" + tem + ":59";
                        }
                        val > 0 ? val = val : val = '--'
                        htmlStr +=
                            '<div style="height:26px;line-height:26px;overflow:hidden;padding:6px 8px;">' +
                            '<span style="float:left;max-width:160px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">' +
                            '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' +
                            params[i].color + ';"></span>' + params[i].seriesName + '</span>' +
                            '<span style="float:right">' + val + '</span>' + '</div>'
                    }
                    var res =
                        '<div><div style="height:40px;line-height:40px;padding:0 8px;background:rgba(237,233,233,0.4)">' +
                        tem + '<span style="float:right;">'  +
                        '</span>' + htmlStr + '</div></div>'
                    return res;
                },
            },
            textStyle: {
                color: 'rgb(120, 122, 125)',
            },
            color: ['#4fa8f9', '#6ec71e', '#f56e6a', '#fc8b40', '#818af8', '#31c9d7', '#f35e7a', '#ab7aee','#14d68b', '#cde5ff'],
            grid: {
                top: 30, //越大越靠下，默认60 
                bottom: 70
            },
             legend: {
                bottom: 1,
                itemGap: 15,
                itemWidth: 9,
                itemHeight: 10,
                textStyle: {
                    padding: [0, 0, 0, 8],
                },
                formatter: function (name) {
                    return (name.length > 14 ? (name.slice(0, 14) + "...") : name);
                },
                data: ['浏览量pv']
            },
            xAxis: [{
                type: 'category',
                // boundaryGap: false,//坐标轴两边留白策略
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    interval: 2
                },
                axisLine: {
                    lineStyle: {
                        color: "#ddd"
                    }
                },
                data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14',
                    '15', '16', '17', '18', '19', '20', '21', '22', '23'
                ],
            }],
            yAxis: [{
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: "transparent"
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#eee',
                    }
                }
            }],
            series: [{
                name: '浏览量pv',
                type: 'line',
                symbol: 'circle',
                symbolSize: '5',
                data: [8, 1, 1, 0, 0, 3, 2, 0, 6, 3, 1, 4, 7, 3, 7, 15, 11, 3, 8, 3, 2, 5, 4, 7]
            }, ]
      };

      myChart.setOption(option);
    }
  },
  mounted(){
    this.getEcharts();
  }
};
</script>
<style  scoped>
</style>