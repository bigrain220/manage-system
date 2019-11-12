<template>
<div class="directed">
    <Header :title="title"></Header>
    <div class="content-box">
      <el-button type="primary">创建物料</el-button>






    </div>
  </div>
</template>
<script>
import Header from "./common/header";
export default {
  name: "Directed",
  components: { Header },
  data(){
      return{
        title:"投放报表"
      }
  },
  methods: {

  }
};
</script>
<style  scoped>


</style>