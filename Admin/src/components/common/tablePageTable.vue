<template>
  <div class="table-box">
    <el-button type="primary" size="medium " class="add-btn" @click="addClick">新增</el-button>
    <el-table :data="tableData" style="width: 100%;" v-if="typeVal==='adtype'" key="tableData1">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="id" label="ID" width="200" align="center">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="sort" label="排序" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editClick(scope.row)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteClick(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table :data="tableData" style="width: 100%;" v-else-if="typeVal==='adsize'" key="tableData2">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="id" label="ID" width="200" align="center">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="width" label="宽度">
      </el-table-column>
      <el-table-column prop="height" label="高度">
      </el-table-column>
      <el-table-column label="操作" align="center" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editClick(scope.row)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteClick(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table :data="tableData" style="width: 100%;" v-else-if="typeVal=='adstyle'" key="tableData3">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="id" label="ID" width="100" align="center">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="border_color" label="边框颜色">
      </el-table-column>
      <el-table-column prop="url_color" label="网址颜色">
      </el-table-column>
      <el-table-column prop="title_color" label="标题颜色">
      </el-table-column>
      <el-table-column prop="visited_color" label="访问颜色">
      </el-table-column>
      <el-table-column prop="background_color" label="背景颜色">
      </el-table-column>
      <el-table-column prop="text_color" label="文本颜色">
      </el-table-column>
      <el-table-column prop="font" label="字体" width="150">
      </el-table-column>
      <el-table-column prop="sort" label="排序" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editClick(scope.row)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteClick(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table :data="tableData" style="width: 100%;" v-else-if="typeVal==='adunit'" key="tableData4">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="id" label="ID" width="100" align="center">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="site_id" label="网站ID">
      </el-table-column>
      <el-table-column prop="type_id" label="类型ID">
      </el-table-column>
      <el-table-column prop="size_id" label="尺寸ID">
      </el-table-column>
      <el-table-column prop="style_id" label="样式ID">
      </el-table-column>
      <el-table-column prop="sort" label="排序">
      </el-table-column>
      <el-table-column label="操作" align="center" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editClick(scope.row)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteClick(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- type-dialog -->
    <el-dialog :title="dialogType=='edit'?'编辑':'添加'" :visible.sync="dialogVisible.typeVisible" class="type-dialog" @close="dialogClose('type')">
      <el-form :model="typeForm" ref="typeForm" size="medium " label-position="right" label-width="100px">
        <el-form-item label="ID:" v-if="dialogType==='edit'">
          <el-input v-model="typeForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称:">
          <el-input v-model="typeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input-number v-model="typeForm.sort" placeholder="" controls-position="right" :min="0" :max="9999"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel('typeVisible')" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogSure('typeForm')" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <!-- size-dialog -->
    <el-dialog :title="dialogType=='edit'?'编辑':'添加'" :visible.sync="dialogVisible.sizeVisible" class="size-dialog" @close="dialogClose('size')">
      <el-form :model="sizeForm" ref="sizeForm" size="medium " label-position="right" label-width="100px">
        <el-form-item label="ID:" v-if="dialogType==='edit'">
          <el-input v-model="sizeForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称:">
          <el-input v-model="sizeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="宽度:">
          <el-input v-model="sizeForm.width"></el-input>
        </el-form-item>
        <el-form-item label="高度:">
          <el-input v-model="sizeForm.height"></el-input>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input-number v-model="sizeForm.sort" placeholder="" controls-position="right" :min="0" :max="9999"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel('sizeVisible')" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogSure('sizeForm')" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <!-- style-dialog -->
    <el-dialog :title="dialogType=='edit'?'编辑':'添加'" :visible.sync="dialogVisible.styleVisible" class="style-dialog" @close="dialogClose('style')">
      <el-form :model="styleForm" ref="styleForm" size="medium" label-position="right" label-width="120px" :inline="true">
        <el-form-item label="ID:" v-if="dialogType==='edit'">
          <el-input v-model="styleForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称:">
          <el-input v-model="styleForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="边框颜色:">
          <el-input v-model="styleForm.border_color" placeholder="请选择边框颜色"></el-input>
          <el-color-picker v-model="hexObj.border_color" class="color-inputs" popper-class="color-dropdown"></el-color-picker>
        </el-form-item>
        <el-form-item label="网址颜色:">
          <el-input v-model="styleForm.url_color" placeholder="请选择网址颜色"></el-input>
          <el-color-picker v-model="hexObj.url_color" class="color-inputs" popper-class="color-dropdown"></el-color-picker>
        </el-form-item>
        <el-form-item label="标题颜色:">
          <el-input v-model="styleForm.title_color" placeholder="请选择标题颜色"></el-input>
          <el-color-picker v-model="hexObj.title_color" class="color-inputs" popper-class="color-dropdown"></el-color-picker>
        </el-form-item>
        <el-form-item label="访问颜色:">
          <el-input v-model="styleForm.visited_color" placeholder="请选择已访问网址颜色"></el-input>
          <el-color-picker v-model="hexObj.visited_color" class="color-inputs" popper-class="color-dropdown"></el-color-picker>
        </el-form-item>
        <el-form-item label="背景颜色:">
          <el-input v-model="styleForm.background_color" placeholder="请选择背景颜色"></el-input>
          <el-color-picker v-model="hexObj.background_color" class="color-inputs" popper-class="color-dropdown"></el-color-picker>
        </el-form-item>
        <el-form-item label="文本颜色:">
          <el-input v-model="styleForm.text_color" placeholder="请选择文本颜色"></el-input>
          <el-color-picker v-model="hexObj.text_color" class="color-inputs" popper-class="color-dropdown"></el-color-picker>
        </el-form-item>
        <el-form-item label="字体:">
          <el-select v-model="styleForm.font" placeholder="请选择">
            <el-option label="使用帐号默认字体" value="使用帐号默认字体"></el-option>
            <el-option label="最佳" value="最佳"></el-option>
            <el-option label="Arial" value="Arial"></el-option>
            <el-option label="Times" value="Times"></el-option>
            <el-option label="Verdana" value="Verdana"></el-option>
            <el-option label="Open Sans" value="Open Sans"></el-option>
            <el-option label="Open Sans Light" value="Open Sans Light"></el-option>
            <el-option label="Roboto Light" value="Roboto Light"></el-option>
            <el-option label="Ubuntu Light" value="Ubuntu Light"></el-option>
            <el-option label="Lora" value="Lora"></el-option>
            <el-option label="Slabo" value="Slabo"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input-number v-model="styleForm.sort" controls-position="right" :min="0" :max="100"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel('styleVisible')" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogSure('styleForm')" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <!-- unit-dialog -->
    <el-dialog :title="dialogType=='edit'?'编辑':'添加'" :visible.sync="dialogVisible.unitVisible" class="unit-dialog" @close="dialogClose('unit')">
      <el-form :model="unitForm" ref="unitForm" size="medium" :inline="true" label-position="right" label-width="100px">
        <el-form-item label="ID:" v-if="dialogType==='edit'">
          <el-input v-model="unitForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称:">
          <el-input v-model="unitForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="网站ID:">
          <el-input-number v-model="unitForm.site_id" controls-position="right" :min="0" :max="10000"></el-input-number>
        </el-form-item>
        <el-form-item label="类型ID:">
          <el-input-number v-model="unitForm.type_id" controls-position="right" :min="0" :max="10000"></el-input-number>
        </el-form-item>
        <el-form-item label="尺寸ID:">
          <el-input-number v-model="unitForm.size_id" controls-position="right" :min="0" :max="10000"></el-input-number>
        </el-form-item>
        <el-form-item label="样式ID:">
          <el-input-number v-model="unitForm.style_id" controls-position="right" :min="0" :max="10000"></el-input-number>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input-number v-model="unitForm.sort" controls-position="right" :min="0" :max="100"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel('unitVisible')" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogSure('unitForm')" size="small">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import API from "@/api/api";
export default {
  name: "tablePageTable",
  props: {
    typeVal: { type: String, required: true },
    allTableData: { type: Array }
  },
  data() {
    return {
      dialogType: "",
      dialogVisible: {
        typeVisible: false,
        sizeVisible: false,
        styleVisible: false,
        unitVisible: false
      },
      typeForm: {
        id: "",
        name: "",
        sort: ""
      },
      sizeForm: {
        id: "",
        name: "",
        width: "",
        height: "",
        sort: ""
      },
      styleForm: {
        id: "",
        name: "",
        border_color: "",
        url_color: "",
        title_color: "",
        visited_color: "",
        background_color: "",
        text_color: "",
        font: "",
        sort: ""
      },
      hexObj: {
        border_color: "",
        url_color: "",
        title_color: "",
        visited_color: "",
        background_color: "",
        text_color: ""
      },
      unitForm: {
        id: "",
        name: "",
        site_id: "",
        type_id: "",
        size_id: "",
        style_id: "",
        sort: ""
      }
    };
  },
  methods: {
    deleteClick(id) {
      this.$confirm("ID: " + id + " , 删除后无法恢复, 是否继续删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          switch (this.typeVal) {
            case "adtype":
              API.typeDelete({ id: id }).then(res => {
                this.deleteResponse(res);
              });
              break;
            case "adsize":
              API.sizeDelete({ id: id }).then(res => {
                this.deleteResponse(res);
              });
              break;
            case "adstyle":
              API.styleDelete({ id: id }).then(res => {
                this.deleteResponse(res);
              });
              break;
            case "adunit":
              API.unitDelete({ id: id }).then(res => {
                this.deleteResponse(res);
              });
              break;
            default:
              break;
          }
        })
        .catch(() => {});
    },
    deleteResponse(res) {
      if (res.code === 1) {
        this.$parent.search();
        this.$message.success("删除成功!");
      } else if (res.msg === "ILLEGAL_NOT_EXIST") {
        this.$alert("删除项不存在!", "删除失败", {
          confirmButtonText: "确定",
          type: "error",
          callback: action => {}
        });
      } else {
        this.$alert(res.msg, "删除失败", {
          confirmButtonText: "确定",
          type: "error",
          callback: action => {}
        });
      }
    },
    editClick(row) {
      var form = this.typeVal.slice(2) + "Form";
      var dialog = this.typeVal.slice(2) + "Visible";
      this.dialogType = "edit";
      Object.keys(this[form]).forEach(key => {
        this[form][key] = row[key];
      });
      //style 时初始化颜色
      if (form === "styleForm") {
        Object.keys(this.hexObj).forEach(key => {
          this.hexObj[key] = "#" + row[key];
        });
      }
      this.dialogVisible[dialog] = true;
    },
    addClick() {
      var dialog = this.typeVal.slice(2) + "Visible";
      this.dialogType = "add";
      this.dialogVisible[dialog] = true;
    },
    dialogSure(val) {
      //   console.log(this.typeForm);
      console.log(this[val]);
      if (this.dialogType === "edit") {
        var query = "";
        query = this.typeVal.slice(2) + "Edit";
        API[query](this[val]).then(res => {
          this.editResponse(res);
        });
      } else if (this.dialogType === "add") {
        var obj = {};
        var query = "";
        obj = JSON.parse(JSON.stringify(this[val]));
        query = this.typeVal.slice(2) + "Add";
        this.$delete(obj, "id");
        API[query](obj).then(res => {
          this.editResponse(res);
        });
      }
    },
    editResponse(res) {
      var dialog = this.typeVal.slice(2) + "Visible";
      if (res.code === 1) {
        this.$parent.search();
        this.$message.success("编辑成功!");
        this.dialogVisible[dialog] = false;
      } else if (res.msg === "ILLEGAL_NOT_EXIST") {
        this.$alert("编辑项不存在!", "编辑失败", {
          confirmButtonText: "确定",
          type: "error",
          callback: action => {}
        });
      } else {
        this.$alert(res.msg, "编辑失败", {
          confirmButtonText: "确定",
          type: "error",
          callback: action => {}
        });
      }
    },
    addResponse(res) {
      var dialog = this.typeVal.slice(2) + "Visible";
      if (res.code === 1) {
        this.$parent.search();
        this.$message.success("添加成功!");
        this.dialogVisible[dialog] = false;
      } else if (res.msg === "ILLEGAL_NOT_EXIST") {
        this.$alert("添加项不存在!", "添加失败", {
          confirmButtonText: "确定",
          type: "error",
          callback: action => {}
        });
      } else {
        this.$alert(res.msg, "添加失败", {
          confirmButtonText: "确定",
          type: "error",
          callback: action => {}
        });
      }
    },
    dialogCancel(val) {
      this.dialogVisible[val] = false;
    },
    dialogClose(val) {
      var form = val + "Form";
      Object.keys(this[form]).forEach(key => {
        this[form][key] = "";
      });
      //style 清除颜色
      if (form === "styleForm") {
        Object.keys(this.hexObj).forEach(key => {
          this.hexObj[key] = "";
        });
      }
    }
  },
  mounted() {},
  computed: {
    tableData: function() {
      return this.allTableData;
    }
  },
  watch: {
    hexObj: {
      handler() {
        // console.log(this.hexObj);
        Object.keys(this.hexObj).forEach(key => {
          this.styleForm[key] = this.hexObj[key].slice(1);
        });
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.table-box {
  .add-btn {
    position: absolute;
    right: 15px;
    top: 20px;
    padding: 10px 30px;
  }
}
</style>
<style lang="scss">
.type-dialog {
  .el-dialog {
    width: 600px;
    .el-dialog__body {
      .el-input__inner {
        width: 380px;
      }
      .el-input-number {
        width: 380px;
      }
    }
  }
}
.size-dialog {
  .el-dialog {
    width: 650px;
    .el-dialog__body {
      .el-input__inner {
        width: 380px;
      }
      .el-input-number {
        width: 380px;
      }
    }
  }
}
.style-dialog {
  .el-dialog {
    width: 750px;
    .el-input__inner {
      width: 200px;
    }
  }
  .color-inputs {
    position: absolute;
    right: 0;
    top: 0;
  }
  .color-inputs .el-color-picker__trigger {
    border: 0;
  }
  .color-inputs .el-color-picker__color {
    border-color: #ddd;
  }
}
.color-dropdown .el-button--text {
  display: none !important;
}
.unit-dialog {
  .el-dialog {
    width: 750px;
    .el-input__inner {
      width: 200px;
    }
  }
}
</style>