<template>
  <div class="flow-analysis">
    <Header :title="title">
      <template>
        <div id="filters">
          <div class="control-bar-wrapper clearfix">
            <div class="control-bar l">
              <span class="l time">时间：</span>
              <div class="l date-select-bar clearfix" id="date-select-bar">
                <span :class="['trackable',dateCur==='0'?'cur':'']" @click="choseDate('0')">今天</span>
                <span class="seprator"></span>
                <span :class="['trackable',dateCur==='-1'?'cur':'']" @click="choseDate('-1')">昨天</span>
                <span class="seprator"></span>
                <span :class="['trackable',dateCur==='-6'?'cur':'']" @click="choseDate('-6')">最近7天</span>
                <span class="seprator"></span>
                <span :class="['trackable',dateCur==='-29'?'cur':'']" @click="choseDate('-29')">最近30天</span>
              </div>
              <div class="l time-span clearfix">
                <a :class="['l',formatSelected==='0'?'selected':'']" href="javascript:void(0)" @click="choseFormat('0')">按时</a>
                <a :class="['l',formatSelected==='1'?'selected':'']" href="javascript:void(0)" @click="choseFormat('1')">按日</a>
                <a :class="['l',,'disabled',formatSelected==='2'?'selected':'']" href="javascript:void(0)" @click="choseFormat('2')">按周</a>
                <a :class="['l',,'disabled',formatSelected==='3'?'selected':'']" href="javascript:void(0)" @click="choseFormat('3')">按月</a>
              </div>
            </div>

          </div>
        </div>
      </template>
    </Header>
    <div class="content-box">
      <div id="flowChart" style="width:100%;height:400px;background:#fff;"></div>
      
    </div>
  </div>
</template>
<script>
let $echarts = require("echarts/lib/echarts");
require("echarts/lib/component/tooltip");
require("echarts/lib/chart/line");
require("echarts/lib/component/legend");

import Header from "../common/header";
import API from "../../api/api";
export default {
  name: "flow",
  components: { Header },
  data() {
    return {
      title: "流量分析",
      dateCur: "-6",
      formatSelected: "0",
      num_data: [],//按时显示时的x轴数据
      x_data: [],//x轴数据
      y_data: [],//y轴数据
      myChart: ""
    };
  },
  methods: {
    choseDate(params) {
      this.dateCur = params;
      this.getFlowData();
    },
    choseFormat(params) {
      this.formatSelected = params;
      this.getFlowData();
    },
    getFlowData() {
      this.x_data = [];
      this.y_data = [];
      this.num_data = [];
      var params = {
        method: "f",
        date: this.dateCur,
        format: this.formatSelected
      };
      API.trendTime(params).then(res => {
        // console.log(res);
        for (var i = 0; i < res.items[0].length; i++) {
          this.x_data.push(res.items[0][i][0]);
          if (res.items[1][i][0] == "--") {
            res.items[1][i][0] = 0;
          }
          this.y_data.push(res.items[1][i][0]);
          this.num_data.push(i);
        };
        this.setEcharts();
      });
    },
    initEcharts() {
      this.myChart = $echarts.init(document.getElementById("flowChart"));
      var option = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,0.9)",
          textStyle: {
            color: "#666",
            fontSize: "14px"
          },
          extraCssText:
            "width:180px;height:85px;padding:0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);"
        },
        textStyle: {
          color: "#999"
        },
        color: "rgb(79, 168, 249)",
        legend: {
          left: "center",
          bottom: 5,
          itemWidth: 4,
          itemHeight: 10,
          textStyle: {
            padding: [0, 0, 0, 12]
          },
          data: []
        },
        grid: {
          left: "5%",
          right: "5%"
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: "#eee"
              }
            },
            data: []
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "transparent"
              }
            },
            splitLine: {
              lineStyle: {
                color: "#eee"
              }
            }
          }
        ],
        series: [
          {
            name: "",
            type: "line",
            areaStyle: {
              color: "rgb(79, 168, 249)",
              opacity: "0.2"
            },
            lineStyle: {
              color: "rgb(79, 168, 249)"
            },
            symbol: "circle",
            symbolSize: "5",
            data: []
          }
        ]
      };
      this.myChart.setOption(option);
    },
    setEcharts() {
      var that = this;
      var xData = [];
      var inter_val = 1;
      if (that.formatSelected === "0") {
        xData = that.num_data;
      } else {
        if (that.dateCur == "-29") {
          inter_val = 4;
        }
        xData = that.x_data;
      }
      var name_type = "浏览量(PV)";
      var arr = [];
      arr.push(name_type);
      that.myChart.setOption({
        xAxis: [
          {
            axisLabel: {
              interval: inter_val
            },
            data: xData
          }
        ],
        tooltip: {
                formatter: function (params) {
                    // console.log(params[0])
                    var tem = params[0].name;
                    if (tem.indexOf('/') < 0) {
                        tem > 9 ? tem = tem + ":00 - " + tem + ":59" : tem = "0" + tem + ":00 - " + "0" + tem + ":59";
                    }
                    var val = params[0].value;
                    val > 0 ? val = val : val = '--'
                    var res =
                        '<div><div style="height:35px;line-height:35px;padding:0 8px;background:rgba(237,233,233,0.4)">' +
                        tem +
                        '</div><div style="height:45px;line-height:45px;overflow:hidden;padding:0 8px;">' +
                        '<span style="float:left">' +
                        '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' +
                        params[0].color + ';"></span>' + params[0].seriesName + '</span>' +
                        '<span style="float:right">' + val + '</span>' + '</div></div>'
                    return res;
                },
        },
        legend: {
          data: arr
        },
        series: {
          name: name_type,
          data: that.y_data
        }
      });
    }
  },
  mounted() {
    this.getFlowData();
    this.initEcharts();
    var that =this; 
    window.onresize = function () {
        that.myChart ? that.myChart.resize() : "";
    } 
  }
};
</script>
<style lang="scss" scoped>
.time-span {
  margin-left: 25px;
  border: 1px solid #e1e3e4;
  border-radius: 2px;
}

.time-span a {
  padding: 0 10px;
  height: 24px;
  line-height: 24px;
  color: #323437;
}

.time-span a.first,
.time-span a.selected:first-child {
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}

.time-span a.selected {
  position: relative;
  bottom: -1px;
  margin-top: -2px;
  padding-top: 1px;
  height: 25px;
  background-color: #4fa8f9;
  color: #fff;
}
.time-span a.disabled {
  background-color: #f3f4f4;
  color: #a0a2a5;
  cursor: not-allowed;
}

.time-span a:not(.selected):hover {
  background: #f2f3f4;
}
</style>