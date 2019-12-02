<template>
<div class="sources-analysis">
    <Header :title="title"></Header>
    <div class="content-box">
      






    </div>
  </div>
</template>
<script>
import Header from "../common/header";
export default {
  name: "sources",
  components: { Header },
  data(){
      return{
        title:"来源分析"
      }
  },
  methods: {

  }
};
</script>
<style  scoped>


</style>