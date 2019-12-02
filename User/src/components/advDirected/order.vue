<template>
  <div>
    <Header :title="title"></Header>
    <div class="content-box">
      <div class="order-box">
        <el-form :inline="true" :model="searchForm" class="search-form" label-width="60px" size="medium">
          <el-form-item label="订单号:">
            <el-input v-model="searchForm.order" :maxlength="12" placeholder="请输入订单号" clearable></el-input>
          </el-form-item>
          <el-form-item label="状态:">
            <el-select v-model="searchForm.status" placeholder="请选择状态" style="width:140px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="处理" :value="0"></el-option>
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
      </div>

    </div>
  </div>
</template>
<script>
import Header from "../common/header";
export default {
  name: "Order",
  components: { Header },
  data() {
    return {
      title: "我的订单",
      searchForm:{
          order:null,
          status:""
      }
    };
  },
  methods: {
      search(){
          var params={};
          this.searchForm.order?params.order_no=this.searchForm.order:"";
          this.searchForm.status!==""?params.status=this.searchForm.status:"";
          console.log(params)
      },
      resetSearch(){
          this.searchForm={
             order:null,
             status:"" 
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
}
</style>