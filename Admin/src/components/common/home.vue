<template>
  <div id="main">
    <Top></Top>
    <leftNav></leftNav>
    <div class="content" id="content">
      <transition name="el-fade-in" mode="out-in" appear>
        <router-view></router-view>
      </transition>
    </div>

  </div>
</template>
<script>
import leftNav from "./leftNav.vue";
import Top from "./top.vue";
export default {
  name: "Home",
  components: {  leftNav ,Top},
  methods: {},

};
</script>
<style  scoped>
#content{margin-left: 180px;}
</style>