<template>
  <el-dialog :title='"广告投放( "+directedObj.directedTitle+" )"' :visible.sync="isShow" @closed="directedMediadialogClose" class="directed-dialog" :fullscreen="isFullscreen" :close-on-click-modal="false" v-loading="isLoading" element-loading-text="正在投放中...">
    <el-form :inline="true" class="search-form" label-width="60px" size="mini" @submit.native.prevent>
      <el-form-item label="">
        <el-input placeholder="请输入内容" v-model="searchWord" @keydown.enter.native="search(true)">
          <el-select v-model="selectValue" slot="prepend" placeholder="请选择">
            <!-- <el-option label="全部" value=""></el-option> -->
            <el-option label="标题" value="title"></el-option>
            <el-option label="地址" value="url"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search(true)">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <span slot="title" class="el-icon-full-screen full-screen-btn" @click="fullscreenClick"></span>
    <div class="table-box" v-loading="isLoading2">
      <el-table ref="multipleTable" :data="tableData" style="width: 100%;" @selection-change="handleSelectionChange" border stripe size="mini">
        <el-table-column type="selection" width="50">
        </el-table-column>
        <el-table-column label="标题">
          <template slot-scope="scope">
            <a :href="'//'+scope.row.page" target="_blank" :title="scope.row.page" v-html="scope.row.title"></a>
          </template>
        </el-table-column>
        <el-table-column label="日均展现" prop="pv" width="140" align="center">
        </el-table-column>
        <el-table-column label="价格(币/天)" prop="price" width="140" align="center">
        </el-table-column>
        <el-table-column label="总价(币)" prop="unitPriceSum" width="140" align="center">
        </el-table-column>
      </el-table>
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[ 100, 200,500,1000]" :page-size="size" layout="total, sizes, prev, pager, next" :total="total"></el-pagination>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" size="mini" style="float:left;cursor:default;color:#333;">合计: {{priceTotal}} 币</el-button>
      <el-button type="primary" @click="allDirected" size="mini">全部投放</el-button>
      <el-button type="primary" @click="selectedDirected" size="mini">选中投放</el-button>
    </div>
  </el-dialog>
