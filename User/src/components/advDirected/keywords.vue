<template>
  <div class="keywords">
    <Header :title="title"></Header>
    <div class="content-box">
      <div class="keywords-box">
        <h4 class="title">关键词<span style="color:#999;"> (可不填满,至少一个)</span></h4>
        <el-button type="primary" size="mini" class="change-btn" @click="changeInput">批量导入</el-button>
        <div class="input-box">
          <el-input :maxlength="20"  v-model="itemsData[inputIndex]" size="small" @blur="onBlur(inputIndex)"  :class="`iname${inputIndex} iname`" v-for="(inputItem, inputIndex) in itemsData" :key="inputIndex">
          </el-input>
        </div>
        <h4 class="title">描述<span style="color:#999;"> (可不填,最多100字)</span></h4>
        <div class="input-box">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容" v-model="descriptionVal" maxlength="100" show-word-limit @keydown.native="listen($event)" resize="none">
          </el-input>
        </div>
        <div class="btn-box">
          <el-button type="primary" size="medium" @click="saveKeywords">保存</el-button>
          <el-button type="success" size="medium" @click="resetDescription">重置</el-button>
        </div>
      </div>
    </div>
    <!-- dialog -->
    <el-dialog title="批量导入(每行为一个关键词)" :visible.sync="dialogVisible.keyWordsDialog" width="40%"  @closed="keyWordsDialogClose" class="keyWords-dialog">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10}" placeholder="每一行保存为一个关键词" v-model="keyWordsTextArea" size="mini" resize="none">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button  size="small" @click="dialogVisible.keyWordsDialog = false" >取 消</el-button>
        <el-button  size="small" type="primary" @click="TextAreaSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Header from "../common/header";
import API from "../../api/api";
export default {
  name: "Keywords",
  components: { Header },
  data() {
    return {
      title: "文字广告",
      itemsData: [],
      descriptionVal: "",
      dialogVisible: {
        keyWordsDialog: false
      },
      keyWordsTextArea:"",
      validobj:{
            validLength:true,
            validType:true,
            validRename:true,
            validAmout:true
          },
    };
  },
  methods: {
    init() {
      API.textGet({}).then(rs => {
        // console.log(rs);
        this.itemsData = rs.word.split(",");
        this.itemsData = this.initArr(this.itemsData);
        this.descriptionVal = rs.desc;
      });
    },
    initArr(params) {
      var arr = [];
      if (params.length < 50) {
        for (var i = 0; i < 50 - params.length; i++) {
          arr.push("");
        }
      }
      return params.concat(arr);
    },
    listen(event) {
      if (event.keyCode === 13) {
        event.preventDefault(); // 阻止浏览器默认换行操作
        return false;
      }
    },
    changeInput() {
      this.dialogVisible.keyWordsDialog=true;
      this.keyWordsTextArea = this.deleteBlankArr(this.itemsData).join('\n');
    },
    TextAreaSure(){
      var a=this.keyWordsTextArea.split(/[(\r\n)\r\n]+/);
      var arr=[];
      a.map((item,index)=>{
        arr.push(item.toString().replace(/\s/g, ""));
      })
      this.itemsData = this.initArr(arr);
      this.dialogVisible.keyWordsDialog=false;
    },
    keyWordsDialogClose(){
      this.keyWordsTextArea="";
    },
    resetDescription() {
      this.init();
    },
    onBlur(params){
       const domArr= Array.from(document.querySelectorAll(".iname>input"));
                domArr.map((item,index)=>{
                    item.style.borderColor="#dcdfe6";
            });
       this.getArr({minlength:1,maxlength:20,minamout:1,maxamout:50});
    },
    saveKeywords() {
      var arr = this.getArr({minlength:1,maxlength:20,minamout:1,maxamout:50});
      if(this.validobj.validType==false){
        this.$message.warning('只能存入中文，数字，字母！请不要输入空格和其他字符');
      }else if(this.validobj.validLength==false){
        this.$message.warning('请按对应规定的长度填入名称！');
      }else if(this.validobj.validRename==false){
        this.$message.warning('请不要保存重复名称！');
      }else if(this.validobj.validAmout==false){
        this.$message.warning('请按对应规定的数量填入名称！');
      }else {
        var params = {};
        params.word = this.deleteBlankArr(this.itemsData).join(",");
        params.desc = this.descriptionVal;
        API.textSave(params)
          .then(rs => {
            // console.log(rs);
            if (rs.code === 1) {
              this.$alert("保存成功", "保存", {
                confirmButtonText: "确定",
                callback: action => {
                  this.init();
                }
              });
            }else if(rs.msg ==="ILLEGAL_ACCESS_DENIED"){
              this.$alert("保存失败: 演示模式，拒绝操作", "保存", {
                confirmButtonText: "确定",
                callback: action => {}
              });
            } else {
              this.$alert("保存失败" + rs.msg, "保存", {
                confirmButtonText: "确定",
                callback: action => {}
              });
            }
          })
          .catch(err => console.log(err));
      }
    },
    getArr(params){
          this.validobj={validLength:true,validRename:true,validType:true,validAmout:true};
          var a=[];
          var numArr=[];
          var patternAll =  /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
          this.itemsData.map((data,i)=>{
              var obj={};
              obj={x:i,value:data}
              a.push(obj);
              //校验特殊字符
              if(data !="" && !patternAll.test(data)){
                numArr.push(i);
                this.validobj.validType=false;
              }
              //校验长度
              if(data !="" &&(data.toString().replace(/\s*/g,"").length<params.minlength || data.toString().replace(/\s*/g,"").length>params.maxlength)){
                  this.validobj.validLength=false;
                  numArr.push(i);
              };
              //校验数量
              if(this.deleteBlankArr(Object.values(this.itemsData)).length<params.minamout|| this.deleteBlankArr(Object.values(this.itemsData)).length>params.maxamout){
                this.validobj.validAmout=false;
              }
          })
          //校验是否有重名
          for(var i = 0;i<a.length;i++){
              for(var j = i+1;j<a.length;j++){
                  if(a[i].value==a[j].value && a[i].value!="" && a[j].value!=""){
                    //    console.log(a[i],a[j]);
                        numArr.push(a[i].x);
                        numArr.push(a[j].x);
                        this.validobj.validRename=false;
                  }
              }
          }
          numArr=[...new Set(numArr)];
          // console.log(numArr)
          if(numArr.length>0){
            numArr.map((item,index)=>{
              document.querySelector(".iname"+item+">input").style.borderColor="#F56C6C";
            })
          };
          return numArr
        
        },
    //删除数组的空项
    deleteBlankArr(arr) {
      var r = arr.filter(function(s) {
        return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
      });
      return r;
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="scss" scoped>
.el-input.iname {
  width: auto;
  margin: 0 4px 4px 0;
}
.keywords-box {
  position: relative;
  width: 100%;
  background: #fff;
  .title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    margin-bottom: 30px;
    font-size: 14px;
    color: #303133;
    background: #eef1f6;
  }
  .input-box {
    padding: 0 10px;
    margin-bottom: 30px;
    min-height: 200px;
    margin-right: 100px;
  }
  .change-btn {
    position: absolute;
    right: 10px;
    top: 70px;
  }
  .btn-box {
    display: flex;
    justify-content: center;
    padding-bottom: 30px;
    .el-button {
      width: 160px;
      margin-right: 20px;
    }
  }
}
</style>
<style>
.keywords .keyWords-dialog .el-dialog__body{
  padding:20px;
}
</style>