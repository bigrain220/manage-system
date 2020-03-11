<template>
  <div id="main">
    <leftNav></leftNav>
    <div class="content" id="content"  v-loading="initLoading"  element-loading-text="加载中...">
      <!-- <transition name="el-fade-in" mode="out-in" appear> -->
        <router-view></router-view>
      <!-- </transition> -->
      <to-top></to-top>
    </div>

  </div>
</template>
<script>
import leftNav from "./leftNav.vue";
export default {
  name: "Home",
  components: {  leftNav,toTop:()=>import("./toTop")},
  data(){
    return{

    }
  },
  methods: {
   
  },
  computed:{
    initLoading:function(){
      return this.$store.state.contentLoading
    }
  }


};
</script>

<style lang="scss" scoped>
#content{
  margin-left: 180px;
}
/deep/#content>.el-loading-mask .el-loading-spinner{top: 20vh;}
</style>