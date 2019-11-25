<template>
  <div>
    <!-- <el-table :data="tableData" style="width: 100%" v-if="type==='adunit'">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="number" label="编号" width="200" align="center">
      </el-table-column>
      <el-table-column prop="name" label="名称" >
      </el-table-column>
       <el-table-column prop="height" label="宽度" >
      </el-table-column>
      <el-table-column prop="width" label="高度">
      </el-table-column>
      <el-table-column prop="row" label="行数" >
      </el-table-column>
      <el-table-column prop="column" label="列数" >
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template>
          <el-button type="success" size="mini" icon="el-icon-share"></el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-table :data="tableData" style="width: 100%" v-if="type==='adsize'">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="number" label="编号" width="200" align="center">
      </el-table-column>
      <el-table-column prop="name" label="名称" >
      </el-table-column>
       <el-table-column prop="height" label="宽度" >
      </el-table-column>
      <el-table-column prop="width" label="高度">
      </el-table-column>
      <el-table-column label="操作" width="160" fixed="right">
        <template>
          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-table :data="tableData" style="width: 100%" v-if="type==='adtype'">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="number" label="编号" width="200" align="center">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column label="操作" width="160" fixed="right">
        <template>
          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table> -->

    <el-table :data="tableData" style="width: 100%" v-if="type!=='adstyle'">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="number" label="编号" width="200" align="center">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="height" label="宽度" v-if="type!=='adtype'">
      </el-table-column>
      <el-table-column prop="width" label="高度" v-if="type!=='adtype'">
      </el-table-column>
      <el-table-column prop="row" label="行数" v-if="type==='adunit'">
      </el-table-column>
      <el-table-column prop="column" label="列数" v-if="type==='adunit'">
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template>
          <el-button type="success" size="mini" icon="el-icon-share" v-if="type==='adunit'"></el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editClick"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteClick"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="tableData1" style="width: 100%" v-if="type==='adstyle'">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="number" label="编号" width="120" align="center">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="border" label="边框">
      </el-table-column>
      <el-table-column prop="site" label="网址">
      </el-table-column>
      <el-table-column prop="title" label="标题/链接">
      </el-table-column>
      <el-table-column prop="sited" label="已访问网址" width="100">
      </el-table-column>
      <el-table-column prop="background" label="背景">
      </el-table-column>
      <el-table-column prop="text" label="文本">
      </el-table-column>
      <el-table-column prop="fonts" label="字体集" width="140">
      </el-table-column>
      <el-table-column label="操作" width="160" fixed="right">
        <template>
          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- dialog -->
    <el-dialog title="修改" :visible.sync="dialogVisible.dialogAdunitVisible" class="adunitDialog">
      <el-form :model="AdunitForm" size="small" :inline="true" label-position="right" label-width="80px">
        <el-form-item label="编号：">
          <el-input v-model="AdunitForm.number" ></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="AdunitForm.order" ></el-input>
        </el-form-item>
        <el-form-item label="名称：">
          <el-input v-model="AdunitForm.name" ></el-input>
        </el-form-item>
        <br/>
        <el-form-item label="行数：">
          <el-input v-model="AdunitForm.name" ></el-input>
        </el-form-item>
        <el-form-item label="列数：">
          <el-input v-model="AdunitForm.name" ></el-input>
        </el-form-item>
        <el-form-item label="尺寸：">
          <el-select v-model="AdunitForm.size" placeholder="">
            <el-option label="自适 (3 x 0)" value="0"></el-option>
            <el-option label="自适 (3 x 0)" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型：" class="radio-group">
          <el-radio-group v-model="AdunitForm.type">
            <el-radio :label="3">文字广告</el-radio>
            <el-radio :label="6">仅展示广告</el-radio>
            <el-radio :label="9">仅文字广告</el-radio>
            <el-radio :label="12">南方网通信息</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="样式：">
          <el-select v-model="AdunitForm.style" placeholder="">
            <el-option label="默认" value="0"></el-option>
            <el-option label="尊贵典雅" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道：">
          <el-select v-model="AdunitForm.way" placeholder="">
            <el-option label="中国贸易网" value="0"></el-option>
            <el-option label="久久信息网" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAdunitVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogAdunitVisible = false" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
export default {
  name: "tableOptions",
  props: {
    options: { type: String, required: true }
  },
  data() {
    return {
      type: "",
      dialogVisible: {
        dialogAdunitVisible: false
      },
      tableData: [
        {
          number: 1000,
          name: "自适应",
          width: 300,
          height: 600,
          row: 3,
          column: 2
        },
        {
          number: 1000,
          name: "自适应",
          width: 300,
          height: 600,
          row: 3,
          column: 2
        },
        {
          number: 1000,
          name: "自适应",
          width: 300,
          height: 600,
          row: 3,
          column: 2
        }
      ],
      tableData1: [
        {
          number: 1,
          name: "尊贵典雅",
          border: "FFFFFF",
          site: "828282",
          title: "0000FF",
          sited: "002F8C",
          background: "FFFFFF",
          text: "000000",
          fonts: "使用帐号默认字体"
        }
      ],
      AdunitForm: {
        number: "",
        order: "",
        name: "",
        row: "",
        column: "",
        size: "",
        type: "",
        style: "",
        way: ""
      }
    };
  },
  methods: {
    editClick() {
      this.dialogVisible.dialogAdunitVisible = true;
    },
    deleteClick(){
       this.$confirm('删除后无法恢复, 是否继续删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        })
    }
  },
  watch: {
    options(val) {
      this.type = this.options;
    },
    
  },
  mounted() {
    this.type = this.options;
  }
};
</script>
<style lang="scss" scoped>

</style>
<style>
.adunitDialog.el-dialog__wrapper .el-dialog{width: 700px;}
.adunitDialog .radio-group .el-form-item__content{width: 560px;}
.adunitDialog .radio-group .el-radio-group,.adunitDialog .radio-group .el-radio-group .el-radio{line-height: 32px;}
</style>