<template>
  <el-form :model="loginForm" ref="loginForm" :rules="ruleForm" class="demo-ruleForm login-container">
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username" placeholder="用户名" auto-complete="on"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" label="password" v-model="loginForm.password" placeholder="密码" @keydown.enter.native="handleSubmit"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="width:100%" :loading="logining" @click.native.prevent="handleSubmit">立即登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import API from "../../api/api";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      ruleForm: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(val) {
      // this.$refs.loginForm.validate((valid) => {
      // 	if(valid){
      // 		this.logining = true;
      // 		API.login(this.loginForm).then(rs => {
      // 			this.logining = false;
      // 			if(rs.code == 1){
      // 				window.username = this.loginForm.username;
      // 				localStorage.setItem('g3_username',this.loginForm.username)
      // 				this.$router.push({path: '/user/webSite'});
      // 				this.$message.success('登录成功！');
      // 			}else{
      // 				this.$message.error('用户名或密码出错！');
      // 			}
      // 		})
      // 	}
      // })
    }
  }
};
</script>

<style>
</style>