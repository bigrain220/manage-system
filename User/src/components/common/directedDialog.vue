<template>
  <el-dialog :title='"广告投放( "+directedObj.directedTitle+" )"' :visible.sync="isShow" @closed="directedMediadialogClose" class="directed-dialog" :close-on-click-modal="false" v-loading="isLoading" element-loading-text="正在投放中...">
    <el-form :inline="true" class="search-form" label-width="60px" size="mini" @submit.native.prevent>
      <el-form-item label="关键词:">
        <el-input placeholder="请输入内容" v-model="searchWord" clearable :maxlength="12" @keydown.enter.native="search(true)"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search(true)">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
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
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[ 50, 100,500,1000]" :page-size="size" layout="total, sizes, prev, pager, next" :total="total" :hide-on-single-page="true"></el-pagination>
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
      searchWord: "",
      tableData: [],
      selectTotal: null,
      priceTotal: 0,
      multipleSelection: [],
      total: 10,
      size: 50,
      currentPage: 1
    };
  },
  methods: {
    getDirectedData(params) {
      API.spaceSearch(params).then(rs => {
        this.total = rs.total;
        this.tableData = rs.rows;
        this.tableData.map(item => {
          item.unitPriceSum = this.directedObj.directedDays * item.price;
        });
      });
    },
    search(isbtn) {
      if (isbtn === true) {
        this.currentPage = 1;
      }
      var params = {};
      params.page = this.currentPage;
      params.rows = this.size;
      this.searchWord ? (params.word = this.searchWord) : "";
      this.getDirectedData(params);
    },
    reset() {
      this.searchWord = "";
      this.currentPage = 1;
      this.size = 50;
      this.search();
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
          this.isLoading = true;
          var timer = null;
          clearTimeout(timer);
          timer = setTimeout(() => {
            this.search();
            this.isLoading = false;
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
    directedMediadialogClose() {
      this.isShow = false;
    },
    handleSelectionChange(val) {
      // console.log(val,'select')
      this.multipleSelection = [];
      this.priceTotal = 0;
      this.selectTotal = val.length;
      val.map((item, index) => {
        this.multipleSelection.push(item.id);
      });
      this.priceTotal = this.accMul(val[0].unitPriceSum, this.size);
      // console.log(this.multipleSelection);
    },
    accMul(arg1, arg2) {
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
      try {
        m += s1.split(".")[1].length;
      } catch (e) {}
      try {
        m += s2.split(".")[1].length;
      } catch (e) {}
      return (
        (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
        Math.pow(10, m)
      );
    }
  },
  mounted() {
    this.search();
  },
  watch: {
    isShow(val) {
      this.$emit("mapEvent", val);
    }
  },
 
};
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.directed-dialog .el-dialog {
  width: 60%;
  margin-top: 10vh !important;
  .el-dialog__title {
    font-size: 14px;
    font-weight: bold;
  }
  .el-dialog__body {
    padding-top: 20px;
  }
  .table-box {
    width: 100%;
    position: relative;
    max-height: 44vh;
    overflow-y: auto;
    a em{
      color:red;
      font-style: normal;
    }
  }
}
</style>