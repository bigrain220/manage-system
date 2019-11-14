<template>
  <div class="content-header-wrapper" ref="fixBox">
    <div :class="{ 'content-header': true, 'head-fixed': isFixed }">
      <div class="header-container clearfix">
        <span class="header-text l">{{title}}</span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: { type: String }
  },
  data() {
    return {
      isFixed: false,
      height: "",
      once: true
    };
  },
  methods: {
    getFixed() {
        if (this.isFixed === true && this.once === true ) {
          document.querySelector('.content-header-wrapper').style.height = this.height + "px";
          this.once = false; //定位高度只需执行一次
        }
    },
    getHeight() {
        this.height = this.$refs.fixBox.offsetHeight;
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.getHeight();
    })
    // this.getHeight();
    this.$center.$on("isFixed", val => {
      this.$nextTick(()=>{
        this.isFixed = val;
        this.getFixed();
      })
    });
  },

};
</script>

<style lang="scss" scoped>
.content-header {
  width: 100%;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #d2d3d4;
  padding: 12px 0;
}

.header-container {
  line-height: 16px;
}

.header-container .header-text {
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  margin-left: 20px;
}

.header-container .header-data {
  margin-left: 3px;
  font-size: 14px;
}

.head-fixed.content-header {
  position: fixed;
  top: 0;
  z-index: 999;
}
</style>