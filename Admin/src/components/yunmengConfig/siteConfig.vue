<template>
  <div class="site-config">
    <Header :title="title">
      <template>
        <div id="filters">
          <div class="control-bar-wrapper clearfix">
            <div class="control-bar l">
              <span class="l time">访问属性：</span>
              <div class="l select-bar clearfix" id="select-bar">
                <span :class="['trackable',selectCur==='site'?'cur':'']">合作站点</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Header>
    <div class="content-box">
      <div class="site-config-box">
        <el-button type="primary" size="medium " class="add-btn" @click="addClick">新增</el-button>
        <el-form :inline="true" :model="formInline" class="search-form" label-width="60px" size="medium">
          <el-form-item label="">
            <el-input placeholder="请输入查找内容" v-model="formInline.value" class="input-with-select" @keydown.enter.native="search(true)" clearable>
              <el-select v-model="formInline.name" slot="prepend">
                <el-option label="名称" value="name"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item label="状态:" class="status">
            <el-select v-model="formInline.status" placeholder="">
              <el-option label="全部" value="all"></el-option>
              <el-option label="关闭" value="0"></el-option>
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search(true)">查询</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%" stripe>
          <el-table-column label="序号" width="50">
            <template slot-scope="scope"><span>{{scope.$index+(currentPage - 1) *size + 1}} </span></template>
          </el-table-column>
          <el-table-column label="ID" prop="id" width="100" align="center">
          </el-table-column>
          <el-table-column label="名称" prop="name" width="180" align="center">
          </el-table-column>
          <el-table-column label="image" prop="image" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.image" alt="">
            </template>
          </el-table-column>
          <el-table-column label="URL地址" prop="url" align="center">
            <template slot-scope="scope">
              <a target="_blank" :href="scope.row.url" :title="scope.row.url">{{scope.row.url}}</a>
            </template>
          </el-table-column>
          <el-table-column label="价格" prop="url" align="center" width="100">
            <template slot-scope="scope">
              <div>{{scope.row.price}}</div>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="remark" align="center">
          </el-table-column>
          <el-table-column label="状态" align="center" width="80">
            <template slot-scope="scope">
              <span :class="[scope.row.status==1?'status-pass':scope.row.status==0?'status-fail':'']">{{ scope.row.status |statusFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="160">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="editClick(scope.row)"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteClick(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[ 10,20, 50]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total" :hide-on-single-page="false"></el-pagination>
      </div>
    </div>
    <!-- editDialog -->
    <el-dialog title="编辑" :visible.sync="dialogVisible.editDialogVisible" class="site-edit-dialog" @close="siteDialogClose('edit')">
      <el-form :model="editDialogData" label-width="100px" size="small" :rules="rules" ref="editDialogForm">
        <el-form-item label="ID：">
          <el-input v-model="editDialogData.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="editDialogData.name"></el-input>
        </el-form-item>
        <el-form-item label="URL地址：" prop="url">
          <el-input v-model="editDialogData.url"></el-input>
        </el-form-item>
        <el-form-item label="image：" prop="image">
          <el-input v-model="editDialogData.image"></el-input>
        </el-form-item>
        <el-form-item label="remark：" prop="remark：">
          <el-input v-model="editDialogData.remark"></el-input>
        </el-form-item>
        <el-form-item label="price：" prop="price">
          <el-input-number v-model="editDialogData.price" controls-position="right" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="排序：" prop="sort">
          <el-input-number v-model="editDialogData.sort" controls-position="right" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="status：" prop="status">
          <el-switch v-model="editDialogData.status" active-color="#13ce66" inactive-color="#ff4949" active-text="正常" inactive-text="关闭">
          </el-switch>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button @click="dialogVisible.editDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm('editDialogForm')" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <!-- addDialog -->
    <el-dialog title="添加" :visible.sync="dialogVisible.addDialogVisible" class="site-add-dialog" @close="siteDialogClose('add')">
      <el-form :model="addDialogData" label-width="100px" size="small" :rules="rules" ref="addDialogForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addDialogData.name"></el-input>
        </el-form-item>
        <el-form-item label="URL地址：" prop="url">
          <el-input v-model="addDialogData.url"></el-input>
        </el-form-item>
        <el-form-item label="image：" prop="image">
          <el-input v-model="addDialogData.image"></el-input>
        </el-form-item>
        <el-form-item label="remark：" prop="remark：">
          <el-input v-model="addDialogData.remark"></el-input>
        </el-form-item>
        <el-form-item label="price：" prop="price">
          <el-input-number v-model="addDialogData.price" controls-position="right" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="排序：" prop="sort">
          <el-input-number v-model="addDialogData.sort" controls-position="right" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="status：" prop="status">
          <el-switch v-model="addDialogData.status" active-color="#13ce66" inactive-color="#ff4949" active-text="正常" inactive-text="关闭">
          </el-switch>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button @click="dialogVisible.addDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm('addDialogForm')" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import API from "../../api/api";
import Header from "../common/header";
export default {
  name: "siteConfig",
  components: {
    Header
  },
  data() {
    return {
      title: "合作站点",
      selectCur: "site",
      total: 10,
      size: 10,
      currentPage: 1,
      tableData: [],
      formInline: {
        name: "name",
        value: "",
        status: "all"
      },
      editDialogData: {
        id: "",
        name: "",
        url: "",
        image: "",
        remark: "",
        price: "",
        sort: "",
        status: ""
      },
      addDialogData: {
        name: "",
        url: "",
        image: "",
        remark: "",
        price: "",
        sort: "",
        status: ""
      },
      dialogVisible: {
        editDialogVisible: false,
        addDialogVisible: false
      },
      rules: {
        name: [
          { required: true, message: "请输入搜索引擎名称", trigger: "blur" }
        ],
        url: [{ required: true, message: "请输入URL地址", trigger: "blur" }],
        image: [{ required: true, message: "请输入匹配正则", trigger: "blur" }]
      }
    };
  },
  methods: {
    getsiteList(params) {
      API.siteList(params).then(rs => {
        // console.log(rs);
        this.total = rs.total;
        this.tableData = rs.rows;
      });
    },
    search(isbtn) {
      if (isbtn === true) {
        this.currentPage = 1;
      }
      var params = {};
      this.formInline.value ? (params.name = this.formInline.value) : "";
      this.formInline.status === "all"
        ? ""
        : (params.status = this.formInline.status);
      params.page = this.currentPage;
      params.rows = this.size;
      //   console.log(params);
      this.getsiteList(params);
    },
    resetSearch() {
      this.formInline = { name: "name", value: "", status: "all" };
      this.currentPage = 1;
      this.size = 10;
      this.search();
    },
    editClick(row) {
      Object.keys(this.editDialogData).forEach(key => {
        this.editDialogData[key] = row[key];
      });
      this.dialogVisible.editDialogVisible = true;
    },
    deleteClick(id) {
      this.$confirm("删除后无法恢复, 是否继续删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          API.siteDelete({ id: id }).then(rs => {
            if (rs.code === 1) {
              this.$message.success("删除成功!");
              this.search();
            } else {
              this.$message.error("删除失败:" + rs.msg);
            }
          });
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      this.size = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    },
    siteDialogClose(params) {
      if (params === "edit") {
        Object.keys(this.editDialogData).forEach(key => {
          this.editDialogData[key] = "";
        });
        this.$nextTick(() => {
          this.$refs.editDialogForm.clearValidate();
        });
      } else if (params === "add") {
        Object.keys(this.addDialogData).forEach(key => {
          this.addDialogData[key] = "";
        });
        this.$nextTick(() => {
          this.$refs.addDialogForm.clearValidate();
        });
      }
    },
    addClick() {
      this.dialogVisible.addDialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName === "editDialogForm") {
            API.siteEdit(this.editDialogData).then(res => {
              this.dealResponse("edit", res);
            });
          } else if (formName === "addDialogForm") {
            API.siteAdd(this.addDialogData).then(res => {
              this.dealResponse("add", res);
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    dealResponse(type, res) {
      var params = {
        tile: "",
        visibleName: ""
      };
      if (type === "edit") {
        params.title = "编辑";
        params.visibleName = "editDialogVisible";
      } else if (type === "add") {
        params.title = "添加";
        params.visibleName = "addDialogVisible";
      }
      if (res === 1) {
        this.$message.success(params.title + "成功！");
        this.dialogVisible[params.visibleName] = false;
        this.search();
      } else if (res.msg === "FAILURE") {
        this.$message.error(params.title + "失败！");
      } else {
        this.$message.error(params.title + "失败: " + res.msg);
      }
    }
  },
  mounted() {
    this.getsiteList({ page: this.currentPage, rows: this.size });
  },
  filters: {
    statusFilter: function(value) {
      switch (value) {
        case 1:
          return "正常";
          break;
        case 0:
          return "关闭";
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
.site-config-box {
  position: relative;
  background: #fff;
  padding: 0 10px 10px 10px;
  overflow: hidden;
  min-height: 400px;
  .add-btn {
    position: absolute;
    right: 15px;
    top: 20px;
    padding: 10px 30px;
  }
  .search-form {
    margin-top: 20px;
  }
  .status-fail {
    color: red;
  }
  .status-pass {
    color: green;
  }
}
.control-bar-wrapper .control-bar .select-bar .trackable {
  border-radius: 4px;
  left: 0;
}
</style>
<style lang="scss">
.site-config-box {
  .input-with-select .el-input-group__prepend .el-select {
    width: 100px;
  }
  .status {
    .el-select {
      width: 140px;
    }
  }
}
.site-edit-dialog,
.site-add-dialog {
  .el-dialog {
    width: 600px;
    .el-input__inner,
    .el-input-number {
      width: 300px;
    }
  }
}
</style>