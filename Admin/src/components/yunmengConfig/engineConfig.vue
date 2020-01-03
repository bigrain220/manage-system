<template>
  <div class="engine-config">
    <Header :title="title">
      <template>
        <div id="filters">
          <div class="control-bar-wrapper clearfix">
            <div class="control-bar l">
              <span class="l time">访问属性：</span>
              <div class="l select-bar clearfix" id="select-bar">
                <span :class="['trackable',selectCur==='engine'?'cur':'']">搜索引擎</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Header>
    <div class="content-box">
      <div class="engine-config-box">
        <el-button type="primary" size="medium " class="add-btn" @click="addClick">新增</el-button>
        <el-form :inline="true" :model="formInline" class="search-form" label-width="60px" size="medium">
          <el-form-item label="">
            <el-input placeholder="请输入查找内容" v-model="formInline.value" class="input-with-select" @keydown.enter.native="search(true)" clearable>
              <el-select v-model="formInline.name" slot="prepend">
                <el-option label="名称" value="name"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search(true)">查询</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%" border stripe>
          <el-table-column label="序号" width="50">
            <template slot-scope="scope"><span>{{scope.$index+(currentPage - 1) *size + 1}} </span></template>
          </el-table-column>
          <el-table-column label="ID" prop="id" width="100" align="center">
          </el-table-column>
          <el-table-column label="搜索引擎" prop="name" width="180" align="center">
          </el-table-column>
          <el-table-column label="URL地址" prop="url" align="center">
            <template slot-scope="scope">
              <a target="_blank" :href="scope.row.url" :title="scope.row.url">{{scope.row.url}}</a>
            </template>
          </el-table-column>
          <el-table-column label="匹配正则" align="center">
            <template slot-scope="scope">{{ scope.row.regex }}</template>
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
    <el-dialog title="编辑" :visible.sync="dialogVisible.editDialogVisible" class="engine-edit-dialog" @close="engineDialogClose('edit')">
      <el-form :model="editDialogData" label-width="100px" size="small" :rules="rules" ref="editDialogForm">
        <el-form-item label="ID：">
          <el-input v-model="editDialogData.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="搜索引擎：" prop="name">
          <el-input v-model="editDialogData.name"></el-input>
        </el-form-item>
        <el-form-item label="URL地址：" prop="url">
          <el-input v-model="editDialogData.url"></el-input>
        </el-form-item>
        <el-form-item label="匹配正则：" prop="regex">
          <el-input v-model="editDialogData.regex"></el-input>
        </el-form-item>
        <el-form-item label="正则偏移：" prop="offset">
          <el-input-number v-model="editDialogData.offset" controls-position="right" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input-number v-model="editDialogData.sort" controls-position="right" :min="0" :max="100"></el-input-number>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button @click="dialogVisible.editDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm('editDialogForm')" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <!-- addDialog -->
    <el-dialog title="添加" :visible.sync="dialogVisible.addDialogVisible" class="engine-add-dialog" @close="engineDialogClose('add')">
      <el-form :model="addDialogData" label-width="100px" size="small" :rules="rules" ref="addDialogForm">
        <el-form-item label="搜索引擎：" prop="name">
          <el-input v-model="addDialogData.name"></el-input>
        </el-form-item>
        <el-form-item label="URL地址：" prop="url">
          <el-input v-model="addDialogData.url"></el-input>
        </el-form-item>
        <el-form-item label="匹配正则：" prop="regex">
          <el-input v-model="addDialogData.regex"></el-input>
        </el-form-item>
        <el-form-item label="正则偏移：" prop="offset">
          <el-input-number v-model="addDialogData.offset" controls-position="right" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input-number v-model="addDialogData.sort" controls-position="right" :min="0" :max="100"></el-input-number>
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
  name: "engineConfig",
  components: {
    Header
  },
  data() {
    return {
      title: "搜索引擎",
      selectCur: "engine",
      total: 10,
      size: 10,
      currentPage: 1,
      tableData: [],
      formInline: {
        name: "name",
        value: ""
      },
      editDialogData: {
        id: "",
        name: "",
        url: "",
        regex: "",
        offset: "",
        sort: ""
      },
      addDialogData: {
        name: "",
        url: "",
        regex: "",
        offset: "",
        sort: ""
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
        regex: [{ required: true, message: "请输入匹配正则", trigger: "blur" }],
        offset: [
          { required: true, message: "请输入正则偏移量", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getEngineList(params) {
      API.engineList(params).then(rs => {
        console.log(rs);
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
      params.page = this.currentPage;
      params.rows = this.size;
      //   console.log(params);
      this.getEngineList(params);
    },
    resetSearch() {
      this.formInline = { name: "name", value: "" };
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
          API.engineDelete({ id: id }).then(rs => {
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
    engineDialogClose(params) {
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
            API.engineEdit(this.editDialogData).then(res => {
              this.dealResponse("edit", res);
            });
          } else if (formName === "addDialogForm") {
            API.engineAdd(this.addDialogData).then(res => {
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
    this.getEngineList({ page: this.currentPage, rows: this.size });
  }
};
</script>

<style  lang='scss' scoped>
.engine-config-box {
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
}
.control-bar-wrapper .control-bar .select-bar .trackable {
  border-radius: 4px;
  left: 0;
}
</style>
<style lang="scss">
.engine-config-box {
  .input-with-select .el-input-group__prepend .el-select {
    width: 100px;
  }
}
.engine-edit-dialog,
.engine-add-dialog {
  .el-dialog {
    width: 600px;
    .el-input__inner,
    .el-input-number {
      width: 300px;
    }
  }
}
</style>