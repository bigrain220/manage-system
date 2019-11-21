<template>
  <div class="history-trend">
    <Header :title="title" ref="Header">
      <template>
          <div id="filters">
                    <div class="control-bar-wrapper clearfix">
                        <div class="control-bar l">
                            <span class="l time">时间：</span>
                            <div class="l date-select-bar clearfix" id="date-select-bar">
                                <span :class="['trackable',dateCur===0?'cur':'']" @click="choseDate(0)">今天</span>
                                <span class="seprator"></span>
                                <span :class="['trackable',dateCur===-6?'cur':'']"  @click="choseDate(-6)">最近7天</span>
                                <span class="seprator"></span>
                                <span :class="['trackable',dateCur===-13?'cur':'']"  @click="choseDate(-13)">最近14天</span>
                                <span class="seprator"></span>
                                <span :class="['trackable',dateCur===-29?'cur':'']"  @click="choseDate(-29)">最近30天</span>
                            </div>
                        </div>
                        <el-date-picker
                            @change="dateChange"
                            v-model="formDate"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                      </el-date-picker>
                    </div>
                </div>
      </template>
    </Header>
    <div class="content-box">
          <div id="historyChart" style="width:100%;height:400px;"></div>
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
import utils from "../../utils/utils"
export default {
  name: "History",
  components: { Header },
  data() {
    return {
      title: "历史趋势",
      dateCur:-6,
      formDate:[]
    };
  },
  methods: {
    getEcharts() {
      let myChart = $echarts.init(document.getElementById("historyChart"));
       myChart ? myChart.clear() : "";
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
                            '<div style="height:33px;line-height:33px;overflow:hidden;padding:6px 8px;">' +
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
      window.onresize = function () {
        myChart ? myChart.resize() : "";
      }
    },
    choseDate(date){
      this.dateCur =date;
      switch (date) {
          case 0:
              this.formDate = this.getDateRange(0)
              break;
          case -6:
              this.formDate = this.getDateRange(7)
              break;
          case -13:
             this.formDate = this.getDateRange(14)
              break;
          case -29:
              this.formDate = this.getDateRange(30)
              break;
          default:
              break;
      }
    },
    dateChange(val){
        if(val){
            this.formDate[0]=utils.getLocalTime(val[0].getTime()).slice(0,10);
            this.formDate[1]=utils.getLocalTime(val[1].getTime()).slice(0,10);
            console.log(this.formDate)
        }
    },
    getDateRange(params){
        let end = utils.getLocalTime(Date.now()-3600 * 1000 * 24).slice(0,10);
        let start = utils.getLocalTime(Date.now()- 3600 * 1000 * 24 * params).slice(0,10);
        if(params == 0){
            end =start;
        }
        let arr=[start,end];
        return arr;
    }
  },
  mounted(){
      this.getEcharts();
      this.choseDate(-6);
  },
};
</script>
<style lang="scss"  scoped>
$text-color:#323437;// 日期选择文字颜色
#historyChart{
  background: #fff;
}
#filters .control-bar-wrapper {
    position: relative;
    padding-top: 20px;
    padding-bottom: 5px;
    z-index: 2;
    color: $text-color;
}
#filters .control-bar-wrapper .control-bar {
    color: $text-color;
}
#filters .control-bar-wrapper .control-bar .time {
    margin-left: 30px;
    display: inline-block;
    height: 30px;
    padding-right: 5px;
    line-height: 30px;
    color: #787a7d;
}
.date-select-bar {
    border: 1px solid #e1e3e4;
    border-radius: 4px;
}
.control-bar-wrapper .control-bar .date-select-bar .trackable {
    float: left;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    color: $text-color;
    background-color: #fff;
    cursor: pointer;
}
.control-bar-wrapper .control-bar .date-select-bar .trackable:not(.cur):hover {
    background: #f2f3f4;
}
.control-bar-wrapper .control-bar .date-select-bar .trackable:first-child {
    border-radius: 4px 0 0 4px;
    left: -1px;
}
.control-bar-wrapper .control-bar .date-select-bar .trackable:last-child {
    border-radius: 0 4px 4px 0;
}
.control-bar-wrapper .control-bar .date-select-bar .cur {
    position: relative;
    bottom: -1px;
    margin-top: -2px;
    padding-top: 1px;
    height: 31px;
    background-color: #4da7fd;
    color: #fff;
}
.control-bar-wrapper .el-date-editor.el-input__inner{
  height: 32px;line-height: 32px;margin-left: 28px;
}
.control-bar-wrapper .el-range-editor.el-input__inner{padding:0 14px;}
</style>
<style>
.control-bar-wrapper .el-date-editor .el-range-separator{line-height: 32px;width: 6%;}
</style>