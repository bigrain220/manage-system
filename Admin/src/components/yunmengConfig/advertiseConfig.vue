<template>
  <div class="advertise-config">
    <Header :title="title">
      <template>
        <div id="filters">
          <div class="control-bar-wrapper clearfix">
            <div class="control-bar l">
              <span class="l time">访问属性：</span>
              <div class="l select-bar clearfix" id="select-bar">
                <span :class="['trackable',selectCur==='adtype'?'cur':'']" @click="choseSelect('adtype')">广告类型</span>
                <span class="seprator"></span>
                <span :class="['trackable',selectCur==='adsize'?'cur':'']" @click="choseSelect('adsize')">广告尺寸</span>
                <span class="seprator"></span>
                <span :class="['trackable',selectCur==='adstyle'?'cur':'']" @click="choseSelect('adstyle')">广告样式</span>
                <span class="seprator"></span>
                <span :class="['trackable',selectCur==='adunit'?'cur':'']" @click="choseSelect('adunit')">广告单元</span>

              </div>
            </div>
          </div>
        </div>
      </template>
    </Header>
    <div class="content-box">
      <div class="advertise-config-box">
        <table-page :options="selectCur"></table-page>
        <!-- <table-options :options="selectCur"></table-options> -->
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../common/header";
import tablePage from "../common/tablePage";
import tableOptions from "../common/tableOptions";
export default {
  name: "advertiseConfig",
  components: { Header, tableOptions, tablePage },
  data() {
    return {
      title: "广告配置",
      selectCur: "adtype"
    };
  },
  methods: {
    choseSelect(params) {
      this.selectCur = params;
    }
  },
  mounted() {}
};
</script>
<style  lang='scss' scoped>
.advertise-config-box {
  position: relative;
  background: #fff;
  padding: 0 10px 10px 10px;
  overflow: hidden;
  min-height: 400px;
}
</style>