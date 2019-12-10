<template>
  <div class="login-box">
    <h3 class="title">云盟用户后台登录</h3>
    <el-form :model="loginForm" ref="loginForm" :rules="ruleForm" class="login-container">
      <el-form-item prop="username">
        <el-input type="text" prefix-icon="iconfont iconzhanghao" v-model="loginForm.username" placeholder="用户名" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" prefix-icon="iconfont iconmima" v-model="loginForm.password" placeholder="密码" @keydown.enter.native="handleSubmit"></el-input>
      </el-form-item>
      <el-form-item>
        <div id="dom_id" class="nc-container"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" style="width:100%" @click.native.prevent="handleSubmit" :loading="loading">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import API from "../../api/api";
export default {
  data() {
    return {
      loading: false,
      loginForm: {
        username: "",
        password: ""
      },
      csessionid: "",
      sig: "",
      token: "",
      scene: "",
      ruleForm: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(val) {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.csessionid) {
            this.loading = true;
            var params = {
              username: this.loginForm.username,
              password: this.loginForm.password,
              csessionid: this.csessionid,
              sig: this.sig,
              token: this.token,
              scene: this.scene
            };
            API.login(params).then(rs => {
              this.loading = false;
              console.log(rs);
              if (rs.code == 1) {
                // window.username = this.loginForm.username;
                // localStorage.setItem("yunmeng_username", this.loginForm.username);
                this.$router.push({ path: "/user/index" });
                this.$message.success("登录成功！");
              } else if (rs == "") {
                this.$message.error("登录失败！");
              } else {
                this.$message.error("用户名或密码出错！");
              }
            });
          } else {
            console.log("滑块没拉");
          }
        }
      });
    },
    init() {
      var that = this;
      var nc_scene = "nc_login";
      var nc_token = [
        "FFFF0N0000000000068F",
        new Date().getTime(),
        Math.random()
      ].join(":");
      var NC_Opt = {
        renderTo: "#dom_id",
        appkey: "FFFF0N0000000000068F",
        scene: nc_scene,
        token: nc_token,
        customWidth: 336,
        is_Opt: 0,
        isEnabled: true,
        timeout: 3000,
        times: 5,
        apimap: {},
        callback: function(data) {
          console.log(data);
          that.csessionid = data.csessionid;
          that.sig = data.sig;
          that.token = nc_token;
          that.scene = nc_scene;
        }
      };
      var nc = new noCaptcha(NC_Opt);
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="scss" scoped>
.login-box {
  background: #fff;
  width: 400px;
  position: fixed;
  top: 20vh;
  left: calc(50% - 200px);
  border: 1px solid #ccc;
  padding: 30px;
  border: 1px solid #dded;
  border-radius: 4px;
  -webkit-box-shadow: 0 0 5px #eee;
  box-shadow: 0 0 10px #eee;
  .title{
     font-size: 22px;
    font-weight: normal;
    padding-bottom: 20px;
    color: #555
  }
}
</style>
<style>
.login-box .iconfont {
  font-size: 14px;
  margin-left: 2px;
}
</style>
