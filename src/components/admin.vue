<template>
  <div style="width: 100%;margin: auto;">
    <el-container>
      <el-header class="app-header" style="margin-bottom: 10px">
        <!--<el-breadcrumb separator-class="iconfont el-icon-arrow-right" style="margin-left: 40px;line-height: 60px;width: 700px;float: left;font-size: 16px;background: url('../static/img/girl2.jpeg')">-->
          <!--<el-menu default-active="/"-->
                   <!--router-->
                   <!--class="el-menu-demo tab-page"-->
                   <!--mode="horizontal"-->
                   <!--style="margin-left: 130px"-->
                   <!--active-text-color="#409EFF">-->
            <!--<el-menu-item index="/user">用户管理</el-menu-item>-->
            <!--<el-menu-item index="/comment">评论管理</el-menu-item>-->
            <!--<el-menu-item index="/video">视频管理</el-menu-item>-->
          <!--</el-menu>-->

        <!--</el-breadcrumb>-->

        <div style="width: 100%;text-align: right;float: right;padding-right:60px;background: url('../static/img/girl2.jpeg')">
          <span style="font-size: 36px;font-weight: bolder;width: 75%;float: left" >{{msg}}</span>
          
          <!--<span style="margin-right: 15px" @click="logout()">退出登录</span>-->
         <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px;size: 40px;font-size: 20px;cursor: pointer"></i>
          <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="el-icon-delete"><span @click="logout()">退出</span></el-dropdown-item>
          </el-dropdown-menu>
          </el-dropdown>
          <span class="el-icon-s-custom">{{adminName}}</span>
        </div>
      </el-header>

        <el-container style="height: 800px;border: 1px solid #eee">
          <!--<el-aside width="200px" style="background-color: rgb(238, 241, 246)">-->
            <el-aside class="app-side app-side-left"
            style="width: inherit;height: 800px; border: 1px solid #eee">
              <el-menu
                router
                class="el-menu-vertical-demo"
                style="background-color: #34B3FA;height: 100%;font-weight: bolder"
              >

                  <el-menu-item index="/user" style="height: 10%">
                    <i class="el-icon-user"></i>
                    <span slot="title" style="font-size: 15px;">用户管理</span>
                  </el-menu-item>
                  <el-menu-item index="/comment" style="height: 10%" >
                    <i class="el-icon-message"></i>
                    <span slot="title" style="font-size: 15px;">评论管理</span>
                  </el-menu-item>
                  <el-menu-item index="/video" style="height: 10%" >
                    <i class="el-icon-video-camera"></i>
                    <span slot="title" style="font-size: 15px;">视频审核</span>
                  </el-menu-item>


              </el-menu>
          </el-aside>
          <el-main style="background: #f5f5f5 url('../static/img/bg.jpg') no-repeat center;background-size: cover;">
            <template>
              <router-view/>
            </template>
          </el-main>
        </el-container>
        <!--</el-container>-->
      <!--</el-container>-->
      <el-footer style="font-weight: bolder;background: #f5f5f5 url('../static/img/bg.jpg') no-repeat center;background-size: cover;">
        <el-image src="../static/img/bala2.gif" style="height: 80px;width:100px"></el-image>
      </el-footer>
    </el-container>
  </div>
</template>


<style>

  .el-header{
    padding: 0;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
    background-color:#B3C0D1 ;
    position: inherit;
  }


  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
  }

  .el-aside {
    color: #333;
    width: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /*line-height: 160px;*/
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  body{
    font-size: 16px;

  }
  .note{
    position: absolute;
    height: 100%;
    width: 100%;
    top:0;
    left: 0;
    overflow-y: auto;
  }
</style>
<style scoped>
  .note{
    position: absolute;
    height: 100%;
    width: 100%;
    top:0;
    left: 0;
    overflow-y: auto;
  }
</style>

<script>
  import axios from 'axios'
  import ElFooter from "../../node_modules/element-ui/packages/footer/src/main";
  import ElRadioButton from "../../node_modules/element-ui/packages/radio/src/radio-button";
  import Cookies from 'js-cookie'
  import ElImage from "../../node_modules/element-ui/packages/image/src/main";

  export default{
    components: {
      ElImage,
      ElRadioButton,
      ElFooter},
    data(){
          return{
              msg:'Welcome视频管理界面',
            tabPosition: 'left',
            isCollapse: false,
            adminName:'未登录'
          }
      },mounted(){

      this.adminName= Cookies.get('name');
      console.log(this.adminName)


    },
    methods:{
      logout:function () {
//          alert()
        Cookies.remove('name'); // fail!
        Cookies.remove('name',{path:'/'})
//       this.adminName='未登录'
        this.$router.push("/")
      },
      findAllKinds:function () {
        this.$router.push()
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
