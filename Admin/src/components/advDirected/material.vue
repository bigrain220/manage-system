<template>
  <div class="Material">
    <Header :title="title"></Header>
    <div class="content-box">
      <div class="material-box">
        <el-form :inline="true" :model="formInline" class="search-form" label-width="60px" size="medium ">
          <el-form-item label="">
            <el-input v-model="formInline.name_id" placeholder="请输入用户ID或用户名">
            </el-input>
          </el-form-item>
          <el-form-item label="状态:">
            <el-select v-model="formInline.status" placeholder="">
              <el-option label="全部" value="0"></el-option>
              <el-option label="待审核" value="1"></el-option>
              <el-option label="审核通过" value="2"></el-option>
              <el-option label="审核不通过" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table ref="multipleTable" :data="tableData"  style="width: 100%" @selection-change="handleSelectionChange" border stripe>
          <el-table-column type="selection" width="50">
          </el-table-column>
          <el-table-column label="物料名称" prop="name" width="180" align="center">
          </el-table-column>
          <el-table-column label="物料" align="center">
            <template slot-scope="scope">
              <!-- <a :href=scope.row.material v-for="(item,index) in 9" :key="index" target="_blank"> -->
                <el-image  :src=item class="img-list" :preview-src-list="srcList" v-for="(item,index) in scope.row.material" :key="index" @click="imgClick(scope.row.material,index)"></el-image>
              <!-- </a> -->
            </template>
          </el-table-column>
          <el-table-column label="UID" prop="uid" width="100" align="center">
          </el-table-column>
          <el-table-column label="用户名" prop="uname" width="100" align="center">
          </el-table-column>
          <el-table-column label="推广网址" prop="website" align="center">
          </el-table-column>
          <el-table-column label="状态" width="80" align="center">
            <template slot-scope="scope"><span :class="[scope.row.status==2?'status-pass':scope.row.status==3?'status-fail':'']">{{ scope.row.status|statusFilter }}</span></template>
          </el-table-column>
          <el-table-column label="更新时间" width="180" align="center">
            <template slot-scope="scope">{{ scope.row.update|timeFilter }}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="220">
            <template>
              <el-button type="primary" size="mini">审核通过</el-button>
              <el-button type="warning" size="mini">审核不通过</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="group-btn">
          <el-button type="primary" size="mini">批量审核通过</el-button>
          <el-button type="warning" size="mini">批量审核不通过</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sessionAPI } from "../../api/api";
import utils from "../../utils/utils";
import "../../utils/filters";
import Header from "../common/header";
export default {
  name: "Material",
  components: { Header },
  data() {
    return {
      title: "物料列表",
      formInline: {
        name_id: "",
        status: "0"
      },
      multipleSelection: [],
      srcList: [],
      tableData: [
        {
          name: "智通美妆培训学院",
          material:["https://cdn.img.fagua.net/site/50031418/c2_20191112151318_50951.jpg?imageView2/2/w/80","https://cdn.img.fagua.net/site/50031727/c2_20191118165025_48099.jpg?imageView2/2/w/80","https://cdn.img.fagua.net/site/50031727/c2_20191118165059_12880.jpg?imageView2/2/w/80","https://cdn.img.fagua.net/site/50031418/c2_20191112151318_50951.jpg?imageView2/2/w/80","https://cdn.img.fagua.net/site/50031418/c2_20191112151318_50951.jpg?imageView2/2/w/80","https://cdn.img.fagua.net/site/50031418/c2_20191112151318_50951.jpg?imageView2/2/w/80","https://cdn.img.fagua.net/site/50031418/c2_20191112151318_50951.jpg?imageView2/2/w/80","https://cdn.img.fagua.net/site/50031418/c2_20191112151318_50951.jpg?imageView2/2/w/80","https://cdn.img.fagua.net/site/50031418/c2_20191112151318_50951.jpg?imageView2/2/w/80","https://cdn.img.fagua.net/site/50031727/c2_20191118165344_70319.jpg?imageView2/2/w/80"],
          uid: 50002304,
          uname: "zqxr2017",
          website: "http://www.xinruihouba.com",
          status: 2,
          update: 1574058739636
        },
        {
          name: "智通美妆培训学院",
         material:["https://cdn.img.fagua.net/site/50031418/c2_20191112151318_50951.jpg?imageView2/2/w/80","https://cdn.img.fagua.net/site/50031418/c2_20191112151318_50951.jpg?imageView2/2/w/80","https://cdn.img.fagua.net/site/50031418/c2_20191112151318_50951.jpg?imageView2/2/w/80"],
          uid: 50002305,
          uname: "zqxr2017",
          website: "http://www.xinruihouba.com",
          status: 2,
          update: 1574058739636
        },
        {
          name: "智通美妆培训学院",
         material:["https://cdn.img.fagua.net/site/50031418/c2_20191112151318_50951.jpg?imageView2/2/w/80","https://cdn.img.fagua.net/site/50031418/c2_20191112151318_50951.jpg?imageView2/2/w/80","https://cdn.img.fagua.net/site/50031418/c2_20191112151318_50951.jpg?imageView2/2/w/80"],
          uid: 50002306,
          uname: "zqxr2017",
          website: "http://www.51g3.com.cn/hengshengwuye/about.html?cache=1",
          status: 1,
          update: 1574058739636
        },
        {
          name: "智通美妆培训学院",
         material:["https://cdn.img.fagua.net/site/50031418/c2_20191112151318_50951.jpg?imageView2/2/w/80","https://cdn.img.fagua.net/site/50031418/c2_20191112151318_50951.jpg?imageView2/2/w/80","https://cdn.img.fagua.net/site/50031418/c2_20191112151318_50951.jpg?imageView2/2/w/80"],
          uid: 50002307,
          uname: "zqxr2017",
          website: "http://www.xinruihouba.com",
          status: 3,
          update: 1574058739636
        }
      ]
    };
  },
  methods: {
    search() {},
    resetSearch() {
      this.formInline = { name_id: "", status: "0" };
    },
    handleSelectionChange(val) {
      this.multipleSelection=[];
      // console.log(val);
      val.map((item,index)=>{
        this.multipleSelection.push(item.uid)
      })
      console.log(this.multipleSelection)
      
    },
    imgClick(params,index){
      var arr=[];
      arr = [...params.slice(index),...params.slice(0,index)]
      this.srcList = arr;
    },
   
  },
  created() {
    //  utils.getCookie("session_val")==""?this.hasToken=false:this.hasToken=true;
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
          return "不通过";
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
  .search-form {
    margin-top: 20px;
  }
  .status-fail {
    color: red;
  }
  .status-pass {
    color: green;
  }
  .group-btn{
    padding: 24px 0;
  }
}
.img-list {
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-right: 2px;
  cursor: pointer;
}
</style>
<style>
.Material .el-table td,.Material .el-table th{padding: 8px 0!important;}
.el-image-viewer__btn.el-image-viewer__close{color: #fff;}
</style>

