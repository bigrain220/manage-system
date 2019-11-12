<template>
  <div>
     <Header :title="title"></Header>
     <div class="content-box">
        <el-button type="primary">创建单元</el-button>
     </div>
    
  </div>
</template>

<script>
import Header from "./common/header";
export default {
  name: "Unit",
  components: { Header },
  data() {
    return {
      title:"单元管理"
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>

</style>