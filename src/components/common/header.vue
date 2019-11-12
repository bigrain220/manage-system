<template>
  <div id="header">
    <div class="content-header-wrapper">
      <div class="content-header">
        <div class="header-container clearfix">
          <span class="header-text l">{{text}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
        text:""
    };
  },
  methods: {},


};
</script>

<style lang="scss" scoped>
#header {
  position: absolute;
  box-sizing: border-box;
  height: 50px;
  line-height: 50px;
  color: #333;
  background: #fff;
  top: 0;
  right: 0;
  left: 200px;
  overflow: hidden;
  width: 100%;
}
#header .content-header{
    width: 100%;
    position: relative;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
    border-bottom: 1px solid #d2d3d4;
    padding: 12px 0;
    height: 50px;
    box-sizing: border-box;
}
.header-container .header-text{
    font-weight: 700;
    font-size: 14px;
    line-height: 25px;
    margin-left: 20px;
}
</style>