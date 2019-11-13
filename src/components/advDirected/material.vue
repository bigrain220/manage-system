<template>
  <div class="Material">
    <Header :title="title"></Header>
    <div class="content-box">
      <el-button type="primary">创建物料</el-button>






    </div>
  </div>
</template>

<script>
import { sessionAPI } from "../../api/api";
import utils from "../../utils/utils";
import Header from "../common/header";
export default {
  name: "Material",
  components: { Header },
  data() {
    return {
      title:"物料管理"
    };
  },
  methods: {},
  created() {
    //  utils.getCookie("session_val")==""?this.hasToken=false:this.hasToken=true;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>

</style>
