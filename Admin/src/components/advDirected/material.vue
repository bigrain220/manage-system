<template>
  <div class="Material">
    <Header :title="title"></Header>
    <div class="content-box">
      <div class="material-box">
        <el-form :inline="true" :model="formInline" class="search-form" label-width="60px" size="medium ">
          <el-form-item label="">
            <el-input placeholder="请输入查找内容" v-model="formInline.value" class="input-with-select" @keydown.enter.native="search(true)" clearable>
              <el-select v-model="formInline.name" slot="prepend">
                <el-option label="用户名" value="username"></el-option>
                <el-option label="用户ID" value="uid"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item label="状态:">
            <el-select v-model="formInline.status" placeholder="">
              <el-option label="全部" value=""></el-option>
              <el-option label="待审核" value="1"></el-option>
              <el-option label="通过" value="2"></el-option>
              <el-option label="拒绝" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search(true)">查询</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table ref="multipleTable" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" @select-all="selectAll" border stripe>
          <el-table-column type="selection" width="50">
          </el-table-column>
          <el-table-column label="UID" prop="uid" width="100" align="center">
          </el-table-column>
          <el-table-column label="名称" prop="name" width="180" align="center">
          </el-table-column>
          <el-table-column label="物料" align="center" min-width="270">
            <template slot-scope="scope">
              <el-image lazy :src=item.img_url class="img-list" :preview-src-list="srcList" v-for="(item,index) in JSON.parse(scope.row.imgs)" :key="index" @click="imgClick(scope.row.imgs,index)"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="推广网址" prop="url" align="center" width="200">
            <template slot-scope="scope">
              <a target="_blank" :href="scope.row.url" :title="scope.row.url">{{scope.row.url | urlFilter}}</a>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" width="180" align="center">
            <template slot-scope="scope">{{ scope.row.modify_time|timeFilter }}</template>
          </el-table-column>
          <el-table-column label="状态" width="80" align="center">
            <template slot-scope="scope"><span :class="[scope.row.status==2?'status-pass':scope.row.status==3?'status-fail':'']">{{ scope.row.status|statusFilter }}</span></template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="160">
            <template slot-scope="scope">
              <!-- :disabled="scope.row.status ==2?true:false" -->
              <el-button type="primary" size="mini" @click="passClick(scope.row.id)">通过</el-button>
              <el-button type="warning" size="mini" @click="refuseClick('single',scope.row.id)">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[ 10,20, 50, 100]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total" :hide-on-single-page="true"></el-pagination>
        <div class="group-btn">
          <el-checkbox v-model="checked" style="margin-right:14px;" @change="checkClick"></el-checkbox>
          <el-button type="primary" size="mini" @click="batchPass">批量通过</el-button>
          <el-button type="warning" size="mini" @click="refuseClick('batch')">批量拒绝</el-button>
        </div>
      </div>
      <div v-if="btnFlag" class="go-top el-icon-caret-top" @click="backTop"></div>
      <!-- refuseDialog -->
      <refuse-dialog v-if="dialogVisible.refuseDialog" @refuseEvent="refuseEvent" @mapEvent="mapEvent"></refuse-dialog>
    </div>
  </div>
</template>

