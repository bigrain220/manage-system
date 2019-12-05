<template>
  <el-dialog :title='"投放列表( "+listDialogProps.title+" )"' :visible.sync="isShow" @closed="listMediadialogClose" class="directed-list-dialog" :close-on-click-modal="false">
    <el-form :inline="true" :model="listSearchForm" class="list-search-form" label-width="60px" size="mini">
      <el-form-item label="状态:">
        <el-select v-model="listSearchForm.status" placeholder="" style="width:100px;">
          <el-option label="全部" value=""></el-option>
          <el-option label="处理" :value="0"></el-option>
          <el-option label="待付" :value="1"></el-option>
          <el-option label="待投" :value="2"></el-option>
          <el-option label="已投" :value="3"></el-option>
          <el-option label="队列" :value="4"></el-option>
          <el-option label="完成" :value="5"></el-option>
          <el-option label="失败" :value="6"></el-option>
          <el-option label="退款" :value="7"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="listSearch(true)">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="listReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="tableData" style="width: 100%;max-height:60vh;overflow-y:auto;" @selection-change="handleSelectionChange" border stripe size="mini">
      <el-table-column type="selection" width="50">
      </el-table-column>
      <el-table-column label="标题" min-width="150">
        <template slot-scope="scope">
          <a :href="'//'+scope.row.page" target="_blank" :title="scope.row.page">{{scope.row.title}}</a>
        </template>
      </el-table-column>
      <!-- <el-table-column label="日均展现" prop="pv" width="80" align="center">
      </el-table-column> -->
      <el-table-column label="价格(币)" prop="price" width="100" align="center">
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.status | statusFilter}}
        </template>
      </el-table-column>
       <el-table-column label="投放过期时间"  align="center" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.expire_time!==0"> {{scope.row.expire_time | getLocalTime}}</span>
          <span v-if="scope.row.expire_time===0"> -- </span>
        </template>
      </el-table-column>
       <el-table-column label="备注" width="160" align="center">
          <template slot-scope="scope">
          <span v-if="scope.row.comment!=''"> {{scope.row.comment}}</span>
          <span v-if="scope.row.comment==''"> -- </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[ 20, 100,500,1000]" :page-size="size" layout="total, sizes, prev, pager, next" :total="total" :hide-on-single-page="true"></el-pagination>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isShow = false" size="small">取 消</el-button>
      <el-button type="primary" @click="listMediaSubmit" size="small">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import API from "../../api/api";
import "../../utils/filters"
export default {
  name: "directedListDialog",
  props: {
    listDialogProps: { type: Object }
  },
  data() {
    return {
      isShow: true,
      listSearchForm: {
        status: ""
      },
      tableData: [],
      multipleSelection: [],
      total: 10,
      size: 20,
      currentPage: 1
    };
  },
  methods: {
    listSearch(isbtn) {
      if (isbtn === true) {
        this.currentPage = 1;
      }
      var params = {};
      params.mid = this.listDialogProps.id;
      this.listSearchForm.status !== ""
        ? (params.status = this.listSearchForm.status)
        : "";
      (params.page = this.currentPage),
        (params.rows = this.size),
        console.log(params);
      this.getDirectedListData(params);
    },
    listReset() {
      this.listSearchForm = {
        status: ""
      };
      this.currentPage = 1;
      this.size = 20;
      this.listSearch();
    },
    listMediadialogClose() {
      this.isShow = false;
    },
    listMediaSubmit() {
      this.isShow = false;
    },
    handleSizeChange(val) {
      this.size = val;
      this.listSearch();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.listSearch();
    },
    handleSelectionChange() {},
    getDirectedListData(params) {
      API.spaceList(params).then(rs => {
        console.log(rs);
        this.total = rs.total;
        this.tableData = rs.rows;
      });
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
        case 0:
          return "处理";
          break;
        case 1:
          return "待付";
          break;
        case 2:
          return "待投";
          break;
        case 3:
          return "已投";
          break;
        case 4:
          return "队列";
          break;
        case 5:
          return "完成";
          break;
        case 6:
          return "失败";
          break;
        case 7:
          return "退款";
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
  // margin-top: 5vh!important;
  .el-dialog__title {
    font-size: 14px;
    font-weight: bold;
  }
  .el-dialog__body {
    padding-top: 20px;
    padding-bottom: 0px;
  }
}
</style>