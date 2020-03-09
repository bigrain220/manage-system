<template>
  <div class="page">
    <Header :title="title"></Header>
    <div class="content-box">
      <div class="page-box">
        <el-form :inline="true" :model="formInline" class="search-form" label-width="60px" size="medium ">
          <el-form-item label="数据:" class="from">
            <el-select v-model="formInline.from" placeholder="">
              <el-option label="ES" value="0"></el-option>
              <el-option label="DB" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input placeholder="请输入查找内容" v-model="formInline.value" class="input-with-select" @keydown.enter.native="search(true)" clearable>
              <el-select v-model="formInline.name" slot="prepend">
                <el-option label="用户名" value="username"></el-option>
                <el-option label="页面ID" value="id"></el-option>
                <el-option label="用户ID" value="uid"></el-option>
                <el-option label="标题" value="title"></el-option>
                <el-option label="地址" value="url"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item label="网站:" class="sid">
            <el-select v-model="formInline.sid" placeholder="">
              <el-option label="全部" value=""></el-option>
              <el-option label="其它" value="0"></el-option>
              <el-option v-for="item in siteIdData" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态:" class="status">
            <el-select v-model="formInline.status" placeholder="">
              <el-option label="全部" value=""></el-option>
              <el-option label="待投放" value="0"></el-option>
              <el-option label="已投放" value="1"></el-option>
              <el-option label="禁投放" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search(true)">查询</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table ref="multipleTable" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" @select-all="selectAll" border stripe v-loading="loading">
          <el-table-column type="selection" width="50">
          </el-table-column>
          <el-table-column label="页面ID" prop="id" width="100" align="center">
          </el-table-column>
          <el-table-column label="用户ID" prop="uid" width="100" align="center">
          </el-table-column>
          <el-table-column label="网站" width="160" align="center">
            <template slot-scope="scope">
              <span v-text="getFilters(scope.row.sid)"></span>
            </template>
          </el-table-column>
          <el-table-column label="标题">
            <template slot-scope="scope">
              <span v-html="scope.row.title"></span>
            </template>
          </el-table-column>
          <el-table-column label="地址" prop="page">
            <template slot-scope="scope">
              <a target="_blank" :href="'//'+emFilter(scope.row.page)" :title="emFilter(scope.row.page)" v-html="scope.row.page" ref="page"></a>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="80" align="center">
            <template slot-scope="scope"><span :class="[scope.row.status==1?'status-pass':scope.row.status==2?'status-fail':'']">{{ scope.row.status|statusFilter }}</span></template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="240">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="controlClick('wait','single',scope.row.id)">待投</el-button>
              <el-button type="success" size="mini" @click="controlClick('pass','single',scope.row.id)">已投</el-button>
              <el-button type="warning" size="mini" @click="controlClick('refuse','single',scope.row.id)">禁投</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[ 10, 50, 100,500,1000]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        <div class="group-btn">
          <el-checkbox v-model="checked" style="margin-right:14px;" @change="checkClick"></el-checkbox>
          <el-button type="primary" size="mini" @click="controlClick('wait','batch')">批量待投</el-button>
          <el-button type="success" size="mini" @click="controlClick('pass','batch')">批量已投</el-button>
          <el-button type="warning" size="mini" @click="controlClick('refuse','batch')">批量禁投</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../../api/api";
import Header from "../common/header";
export default {
  name: "pageManage",
  components: { Header },
  data() {
    return {
      title: "页面列表",
      total: 10,
      size: 10,
      currentPage: 1,
      formInline: {
        name: "username",
        value: "",
        from: "0",
        sid: "",
        status: ""
      },
      tableData: [],
      multipleSelection: [],
      checked: false,
      loading: false,
      siteIdData: []
    };
  },
  methods: {
    search(isbtn) {
      if (isbtn === true) {
        this.currentPage = 1;
      }
      var params = {};
      this.formInline.value
        ? (params[this.formInline.name] = this.formInline.value)
        : "";
      this.formInline.from ? (params.from = this.formInline.from) : "";
      this.formInline.sid ? (params.sid = this.formInline.sid) : "";
      this.formInline.status ? (params.status = this.formInline.status) : "";
      params.page = this.currentPage;
      params.rows = this.size;
      // console.log(params);
      this.getPagelList(params);
    },
    resetSearch() {
      this.formInline = {
        name: "username",
        value: "",
        from: "0",
        sid: "",
        status: ""
      };
      this.currentPage = 1;
      this.size = 10;
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
    checkClick() {
      if (this.checked) {
        this.toggleSelection(true);
      } else {
        this.toggleSelection();
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
    controlClick(control, type, id) {
      var params = {
        ids: "",
        status: ""
      };
      control === "wait"
        ? (params.status = "0")
        : control === "pass"
        ? (params.status = "1")
        : control === "refuse"
        ? (params.status = "2")
        : "";
      if (type === "single") {
        params.ids = id;
        this.saveEvent(params);
      } else if (type === "batch") {
        if (this.multipleSelection.length === 0) {
          this.$message.warning("未选中数据");
        } else {
          params.ids = this.multipleSelection.join(",");
          this.saveEvent(params);
        }
      }
    },
    saveEvent(params) {
      API.pageStatus(params).then(rs => {
        if (rs.code === 1) {
          this.loading = true;
          var timer = null;
          clearTimeout(timer);
          timer = setTimeout(() => {
            this.search();
            this.loading = false;
            this.$message.success("修改成功");
          }, 1000);
          // this.search();
        } else {
          this.$message.error("修改失败：" + rs.msg);
        }
      });
    },
    getPagelList(params) {
      this.checked = false;
      this.loading = true;
      API.pageList(params).then(rs => {
        this.total = rs.total;
        this.tableData = rs.rows;
        this.loading = false;
      });
    },
    getFilters(value) {
      var data = this.siteIdData.find(x => x.id === value);
      if (data) {
        return data.name;
      }
    },
    emFilter: function(value) {
      return value.replace(/<em>/g, "").replace(/<\/em>/g, "");
    }
  },
  mounted() {
    this.getPagelList({ page: this.currentPage, rows: this.size });
    API.siteGet().then(res => (this.siteIdData = res));
  },
  filters: {
    statusFilter: function(value) {
      switch (value) {
        case 0:
          return "待投放";
          break;
        case 1:
          return "已投放";
          break;
        case 2:
          return "禁投放";
          break;
        default:
          return value;
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page-box {
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
}
</style>
<style lang="scss">
.page-box {
  .input-with-select .el-input-group__prepend .el-select {
    width: 100px;
  }
  .cell span em,
  .cell a em {
    color: red !important;
  }
  .from,
  .sid,
  .status {
    .el-form-item__content {
      width: 140px;
    }
  }
}
</style>