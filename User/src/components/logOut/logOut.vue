<template>
  
</template>

<script>
import API from "../../api/api"
export default {
    name:"logOut",
    data(){
        return{

        }
    },
    methods:{

    },
    created(){
       API.logOut({}).then(rs => {
        if (rs) {
          this.$message.warning("已退出，请重新登录");
           this.$router.push({ path: "/login" });
        }
      });
    }
}
</script>

<style lang="scss" scoped>

</style>