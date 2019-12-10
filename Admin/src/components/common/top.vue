<template>
  <div id="top">
      <div class="top-left">
          <span>广告投放后台</span>
      </div>
    <div class="top-right">
      <el-dropdown>
        <span class="el-dropdown-link">下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>1</el-dropdown-item>
          <el-dropdown-item>2</el-dropdown-item>
          <el-dropdown-item>3</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Top",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
#top {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #0173b2;
  overflow: hidden;
  z-index: 999;
  .top-left{
      float: left;
      margin-left: 20px;
      span{
          color:#fff;
          font-size: 18px;
          font-weight: bold;
      }
  }
  .top-right{
    float: right;
    margin-right: 40px;
    *{
        color:#fff!important;
    }
  }
}
</style>