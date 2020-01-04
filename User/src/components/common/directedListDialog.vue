<template>
  <div>
    <el-dialog :title='"投放列表( "+listDialogProps.title+" )"' :visible.sync="isShow" @closed="listMediadialogClose" class="directed-list-dialog" :close-on-click-modal="false">
      <el-tabs v-model="listSearchForm.status" @tab-click="handleClick">
        <el-tab-pane label="全部" name="all"></el-tab-pane>
        <el-tab-pane label="待付款" name="1"></el-tab-pane>
        <el-tab-pane label="队列中" name="2"></el-tab-pane>
        <el-tab-pane label="投放中" name="3"></el-tab-pane>
        <el-tab-pane label="已完成" name="4"></el-tab-pane>
        <el-tab-pane label="退款中" name="5"></el-tab-pane>
        <el-tab-pane label="已退款" name="6"></el-tab-pane>
      </el-tabs>

      <div class="table-box">
        <el-table ref="multipleTable" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" border stripe size="mini">
          <el-table-column type="selection" width="50" :selectable="checkSelectable">
          </el-table-column>
          <el-table-column label="标题" min-width="150">
            <template slot-scope="scope">
              <a :href="'//'+scope.row.page" target="_blank" :title="scope.row.page">{{scope.row.title}}</a>
            </template>
          </el-table-column>
          <el-table-column label="价格(币/天)" prop="price" width="100" align="center"></el-table-column>
          <el-table-column label="退款(币)" width="100" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.refund!=0.00"> {{scope.row.refund}}</span>
              <span v-if="scope.row.refund==0.00"> -- </span>
            </template>
          </el-table-column>
          <el-table-column label="总计(币)" prop="total" width="100" align="center"></el-table-column>
          <el-table-column label="创建时间" align="center" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.create_time!==0"> {{scope.row.create_time | getLocalTime}}</span>
              <span v-if="scope.row.create_time===0"> -- </span>
            </template>
          </el-table-column>
          <el-table-column label="过期时间" align="center" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.expire_time!==0"> {{scope.row.expire_time | getLocalTime}}</span>
              <span v-if="scope.row.expire_time===0"> -- </span>
            </template>
          </el-table-column>
          <el-table-column label="备注" width="160" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.comment==''|| scope.row.comment==null "> -- </span>
              <span v-else> {{scope.row.comment}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100" align="center">
            <template slot-scope="scope">
              {{scope.row.status | statusFilter}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[ 10, 20,50,100]" :page-size="size" layout="total, sizes, prev, pager, next" :total="total" :hide-on-single-page="false"></el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="listMediaRefund" size="small">退款(投放中)</el-button>
      </div>
    </el-dialog>
    <!-- refundDialog -->
    <refund-dialog v-if="dialogVisible.refundDialog" @refundEvent="refundEvent" @mapEvent="mapEvent"></refund-dialog>
  </div>
</template>

<script>
import API from "../../api/api";
import "../../utils/filters";
export default {
  name: "directedListDialog",
  components: {
    refundDialog: () => import("./refundDialog")
  },
  props: {
    listDialogProps: { type: Object }
  },
  data() {
    return {
      activeName: "",
      isShow: true,
      listSearchForm: {
        status: "all"
      },
      dialogVisible: {
        refundDialog: false
      },
      tableData: [],
      multipleSelection: [],
      total: 10,
      size: 10,
      currentPage: 1,
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
      this.listSearch(true);
    },
    listSearch(isbtn) {
      if (isbtn === true) {
        this.currentPage = 1;
      }
      var params = {};
      params.mid = this.listDialogProps.id;
      this.listSearchForm.status !== "all"
        ? (params.status = this.listSearchForm.status)
        : "";
      (params.page = this.currentPage),
        (params.rows = this.size),
        // console.log(params);
        this.getDirectedListData(params);
    },
    listReset() {
      this.listSearchForm = {
        status: "all"
      };
      this.currentPage = 1;
      this.size = 10;
      this.listSearch();
    },
    listMediadialogClose() {
      this.isShow = false;
    },
    listMediaRefund() {
      if (this.multipleSelection.length == 0) {
        this.$alert("请先勾选退款项目", "退款", {
          type: "warning",
          confirmButtonText: "确定",
          callback: action => {}
        });
      } else {
        this.dialogVisible.refundDialog = true;
      }
    },
    refundAction(val) {
      var params = {
        ids: this.multipleSelection.join(","),
        comment: val
      };
      API.spaceRefund(params).then(rs => {
        if (rs.code === 1) {
          this.$message.success("退款成功");
          this.listSearch(true);
        } else if (rs.msg === "ILLEGAL_ACCESS_DENIED") {
          this.$message.error("退款失败: 演示模式，拒绝操作");
        } else {
          this.$message.error("退款失败" + rs.msg);
        }
      });
    },
    handleSizeChange(val) {
      this.size = val;
      this.listSearch();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.listSearch();
    },
    handleSelectionChange(val) {
      // console.log(val);
      this.multipleSelection = [];
      val.map((item, index) => {
        this.multipleSelection.push(item.id);
      });
    },
    checkSelectable(row, index) {
      // console.log(row,index)
      return row.status == 3;
    },
    getDirectedListData(params) {
      API.spaceList(params).then(rs => {
        console.log(rs);
        this.total = rs.total;
        this.tableData = rs.rows;
      });
    },
    //获取退款理由
    refundEvent(val) {
      this.refundAction(val);
    },
    mapEvent(data) {
      this.dialogVisible.refundDialog = data;
    }
  },
  mounted() {
    this.getDirectedListData({
      page: this.currentPage,
      rows: this.size,
      mid: this.listDialogProps.id
    });
  },
  filters: {
    statusFilter: function(value) {
      switch (value) {
        case 1:
          return "待付款";
          break;
        case 2:
          return "队列中";
          break;
        case 3:
          return "投放中";
          break;
        case 4:
          return "已完成";
          break;
        case 5:
          return "退款中";
          break;
        case 6:
          return "已退款";
          break;
        default:
          return value;
          break;
      }
    }
  },
  watch: {
    isShow(val) {
      this.$emit("listEvent", val);
    }
  }
};
</script>

<style lang="scss">
.directed-list-dialog .el-dialog {
  width: 70%;
  margin-top: 10vh !important;
  .el-dialog__title {
    font-size: 14px;
    font-weight: bold;
  }
  .el-dialog__body {
    padding-top: 20px;
    padding-bottom: 0px;
  }
  .el-tabs__header {
    margin: 0 0 10px;
  }
  .el-tabs__nav-wrap::after {
    height: 2px;
  }
  .table-box {
    width: 100%;
    position: relative;
    max-height: 44vh;
    overflow-y: auto;
  }
}
</style>