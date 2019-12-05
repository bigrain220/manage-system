<template>
  <div>
    <el-upload action="123" list-type="picture-card" :accept="'image/*'" :multiple="false" ref="addupload" :on-change="addhandlefileChange" :show-file-list="true" :auto-upload="false" :limit="1" :on-exceed="handleExceed" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <div style="height:24px;line-height:24px;font-size:14px;" v-show="name"><span style="font-size:12px;font-weight:bold;color:#333;">文件名：</span>{{name}}</div>
      <img :src="file.url" alt="" ref='imgWH' style="opacity:0;position:fixed;top:0;left:0;z-index:-10000">
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import API from "../../api/api";
export default {
  name: "imgUpload",
  props: {
    uploadProps: { type: Object }
  },
  data() {
    return {
      file: "",
      name: "",
      path: "",
      host: "",
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    getPreWH(URL) {
     var width=null;var height=null;
      let image = new Image();
      image.onload = function() {
         width = image.width;
         height = image.height;
      };
      image.src = URL;
      console.log(width,height)
    },
    addhandlefileChange(file, fileList) {
      //选择完文件后的状态
      console.log("change", file);
      //判断上传文件类型
      if (file.raw.type.indexOf("image/") < 0) {
        var isImage = false;
      } else {
        var isImage = true;
      }
      //判断上传文件大小
      const isLt2M = file.size / 1024 <= 300;

      if (!isImage) {
        this.$message.error("只能上传图片！");
        this.$refs.addupload.clearFiles();
        return false;
      } else if (!isLt2M) {
        this.$message.error("上传文件大小不能超过300kb");
        this.$refs.addupload.clearFiles();
        return false;
      } else {
        this.file = file;
        this.name = file.name.split(".")[0];
        // this.$refs.hahaForm.submit();
      }
    },
    handleExceed() {
      this.$message.error("一次只能选一个图片，请先删除之前的图片");
    },
    handleRemove() {
      this.name = "";
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadAction() {
      //验证图片宽高
       var imgWidth= this.$refs.imgWH.offsetWidth;
       var imgHeight = this.$refs.imgWH.offsetHeight;
      if(imgWidth !=this.uploadProps.width || imgHeight != this.uploadProps.height){
         this.$message.warning("请选择尺寸为: "+this.uploadProps.width+"*"+this.uploadProps.height+" 的图片");
         return false;
      }else if (this.name) {
        let params = new FormData();
        params.append("title", this.name);
        params.append("cid", "");
        params.append("Filedata", this.file.raw);
        var URL = this.host;
        axios
          .post(URL, params, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then(res => {
            console.log(res, "666");
            if (res.data.error === 0) {
              this.$message.success("文件上传成功!");
              this.path = res.data.path;
              this.$emit("mapEvent", this.path);
            } else {
              if(res.data.path){
                this.$message.warning("上传失败: " + res.data.message+", 路径为："+ res.data.path);
              }else{
                this.$message.error("上传失败: " + res.data.message);
              }
            }
          });
      } else {
        this.$message.warning("请先选择图片再点击上传");
      }
    }
  },
  mounted() {
    API.materialSign({}).then(rs => {
      this.host = "http://imgv2.g3user.com/?sign=" + rs + "&F=upload";
    });
  },
  computed: {
    isUpload() {
      return this.uploadProps.uploadSure;
    }
  },
  watch: {
    isUpload(val) {
      this.uploadAction();
    }
  }
};
</script>
