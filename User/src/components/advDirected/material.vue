<template>
  <div class="Material">
    <Header :title="title"></Header>
    <div class="content-box">
      <div class="material-box">
        <el-button type="primary" size="medium" class="add-btn" @click="addClick()">创建物料</el-button>
        <el-table :data="tableData" style="width: 100%;margin-top:86px;" border stripe>
          <el-table-column label="物料名称" prop="name" width="180" align="center">
          </el-table-column>
          <el-table-column label="物料" align="center">
            <template slot-scope="scope">
              <img :src=item.img_url class="img-list"  v-for="(item,index) in scope.row.imgs" :key="item.id" @click="imgClick(scope.row.imgs,index)" title="点击查看大图"></img>
            </template>
          </el-table-column>
          <el-table-column label="推广网址" prop="url" align="center" width="320">
          </el-table-column>
          <el-table-column label="状态" width="120" align="center">
            <template slot-scope="scope"><span :class="[scope.row.status==2?'status-pass':scope.row.status==3?'status-fail':'']">{{ scope.row.status|statusFilter }}</span></template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="editClick(scope.row)"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteClick"></el-button>
            </template>
          </el-table-column>
        </el-table>
       	<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[ 10, 20, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total" :hide-on-single-page="true" ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../../api/api";
import utils from "../../utils/utils";
import Header from "../common/header";
export default {
  name: "Material",
  components: { Header },
  data() {
    return {
      title: "媒体物料",
      total:10,
      size:10,
      currentPage:1,
      tableData:[],
    };
  },
  methods: {
    getMaterialList() {
      API.materialList({ page: this.currentPage, rows: this.size }).then(rs=>{
        console.log(rs);
        this.total = rs.total;
        this.tableData = rs.rows;
        this.tableData.map((item,index)=>{
          item.imgs= JSON.parse(item.imgs);
        })
      });
    },
    handleSizeChange(val){
      this.size = val;
      this.getMaterialList();
    },
    handleCurrentChange(val){
      this.currentPage = val;
      this.getMaterialList();
    },
    addClick() {},
    imgClick(params,index) {
      window.open(params[index].img_url);
    },
    editClick(params) {
      console.log(params);
    },
    deleteClick() {
      this.$confirm("删除后无法恢复, 是否继续删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getMaterialList();
  },
  filters: {
    statusFilter: function(value) {
      switch (value) {
        case 1:
          return "待审核";
          break;
        case 2:
          return "审核通过";
          break;
        case 3:
          return "审核不通过";
          break;
        default:
          return value;
          break;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.material-box {
  background: #fff;
  padding: 0 10px;
  overflow: hidden;
  min-height: 400px;
  position: relative;
  .add-btn {
    position: absolute;
    right: 50px;
    top: 20px;
  }
  .status-fail {
    color: red;
  }
  .status-pass {
    color: green;
  }
}
.img-list {
  display: inline-block;
  height: 32px;
  margin-right: 2px;
  cursor: pointer;
}
</style>
<style>
/* .Material .el-table td,
.Material .el-table th {
  padding: 8px 0 !important;
} */
.el-image-viewer__btn.el-image-viewer__close {
  color: #fff;
}
</style>
