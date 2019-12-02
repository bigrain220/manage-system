<template>
  <div class="options-box">
    <el-button type="primary" size="medium " class="add-btn" @click="addClick()">新增</el-button>

    <el-table :data="tableData1" style="width: 100%;" v-if="type==='adunit'" key="tableData1">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="number" label="编号" width="200" align="center">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="width" label="宽度">
      </el-table-column>
      <el-table-column prop="height" label="高度">
      </el-table-column>
      <el-table-column prop="row" label="行数">
      </el-table-column>
      <el-table-column prop="column" label="列数">
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button type="success" size="mini" icon="el-icon-share"></el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editClick(scope.row)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteClick"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table :data="tableData2" style="width: 100%;" v-else-if="type==='adsize'" key="tableData2">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="number" label="编号" width="200" align="center">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="width" label="宽度">
      </el-table-column>
      <el-table-column prop="height" label="高度">
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editClick(scope.row)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteClick"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table :data="tableData3" style="width: 100%;" v-else-if="type==='adtype'" key="tableData3">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="number" label="编号" width="200" align="center">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editClick(scope.row)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteClick"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-table :data="tableData" style="width: 100%;" v-if="type!=='adstyle'">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="number" label="编号" width="200" align="center">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="width" label="宽度" v-if="type!=='adtype'">
      </el-table-column>
      <el-table-column prop="height" label="高度" v-if="type!=='adtype'">
      </el-table-column>
      <el-table-column prop="row" label="行数" v-if="type==='adunit'">
      </el-table-column>
      <el-table-column prop="column" label="列数" v-if="type==='adunit'">
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="scope" v-if="type!=='adstyle'">
          <el-button type="success" size="mini" icon="el-icon-share" v-if="type==='adunit'"></el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editClick(scope.row)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteClick"></el-button>
        </template>
      </el-table-column>
    </el-table> -->
    <el-table :data="tableData4" style="width: 100%;" v-else-if="type=='adstyle'" key="tableData4">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="number" label="编号" width="120" align="center">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="border" label="边框">
      </el-table-column>
      <el-table-column prop="web" label="网址">
      </el-table-column>
      <el-table-column prop="title" label="标题/链接">
      </el-table-column>
      <el-table-column prop="visited" label="已访问网址">
      </el-table-column>
      <el-table-column prop="bck" label="背景">
      </el-table-column>
      <el-table-column prop="text" label="文本">
      </el-table-column>
      <el-table-column prop="fonts" label="字体集">
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editClick(scope.row)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteClick"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- adunitDialog -->
    <el-dialog title="修改" :visible.sync="dialogVisible.AdunitVisible" class="adunitDialog">
      <el-form :model="AdunitForm" ref="AdunitForm" size="medium" :inline="true" label-position="right" label-width="80px">
        <el-form-item label="编号:">
          <el-input-number v-model="AdunitForm.number" controls-position="right" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input-number v-model="AdunitForm.order" controls-position="right" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="名称:">
          <el-input v-model="AdunitForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="行数:">
          <el-input v-model="AdunitForm.column" placeholder="请输入行数"></el-input>
        </el-form-item>
        <el-form-item label="列数:">
          <el-input v-model="AdunitForm.row" placeholder="请输入列数"></el-input>
        </el-form-item>
        <el-form-item label="尺寸:">
          <el-select v-model="AdunitForm.size" placeholder="请选择">
            <el-option label="自适 (3 x 0)" value="0"></el-option>
            <el-option label="自适 (3 x 0)" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型:" class="radio-group">
          <el-radio-group v-model="AdunitForm.type">
            <el-radio :label="3">文字广告</el-radio>
            <el-radio :label="6">仅展示广告</el-radio>
            <el-radio :label="9">仅文字广告</el-radio>
            <el-radio :label="12">南方网通信息</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="样式:">
          <el-select v-model="AdunitForm.style" placeholder="请选择">
            <el-option label="默认" value="0"></el-option>
            <el-option label="尊贵典雅" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道:">
          <el-select v-model="AdunitForm.way" placeholder="请选择">
            <el-option label="中国贸易网" value="0"></el-option>
            <el-option label="久久信息网" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogSure('AdunitForm')" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <!-- adsizeDialog -->
    <el-dialog title="修改" :visible.sync="dialogVisible.AdsizeVisible" class="adsizeDialog">
      <el-form :model="AdsizeForm" ref="AdsizeForm" size="medium " label-position="right" label-width="80px">
        <el-form-item label="编号:">
          <el-input-number v-model="AdsizeForm.number" placeholder="限制四位数字，不输入自动生成" controls-position="right" :min="1000" :max="10000"></el-input-number>
        </el-form-item>
        <el-form-item label="名称:">
          <el-input v-model="AdsizeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="宽度:">
          <el-input v-model="AdsizeForm.width"></el-input>
        </el-form-item>
        <el-form-item label="高度:">
          <el-input v-model="AdsizeForm.height"></el-input>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input-number v-model="AdsizeForm.order" placeholder="" controls-position="right" :min="0" :max="9999"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogSure('AdsizeForm')" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <!-- adtypeDialog -->
    <el-dialog title="修改" :visible.sync="dialogVisible.AdtypeVisible" class="adtypeDialog">
      <el-form :model="AdtypeForm" ref="AdtypeForm" size="medium " label-position="right" label-width="80px">
        <el-form-item label="编号:">
          <el-input-number v-model="AdtypeForm.number" placeholder="限制四位数字，不输入自动生成" controls-position="right" :min="1000" :max="10000"></el-input-number>
        </el-form-item>
        <el-form-item label="名称:">
          <el-input v-model="AdtypeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input-number v-model="AdtypeForm.order" placeholder="" controls-position="right" :min="0" :max="9999"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogSure('AdtypeForm')" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <!-- adstyleDialog -->
    <el-dialog title="修改" :visible.sync="dialogVisible.AdstyleVisible" class="adstyleDialog">
      <el-form :model="AdstyleForm" ref="AdstyleForm" size="medium" label-position="right" label-width="100px" :inline="true">
        <el-form-item label="编号:">
          <el-input-number v-model="AdstyleForm.number" controls-position="right" :min="1000" :max="9999"></el-input-number>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input-number v-model="AdstyleForm.order" controls-position="right" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <br />
        <el-form-item label="名称:">
          <el-input v-model="AdstyleForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="字体集:">
          <el-select v-model="AdstyleForm.fonts" placeholder="请选择">
            <el-option label="使用账号默认字体" value="0"></el-option>
            <el-option label="最佳" value="1"></el-option>
            <el-option label="Arial" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网址:">
          <el-input v-model="AdstyleForm.web" placeholder="请选择网址颜色"></el-input>
          <el-color-picker v-model="AdstyleForm.web" class="color-inputs"></el-color-picker>
        </el-form-item>
        <el-form-item label="标题:">
          <el-input v-model="AdstyleForm.title" placeholder="请选择标题颜色"></el-input>
          <el-color-picker v-model="AdstyleForm.title" class="color-inputs"></el-color-picker>
        </el-form-item>
        <el-form-item label="已访问网址:">
          <el-input v-model="AdstyleForm.visited" placeholder="请选择已访问网址颜色"></el-input>
          <el-color-picker v-model="AdstyleForm.visited" class="color-inputs"></el-color-picker>
        </el-form-item>
        <el-form-item label="背景:">
          <el-input v-model="AdstyleForm.bck" placeholder="请选择背景颜色"></el-input>
          <el-color-picker v-model="AdstyleForm.bck" class="color-inputs"></el-color-picker>
        </el-form-item>
        <el-form-item label="文本:">
          <el-input v-model="AdstyleForm.text" placeholder="请选择文本颜色"></el-input>
          <el-color-picker v-model="AdstyleForm.text" class="color-inputs"></el-color-picker>
        </el-form-item>
        <el-form-item label="边框:">
          <el-input v-model="AdstyleForm.border" placeholder="请选择边框颜色"></el-input>
          <el-color-picker v-model="AdstyleForm.border" class="color-inputs"></el-color-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogSure('AdstyleForm')" size="small">确 定</el-button>
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
        AdunitVisible: false,
        AdsizeVisible: false,
        AdtypeVisible: false,
        AdstyleVisible: false
      },
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
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
      },
      AdsizeForm: {
        order: "",
        name: "",
        width: "",
        height: "",
        order: ""
      },
      AdtypeForm: {
        number: "",
        name: "",
        order: ""
      },
      AdstyleForm: {
        number: "",
        order: "",
        name: "",
        fonts: "",
        web: "",
        title: "",
        visited: "",
        bck: "",
        text: "",
        border: ""
      }
    };
  },
  methods: {
    editClick(params) {
      // console.log(params)
      var that = this;
      switch (this.type) {
        case "adunit":
          params
            ? (that.AdunitForm = JSON.parse(JSON.stringify(params)))
            : that.clearForm(that.AdunitForm);
          that.dialogVisible.AdunitVisible = true;
          break;
        case "adsize":
          params
            ? (that.AdsizeForm = JSON.parse(JSON.stringify(params)))
            : that.clearForm(that.AdsizeForm);
          that.dialogVisible.AdsizeVisible = true;
          break;
        case "adtype":
          params
            ? (that.AdtypeForm = JSON.parse(JSON.stringify(params)))
            : that.clearForm(that.AdtypeForm);
          that.dialogVisible.AdtypeVisible = true;
          break;
        case "adstyle":
          params
            ? (that.AdstyleForm = JSON.parse(JSON.stringify(params)))
            : that.clearForm(that.AdstyleForm);
          that.dialogVisible.AdstyleVisible = true;
          break;
        default:
          break;
      }
    },
    addClick() {
      this.editClick();
    },
    deleteClick() {
      this.$confirm("删除后无法恢复, 是否继续删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // });
      }).catch(()=>{});
    },
    clearForm(obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          obj[key] = "";
        }
      }
    },
    dialogSure(params) {
      if (params === "AdunitForm") {
        console.log(this.AdunitForm);
      } else if (params === "AdsizeForm") {
        console.log(this.AdsizeForm);
      } else if (params === "AdtypeForm") {
        console.log(this.AdtypeForm);
      } else if (params === "AdstyleForm") {
        console.log(this.AdstyleForm);
      }
    },
    dialogCancel() {
      let name =
        this.type.charAt(0).toUpperCase() + this.type.slice(1) + "Visible";
      this.dialogVisible[name] = false;
    },
    init() {
      var that = this;
      switch (this.type) {
        case "adunit":
          that.tableData1 = [
            {
              number: 1001,
              name: "自适应1",
              width: 100,
              height: 100,
              row: 1,
              column: 1
            }
          ];
          break;
        case "adsize":
          that.tableData2 = [
            {
              number: 1002,
              name: "自适应2",
              width: 200,
              height: 200
            }
          ];
          break;
        case "adtype":
          that.tableData3 = [
            {
              number: 1003,
              name: "自适应3"
            }
          ];
          break;
        case "adstyle":
          that.tableData4 = [
            {
              number: 10003,
              name: "尊贵典雅",
              border: "FFFFFF",
              web: "828282",
              title: "0000FF",
              visited: "002F8C",
              bck: "FFFFFF",
              text: "000000",
              fonts: "使用帐号默认字体"
            }
          ];
          const arr = ["web", "title", "visited", "bck", "text", "border"];
          that.tableData4.map((item, index) => {
            arr.map(item1 => {
              if (item[item1].indexOf("#") < 0) {
                item[item1] = "#" + item[item1];
              }
            });
          });
          break;
        default:
          break;
      }
    }
  },
  watch: {
    options(val) {
      this.type = this.options;
      this.init();
    }
  },
  created() {
    this.type = this.options;
    this.init();
  }
};
</script>
<style lang="scss" scoped>
.add-btn {
  position: absolute;
  right: 15px;
  top: 13px;
  padding: 10px 30px;
}
</style>
<style>
.adunitDialog.el-dialog__wrapper .el-dialog {
  width: 700px;
}
.adunitDialog .radio-group .el-form-item__content {
  width: 560px;
}
.adunitDialog .radio-group .el-radio-group,
.adunitDialog .radio-group .el-radio-group .el-radio {
  line-height: 32px;
}
.adsizeDialog.el-dialog__wrapper .el-dialog,
.adtypeDialog.el-dialog__wrapper .el-dialog {
  width: 600px;
}
.adsizeDialog .el-form-item__content,
.adtypeDialog .el-form-item__content {
  width: 300px !important;
}
.adsizeDialog .el-input-number,
.adtypeDialog .el-input-number {
  width: 100% !important;
}
.adstyleDialog.el-dialog__wrapper .el-dialog {
  width: 700px;
}
.adstyleDialog .el-form-item__content {
  width: 200px !important;
}
.adstyleDialog .color-inputs {
  position: absolute;
  right: 0;
  top: 0;
}
.adstyleDialog .color-inputs .el-color-picker__trigger {
  border: 0;
}
.adstyleDialog .color-inputs .el-color-picker__color {
  border-color: #ddd;
}
.options-box .el-form-item__label {
  font-weight: bold !important;
}
.options-box .el-input-number .el-input__inner {
  text-align: left;
}
</style>