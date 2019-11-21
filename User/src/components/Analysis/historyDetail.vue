<template>
<div class="history-detail">
    <Header :title="title"></Header>
    <div class="content-box">
      






    </div>
  </div>
</template>
<script>
import Header from "../common/header";
export default {
  name: "historyDetail",
  components: { Header },
  data(){
      return{
        title:"历史详情"
      }
  },
  methods: {

  }
};
</script>
<style  scoped>


</style>