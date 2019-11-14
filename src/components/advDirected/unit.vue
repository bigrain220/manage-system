<template>
  <div>
    <Header :title="title"></Header>
    <div class="content-box">
      <div class="unit-box">
        <el-form :inline="true" :model="formInline" class="search-form" label-width="60px" size="medium ">
          <el-form-item label="物料:">
            <el-select v-model="formInline.material" placeholder="">
              <el-option label="全部" value="0"></el-option>
              <el-option label="南方网通" value="1"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="状态:">
            <el-select v-model="formInline.status" placeholder="">
              <el-option label="全部" value="0"></el-option>
              <el-option label="待投放" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search"  @click="search">查询</el-button>
            <el-button type="success">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import Header from "../common/header";
export default {
  name: "unit",
  components: { Header },
  data() {
    return {
      title: "单元管理",
      formInline:{
        material:"0",
        status:"0"
      }
    };
  },
  methods: {
    search(){
      console.log(this.formInline)
    }
  }
};
</script>

<style lang="scss" scoped>
.unit-box{
  background: #fff;
  padding: 0 10px;
  overflow: hidden;
  .search-form{
      margin-top: 20px;
  }
}
</style>