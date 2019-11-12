<template>
  <div>
    <el-button type="primary">创建物料</el-button>
    
   
  </div>
</template>

<script>
import { sessionAPI } from "../api/api";
import  utils  from "../utils/utils";
export default {
  name: "Index",
  data() {
    return {
    

    };
  },
  methods: {
    
    
   
    
  },
  created(){
    //  utils.getCookie("session_val")==""?this.hasToken=false:this.hasToken=true;
  }
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>


</style>
