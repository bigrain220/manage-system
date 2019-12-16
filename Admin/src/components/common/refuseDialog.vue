<template>
  <el-dialog title='拒绝理由' :visible.sync="isShow" @closed="refuseDialogClose" class="refuse-dialog">
    <span>快捷语： </span>
    <el-radio-group v-model="radio" @change="radioChange">
      <el-radio label="非法内容">非法内容</el-radio>
      <el-radio label="内容侵权">内容侵权</el-radio>
      <el-radio label="图片模糊">图片模糊</el-radio>
      <el-radio label="图片重复">图片重复</el-radio>
    </el-radio-group>
    <div class="textarea-box">
      <el-input type="textarea" :maxlength="100" :rows="5" placeholder="请输入内容" v-model="textarea" @keydown.native="listen($event)">
      </el-input>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="isShow=false">取消</el-button>
      <el-button type="primary" size="mini" @click="refuseSure">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "refuseDialog",
  data() {
    return {
      isShow: true,
      radio: "",
      textarea: ""
    };
  },
  methods: {
    refuseDialogClose() {
      this.radio = "";
      this.textarea = "";
    },
    radioChange() {
      this.textarea = this.radio;
    },
    refuseSure() {
      this.$emit("refuseEvent", this.textarea);
      this.isShow = false;
    },
    listen(event) {
      if (event.keyCode === 13) {
        event.preventDefault(); // 阻止浏览器默认换行操作
        return false;
      }
    }
  },
  watch: {
    isShow(val) {
      this.$emit("mapEvent", val);
    }
  }
};
</script>
<style lang="scss">
.refuse-dialog {
  .el-dialog {
    min-width: 600px;
    .textarea-box {
      margin-top: 20px;
      textarea {
        resize: none;
      }
    }
  }
}
</style>