</template>
<script>
import API from "../../api/api";
export default {
  name: "directedDialog",
  props: {
    directedObj: { type: Object }
  },
  data() {
    return {
      isShow: true,
      isLoading: false,
      isLoading2: false,
      isFullscreen: false,
      searchWord: "",
      selectValue: "title",
      tableData: [],
      selectTotal: null,
      priceTotal: 0,
      multipleSelection: [],
      total: 10,
      size: 100,
      currentPage: 1
    };
  },
  methods: {
    getDirectedData(params) {
      this.isLoading2 = true;
      API.spaceSearch(params).then(rs => {
        this.total = rs.total;
        this.tableData = rs.rows;
        this.tableData.map(item => {
          item.unitPriceSum = this.directedObj.directedDays * item.price;
        });
        this.isLoading2 = false;
      });
    },
    search(isbtn) {
      if (isbtn === true) {
        this.currentPage = 1;
      }
      var params = {};
      params.page = this.currentPage;
      params.rows = this.size;
      this.searchWord ? (params[this.selectValue] = this.searchWord) : "";
      // console.log(params)
      this.getDirectedData(params);
    },
    reset() {
      this.searchWord = "";
      this.currentPage = 1;
      this.size = 100;
      this.getDirectedData({ page: this.currentPage, rows: this.size });
    },
    handleSizeChange(val) {
      this.size = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    },
    directedAction() {
      var params = {
        mid: this.directedObj.directedID,
        pids: this.multipleSelection.join(",")
      };
      this.isLoading = true;
      API.spacePutin(params).then(rs => {
        this.isLoading = false;
        if (rs.msg === "ILLEGAL_COIN_NOT_ENOUGH") {
          this.$confirm("投放失败，余额不足，请前往充值?", "广告投放", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {})
            .catch(() => {});
        } else if (rs.code === 1) {
          var timer = null;
          clearTimeout(timer);
          timer = setTimeout(() => {
            this.search();
            this.$alert("投放成功", "广告投放", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {}
            });
          }, 3000);
        } else if (rs.msg === "ILLEGAL_ACCESS_DENIED") {
          this.$alert("投放失败：演示模式，拒绝操作", "广告投放", {
            confirmButtonText: "确定",
            type: "error",
            callback: action => {}
          });
        } else if (rs.msg === "ILLEGAL_SIZE_NOT_MATCH") {
          this.$alert("投放失败：页面广告已被他人投放", "广告投放", {
            confirmButtonText: "确定",
            type: "error",
            callback: action => {}
          });
        } else if (rs.msg === "ILLEGAL_MATERIAL_STATUS") {
          this.$alert("投放失败：物料状态需要通过审核", "广告投放", {
            confirmButtonText: "确定",
            type: "error",
            callback: action => {}
          });
        } else if (rs.msg === "ILLEGAL_MEDIA_DAY") {
          this.$alert("投放失败：广告投放天数错误", "广告投放", {
            confirmButtonText: "确定",
            type: "error",
            callback: action => {}
          });
        } else {
          this.$alert("投放失败：" + rs.msg, "广告投放", {
            confirmButtonText: "确定",
            type: "error",
            callback: action => {}
          });
        }
      });
    },
    selectedDirected() {
      if (this.multipleSelection.length > 0) {
        this.$confirm(
          "将消耗 " +
            this.priceTotal +
            " 币投放 " +
            this.selectTotal +
            " 条广告",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.directedAction();
          })
          .catch(err => {});
      } else {
        this.$message.warning("你尚未选中任何广告");
      }
    },
    allDirected() {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleAllSelection();
      var timer = null;
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.selectedDirected();
      }, 500);
    },
    fullscreenClick() {
      this.isFullscreen = !this.isFullscreen;
    },
    directedMediadialogClose() {
       this.isShow =false;
      // this.$emit("update:isShow", false);
      this.isFullscreen = false;
    },
    handleSelectionChange(val) {
      // console.log(val, "select");
      this.multipleSelection = [];
      this.priceTotal = 0;
      this.selectTotal = val.length;
      val.map((item, index) => {
        this.multipleSelection.push(item.id);
        // 通过原函数计算
        // this.priceTotal=  this.accAdd(this.priceTotal,item.unitPriceSum);
        // 通过构造函数计算
        this.priceTotal = Number(this.priceTotal).getAdd(item.unitPriceSum);
      });
      // console.log(this.multipleSelection);
    },
    accAdd(arg1, arg2) {
      var r1, r2, m;
      try {
        r1 = arg1.toString().split(".")[1].length;
      } catch (e) {
        r1 = 0;
      }

      try {
        r2 = arg2.toString().split(".")[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      // return (arg1 * m + arg2 * m) / m;
      return Math.round(((arg1 * m + arg2 * m) / m) * 100) / 100;
    }
  },
  mounted() {
    this.getDirectedData({ page: this.currentPage, rows: this.size });
    //给运算添加prototype
    var that = this;
    Number.prototype.getAdd = function(val) {
      return that.accAdd(this, val);
    };
  },
  watch: {
    isShow(val) {
      this.$emit("mapEvent", val);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.directed-dialog .el-dialog {
  // width: 60%;
  // margin-top: 10vh !important;
  .search-form .el-select .el-input__inner {
    width: 76px;
  }
  .el-dialog__title {
    font-size: 14px;
    font-weight: bold;
  }
  .el-dialog__header{
    position: relative;
  }
  .el-dialog__body {
    padding-top: 20px;
  }
  .full-screen-btn {
    position: absolute;
    right: 50px;
    bottom: -6px;
    cursor: pointer;
  }
  .table-box {
    width: 100%;
    position: relative;
    max-height: 44vh;
    overflow-y: auto;
    a em {
      color: red;
      font-style: normal;
    }
  }
}
.directed-dialog .el-dialog.is-fullscreen {
  .table-box {
    max-height: 64vh;
  }
}
</style>