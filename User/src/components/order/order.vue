<template>
  <div>
    <Header :title="title"></Header>
    <div class="content-box">
      <div class="order-box">
        <el-form :inline="true" :model="searchForm" class="search-form" label-width="60px" size="medium">
          <el-form-item label="订单号:">
            <el-input v-model="searchForm.order" :maxlength="30" placeholder="请输入订单号" clearable style="width:230px;"></el-input>
          </el-form-item>
          <el-form-item label="状态:">
            <el-select v-model="searchForm.status" placeholder="请选择状态" style="width:140px;">
              <el-option label="全部" value=""></el-option>
              <!-- <el-option label="处理" :value="0"></el-option> -->
              <el-option label="待付" :value="1"></el-option>
              <el-option label="已付" :value="2"></el-option>
              <el-option label="退款" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search(true)">查询</el-button>
            <el-button type="success" @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%;" stripe>
          <el-table-column label="订单号" prop="order_no" width="240">
          </el-table-column>
          <el-table-column label="广告ID" prop="mid">
          </el-table-column>
          <el-table-column label="投放时间">
            <template slot-scope="scope">
              <span>{{scope.row.day}} </span>天
            </template>
          </el-table-column>
          <el-table-column label="投放总数" prop="num">
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
          <el-table-column label="创建时间" width="180">
            <template slot-scope="scope">
              <span>{{scope.row.create_time | getLocalTime}} </span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status==1?'':scope.row.status==2?'success':'danger'">{{ scope.row.status|statusFilter }}</el-tag>
              <!-- <span :class="[scope.row.status==2?'status-pass':scope.row.status==3?'status-fail':'']">{{ scope.row.status|statusFilter }}</span> -->
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="comment" width="220">
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[ 10, 20, 50,100]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total" :hide-on-single-page="true"></el-pagination>
      </div>

    </div>
  </div>
</template>
<script>
import Header from "../common/header";
import API from "../../api/api";
import "../../utils/filters";
export default {
  name: "Order",
  components: { Header },
  data() {
    return {
      title: "我的订单",
      searchForm: {
        order: "",
        status: ""
      },
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
      this.searchForm.status !== ""
        ? (params.status = this.searchForm.status)
        : "";
      params.page = this.currentPage;
      params.rows = this.size;
      console.log(params);
      this.getOrderList(params);
    },
    resetSearch() {
      this.searchForm = {
        order: "",
        status: ""
      };
      this.currentPage = 1;
      this.size = 10;
      this.search();
    },
    getOrderList(params) {
      API.orderList(params).then(rs => {
        console.log(rs);
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
          return "待付";
          break;
        case 2:
          return "已付";
          break;
        case 3:
          return "退款";
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
  .search-form {
    margin-top: 20px;
    margin-bottom: 26px;
    height: 40px;
  }
  .status-fail {
    color: red;
  }
  .status-pass {
    color: green;
  }
}
</style>