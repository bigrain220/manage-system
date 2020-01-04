<template>
  <el-dialog title='退款理由' :visible.sync="isShow" @closed="refundDialogClose" class="refund-dialog">
    <div style="margin-bottom:14px;">快捷语： </div>
    <el-radio-group v-model="radio" @change="radioChange">
      <el-radio label="广告没有正常显示">广告没有正常显示</el-radio>
      <el-radio label="投放页面内容不合">投放页面内容不合</el-radio>
      <el-radio label="投放广告成本太高">投放广告成本太高</el-radio>
      <el-radio label="不想继续投放广告">不想继续投放广告</el-radio>
    </el-radio-group>
    <div class="textarea-box">
      <el-input type="textarea" :maxlength="100" :rows="5" placeholder="请输入内容" v-model="textarea" @keydown.native="listen($event)">
      </el-input>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="isShow=false">取消</el-button>
      <el-button type="primary" size="mini" @click="refundSure">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "refundDialog",
  data() {
    return {
      isShow: true,
      radio: "",
      textarea: ""
    };
  },
  methods: {
    refundDialogClose() {
      this.radio = "";
      this.textarea = "";
    },
    radioChange() {
      this.textarea = this.radio;
    },
    refundSure() {
      this.$emit("refundEvent", this.textarea);
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
.refund-dialog {
  .el-dialog {
    min-width: 600px;
    .el-radio{margin-bottom: 18px;}
    .textarea-box {
      margin-top: 0px;
      textarea {
        resize: none;
      }
    }
  }
}
</style>