<template>
  <div class="advertise-page">
    <el-form :inline="true" :model="searchForm" class="search-form" label-width="60px" size="medium">
      <el-form-item label="">
        <el-input placeholder="请输入查找内容" v-model="searchForm.value" class="input-with-select" @keydown.enter.native="search(true)" clearable>
          <el-select v-model="searchForm.name" slot="prepend">
            <el-option label="名称" value="name"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search(true)">查询</el-button>
        <el-button @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>
    <table-page-table :typeVal="typeVal" :allTableData="allTableData" :pageSize="size" :currentPage="currentPage"></table-page-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[ 10,20, 50]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total" :hide-on-single-page="false"></el-pagination>
  </div>
</template>

<script>
import API from "@/api/api";
export default {
  name: "tablePage",
  props: {
    options: { type: String, required: true }
  },
  components: {
    tablePageTable: () => import("./tablePageTable")
  },
  data() {
    return {
      typeVal: "adtype",
      searchForm: {
        name: "name",
        value: ""
      },
      allTableData: [],
      total: 10,
      size: 10,
      currentPage: 1
    };
  },
  methods: {
    search(isbtn) {
      if (isbtn === true) {
        this.currentPage = 1;
      }
      var params = {};
      this.searchForm.value ? (params.name = this.searchForm.value) : "";
      params.page = this.currentPage;
      params.rows = this.size;
      //   console.log(params);
      this.getTableData(params);
    },
    resetSearch() {
      this.searchForm = { name: "name", value: "" };
      this.currentPage = 1;
      this.size = 10;
      this.search();
    },
    getTableData(params) {
      switch (this.typeVal) {
        case "adtype":
          API.typeList(params).then(res => {
            this.total = res.total;
            this.allTableData = res.rows;
          });
          break;
        case "adsize":
          API.sizeList(params).then(res => {
            this.total = res.total;
            this.allTableData = res.rows;
          });
          break;
        case "adstyle":
          API.styleList(params).then(res => {
            this.total = res.total;
            this.allTableData = res.rows;
          });
          break;
        case "adunit":
          API.unitList(params).then(res => {
            this.total = res.total;
            this.allTableData = res.rows;
          });
          break;
        default:
          break;
      }
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
    this.getTableData({ page: this.currentPage, rows: this.size });
  },
  watch: {
    options: function(val) {
      this.typeVal = val;
      this.resetSearch();
    },
    total() {
      if (this.total == (this.currentPage - 1) * this.size && this.total != 0) {
        this.currentPage -= 1;
        this.search(); //获取列表数据
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.advertise-page {
  .search-form {
    margin-top: 20px;
  }
}
</style>
<style lang="scss">
.advertise-page {
  .search-form {
    .input-with-select .el-input-group__prepend .el-select {
      width: 100px;
    }
  }
}
</style>