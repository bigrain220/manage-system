<template>
  <el-dialog :title='"广告投放( "+directedObj.directedTitle+" )"' :visible.sync="isShow" @closed="directedMediadialogClose" class="directed-dialog" :close-on-click-modal="false">
    <el-form :inline="true" class="search-form" label-width="60px" size="mini">
      <el-form-item label="关键词:">
        <el-input placeholder="请输入内容" v-model="searchWord" clearable :maxlength="12"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" border stripe size="mini">
      <el-table-column type="selection" width="50">
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          <a :href="'//'+scope.row.page" target="_blank" :title="scope.row.page">{{scope.row.title}}</a>
        </template>
      </el-table-column>
      <el-table-column label="日均展现" prop="pv" width="160">
      </el-table-column>
      <el-table-column label="价格(元)" prop="price" width="160">
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[ 50, 100,500,1000]" :page-size="size" layout="total, sizes, prev, pager, next" :total="total" :hide-on-single-page="true"></el-pagination>
    <div slot="footer" class="dialog-footer">
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
      searchWord: "",
      tableData: [],
      multipleSelection: [],
      total: 10,
      size: 50,
      currentPage: 1,
      allTotal: null,
      allMultipleSelection: []
    };
  },
  methods: {
    getDirectedData() {
      var params = {};
      params.page = this.currentPage;
      params.rows = this.size;
      this.searchWord ? (params.word = this.searchWord) : "";
      API.spaceSearch(params).then(rs => {
        this.total = rs.total;
        this.tableData = rs.rows;
      });
    },
    search() {
      this.getDirectedData();
    },
    reset() {
      this.searchWord = "";
      this.search();
    },
    handleSizeChange(val) {
      this.size = val;
      this.getDirectedData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDirectedData();
    },
    directedAction(type) {
      if (type === "selected") {
        var params = {
          mid: this.directedObj.directedID,
          pids: this.multipleSelection.join(",")
        };
      } else if (type === "all") {
        var params = {
          mid: this.directedObj.directedID,
          pids: this.allMultipleSelection.join(",")
        };
      }
      API.spacePutin(params).then(rs => {
        if (rs.msg === "ILLEGAL_COIN_NOT_ENOUGH") {
          this.$confirm("投放失败，余额不足，是否前往充值?", "广告投放", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {})
            .catch(() => {});
        } else if (rs.code === 1) {
          this.$alert("投放成功", "广告投放", {
            confirmButtonText: "确定",
            callback: action => {}
          });
        } else {
          this.$alert("投放失败：" + rs.msg, "广告投放", {
            confirmButtonText: "确定",
            callback: action => {}
          });
        }
      });
    },
    selectedDirected() {
      if (this.multipleSelection.length > 0) {
        this.directedAction("selected");
      } else {
        this.$message.warning("你尚未选中任何广告");
      }
    },
    allDirected() {
      this.allMultipleSelection = [];
      API.spaceSearch({ page: 1, rows: 10000 }).then(rs => {
        this.allTotal = rs.total;
        rs.rows.map((item, index) => {
          this.allMultipleSelection.push(item.id);
        });
        this.$confirm(
          "确认要投放所有 " + this.allTotal + " 条广告?",
          "广告投放",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            if (this.allMultipleSelection.length > 0) {
              this.directedAction("all");
            } else {
              this.$message.warning("暂无数据");
            }
          })
          .catch(() => {});
      });
    },
    directedMediadialogClose() {
      this.isShow = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = [];
      val.map((item, index) => {
        this.multipleSelection.push(item.id);
      });
      // console.log(this.multipleSelection);
    }
  },
  mounted() {
    this.getDirectedData();
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
  width: 60%;
  .el-dialog__title {
    font-size: 14px;
    font-weight: bold;
  }
  .el-dialog__body {
    padding-top: 20px;
  }
}
</style>