<template>
  <div id="lefnav">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo left-ul" background-color="#fff"  router text-color="#323437" active-text-color="#29e" :collapse="isCollapse">
      <div class="radioGroup" id="radioGroup"  @click="change"><span class="nav-text" v-show="!isCollapse">网站导航</span><i class="iconfont icondaohang"></i></div>
      <el-submenu index="Module">
        <template slot="title">
          <i class="iconfont iconguanggaotoufang"></i>
          <span>广告投放</span>
        </template>
        <el-menu-item index="/index"><span class="space-item">物料管理</span></el-menu-item>
        <el-menu-item index="/unit"><span class="space-item">单元管理</span></el-menu-item>
      </el-submenu>
      <el-submenu index="/">
        <template slot="title">
          <i class="iconfont iconshujuguanli"></i>
          <span>数据管理</span>
        </template>
        <el-menu-item index="/directed"><i class="icon-danye iconfont"></i><span slot="title">投放报表</span></el-menu-item>
      </el-submenu>
      <el-submenu index="11">
        <template slot="title" id="titles"><i class="iconfont iconbangzhushouce"></i><span slot="title">帮助手册</span>
        </template>
        <el-menu-item index="/help"><span class="space-item">视频观看</span></el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "leftNav",
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
      change(){
        this.isCollapse = !this.isCollapse;
        localStorage.setItem('isCollapse',this.isCollapse) 
        this.getWidth(this.isCollapse);
			},
			getWidth(flag){
				if(flag == true){//影藏
					document.getElementById('radioGroup').style.backgroundColor = '#f2f3f4';
					this.startAnimation(flag, 64);
				}else{
					this.startAnimation(flag, 200);
				}
			},
			startAnimation(flag,num){
				var timer = null ;
				clearInterval(timer);
				var _ele = document.getElementById('content');
				var _eles = document.getElementById('header');
				timer = setInterval(function(){
					if(flag == true){
						_ele.style.left = _ele.offsetLeft - 5 + 'px';
						_eles.style.left = _eles.offsetLeft - 5 + 'px';
						if(_ele.offsetLeft <= (num+5) ){
							_ele.style.left = '64px';
							_eles.style.left = '64px';
							clearInterval(timer);	
							
						}
					}else{
						_ele.style.left = _ele.offsetLeft + 5 + 'px';
						_eles.style.left = _eles.offsetLeft + 5 + 'px';
						if(_ele.offsetLeft >= (num-5)){
							_ele.style.left = '200px';
							_eles.style.left = '200px';
							clearInterval(timer);
						}
						
					}
				},10);
			}
  },
  computed: {
    onRoutes() {
      return this.$route.path;
    }
  },
  created(){
			var that =this;
			if(localStorage.getItem('isCollapse')){
				this.isCollapse = JSON.parse(localStorage.getItem('isCollapse'));
				this.$nextTick(function () {
					that.getWidth(that.isCollapse)
				})
			}else{
               localStorage.setItem('isCollapse',this.isCollapse) 
            }
	 }
};
</script>

<style lang="scss" scoped>
#lefnav {
  display: block;
  position: absolute;
  left: 0;
  top: 0px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
  font-size: 12px;
}
.radioGroup { background: #f2f3f4;color: #323437;text-align: center;width: 100%;border: none;border-radius: 0;border-bottom: 1px solid #e1e3e4;overflow: hidden;
padding:0 20px;box-sizing: border-box;cursor: pointer;height: 50px;line-height: 50px;}
.nav-text{float: left;margin-left: 22px;font-size: 14px;}
.radioGroup i{font-size: 16px;float: right;}
.left-ul{border-right: 1px solid #e6e6e6!important;box-sizing: border-box; height: 100%;width: 200px;}
.left-ul.el-menu--collapse{width: 64px;}
.el-submenu .el-menu-item{min-width: 199px;}
.el-submenu__title span,.space-item{margin-left: 2px;}
</style>
<style>
#lefnav .el-submenu__title,#leftnav .el-menu-item,.el-submenu .el-menu-item{height: 46px!important;line-height: 46px!important;}
.el-submenu.is-active .el-submenu__title>*{color: rgb(34, 153, 238)!important;}
</style>