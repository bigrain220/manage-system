<template>
  <div>
    <Header :title="title"></Header>
    <div class="content-box">
      <div class="media-box">
        <el-form :inline="true" :model="searchForm" class="search-form" label-width="60px" size="medium">
          <el-form-item label="物料:">
            <el-select v-model="searchForm.mid" placeholder="">
              <el-option label="全部" value=""></el-option>
              <el-option :label="item.name" :value="item.id" v-for="(item,index) in searchMaterial" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="状态:">
            <el-select v-model="searchForm.status" placeholder="">
              <el-option label="全部" :value="0"></el-option>
              <el-option label="待投放" :value="1"></el-option>
              <el-option label="投放中" :value="2"></el-option>
              <el-option label="已过期" :value="3"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search(true)">查询</el-button>
            <el-button type="success" @click="resetSearch">重置</el-button>
          </el-form-item>
          <el-form-item style="float:right;margin-right:40px;">
            <el-button type="primary" @click="dialogVisible.newMediadialogVisible = true">创建广告</el-button>
          </el-form-item>
        </el-form>
        <el-table ref="mediaTable" :data="tableData" style="width: 100%" size="medium" v-loading="loading">
          <el-table-column width="60" label="序号" align="center">
            <template slot-scope="scope"><span>{{scope.$index+(currentPage - 1) *size + 1}} </span></template>
          </el-table-column>
          <el-table-column label="ID" align="center" prop="id">
          </el-table-column>
          <el-table-column label="名称" width="240">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" :maxlength="12" size="mini" @focus="mediaNameFocus($event)" @blur="styleControl.inputID=''" @change="mediaNameChange(scope.row)" :data-id="scope.row.id" :class="['nameInput',scope.row.id == styleControl.inputID?'focusColor':'']"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="物料" align="center" class-name="select-column" min-width="160">
            <template slot-scope="scope">
              <el-select placeholder="选择物料" size="mini" v-model="scope.row.mid" v-if="scope.row.id == styleControl.selectID" @change="mediaMidChange(scope.row)">
                <el-option :label="item.name" :value="item.id" v-for="(item,index) in searchMaterial" :key="index"></el-option>
                <!-- <el-option :value="1" label="南方网通"></el-option> -->
              </el-select>
              <span class="mid-text" @click="midClick($event)" :data-id="scope.row.id" v-else>{{scope.row.mid | selectFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column label="天数" align="center" class-name="select-column" min-width="160">
            <template slot-scope="scope">
              <el-select placeholder="请选择" size="mini" v-model="scope.row.day" v-if="scope.row.id == styleControl.selectID2" @change="mediaDayChange(scope.row)">
                <el-option label="7 天" :value="7"></el-option>
                <el-option label="14天" :value="14"></el-option>
                <el-option label="21天" :value="21"></el-option>
                <el-option label="28天" :value="28"></el-option>
                <el-option label="30天" :value="30"></el-option>
              </el-select>
              <span class="day-text" @click="dayClick($event)" :data-id="scope.row.id" v-else>{{scope.row.day}} 天</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="状态" align="center">
            <template slot-scope="scope"><span :class="[scope.row.status==1?'status-going':scope.row.status==2?'status-over':'']">{{ scope.row.status | statusFilter}}</span></template>
          </el-table-column> -->
          <el-table-column label="" align="center">
          </el-table-column>
          <el-table-column label="操作" width="300" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="directedClick(scope.row)">投放</el-button>
              <el-button size="mini" type="success" @click="redirectedClick(scope.row)">重投</el-button>
              <el-button size="mini" type="warning" @click="watchListClick(scope.row)">查看</el-button>
              <el-button size="mini" type="danger" @click="deleteClick(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[ 10, 20, 50]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total" :hide-on-single-page="false"></el-pagination>
      </div>
    </div>

    <!-- add-dialog -->
    <el-dialog title="创建广告" :visible.sync="dialogVisible.newMediadialogVisible" @closed="newMediadialogClose"  class="create-advertise">
      <el-form ref="newMediaForm" :rules="newMediaRules" :model="newMediaForm" label-position="right" label-width="100px" size="small">
        <el-form-item label="名称：" prop="name">
          <el-input autocomplete="off" v-model="newMediaForm.name" style="width:55%;" :maxlength="12"></el-input>
        </el-form-item>
        <el-form-item label="物料：" prop="mid">
          <el-select v-model="newMediaForm.mid" placeholder="选择物料">
            <el-option :label="item.name" :value="item.id" v-for="(item,index) in searchMaterial" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="天数：" prop="day">
          <el-input-number v-model="newMediaForm.day" controls-position="right" :min="7" :max="30"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible.newMediadialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="newMediaSubmit" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <!-- list-dialog -->
    <directed-list-dialog v-if="dialogVisible.listMediadialogVisible" @listEvent="listEvent" :listDialogProps="listDialogProps"></directed-list-dialog>
    <!-- directed-dialog -->
    <directed-dialog v-if="dialogVisible.directedMediadialogVisible" @mapEvent="mapEvent" :directedObj="directedObj"></directed-dialog>
  </div>
</template>

<script>
import Header from "../common/header";
import "../../utils/filters";
import API from "../../api/api";
export default {
  name: "media",
  components: {
    Header,
    directedDialog: () => import("../common/directedDialog.vue"),
    directedListDialog: () => import("../common/directedListDialog.vue")
  },
  // inject: ["reload"],
  data() {
    return {
      title: "媒体广告",
      searchMaterial: [],
      searchForm: {
        mid: ""
      },
      listDialogProps: {
        id: "",
        title: ""
      },
      loading: false,
      total: 10,
      size: 10,
      currentPage: 1,
      tableData: [],
      directedObj: {
        directedID: null,
        directedTitle: ""
      },
      newMediaForm: { name: "", mid: "", day: "" },
      styleControl: {
        inputID: "",
        selectID: null,
        selectID2: null
      },
      dialogVisible: {
        newMediadialogVisible: false,
        listMediadialogVisible: false,
        directedMediadialogVisible: false
      },
      newMediaRules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        mid: [{ required: true, message: "请选择物料", trigger: "blur" }],
        day: [
          { required: true, message: "请选择 7~30 的投放天数", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    search(isbtn) {
      if (isbtn === true) {
        this.currentPage = 1;
      }
      var params = {
        page: this.currentPage,
        rows: this.size
      };
      this.searchForm.mid !== "" ? (params.mid = this.searchForm.mid) : "";
      this.getMediaList(params);
    },
    resetSearch() {
      this.searchForm = { mid: "" };
      this.currentPage = 1;
      this.size = 10;
      this.search();
    },
    getMediaList(params) {
      this.loading = true;
      //获取物料信息
      API.materialGet({}).then(rs => {
        this.searchMaterial = rs;
      });
      API.mediaList(params).then(rs => {
        // console.log(rs)
        this.loading = false;
        this.total = rs.total;
        this.tableData = rs.rows;
      });
    },
    mediaNameFocus(e) {
      this.styleControl.inputID = e.target.getAttribute("data-id");
    },
    editMedia(rows, type) {
      if (type === "name") {
        var params = {
          id: rows.id,
          mid: rows.mid,
          name: rows.name
        };
      } else if (type === "mid") {
        var params = {
          id: rows.id,
          mid: rows.mid
        };
      } else if (type === "day") {
        var params = {
          id: rows.id,
          mid: rows.mid,
          day: rows.day
        };
      }
      API.mediaEdit(params).then(rs => {
        if (rs.code !== 1) {
          this.$message.error("修改失败" + rs.msg);
        }
      });
    },
    mediaNameChange(rows) {
      if (rows.name.length > 12 || rows.name.length < 3) {
        this.$alert("请输入3~12位字符的广告名称", "标题名称", {
          confirmButtonText: "确定",
          callback: action => {
            this.getMediaList({ page: this.currentPage, rows: this.size });
          }
        });
      } else {
        this.editMedia(rows, "name");
      }
    },
    mediaMidChange(rows) {
      this.editMedia(rows, "mid");
    },
    mediaDayChange(rows) {
      this.editMedia(rows, "day");
    },
    midClick(e) {
      this.styleControl.selectID = e.target.getAttribute("data-id");
    },
    dayClick(e) {
      this.styleControl.selectID2 = e.target.getAttribute("data-id");
    },
    watchListClick(data) {
      this.dialogVisible.listMediadialogVisible = true;
      this.listDialogProps.title = data.name;
      this.listDialogProps.id = data.id;
    },
    directedClick(params) {
      this.directedObj.directedID = params.id;
      this.directedObj.directedTitle = params.name;
      this.dialogVisible.directedMediadialogVisible = true;
    },
    redirectedClick(params) {
      this.$confirm("确认重投该广告： " + params.name + "", "投放提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          API.spaceReputin({ mid: params.id }).then(rs => {
            if (rs.code === 1) {
              this.$message.success("重投成功");
              this.search();
            } else {
              this.$message.error("重投失败：" + rs.msg);
            }
          });
        })
        .catch(() => {});
    },
    deleteClick(params) {
      this.$confirm(
        "删除后不可恢复，确认删除该广告： " + params.name + "",
        "删除提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          API.mediaDelete({ id: params.id }).then(rs => {
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
    // 创建广告dialog
    newMediaSubmit() {
      this.$refs.newMediaForm.validate(valid => {
        if (valid) {
          this.dialogVisible.newMediadialogVisible = false;
          // console.log(this.newMediaForm);
          API.mediaAdd(this.newMediaForm).then(rs => {
            if (rs.code === 1) {
              this.$alert("创建成功", "创建广告", {
                confirmButtonText: "确定",
                type: "success",
                callback: action => {
                  this.resetSearch();
                }
              });
            } else {
              this.$alert("创建失败：" + rs.msg, "创建广告", {
                type: "error",
                confirmButtonText: "确定",
                callback: action => {}
              });
            }
          });
        } else {
          console.log("验证不通过!!");
          return false;
        }
      });
    },
    newMediadialogClose() {
      this.newMediaForm = { name: "", mid: "", day: "" };
      this.$refs.newMediaForm.resetFields();
    },
    //广告列表
    listEvent(data) {
      this.dialogVisible.listMediadialogVisible = data;
    },
    //投放广告
    mapEvent(data) {
      this.dialogVisible.directedMediadialogVisible = data;
    },

    handleSizeChange(val) {
      this.size = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    }
  },
  mounted() {
    this.getMediaList({ page: this.currentPage, rows: this.size });
    //windows点击函数
    var that = this;
    window.onclick = function(e) {
      if (e.target.getAttribute("class") != "mid-text") {
        that.$nextTick(() => {
          that.styleControl.selectID = null;
        });
      }
      if (e.target.getAttribute("class") != "day-text") {
        that.$nextTick(() => {
          that.styleControl.selectID2 = null;
        });
      }
    };
  },
  filters: {
    selectFilter: function(value) {
      switch (value) {
        case 1:
          return "南方网通";
          break;
        case 10:
          return "zzztest";
          break;
        default:
          return "选择物料";
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.media-box {
  background: #fff;
  padding: 0 10px;
  overflow: hidden;
  .search-form {
    margin-top: 20px;
    margin-bottom: 26px;
    height: 40px;
  }
  .mid-text,
  .day-text {
    width: 160px;
    height: 28px;
    line-height: 28px;
    display: inline-block;
    cursor: pointer;
    background: #fff;
  }
}
.status-going {
  color: green;
}
.status-over {
  color: red;
}
</style>

<style lang="scss">
/* 自定义样式 */
.media-box .el-input--medium .el-input__inner {
  width: 200px;
}
.media-box .cell .el-input .el-input__inner {
  border: 1px solid #fff;
  font-size: 14px;
}
.media-box .select-column .cell .el-input .el-input__inner {
  text-align: center;
  width: 160px;
}
.media-box .cell .el-input.focusColor .el-input__inner {
  border: 1px solid rgb(34, 153, 238);
}
.media-box tr:hover .el-input__inner {
  background: #fff !important;
}
.media-box .nameInput > input {
  padding: 0 4px;
}
.create-advertise .el-dialog{width:640px;}
.create-advertise .el-input__inner,.create-advertise .el-input-number{width:240px!important;}
</style>