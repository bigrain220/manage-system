<template>
  <div id="main">
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
export default {
  name: "Home",
  components: {  leftNav },
  methods: {},

};
</script>
<style  scoped>
#content{margin-left: 200px;}
</style>