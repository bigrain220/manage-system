<template>
  <div class="advertise-config">
    <Header :title="title">
      <template>
        <div id="filters">
          <div class="control-bar-wrapper clearfix">
            <div class="control-bar l">
              <span class="l time">访问属性：</span>
              <div class="l select-bar clearfix" id="select-bar">
                <span :class="['trackable',selectCur==='adunit'?'cur':'']" @click="choseSelect('adunit')">广告单元</span>
                <span class="seprator"></span>
                <span :class="['trackable',selectCur==='adsize'?'cur':'']" @click="choseSelect('adsize')">广告尺寸</span>
                <span class="seprator"></span>
                <span :class="['trackable',selectCur==='adtype'?'cur':'']" @click="choseSelect('adtype')">广告类型</span>
                <span class="seprator"></span>
                <span :class="['trackable',selectCur==='adstyle'?'cur':'']" @click="choseSelect('adstyle')">广告样式</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Header>
    <div class="content-box">
      <div class="advertise-config-box">
        <h4 class="title">{{selectCur| optionsFilter}}</h4>
        <el-button type="primary" size="medium " class="add-btn">新增</el-button>
        <table-options :options="selectCur"></table-options>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../common/header";
import tableOptions from "../common/tableOptions";
export default {
  name: "advertiseConfig",
  components: { Header,tableOptions },
  data() {
    return {
      title: "广告配置",
      selectCur: "adunit",
    };
  },
  methods: {
    choseSelect(params) {
      this.selectCur = params;
    }
  },
  mounted() {},
  filters: {
    optionsFilter: function(value) {
      switch (value) {
        case "adunit":
          return "广告单元";
          break;
        case "adsize":
          return "广告尺寸";
          break;
        case "adtype":
          return "广告类型";
          break;
        case "adstyle":
          return "广告样式";
          break;
        default:
          return value;
          break;
      }
    }
  }
};
</script>
<style  lang='scss' scoped>
$text-color: #323437; // filters文字颜色
#filters .control-bar-wrapper {
  position: relative;
  padding-top: 20px;
  padding-bottom: 5px;
  z-index: 2;
  color: $text-color;
  .control-bar {
    color: $text-color;
    .time {
      margin-left: 30px;
      display: inline-block;
      height: 30px;
      padding-right: 5px;
      line-height: 30px;
      color: #787a7d;
    }
  }
}
.select-bar {
  border: 1px solid #e1e3e4;
  border-radius: 4px;
}
.control-bar-wrapper .control-bar .select-bar .trackable {
  float: left;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  color: $text-color;
  background-color: #fff;
  cursor: pointer;
}
.control-bar-wrapper .control-bar .select-bar .trackable:not(.cur):hover {
  background: #f2f3f4;
}
.control-bar-wrapper .control-bar .select-bar .trackable:first-child {
  border-radius: 4px 0 0 4px;
  left: -1px;
}
.control-bar-wrapper .control-bar .select-bar .trackable:last-child {
  border-radius: 0 4px 4px 0;
}
.control-bar-wrapper .control-bar .select-bar .cur {
  position: relative;
  bottom: -1px;
  margin-top: -2px;
  padding-top: 1px;
  height: 31px;
  background-color: #4da7fd;
  color: #fff;
}
.advertise-config-box {
  position: relative;
  background: #fff;
  width: 100%;
  .title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    margin-bottom: 30px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
  .add-btn {
    position: absolute;
    right: 15px;
    top: 4px;
    padding: 10px 30px;
  }
}
</style>