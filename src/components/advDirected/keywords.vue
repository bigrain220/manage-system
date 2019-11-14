<template>
  <div class="keywords">
    <Header :title="title"></Header>
    <div class="content-box">
      <div class="keywords-box">
        <h4 class="title">关键词</h4>
        <!-- <el-button type="primary" size="mini" class="add-btn" @click="addInput">添加词库</el-button> -->
        <div class="input-box">
          <el-input :maxlength="20" :popper-class="`cname${inputIndex} cname`" v-model="itemsData[inputIndex]" size="small" placeholder="" :class="`iname${inputIndex} iname`" v-for="(inputItem, inputIndex) in itemsData" :key="inputIndex">
          </el-input>
        </div>
        <h4 class="title">描述</h4>
        <div class="input-box">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="descriptionVal" maxlength="100" show-word-limit @keydown.native="listen($event)">
          </el-input>
        </div>
        <div class="btn-box">
          <el-button type="primary" size="medium">保存</el-button>
          <el-button type="success" size="medium">重置</el-button>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import Header from "../common/header";
export default {
  name: "Keywords",
  components: { Header },
  data() {
    return {
      title: "设置关键字",
      itemsData: [],
      descriptionVal: ""
    };
  },
  methods: {
    init() {
      var data = [
        ["保温管"],
        ["聚氨酯直埋保温钢管"],
        ["聚氨酯发泡保温钢管"],
        ["聚氨酯预制保温管"],
        ["黑黄夹克保温管"],
        ["聚氨酯泡沫黄夹克"],
        ["塑套钢保温管"],
        ["直埋夹套管"]
      ];
      data.map((item, index) => {
        this.$set(this.itemsData, index, item[0]);
      });
      this.itemsData = this.initArr(this.itemsData);
    },
    initArr(params) {
      var arr = [];
      if (params.length < 50) {
        for (var i = 0; i < 50 - params.length; i++) {
          arr.push("");
        }
      }
      return params.concat(arr);
    },
    addInput() {
      this.itemsData.push("");
    },
    listen(event) {
      if (event.keyCode === 13) {
        event.preventDefault(); // 阻止浏览器默认换行操作
        return false;
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="scss" scoped>
.el-input.iname {
  width: auto;
  margin: 0 4px 4px 0;
}
.keywords-box {
  position: relative;
  width: 100%;
  background: #fff;
  .title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    margin-bottom: 30px;
    font-size: 14px;
    color: #303133;
    background: #eef1f6;
  }
  .input-box {
    padding: 0 10px;
    margin-bottom: 30px;
    min-height: 200px;
  }
  .add-btn {
    position: absolute;
    right: 10px;
    top: 4px;
  }
  .btn-box {
    display: flex;
    justify-content: center;
    padding-bottom: 30px;
    .el-button {
      width: 160px;
      margin-right: 20px;
    }
  }
}
</style>
<style>
.keywords-box .el-textarea__inner {
  max-height: 200px;
}
</style>