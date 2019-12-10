<template>
  <div class="Material">
    <Header :title="title"></Header>
    <div class="content-box">
      <div class="material-box">
        <el-form :inline="true" :model="searchForm" class="search-form" label-width="60px" size="medium">
          <el-form-item label="状态:">
            <el-select v-model="searchForm.status" placeholder="">
              <el-option label="全部" value=""></el-option>
              <el-option label="待审" :value="1"></el-option>
              <el-option label="通过" :value="2"></el-option>
              <el-option label="拒绝" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search(true)">查询</el-button>
            <el-button type="success" @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="medium" class="add-btn" @click="addClick">创建物料</el-button>
        <el-table :data="tableData" style="width: 100%;" border stripe>
          <el-table-column label="名称" prop="name" width="180" align="center">
          </el-table-column>
          <el-table-column label="物料" align="center" min-width="150">
            <template slot-scope="scope">
              <el-image :src=item.img_url class="img-list" :preview-src-list="srcList" v-for="(item,index) in scope.row.imgs" :key="index" @click="imgClick(scope.row.imgs,index)"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="推广网址" prop="url" align="center" width="320">
          </el-table-column>
          <el-table-column label="状态" width="120" align="center">
            <template slot-scope="scope"><span :class="[scope.row.status==2?'status-pass':scope.row.status==3?'status-fail':'']">{{ scope.row.status|statusFilter }}</span></template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="editClick(scope.row)"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteClick(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[ 10, 20, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total" :hide-on-single-page="true"></el-pagination>
      </div>
    </div>
    <!-- materia-dialog -->
    <el-dialog :title="submitType" :visible.sync="dialogVisible.materiaVisible" class="materiaDialog" :close-on-click-modal="false" @closed="materiaDialogClose">
      <el-form :model="materiaForm" ref="materiaForm" size="small" label-position="right" label-width="100px">
        <el-form-item label="名称:">
          <el-input v-model="materiaForm.name" style="width: 100%;" placeholder="请选择名称" maxlength="12"></el-input>
        </el-form-item>
        <el-form-item label="广告大图一:">
          <el-input v-model="materiaForm.img_1" disabled style="width: 620px;" placeholder="请选择728*120的图片"></el-input>
          <el-button icon="el-icon-upload2" circle size="small" class="upload-btn" @click="imgUploadClick('img_1')"></el-button>
        </el-form-item>
        <el-form-item label="广告大图二:">
          <el-input v-model="materiaForm.img_2" disabled style="width: 620px;" placeholder="请选择300*600的图片"></el-input>
          <el-button icon="el-icon-upload2" circle size="small" class="upload-btn" @click="imgUploadClick('img_2')"></el-button>
        </el-form-item>
        <el-form-item label="广告小图一:">
          <el-input v-model="materiaForm.title_3" class="small-title" placeholder="请输入小图一标题" maxlength="12"></el-input>
          <el-input v-model="materiaForm.img_3" class="small-img" placeholder="请选择300*300的图片"></el-input>
          <el-button icon="el-icon-upload2" circle size="small" class="upload-btn" @click="imgUploadClick('img_3')"></el-button>
        </el-form-item>
        <el-form-item label="广告小图二:">
          <el-input v-model="materiaForm.title_4" class="small-title" placeholder="请输入小图二标题" maxlength="12"></el-input>
          <el-input v-model="materiaForm.img_4" class="small-img" placeholder="请选择300*300的图片"></el-input>
          <el-button icon="el-icon-upload2" circle size="small" class="upload-btn" @click="imgUploadClick('img_4')"></el-button>
        </el-form-item>
        <el-form-item label="广告小图三:">
          <el-input v-model="materiaForm.title_5" class="small-title" placeholder="请输入小图三标题" maxlength="12"></el-input>
          <el-input v-model="materiaForm.img_5" class="small-img" placeholder="请选择300*300的图片"></el-input>
          <el-button icon="el-icon-upload2" circle size="small" class="upload-btn" @click="imgUploadClick('img_5')"></el-button>
        </el-form-item>
        <el-form-item label="广告小图四:">
          <el-input v-model="materiaForm.title_6" class="small-title" placeholder="请输入小图四标题" maxlength="12"></el-input>
          <el-input v-model="materiaForm.img_6" class="small-img" placeholder="请选择300*300的图片"></el-input>
          <el-button icon="el-icon-upload2" circle size="small" class="upload-btn" @click="imgUploadClick('img_6')"></el-button>
        </el-form-item>
        <el-form-item label="广告小图五:">
          <el-input v-model="materiaForm.title_7" class="small-title" placeholder="请输入小图五标题" maxlength="12"></el-input>
          <el-input v-model="materiaForm.img_7" class="small-img" placeholder="请选择300*300的图片"></el-input>
          <el-button icon="el-icon-upload2" circle size="small" class="upload-btn" @click="imgUploadClick('img_7')"></el-button>
        </el-form-item>
        <el-form-item label="广告小图六:">
          <el-input v-model="materiaForm.title_8" class="small-title" placeholder="请输入小图六标题" maxlength="12"></el-input>
          <el-input v-model="materiaForm.img_8" class="small-img" placeholder="请选择300*300的图片"></el-input>
          <el-button icon="el-icon-upload2" circle size="small" class="upload-btn" @click="imgUploadClick('img_8')"></el-button>
        </el-form-item>
        <el-form-item label="手机广告:">
          <el-input v-model="materiaForm.img_9" disabled style="width: 620px;" placeholder="请选择400*50的图片"></el-input>
          <el-button icon="el-icon-upload2" circle size="small" class="upload-btn" @click="imgUploadClick('img_9')"></el-button>
        </el-form-item>
        <el-form-item label="推广地址:">
          <el-input v-model="materiaForm.url" style="width: 100%;" placeholder="请输入推广地址"></el-input>
        </el-form-item>
        <el-form-item label="QQ:">
          <el-input v-model="materiaForm.qq" style="width: 100%;" placeholder="请输入QQ" maxlength="12"></el-input>
        </el-form-item>
        <el-form-item label="手机号码:">
          <el-input v-model="materiaForm.mobile" style="width: 100%;" placeholder="请输入手机号码" maxlength="11"></el-input>
        </el-form-item>
      </el-form>
      <div class="materia-dialog-bottom">
        <el-popover placement="top-start" width="370" trigger="hover">
          <div class="materia-warn-msg">
            <span>以下原因将审核不通过：</span>
            <ul>
              <li>1.内容涉及"色情,政治,医疗,赌博，药品,制毒,制爆,剧毒,邪教"等;</li>
              <li>2.含有法律、行政法规禁止内容的问题;</li>
              <li>3.侮辱或诽谤他人,侵害他人合法权益的问题;</li>
              <li>4.存在图片不清晰或无法打开;</li>
              <li>5.图片重复;</li>
            </ul>
          </div>
          <el-button type="text" slot="reference" size="mini">物料审核规范</el-button>
        </el-popover>
        <el-button type="primary" size="small" class="submit-btn" @click="materiaSubmit">立即提交</el-button>
        <div class="tips">温馨提示：每次修改都需要重新审核！</div>
      </div>
    </el-dialog>
    <!-- upload-dialog -->
    <el-dialog title="上传图片" :visible.sync="dialogVisible.uploadDialogVisible" class="upload-dialog" destroy-on-close>
      <img-upload :uploadProps=uploadProps @mapEvent="mapEvent"></img-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="uploadSureClick" style="width:100px;">上传</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import API from "../../api/api";
import utils from "../../utils/utils";
import Header from "../common/header";
export default {
  name: "Material",
  components: { Header, imgUpload: () => import("../common/imgUpload.vue") },
  data() {
    return {
      srcList: [],
      title: "媒体物料",
      total: 10,
      size: 10,
      currentPage: 1,
      searchForm: {
        status: ""
      },
      tableData: [],
      dialogVisible: {
        materiaVisible: false,
        uploadDialogVisible: false
      },
      dialogImageUrl: "",
      materiaForm: {
        img_1: "img_1",
        img_2: "img_2",
        img_3: "img_3",
        img_4: "img_4",
        img_5: "img_5",
        img_6: "img_6",
        img_7: "img_7",
        img_8: "img_8",
        img_9: "img_9",
        url: "url",
        name: "name",
        mobile: "",
        qq: "",
        title_3: "title_3",
        title_4: "title_4",
        title_5: "title_5",
        title_6: "title_6",
        title_7: "title_7",
        title_8: "title_8"
      },
      uploadProps: {
        uploadSure: false,
        width: null,
        height: null
      },
      order: "",
      submitType: "",
      editID: null
    };
  },
  methods: {
    search(isbtn) {
      if (isbtn === true) {
        this.currentPage = 1;
      }
      var params = {};
      params.page = this.currentPage;
      params.rows = this.size;
      this.searchForm.status ? (params.status = this.searchForm.status) : "";
      this.getMaterialList(params);
    },
    resetSearch() {
      this.searchForm = { status: "" };
      this.currentPage = 1;
      this.size = 10;
      this.search();
    },
    getMaterialList(params) {
      API.materialList(params).then(rs => {
        console.log(rs);
        this.total = rs.total;
        this.tableData = rs.rows;
        this.tableData.map((item, index) => {
          item.imgs = JSON.parse(item.imgs);
        });
      });
    },
    handleSizeChange(val) {
      this.size = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    },
    addClick() {
      this.submitType = "创建物料";
      this.resetForm(this.materiaForm);
      this.dialogVisible.materiaVisible = true;
    },
    imgClick(params, i) {
      var arr = [];
      params.map(item => {
        arr.push(item.img_url);
      });
      arr = [...arr.slice(i), ...arr.slice(0, i)];
      this.srcList = arr;
      //处理位置偏移
      if (this.hasScrollbar()) {
        document.querySelector("body").style.overflow = "hidden";
        document.querySelector("body").style.marginRight = "8px";
      }
    },
    editClick(params) {
      // console.log(params);
      this.submitType = "编辑物料";
      this.editID = params.id;
      this.resetForm(this.materiaForm);
      this.materiaForm.name = params.name;
      this.materiaForm.mobile =params.mobile;
      this.materiaForm.url = params.url;
      this.materiaForm.qq = params.qq;
      var imgData = params.imgs;
      imgData.map((item, index) => {
        if (index > 1 && index < 8) {
          this.materiaForm[`title_${index + 1}`] = item.title;
        }
        this.materiaForm[`img_${index + 1}`] = item.img_url;
      });

      this.dialogVisible.materiaVisible = true;
    },
    materiaDialogClose(){
       
    },
    resetForm(params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          if (Array.isArray(params[key])) {
            params[key].map(item => {
              this.resetForm(item);
            });
          } else {
            params[key] = "";
          }
        }
      }
    },
    deleteClick(id) {
      this.$confirm("删除后无法恢复, 是否继续删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          API.materialDelete({ id: id }).then(rs => {
            if (rs.code === 1) {
              this.$message.success("删除成功");
              let totalPage = Math.ceil((this.total - 1) / this.size);
              let currentPage = this.currentPage > totalPage ? totalPage : this.currentPage;
              this.currentPage = currentPage < 1 ? 1 : currentPage;
              this.search();
            } else {
              this.$message.error("删除失败，" + rs.msg);
            }
          });
        })
        .catch(() => {});
    },
    materiaSubmit() {
      // console.log(this.materiaForm);
      if(this.beforeSubmit(this.materiaForm) !=""){
          this.$alert(""+this.beforeSubmit(this.materiaForm), "提交物料", {
            confirmButtonText: "确定",
            type:"warning",
            callback: action => {
             
            }
         }); 
      }else{
      //提交物料
          if (this.submitType === "创建物料") {
            API.materialAdd({ data: JSON.stringify(this.materiaForm)}).then(rs => {
              // console.log(rs, "add");
              this.submitResponse(rs, "add");
            });
          } else if (this.submitType === "编辑物料") {
            var params = {};
            params.data = JSON.stringify(this.materiaForm);
            params.id = this.editID;
            API.materialEdit(params).then(rs => {
              // console.log(rs, "edit");
              this.submitResponse(rs, "edit");
            });
          }
      }
    },
    submitResponse(params, submitType) {
      if (params.code === 1) {
        this.$alert("提交成功", "提交物料", {
          confirmButtonText: "确定",
          type: "success",
          callback: action => {
            this.search();
          }
        });
      } else {
        this.$alert("提交失败: " +params.msg, "提交物料", {
          confirmButtonText: "确定",
          type: "error",
          callback: action => {
            // this.search();
          }
        });
      }
    },
    imgUploadClick(params) {
      this.order = params;
      this.dialogVisible.uploadDialogVisible = true;
      switch (this.order) {
        case "img_1":
          this.uploadProps.width = 728;
          this.uploadProps.height = 120;
          break;
        case "img_2":
          this.uploadProps.width = 300;
          this.uploadProps.height = 600;
          break;
        case "img_9":
          this.uploadProps.width = 400;
          this.uploadProps.height = 50;
          break;
        default:
          this.uploadProps.width = 300;
          this.uploadProps.height = 300;
          break;
      }
    },
    uploadSureClick() {
      this.uploadProps.uploadSure = !this.uploadProps.uploadSure;
    },
    mapEvent(data) {
      var i = this.order;
      this.materiaForm[i] = data;
      this.dialogVisible.uploadDialogVisible = false;
    },
    //判断有没有滚动条
    hasScrollbar() {
      return (
        document.body.scrollHeight >
        (window.innerHeight || document.documentElement.clientHeight)
      );
    },
    //上传前验证
    beforeSubmit(params){
      var valArr=Object.values(params);
      var keyArr=Object.keys(params);
      var imgArr=[];
      var msg=""
      if(valArr.indexOf("")>=0){
        msg =  "请将各项填完后提交"
      }else{
        keyArr.map((item,index)=>{
          if(item.indexOf("img_")===0){
            if(/^(http)/.test(params[item]) !==true || params[item].indexOf('.')<0){
              msg = "图片路径不正确"
            }else{
              imgArr.push(params[item]);
            }
          }else if(item === 'qq'){
            /^[0-9]+$/.test(params[item])===false ?msg="qq格式不正确":"";
          }else if(item === 'mobile'){
            /^[0-9]+$/.test(params[item])===false ?msg="手机号格式不正确":"";
          }else if(item === 'url'){
            if(/^(http)/.test(params[item]) !==true || params[item].indexOf('.')<0){
               msg = "推广地址格式不正确";
            }
          }
        });
      imgArr.length !== [...new Set(imgArr)].length? msg="图片不能重复":"";
      }
      return msg;
    }
  },
  mounted() {
    this.getMaterialList({ page: this.currentPage, rows: this.size });
      window.addEventListener("mousemove", function() {
        if (document.querySelector(".el-image-viewer__wrapper")) {
        } else {
          document.querySelector("body").style.overflow = "";
          document.querySelector("body").style.marginRight = "0";
        }
      });
  },
  beforeDestory() {
    window.removeEventListener("mousemove");
  },
  filters: {
    statusFilter: function(value) {
      switch (value) {
        case 1:
          return "待审核";
          break;
        case 2:
          return "通过";
          break;
        case 3:
          return "拒绝";
          break;
        default:
          return value;
          break;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.material-box {
  background: #fff;
  padding: 0 10px;
  overflow: hidden;
  min-height: 400px;
  position: relative;
  .search-form {
    margin-top: 20px;
    margin-bottom: 26px;
    height: 40px;
  }
  .add-btn {
    position: absolute;
    right: 50px;
    top: 20px;
  }
  .status-fail {
    color: red;
  }
  .status-pass {
    color: green;
  }
}
.img-list {
  display: inline-block;
  height: 32px;
  margin-right: 2px;
  cursor: pointer;
}
.img-list:nth-child(1) {
  width: 184px;
}
.img-list:nth-child(2) {
  width: 18px;
}
.img-list:nth-child(3),
.img-list:nth-child(4),
.img-list:nth-child(5),
.img-list:nth-child(6),
.img-list:nth-child(7),
.img-list:nth-child(8) {
  width: 32px;
}
.img-list:nth-child(9) {
  width: 242px;
}
</style>
<style lang="scss">
.material-box .el-input--medium .el-input__inner {
  width: 200px;
}
.el-image-viewer__btn.el-image-viewer__close {
  color: #fff;
}
.materiaDialog .el-dialog {
  width: 820px;
  margin-top: 10vh!important;
  .el-form-item {
    margin: 0 10px;
    margin-bottom: 10px;
    .el-form-item__label {
      font-size: 12px;
    }
    .el-form-item__content {
      position: relative;
      .small-title {
        width: 164px;
      }
      .small-img {
        width: 452px;
      }
      .el-input__inner {
        font-size: 12px !important;
      }
      .upload-btn {
        position: absolute;
        right: 0;
        top: 2px;
      }
      .el-input.is-disabled .el-input__inner {
        // background-color: #F5F7FA;
        // border-color: #E4E7ED;
        color: #606266;
        // cursor: not-allowed;
      }
    }
  }
  .materia-dialog-bottom {
    display: flex;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    margin-top: 20px;
    padding-left: 114px;
    .tips {
      color: red;
      margin: 0 20px;
    }
    .submit-btn {
      margin-left: 110px;
      width: 170px;
    }
  }
}
.el-popper {
  .materia-warn-msg {
    font-size: 12px;
    ul {
      margin-top: 4px;
      li {
        margin: 2px 0;
      }
    }
  }
}
</style>
