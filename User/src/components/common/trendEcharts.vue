<template>
  <div id="trendEcharts" style="width:100%;height:360px;background:#fff;margin-bottom:20px;" v-loading="loading.echarts"></div>
</template>

<script>
let $echarts = require("echarts/lib/echarts");
require("echarts/lib/component/tooltip");
require("echarts/lib/chart/line");
require("echarts/lib/component/legend");
import API from "../../api/api";
export default {
  name: "trendEcharts",
  data() {
    return {
      loading: {
        echarts: true
      },
      num_data: [], //按时显示时的x轴数据
      x_data: [], //x轴数据
      y_data: [], //y轴数据
      y_data2: [], //y轴数据
      myChart: ""
    };
  },
  methods: {
    getTrendData(params) {
      this.loading.echarts = true;
      this.x_data = [];
      this.y_data = [];
      this.y_data2 = [];
      this.num_data = [];
      API.overviewTrend({date:params}).then(res => {
        // console.log(res);
        this.$emit('dateRangeEvent',res.timeSpan[0])
        for (var i = 0; i < res.items[0].length; i++) {
          this.x_data.push(res.items[0][i][0]);
          if (res.items[1][i][0] == "--") {
            res.items[1][i][0] = 0;
          }
          this.y_data.push(res.items[1][i][0]);
          this.y_data2.push(res.items[1][i][1]);
          this.num_data.push(i);
        }
        this.setEcharts();
        this.loading.echarts = false;
      });
    },
    initEcharts() {
      this.myChart = $echarts.init(document.getElementById("trendEcharts"));
      this.myChart ?  this.myChart.clear() : "";
      var option = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,0.9)",
          textStyle: {
            color: "#666",
            fontSize: "14px"
          },
          extraCssText:
            "width:180px;height:110px;padding:0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);"
        },
        textStyle: {
          color: "#999"
        },
        color: ["#4fa8f9", "#6ec71e"],
        legend: {
          left: "center",
          bottom: 8,
          itemWidth: 4,
          itemHeight: 10,
          //   selectedMode: false, //取消图例上的点击事件
          textStyle: {
            padding: [0, 0, 0, 12]
          },
          data: []
        },
        grid: {
          left: "5%",
          right: "5%"
        },
        xAxis: 
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
        ,
        yAxis: 
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
        ,
        series: [
          {
            name: "",
            type: "line",
            areaStyle: {
              color: "rgb(79, 168, 249)",
              opacity: "0.2"
            },
            // lineStyle: {
            //   color: "rgb(79, 168, 249)"
            // },
            symbol: "circle",
            symbolSize: "5",
            data: []
          },
          {
            name: "",
            type: "line",
            areaStyle: {
              color: "#6ec71e",
              opacity: "0.2"
            },
            // lineStyle: {
            //   color: "rgb(79, 168, 249)"
            // },
            symbol: "circle",
            symbolSize: "5",
            data: []
          }
        ]
      };
      this.myChart.setOption(option);
      //echarts点击事件
      this.myChart.on("legendselectchanged", function(params) {
        var legend_option = this.getOption();
        var selectTotal = 0;
        var tem = Object.values(params.selected);
        for (var j = 0; j < tem.length; j++) {
          if (tem[j] === true) {
            selectTotal += 1;
          }
        }
        legend_option.tooltip[0].extraCssText =
          "width:220px;padding:0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);height:" +
          (40 + selectTotal * 35) +
          "px";
        this.setOption(legend_option);
      });
    },
    setEcharts() {
      var that = this;
      var xData = [];
      var inter_val = 1;
      if (Number(this.dateChosed) > -6) {
        inter_val = 2;
        xData = this.num_data.splice(0, 24);
      } else if (Number(this.dateChosed) == -6) {
        inter_val = 1;
        xData = this.x_data.splice(0, 7);
      } else {
        inter_val = 4;
        xData = this.x_data.splice(0, 30);
      }
      var arr = ["浏览量(PV)", "点击量(CV)"];
      that.myChart.setOption({
        xAxis: 
          {
            axisLabel: {
              interval: inter_val
            },
            data: xData
          }
        ,
        tooltip: {
          formatter: function(params) {
            var htmlStr = "";
            for (var i = 0; i < params.length; i++) {
              var tem = params[i].name;
              var val = params[i].value;
              if (tem.indexOf("/") < 0) {
                tem > 9
                  ? (tem = tem + ":00 - " + tem + ":59")
                  : (tem = "0" + tem + ":00 - " + "0" + tem + ":59");
              }
              val > 0 ? (val = val) : (val = "--");
              htmlStr +=
                '<div style="height:26px;line-height:26px;overflow:hidden;padding:6px 8px;">' +
                '<span style="float:left;max-width:160px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">' +
                '<span class="border_span" style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' +
                params[i].color +
                ';"></span>' +
                params[i].seriesName +
                "</span>" +
                '<span style="float:right">' +
                val +
                "</span>" +
                "</div>";
            }
            var res =
              '<div><div style="height:40px;line-height:40px;padding:0 8px;background:rgba(237,233,233,0.4)">' +
              tem +
              htmlStr +
              "</div></div>";
            return res;
          }
        },
        legend: {
          data: arr
        },
        series: [
          {
            name: arr[0],
            type: "line",
            data: that.y_data
          },
          {
            name: arr[1],
            type: "line",
            data: that.y_data2
          }
        ]
      });
    }
  },
  mounted() {
    this.getTrendData(this.$store.state.dateChosed);
    this.initEcharts();
    var that = this;
    window.onresize = function() {
      that.myChart ? that.myChart.resize() : "";
    };
  },
  computed: {
    dateChosed() {
      return this.$store.state.dateChosed;
    }
  },
  watch: {
    dateChosed(newV) {
       this.getTrendData(newV);
    }
}
 
};
</script>

<style>
</style>