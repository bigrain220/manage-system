<template>
    <div v-if="btnFlag" class="go-top el-icon-caret-top" @click="backTop"></div>
</template>
<script>
export default {
  name: "toTop",
  data(){
      return{
        btnFlag:false
      }
  },
  methods: {
       backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop =
          document.documentElement.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
    scrollToTop() {
      const that = this;
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 160) {
      	that.btnFlag = true;
      } else {
      	that.btnFlag = false;
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  beforeDestory() {
    window.removeEventListener("scroll", this.scrollToTop);
  }
};
</script>
<style  scoped>
#content {
  margin-left: 200px;
}
.go-top {
  position: fixed;
  right: 20px;
  bottom: 40px;
  cursor: pointer;
  font-size: 22px;
  background-color: #fff;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  color: #409eff;
  text-align: center;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
}
.go-top:hover {
  background: rgba(0, 0, 0, 0.12);
}
</style>