<script>
import API from "../../api/api";
import utils from "../../utils/utils";
import "../../utils/filters";
import Header from "../common/header";
export default {
  name: "Material",
  components: { Header, refuseDialog: () => import("../common/refuseDialog") },
  data() {
    return {
      title: "物料列表",
      total: 10,
      size: 10,
      currentPage: 1,
      formInline: {
        name: "username",
        value: "",
        status: ""
      },
      multipleSelection: [],
      srcList: [],
      tableData: [],
      checked: false,
      btnFlag: false,
      dialogVisible: {
        refuseDialog: false
      },
      refuseParams: {
        ids: "",
        status: 3,
        comment: ""
      }
    };
  },
  methods: {
    search(isbtn) {
      if (isbtn === true) {
        this.currentPage = 1;
      }
      var params = {};
      if (this.formInline.name === "username") {
        this.formInline.value ? (params.username = this.formInline.value) : "";
      } else if (this.formInline.name === "uid") {
        this.formInline.value ? (params.uid = this.formInline.value) : "";
      }
      this.formInline.status ? (params.status = this.formInline.status) : "";
      params.page = this.currentPage;
      params.rows = this.size;
      console.log(params);
      this.getMaterialList(params);
    },
    resetSearch() {
      this.formInline = { name: "username", value: "", status: "" };
      this.currentPage = 1;
      this.size = 10;
      this.search();
    },
    imgClick(params, i) {
      var arr = [];
      var data = JSON.parse(params);
      data.map(item => {
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
    handleSizeChange(val) {
      this.size = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    },
    handleSelectionChange(val) {
      this.multipleSelection = [];
      // console.log(val);
      val.map((item, index) => {
        this.multipleSelection.push(item.id);
      });
    },
    selectAll(val) {
      if (val.length > 0) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
    //获取拒绝理由
    refuseEvent(val) {
      this.refuseParams.comment = val;
      // console.log("refuse", this.refuseParams);
      this.saveEvent(this.refuseParams);
    },
    mapEvent(data) {
      this.dialogVisible.refuseDialog = data;
    },
    passClick(id) {
      var params = {
        ids: id,
        status: 2
      };
      this.saveEvent(params);
    },
    checkClick() {
      if (this.checked) {
        this.toggleSelection(true);
      } else {
        this.toggleSelection();
      }
    },
    batchPass() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning("未选中数据");
      } else {
        var params = {
          ids: this.multipleSelection.join(","),
          status: 2
        };
        this.saveEvent(params);
      }
    },
    toggleSelection(params) {
      if (params) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleAllSelection();
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    refuseClick(type, id) {
      if (type === "single") {
        this.dialogVisible.refuseDialog = true;
        this.refuseParams.ids = id;
      } else if (type === "batch") {
        if (this.multipleSelection.length === 0) {
          this.$message.warning("未选中数据");
        } else {
          this.dialogVisible.refuseDialog = true;
          this.refuseParams.ids = this.multipleSelection.join(",");
        }
      }
    },
    saveEvent(params) {
      API.materialSave(params).then(rs => {
        if (rs.code === 1) {
          this.$message.success("修改成功");
          this.search();
        } else {
          this.$message.error("修改失败：" + rs.msg);
        }
      });
    },
    getMaterialList(params) {
      this.checked = false;
      API.materialList(params).then(rs => {
        // console.log(rs)
        this.total = rs.total;
        this.tableData = rs.rows;
      });
    },
    //判断有没有滚动条
    hasScrollbar() {
      return (
        document.body.scrollHeight >
        (window.innerHeight || document.documentElement.clientHeight)
      );
    },
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop =
          document.documentElement.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 140) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    },
    mouseMoveEvent() {
      if (!document.querySelector(".el-image-viewer__wrapper")) {
        document.querySelector("body").style.overflow = "";
        document.querySelector("body").style.marginRight = "0";
      }
    }
  },
  created() {
    this.getMaterialList({ page: this.currentPage, rows: this.size });
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
    window.addEventListener("mousemove", this.mouseMoveEvent);
  },
  beforeDestory() {
    window.removeEventListener("scroll", this.scrollToTop);
    window.removeEventListener("mousemove", this.mouseMoveEvent);
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
    },
    urlFilter: function(value) {
      var result = "";
      var len = value.length - 22;
      if (len > 0) {
        var str = value.slice(15, 15 + len);
        result = value.replace(str, "···");
      } else {
        result = value;
      }
      return result;
    }
  }
};
</script>

<style lang='scss' scoped>
.material-box {
  position: relative;
  background: #fff;
  padding: 0 10px 10px 10px;
  overflow: hidden;
  min-height: 400px;
  .search-form {
    margin-top: 20px;
  }
  .status-fail {
    color: red;
  }
  .status-pass {
    color: green;
  }
  .group-btn {
    position: absolute;
    bottom: 20px;
    left: 20px;
  }
  .img-list {
    display: inline-block;
    width: 32px;
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
}
.go-top {
  position: fixed;
  right: 20px;
  bottom: 40px;
  cursor: pointer;
  font-size: 22px;
  background-color: #fff;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  color: #409eff;
  text-align: center;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  z-index: 6;
}
.go-top:hover {
  background: rgba(0, 0, 0, 0.12);
}
</style>
<style lang="scss">
.Material {
  .el-table {
    td,
    th {
      padding: 8px 0 !important;
    }
  }
  .el-image-viewer__btn.el-image-viewer__close {
    color: #fff;
  }
  .input-with-select .el-input-group__prepend .el-select {
    width: 100px;
  }
}
.el-message-box {
  width: 40%;
}
</style>

