<template>
  <div class="visit-analysis">
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
            </div>
          </div>
        </div>
      </template>
    </Header>
    <div class="content-box">
      <div class="visit-box">
        <el-table :data="tableData" style="width: 100%" stripe size="medium" v-loading="loading.table" @sort-change="changeSort">
          <el-table-column label="序号" width="80">
            <template slot-scope="scope"><span>{{scope.$index+(currentPage - 1) *size + 1}} </span></template>
          </el-table-column>
          <el-table-column label="受访页面">
            <template slot-scope="scope">
              <a :href="'//'+scope.row.website" target="_blank">{{scope.row.website}}</a>
            </template>
          </el-table-column>
          <el-table-column label="" align="center">
          </el-table-column>
          <el-table-column prop="amount" label="浏览量(pv)" align="center" sortable="custom" ref="sort">
          </el-table-column>
        </el-table>
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[ 10, 20, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total" :hide-on-single-page="false"></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../common/header";
import API from "../../api/api";
export default {
  name: "visit",
  components: { Header },
  data() {
    return {
      title: "访问分析",
      loading: {
        table: false
      },
      dateCur: "",
      tableData: [],
      order: "pv,desc",
      total: 10,
      size: 10,
      currentPage: 1
    };
  },
  methods: {
    choseDate(params) {
      this.$store.commit("setDateChosed", params);
      this.dateCur = this.$store.state.dateChosed;
      this.order="pv,desc";
      this.currentPage=1;
      this.getTableData();
      this.$refs.sort.columnConfig.order = '';
    },
    getTableData() {
      this.loading.table = true;
      var params = {
        page: this.currentPage,
        rows: this.size,
        date: this.dateCur,
        order: this.order
      };
      API.visitPage(params).then(rs => {
        console.log(rs);
        this.loading.table = false;
        this.total = rs.total;
        let arr = [];
        if (rs.items.length != 0) {
          rs.items[0].map((data, i) => {
            var obj = {};
            obj.website = data[0];
            obj.amount = rs.items[1][i][0];
            arr.push(obj);
          });
          this.tableData = arr;
        } else {
          this.tableData = [];
        }
      });
    },
    changeSort(params) {
      // console.log(params)
      let order = "";
      params.order === "ascending" ? (order = "asc") : (order = "desc");
      this.order = "pv" + "," + order;
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
    this.getTableData();
  }
};
</script>
<style  scoped>
</style>