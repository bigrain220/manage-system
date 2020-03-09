<template>
  <div class="order">
    <Header :title="title"></Header>
    <div class="content-box">
      <div class="order-box">
        <el-form :inline="true" :model="searchForm" class="search-form" label-width="60px" size="medium">
          <el-form-item label="">
            <el-input placeholder="请输入查找内容" v-model="searchForm.value" class="input-with-select" @keydown.enter.native="search(true)" clearable>
              <el-select v-model="searchForm.name" slot="prepend">
                <el-option label="用户名" value="username"></el-option>
                <el-option label="用户ID" value="uid"></el-option>
                <el-option label="订单号" value="order_no"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item label="类型:" class="tid">
            <el-select v-model="searchForm.tid" placeholder="">
              <el-option label="全部" value=""></el-option>
              <el-option label="投放" value="1"></el-option>
              <el-option label="退款" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="dateRange" unlink-panels type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="dateChange">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="状态:" class="status">
            <el-select v-model="searchForm.status" placeholder="">
              <el-option label="全部" value=""></el-option>
              <el-option label="待付款" value="1"></el-option>
              <el-option label="已完成" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search(true)">查询</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%" stripe>
          <el-table-column label="序号" width="50">
            <template slot-scope="scope"><span>{{scope.$index+(currentPage - 1) *size + 1}} </span></template>
          </el-table-column>
          <el-table-column label="UID" prop="uid" width="100" align="center">
          </el-table-column>
          <el-table-column label="订单号" prop="order_no" width="220" align="center">
          </el-table-column>
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.tid==1">投放</span>
              <span v-else-if="scope.row.tid==2">退款</span>
              <span v-else>{{scope.row.tid}}</span>
            </template>
          </el-table-column>
          <el-table-column label="币种" prop="cid">
            <template slot-scope="scope">
              <span v-if="scope.row.cid==19">推广币</span>
              <span v-else-if="scope.row.cid==22">云币</span>
              <span v-else-if="scope.row.cid==23">通币</span>
            </template>
          </el-table-column>
          <el-table-column label="总费用" prop="price" align="center">
          </el-table-column>
          <el-table-column label="创建时间" width="180" align="center">
            <template slot-scope="scope">{{ scope.row.create_time|timeFilter }}</template>
          </el-table-column>
          <el-table-column min-width="50">
          </el-table-column>
          <el-table-column label="备注" prop="comment" min-width="180">
          </el-table-column>
          <el-table-column label="状态" width="80" align="center">
            <template slot-scope="scope"><span :class="[scope.row.status==2?'status-pass':scope.row.status==1?'status-fail':'']">{{ scope.row.status|statusFilter }}</span></template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[ 10,20, 50, 100]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total" :hide-on-single-page="true"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../common/header";
import API from "../../api/api";
import "../../utils/filters";
import  utils from "../../utils/utils";
export default {
  name: "order",
  components: { Header },
  data() {
    return {
      title: "订单列表",
      total: 10,
      size: 10,
      currentPage: 1,
      searchForm: {
        name: "username",
        value: "",
        tid: "",
        start_time:"",
        end_time:"",
        status: ""
      },
      tableData: [],
      dateRange:""
    };
  },
  methods: {
    search(isbtn) {
      if (isbtn === true) {
        this.currentPage = 1;
      }
      var params = {};
      this.searchForm.value
        ? (params[this.searchForm.name] = this.searchForm.value)
        : "";
      this.searchForm.tid ? (params.tid = this.searchForm.tid) : "";
      this.dateRange.length ==2 ? (params.start_time = this.searchForm.start_time) : "";
      this.dateRange.length ==2 ? (params.end_time = this.searchForm.end_time) : "";
      this.searchForm.status ? (params.status = this.searchForm.status) : "";
      params.page = this.currentPage;
      params.rows = this.size;
      //   console.log(params);
      this.getOrderList(params);
    },
    resetSearch() {
      this.searchForm = { name: "username", value: "", tid: "",start_time:"",end_time:"", status: "" };
      this.dateRange="";
      this.currentPage = 1;
      this.size = 10;
      this.search();
    },
    dateChange(params) {
      // console.log(params, this.dateRange);
      this.searchForm.start_time= utils.getLocalTime(this.dateRange[0].getTime()).slice(0,10);
      this.searchForm.end_time= utils.getLocalTime(this.dateRange[1].getTime()).slice(0,10);
    },
    handleSizeChange(val) {
      this.size = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    },
    getOrderList(params) {
      API.orderList(params).then(res => {
        this.total = res.total;
        this.tableData = res.rows;
      });
    }
  },
  mounted() {
    this.getOrderList({ page: this.currentPage, rows: this.size });
  },
  filters: {
    statusFilter: function(value) {
      switch (value) {
        case 1:
          return "代付款";
          break;
        case 2:
          return "已完成";
          break;
        default:
          return value;
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.order-box {
  position: relative;
  background: #fff;
  padding: 0 10px 10px 10px;
  overflow: hidden;
  min-height: 400px;
  .status-fail {
    color: red;
  }
  .status-pass {
    color: green;
  }
}
</style>
<style lang="scss">
.order-box {
  .search-form {
    margin-top: 20px;
    .input-with-select .el-input-group__prepend .el-select {
      width: 100px;
    }
    .el-date-editor .el-range-separator{padding: 0;}
    .tid,
    .status {
      .el-form-item__content {
        width: 140px;
      }
    }
  }
}
</style>