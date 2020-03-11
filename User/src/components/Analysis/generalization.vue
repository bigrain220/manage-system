<template>
  <div class="generalization-analysis">
    <Header :title="title" :dateRange="dateRange">
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
            </div>
          </div>
        </div>
      </template>
    </Header>
    <div class="content-box">
      <div class="generalization-box">
        <div class="generalization-start">
          <div class="start-title">今日流量</div>
          <table class="table">
            <tbody>
              <tr>
                <th></th>
                <th>
                  <div>浏览量(PV)</div>
                </th>
                <th>
                  <div>点击量(CV)</div>
                </th>
              </tr>
              <tr v-for="(item,index) in startData" :key="index">
                <td class="index-title" v-if="index === 0">今日</td>
                <td class="index-title" v-else-if="index === 1">昨日</td>
                <td class="index-title" v-else-if="index === 2">总计</td>
                <td class="number">{{item[0]}}</td>
                <td class="number">{{item[1]}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <trend-echarts @dateRangeEvent=dateRangeEvent></trend-echarts>
        <div class="row">
          <div class="row-item">
            <div class="title">Top10搜索词<span class="el-icon-right" @click="toDetailPage('sources')"></span></div>
            <el-table :data="wordTableData" style="width: 100%" size="mini" v-loading="loading.wordTableLoading">
              <el-table-column label="搜索词">
                <template slot-scope="scope">
                  <a :href="'//www.baidu.com/s?wd='+scope.row.word" target="_blank">{{scope.row.word}}</a>
                </template>
              </el-table-column>
              <el-table-column prop="amout" label="浏览量(PV)" width="100" align="right">
              </el-table-column>
              <el-table-column prop="percent" label="占比" width="90">
              </el-table-column>
            </el-table>
          </div>
          <div class="row-item">
            <div class="title">Top10受访页面<span class="el-icon-right" @click="toDetailPage('visit')"></span></div>
            <el-table :data="pageTableData" style="width: 100%" size="mini" v-loading="loading.pageTableLoading">
              <el-table-column label="受访页面">
                <template slot-scope="scope">
                  <a :href="'//'+scope.row.page" target="_blank">{{scope.row.page}}</a>
                </template>
              </el-table-column>
              <el-table-column prop="amout" label="浏览量(PV)" width="100" align="right">
              </el-table-column>
              <el-table-column prop="percent" label="占比" width="90">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../common/header";
import trendEcharts from "../common/trendEcharts";
import API from "../../api/api";
export default {
  name: "generalization",
  components: { Header, trendEcharts },
  data() {
    return {
      title: "流量概况",
      dateRange:"",
      loading: {
        wordTableLoading: false,
        pageTableLoading: false
      },
      dateCur: "",
      wordTableData: [],
      pageTableData: [],
      startData: [],
      testTableData: Array(10).fill({
        word: "壁纸十大品牌",
        amout: "6",
        percent: "33.33%"
      })
    };
  },
  methods: {
    choseDate(params) {
      this.$store.commit("setDateChosed", params);
      this.dateCur = this.$store.state.dateChosed;
      this.getWordTableData();
      this.getPageTableData();
    },
    getStartData() {
      API.overviewStart({}).then(rs => {
        this.startData = rs;
      });
    },
    getWordTableData() {
      this.loading.wordTableLoading = true;
      API.overviewWord({ date: this.dateCur }).then(rs => {
        // console.log(rs);
        var arr = [];
        rs.items[0].map((item, index) => {
          var obj = {};
          obj.word = item[0];
          obj.amout = rs.items[1][index][0];
          obj.percent = rs.items[1][index][1];
          arr.push(obj);
        });
        // console.log(arr)
        this.wordTableData = arr;
        this.loading.wordTableLoading = false;
      });
    },
    getPageTableData() {
      this.loading.pageTableLoading = true;
      API.overviewPage({ date: this.dateCur }).then(rs => {
        var arr = [];
        rs.items[0].map((item, index) => {
          var obj = {};
          obj.page = item[0];
          obj.amout = rs.items[1][index][0];
          obj.percent = rs.items[1][index][1];
          arr.push(obj);
        });
        this.pageTableData = arr;
        this.loading.pageTableLoading = false;
      });
    },
    toDetailPage(params) {
      this.$router.push("/user/" + this.$route.params.id + "/" + params);
    },
    dateRangeEvent(val){
      this.dateRange = "( "+val+" )";
    }
  },
  mounted() {
    this.dateCur = this.$store.state.dateChosed;
    this.getStartData();
    this.getWordTableData();
    this.getPageTableData();
  }
};
</script>

<style lang="scss" scoped>
.generalization-box {
  width: 100%;
  .generalization-start {
    background: #fff;
    height: 200px;
    // border: 1px solid #e1e2e2;
    border-bottom: 1px dashed #eee;
    .start-title {
      padding: 14px 15px 0;
      font-size: 14px;
      color: #323437;
      font-weight: 700;
      margin-bottom: 20px;
    }
    .table {
      width: 60%;
      font-size: 12px;
      tr {
        height: 30px;
      }
      tr:nth-of-type(2) .number {
        font-weight: bold;
        font-size: 16px;
      }
      th {
        font-weight: normal;
        text-align: right;
        padding-right: 20px;
      }
      .index-title {
        padding-left: 15px;
      }
      .number {
        text-align: right;
        padding-right: 20px;
        border-left: 1px solid #eee;
        border-right: 1px solid #eee;
      }
    }
  }
  .row {
    display: flex;
    justify-content: space-between;
    .row-item {
      width: 49%;
      padding: 20px;
      margin-top: 1px;
      background-color: #fff;
      height: 400px;
      // border: 1px solid #e1e2e2;
      border-radius: 2px;
      margin-bottom: 24px;
      position: relative;
      .title {
        color: #323437;
        font-weight: 700;
        font-size: 14px;
        margin-bottom: 12px;
        span {
          float: right;
          font-size: 18px;
          cursor: pointer;
          color: #999;
          transition: all 0.5s;
          &:hover {
            color: #1276e5;
            transform: scale(1.2);
            -ms-transform: scale(1.2); /* IE 9 */
            -moz-transform: scale(1.2); /* Firefox */
            -o-transform: scale(1.2);
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.generalization-box {
  .row {
    .row-item {
      .el-table thead th {
        font-weight: normal !important;
      }
      .el-table th {
        background: #fff !important;
      }
      .el-table td,
      .el-table th {
        border-bottom: 0 !important;
        padding: 4px 0;
      }
      .el-table::before {
        height: 0;
      }
      .el-table .el-table__body .cell {
        color: #333;
      }
      .el-table__empty-text {
        width: 100%;
        text-align: left;
        font-weight: bold;
        font-size: 18px;
        text-indent: 6px;
      }
    }
  }
}
</style>