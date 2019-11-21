<template>
  <div>
    <Header :title="title"></Header>
    <div class="content-box">
      <div class="unit-box">
        <el-form :inline="true" :model="formInline" class="search-form" label-width="60px" size="medium">
          <el-form-item label="物料:">
            <el-select v-model="formInline.material" placeholder="">
              <el-option label="全部" value="0"></el-option>
              <el-option label="南方网通" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态:">
            <el-select v-model="formInline.status" placeholder="">
              <el-option label="全部" value="0"></el-option>
              <el-option label="待投放" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
            <el-button type="success">重置</el-button>
          </el-form-item>
          <el-form-item style="float:right;margin-right:40px;">
            <el-button type="primary" @click="dialogVisible.newUnitdialogVisible = true">创建单元</el-button>
          </el-form-item>
        </el-form>
        <el-table ref="unitTable" :data="tableData" style="width: 100%" size="medium">
          <el-table-column type="index" width="40"></el-table-column>
          <el-table-column label="单元名称" min-width="180">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="选择物料" width="120" align="center">
            <template slot-scope="scope">
              <el-select placeholder="选择物料" size="mini" v-model="scope.row.mid">
                <el-option :value="1" label="南方网通"></el-option>
                <el-option :value="10" label="zzztest"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="投放时间(天)" width="120" align="center">
            <template slot-scope="scope">
              <!-- <el-select placeholder="请选择" size="mini" v-model="scope.row.days">
                <el-option v-for="item in 23" :key="item" :label="(item+6)+'天'" :value="(item+6)">
                </el-option>
              </el-select> -->
              <el-input-number size="mini" v-model="scope.row.days" :min="7" :max="30" style="width:80%;" @blur="daysBlur(scope.row.days,scope.row.id)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="选择广告" min-width="90" align="center">
            <template>选择</template>
          </el-table-column>
          <el-table-column label="待投放队列" min-width="90" align="center">
            <template slot-scope="scope">{{ scope.row.dai_put }}</template>
          </el-table-column>
          <el-table-column label="费用预算" min-width="90" align="center">
            <template slot-scope="scope">{{ scope.row.money }}元</template>
          </el-table-column>
          <el-table-column label="状态" min-width="80" align="center">
            <template slot-scope="scope"><span :class="[scope.row.status==1?'status-going':scope.row.status==2?'status-over':'']">{{ scope.row.status | statusFilter}}</span></template>
          </el-table-column>
          <el-table-column label="正在投放" min-width="80" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1">查看</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column label="投放失败" min-width="80" align="center">
            <template>查看</template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="makeSure(scope.row)" v-if="scope.row.dai_put!==0">投放</el-button>
              <el-button size="mini" type="danger" @click="deleteSure(scope.row)" v-if="scope.row.status!==1">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- dialog -->
    <el-dialog title="新建单元名称" :visible.sync="dialogVisible.newUnitdialogVisible" @closed="newUnitdialogClose">
      <el-form :inline="true" ref="newUnitForm" :rules="newUnitRules" :model="newUnitForm">
        <el-form-item label="单元名称：" label-width="100" prop="name">
          <el-input autocomplete="off" v-model="newUnitForm.name" style="width:120%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible.newUnitdialogVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="newUnitSubmit" size="medium">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Header from "../common/header";
