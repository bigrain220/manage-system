<template>
  <div id="main">
    <leftNav></leftNav>
    <div class="content" id="content">
      <div class="init-loading" v-if="initLoading">正在加载中...</div>
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
      initLoading:false
    }
  },
  methods: {},

};
</script>
<style  scoped>
#content{margin-left: 180px;}
</style>