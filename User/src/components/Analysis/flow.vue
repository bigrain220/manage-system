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
                <a :class="['l',,'disabled',formatSelected==='2'?'selected':'']" href="javascript:void(0)">按周</a>
                <a :class="['l',,'disabled',formatSelected==='3'?'selected':'']" href="javascript:void(0)">按月</a>
              </div>
            </div>

          </div>
        </div>
      </template>
    </Header>
    <div class="content-box">
      <div class="flow-box">
        <h3 class="title">趋势图</h3>
        <div id="flowChart" style="width:100%;height:400px;background:#fff;" v-loading="loading.echarts"></div>
        <div class="table-title"></div>
        <el-table :data="tableData" style="width: 100%" stripe size="medium" v-loading="loading.table" @sort-change="changeSort" v-if="formatSelected==='0'" key="0">
          <el-table-column label="序号" type="index" width="80">
          </el-table-column>
          <el-table-column prop="tm" label="时间" sortable="custom" ref="dateSort">
          </el-table-column>
          <el-table-column label="" align="center">
          </el-table-column>
          <el-table-column prop="pv" label="浏览量(pv)" align="center" sortable="custom" ref="pvSort" width="200">
          </el-table-column>
          <el-table-column prop="cv" label="点击量(cv)" align="center" sortable="custom" ref="cvSort" width="200">
          </el-table-column>
        </el-table>
        <div v-if="formatSelected==='0'" style="height:56px;"></div>
        <el-table :data="tableData" style="width: 100%" stripe size="medium" v-loading="loading.table" @sort-change="changeSort" v-if="formatSelected==='1'" key="1">
          <el-table-column label="序号" width="80">
            <template slot-scope="scope"><span>{{scope.$index+(currentPage - 1) *size + 1}} </span></template>
          </el-table-column>
          <el-table-column prop="tm" label="时间" sortable="custom" ref="dateSort">
          </el-table-column>
          <el-table-column label="" align="center">
          </el-table-column>
          <el-table-column prop="pv" label="浏览量(pv)" align="center" sortable="custom" ref="pvSort" width="200">
          </el-table-column>
          <el-table-column prop="cv" label="点击量(cv)" align="center" sortable="custom" ref="cvSort" width="200">
          </el-table-column>
        </el-table>
        <el-pagination background v-if="formatSelected==='1'" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[ 10, 20, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total" :hide-on-single-page="false"></el-pagination>
      </div>
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
      loading: {
        echarts: false,
        table: false
      },
      dateCur: "",
      formatSelected: "0",
      num_data: [], //按时显示时的x轴数据
      x_data: [], //x轴数据
      y_data: [], //y轴数据
      y_data2: [], //y轴数据
      myChart: "",
      tableData: [],
      order: "tm,desc",
      total: 10,
      size: 10,
      currentPage: 1
    };
  },
  methods: {
    choseDate(params) {
      this.$store.commit("setDateChosed", params);
      this.dateCur = this.$store.state.dateChosed;
      this.getFlowData();
      this.order = "tm,desc";
      this.currentPage = 1;
      this.getTableData();
      this.$refs.dateSort.columnConfig.order = "";
      this.$refs.pvSort.columnConfig.order = "";
      this.$refs.cvSort.columnConfig.order = "";
    },
    choseFormat(params) {
      this.formatSelected = params;
      this.getFlowData();
      this.getTableData();
    },
    //echarts
    getFlowData() {
      this.loading.echarts = true;
      this.x_data = [];
      this.y_data = [];
      this.y_data2 = [];
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
          this.y_data2.push(res.items[1][i][1]);
          this.num_data.push(i);
        }
        this.setEcharts();
        this.loading.echarts = false;
      });
    },
    initEcharts() {
      this.myChart = $echarts.init(document.getElementById("flowChart"));
      this.myChart ? this.myChart.clear() : "";
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
          bottom: 0,
          itemWidth: 4,
          itemHeight: 10,
          // selectedMode: false, //取消图例上的点击事件
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
      if (that.formatSelected === "0") {
        xData = that.num_data;
      } else {
        if (that.dateCur == "-29") {
          inter_val = 4;
        }
        xData = that.x_data;
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
            // console.log(params[0])
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
            // type: "line",
            data: that.y_data
          },
          {
            name: arr[1],
            // type: "line",
            data: that.y_data2
          }
        ]
      });
    },
    //table
    getTableData() {
      this.loading.table = true;
      if (this.formatSelected === "0") {
        var params = {
          method: "a",
          date: this.dateCur,
          format: this.formatSelected,
          order: this.order
        };
      } else {
        var params = {
          method: "a",
          page: this.currentPage,
          rows: this.size,
          date: this.dateCur,
          format: this.formatSelected,
          order: this.order
        };
      }
      API.trendTime(params).then(rs => {
        console.log(rs);
        this.loading.table = false;
        this.total = rs.total;
        let arr = [];
        rs.items[0].map((data, i) => {
          var obj = {};
          obj.tm = data[0];
          obj.pv = rs.items[1][i][0];
          obj.cv = rs.items[1][i][1];
          arr.push(obj);
        });
        // console.log(arr);
        this.tableData = arr;
      });
    },
    changeSort(params) {
      let type = "";
      let order = "";
      params.order === "ascending" ? (order = "asc") : (order = "desc");
      type = params.prop;
      this.order = type + "," + order;
      this.getTableData();
    },
    handleSizeChange(val) {
      this.size = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
    }
  },
  mounted() {
    this.dateCur = this.$store.state.dateChosed;
    this.getFlowData();
    this.initEcharts();
    this.getTableData();
    var that = this;
    window.onresize = function() {
      that.myChart ? that.myChart.resize() : "";
    };
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
.flow-analysis {
  .content-box {
    .table-title {
      height: 24px;
      background: #fff;
    }
    .title {
      background: #fff;
      height: 42px;
      line-height: 42px;
      padding: 14px 15px 0;
      font-size: 14px;
      color: #323437;
      font-weight: 700;
    }
  }
}
</style>