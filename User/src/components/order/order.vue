<template>
  <div>
    <Header :title="title"></Header>
    <div class="content-box">
      <div class="order-box">
        <el-form :inline="true" :model="searchForm" class="search-form" size="medium">
          <el-form-item label="订单号:" label-width="60px">
            <el-input v-model="searchForm.order" :maxlength="30" placeholder="请输入订单号" clearable style="width:230px;"></el-input>
          </el-form-item>
          <el-form-item label="类型:" label-width="50px">
            <el-select v-model="searchForm.tid" placeholder="请选择类型" style="width:120px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="投放" :value="1"></el-option>
              <el-option label="退款" :value="2"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item>
            <el-date-picker v-model="dateRange" unlink-panels type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="dateChange">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="状态:" label-width="50px">
            <el-select v-model="searchForm.status" placeholder="请选择状态" style="width:120px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="待付款" :value="1"></el-option>
              <el-option label="已完成" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search(true)" style="margin-left:20px;">查询</el-button>
            <el-button type="success" @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%;" stripe>
          <el-table-column label="订单号" prop="order_no" width="240">
          </el-table-column>
          <el-table-column label="类型">
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
          <el-table-column label="总费用">
            <template slot-scope="scope">
              <span>{{scope.row.price}} </span>
            </template>
          </el-table-column>
           <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.create_time | getLocalTime}} </span>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="comment">
          </el-table-column>
          <el-table-column label="状态" align="center" width="120">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status==1?'':scope.row.status==2?'success':'danger'">{{ scope.row.status|statusFilter }}</el-tag>
              <!-- <span :class="[scope.row.status==2?'status-pass':scope.row.status==3?'status-fail':'']">{{ scope.row.status|statusFilter }}</span> -->
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[ 10, 20, 50,100]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total" :hide-on-single-page="true"></el-pagination>
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
  name: "Order",
  components: { Header },
  data() {
    return {
      title: "我的订单",
      searchForm: {
        order: "",
        tid: "",
        start_time:"",
        end_time:"",
        status: ""
      },
      dateRange:"",
      tableData: [],
      total: 10,
      size: 10,
      currentPage: 1
    };
  },
  methods: {
    search(isbtn) {
      if (isbtn === true) {
        this.currentPage = 1;
      }
      var params = {};
      this.searchForm.order ? (params.order_no = this.searchForm.order) : "";
      this.dateRange.length ==2 ? (params.start_time = this.searchForm.start_time) : "";
      this.dateRange.length ==2 ? (params.end_time = this.searchForm.end_time) : "";
      this.searchForm.status !== ""
        ? (params.status = this.searchForm.status)
        : "";
      this.searchForm.tid !== "" ? (params.tid = this.searchForm.tid) : "";
      params.page = this.currentPage;
      params.rows = this.size;
      // console.log(params);
      this.getOrderList(params);
    },
    resetSearch() {
      this.searchForm = {
        order: "",
        tid: "",
        start_time:"",
        end_time:"",
        status: ""
      };
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
    getOrderList(params) {
      API.orderList(params).then(rs => {
        // console.log(rs);
        this.total = rs.total;
        this.tableData = rs.rows;
      });
    },
    handleSizeChange(val) {
      this.size = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    }
  },
  mounted() {
    this.getOrderList({ page: this.currentPage, rows: this.size });
  },
  filters: {
    statusFilter: function(value) {
      switch (value) {
        case 1:
          return "待付款";
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
  background: #fff;
  padding: 0 10px;
  overflow: hidden;
  min-height: 400px;
  .search-form {
    margin-top: 20px;
    // margin-bottom: 26px;
    // height: 40px;
     /deep/ .el-date-editor .el-range-separator{padding: 0;}
  }
  .status-fail {
    color: red;
  }
  .status-pass {
    color: green;
  }
}
</style>
