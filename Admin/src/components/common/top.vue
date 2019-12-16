<template>
  <div id="top">
      <div class="top-left">
          <span>广告投放后台</span>
      </div>
    <div class="top-right">
      <el-link type="primary" @click="logout">安全退出</el-link>
    </div>
  </div>
</template>

<script>
import API from "../../api/api"
export default {
  name: "Top",
  data() {
    return {};
  },
  methods:{
    logout(){
      API.logOut({}).then(rs=>{
        this.$router.push({path:'/login'});
        this.$message.warning("已退出,请重新登录")
      })
    }
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