<template>
<div class="visit-analysis">
    <Header :title="title"></Header>
    <div class="content-box">
      






    </div>
  </div>
</template>
<script>
import Header from "../common/header";
export default {
  name: "visit",
  components: { Header },
  data(){
      return{
        title:"访问分析"
      }
  },
  methods: {

  }
};
</script>
<style  scoped>


</style>