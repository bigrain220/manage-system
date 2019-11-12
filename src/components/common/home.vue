<template>
  <div id="main">
    <!-- <Header></Header> -->
    <leftNav></leftNav>
    <div class="content" id="content">
      <transition name="el-fade-in" mode="out-in" appear>
        <router-view></router-view>
      </transition>
    </div>

  </div>
</template>
<script>
import Header from "./header.vue";
import leftNav from "./leftNav.vue";
export default {
  name: "Home",
  components: { Header, leftNav },
  methods: {}
};
</script>
<style  scoped>
/* overflow-y:scroll */
#content{text-align:left;position:absolute;right:0;left:200px;top:60px;bottom:0;padding:0 20px;box-sizing:border-box;}

</style>