import "../../utils/filters";
export default {
  name: "unit",
  components: { Header },
  data() {
    return {
      title: "单元管理",
      formInline: {
        material: "0",
        status: "0"
      },
      allData: "",
      tableData: [],
      newUnitForm: {name:""},
      dialogVisible: {
        newUnitdialogVisible: false
      },
      newUnitRules:{ 
         name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
      },
    };
  },
  methods: {
    search() {
      console.log(this.formInline);
    },
    init() {
      this.allData = {
        rows: [
          {
            id: 79800,
            name: "\u6d4b\u8bd5\u5355\u514311111111",
            uid: 34053736,
            mid: "",
            days: 0,
            type: 1,
            status: 0,
            pv_time: 1574149898,
            last_rank_time: 0,
            direct_time: 0,
            expire_time: 0,
            create_time: 1574149898,
            dai_put: 0,
            money: 0
          },
          {
            id: 64735,
            name: "\u5982\u4e00\u65e5\u4e00\u4eba\u540c\u610f1",
            uid: 34053736,
            mid: 1,
            days: 7,
            type: 1,
            status: 1,
            pv_time: 1552006448,
            last_rank_time: 0,
            direct_time: 0,
            expire_time: 1574736009,
            create_time: 1552006448,
            dai_put: 0,
            money: 0
          },
          {
            id: 64524,
            name: "\u4ed6\u4e0e\u5979\u4e0e\u4ed6\u7389\u5154",
            uid: 34053736,
            mid: 10,
            days: 7,
            type: 1,
            status: 2,
            pv_time: 1551774517,
            last_rank_time: 0,
            direct_time: 0,
            expire_time: 1552379335,
            create_time: 1551774517,
            dai_put: 2,
            money: 0.07
          },
          {
            id: 64402,
            name: "\u738b\u4f01\u9e45\u7fa4\u7fc1\u7fa4",
            uid: 34053736,
            mid: 10,
            days: 8,
            type: 1,
            status: 2,
            pv_time: 1551660414,
            last_rank_time: 0,
            direct_time: 0,
            expire_time: 1552966969,
            create_time: 1551660414,
            dai_put: 4,
            money: 0.98
          },
          {
            id: 63299,
            name: "\u70ed\u5c14\u65e0\u82e5112",
            uid: 34053736,
            mid: 1,
            days: 20,
            type: 1,
            status: 2,
            pv_time: 1550538186,
            last_rank_time: 0,
            direct_time: 0,
            expire_time: 1552378692,
            create_time: 1550538186,
            dai_put: 3,
            money: 0.72
          },
          {
            id: 37215,
            name: "\u6d4b\u8bd52018-05-7",
            uid: 34053736,
            mid: 10,
            days: 7,
            type: 1,
            status: 2,
            pv_time: 1525686991,
            last_rank_time: 1532586171,
            direct_time: 0,
            expire_time: 1538527788,
            create_time: 1525686991,
            dai_put: 9,
            money: 1.83
          },
          {
            id: 32567,
            name: "\u5e7f\u897f\u5730\u4ea7",
            uid: 34053736,
            mid: 1,
            days: 7,
            type: 1,
            status: 2,
            pv_time: 1522680644,
            last_rank_time: 0,
            direct_time: 0,
            expire_time: 1537350793,
            create_time: 1522680644,
            dai_put: 12,
            money: 1.63
          },
          {
            id: 32566,
            name: "\u623f\u5730\u4ea7",
            uid: 34053736,
            mid: 1,
            days: 7,
            type: 1,
            status: 2,
            pv_time: 1522680271,
            last_rank_time: 1534297865,
            direct_time: 0,
            expire_time: 1538009766,
            create_time: 1522680271,
            dai_put: 5,
            money: 0.7
          },
          {
            id: 32565,
            name: "\u4e2d\u5174\u901a\u8baf_0402",
            uid: 34053736,
            mid: 10,
            days: 7,
            type: 1,
            status: 2,
            pv_time: 1522679838,
            last_rank_time: 0,
            direct_time: 0,
            expire_time: 1537329708,
            create_time: 1522679838,
            dai_put: 2,
            money: 0.48
          }
        ],
        total: 47
      };
      this.tableData = this.allData.rows;
    },
    daysBlur(val, id) {
      // console.log(val,id)
    },
    makeSure(params) {
      this.$confirm("确认投放该单元： " + params.name + "", "投放提示", {
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
    },
    deleteSure(params) {
      this.$confirm(
        "删除后不可恢复，确认删除该单元： " + params.name + "",
        "删除提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        })
        .catch(() => {});
    },
    newUnitSubmit() {
      this.$refs.newUnitForm.validate(valid => {
        if (valid) {
          console.log(this.newUnitForm.name);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    newUnitdialogClose(){
      this.newUnitForm.name="";
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.unit-box {
  background: #fff;
  padding: 0 10px;
  overflow: hidden;
  .search-form {
    margin-top: 20px;
    margin-bottom: 26px;
    height: 40px;
  }
}
.status-going {
  color: green;
}
.status-over {
  color: red;
}
</style>
<style>
.unit-box .el-table thead.has-gutter tr th {
  background: #eef1f6 !important;
  color: #333;
  font-weight: bold;
}
.unit-box .el-input--medium .el-input__inner {
  width: 140px;
}
.el-input-number--mini .el-input-number__decrease,
.el-input-number--mini .el-input-number__increase {
  display: none;
}
.el-input-number--mini .el-input__inner {
  padding: 0 24px;
}
</style>