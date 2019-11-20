<template>
  <div style="width: 100%;margin: auto">
    <span style="font-size: 36px;font-weight: bolder" >{{msg}}</span>
    <!--<el-image src="http://pxx4c7852.bkt.clouddn.com/url1.jpg" style="width: 100%"></el-image>-->
    <br>
    <br>
    <el-container>
      <el-header class="app-header">
        <el-breadcrumb separator-class="iconfont el-icon-arrow-right" style="margin-left: 40px;line-height: 60px;width: 700px;float: left;font-size: 16px">
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;line-height: 60px;float: left">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>
          <el-menu default-active="/"
                   router
                   class="el-menu-demo tab-page"
                   mode="horizontal"
                   active-text-color="#409EFF">
            <!--<el-menu-item index="/">首页</el-menu-item>-->
            <!--<el-menu-item index="/admin">首页</el-menu-item>-->
            <el-menu-item index="/role">角色管理</el-menu-item>
            <el-menu-item index="/permission">权限管理</el-menu-item>
            <el-menu-item index="/administrator">管理员管理</el-menu-item>
            <el-menu-item index="/shops">商品管理</el-menu-item>
            <el-menu-item index="/showKinds">类别管理</el-menu-item>
          </el-menu>
        </el-breadcrumb>

        <div style="width: 400px;text-align: right;float: right;margin-right: 40px">
          <!--<span style="margin-right: 15px" @click="logout()">退出登录</span>-->
         <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px;size: 40px;font-size: 20px"></i>
          <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="el-icon-delete"><span @click="logout()">退出</span></el-dropdown-item>
          </el-dropdown-menu>
          </el-dropdown>
          <span class="el-icon-s-custom">{{adminName}}</span>
        </div>
      </el-header>

        <el-container style="height: 800px; border: 1px solid #eee">
          <!--<el-aside width="200px" style="background-color: rgb(238, 241, 246)">-->
            <el-aside class="app-side app-side-left"
            style="width: inherit;">
              <!--<el-menu-->
                <!--router-->
                <!--class="el-menu-vertical-demo"-->
              <!--@open="handleOpen"-->
              <!--@close="handleClose"-->
              <!--:collapse="isCollapse"-->
              <!--&gt;-->
                <!--<template v-for="route in $router.options.routes" v-if="route.children && route.children.length">-->
                  <!--<template v-for="item in route.children" >-->
                    <!--<el-menu-item-->
                      <!--:key="route.path + '/' + item.path"-->
                      <!--:index="item.path"-->
                    <!--&gt;-->
                      <!--<i class="el-icon-menu"></i>-->
                      <!--<span slot="title">{{ item.name }}</span>-->
                    <!--</el-menu-item>-->
                  <!--</template>-->
                <!--</template>-->
              <!--</el-menu>-->
            <!--</el-aside>-->

            <el-menu :default-active="this.$route.children"
                     class="el-menu-vertical-demo"
                     @open="handleOpen"
                     @close="handleClose"
                     :collapse="isCollapse" background-color="#545c64"
                     text-color="#fff"
                     active-text-color="#ffd04b"
                     router>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-message"></i>
                  <span slot="title">角色管理</span>
                </template>
                <!--<el-menu-item-group>-->
                  <!--<span slot="title">权限设置</span>-->
                  <el-menu-item index="/role" class="el-icon-document">查看</el-menu-item>
                  <el-menu-item index="/addRole" class="el-icon-circle-plus">添加</el-menu-item>
                  <el-menu-item index="/updateRole" class="el-icon-edit" disabled>修改</el-menu-item>
                  <!--<el-menu-item index="1-3" class="el-icon-edit">修改</el-menu-item>-->
                  <!--<el-menu-item index="1-4" class="el-icon-delete">删除</el-menu-item>-->
                <!--</el-menu-item-group>-->
                <!--<el-menu-item-group title="管理员维护">-->
                  <!--<el-menu-item index="1-3" class="el-icon-document">查|删</el-menu-item>-->
                  <!--<el-menu-item index="1-4" class="el-icon-circle-plus">添加</el-menu-item>-->
                  <!--&lt;!&ndash;<el-menu-item index="1-7" class="el-icon-delete"></el-menu-item>&ndash;&gt;-->
                <!--</el-menu-item-group>-->
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span slot="title">权限管理</span>
                </template>
                <!--<el-menu-item-group>-->
                <!--<span slot="title">权限设置</span>-->
                <el-menu-item index="/permission" class="el-icon-document">查看</el-menu-item>
                <el-menu-item index="/addPermission" class="el-icon-circle-plus">添加</el-menu-item>
                <el-menu-item index="/updatePermission" class="el-icon-edit" disabled>修改</el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-s-custom"></i>
                  <span slot="title">管理操作</span>
                </template>
                <!--<el-menu-item-group>-->
                  <!--<span slot="title">权限设置</span>-->

                <el-menu-item index="/administrator" class="el-icon-document">查看</el-menu-item>
                <el-menu-item index="/addAdmin" class="el-icon-circle-plus">添加</el-menu-item>
                <el-menu-item index="/updateAdmin" class="el-icon-edit" disabled>修改</el-menu-item>

                  <!--<el-menu-item index="3-1" class="el-icon-circle-plus">信息维护</el-menu-item>-->
                  <!--<el-menu-item index="3-2" class="el-icon-edit">修改密码</el-menu-item>-->
                  <!--<el-menu-item index="3-3" class="el-icon-delete">注销账户</el-menu-item>-->
                <!--</el-menu-item-group>-->
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-s-cooperation"></i>
                  <span slot="title">商品管理</span>
                </template>
                <!--<el-menu-item-group>-->
                  <!--<span slot="title">类别管理</span>-->
                  <el-menu-item index="/shops" class="el-icon-document">查看</el-menu-item>
                  <el-menu-item index="/addShops" class="el-icon-circle-plus">添加</el-menu-item>
                  <el-menu-item index="/updateShops" class="el-icon-edit" disabled>修改</el-menu-item>
                  <el-menu-item index="/saleShow" class="el-icon-s-operation">销量</el-menu-item>
                  <!--<el-menu-item index="3-3" class="el-icon-edit">修改</el-menu-item>-->
                  <!--<el-menu-item index="3-4" class="el-icon-delete">删除</el-menu-item>-->
                <!--</el-menu-item-group>-->
                <!--<el-menu-item-group>-->
                  <!--<span slot="title">商品管理</span>-->
                  <!--<el-menu-item index="3-3" class="el-icon-document">查看</el-menu-item>-->
                  <!--<el-menu-item index="3-4" class="el-icon-circle-plus">添加</el-menu-item>-->
                  <!--&lt;!&ndash;<el-menu-item index="3-7" class="el-icon-edit"></el-menu-item>&ndash;&gt;-->
                  <!--&lt;!&ndash;<el-menu-item index="3-8" class="el-icon-delete"></el-menu-item>&ndash;&gt;-->
                <!--</el-menu-item-group>-->
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span slot="title">类别管理</span>
                </template>
                <!--<el-menu-item-group>-->
                <!--<span slot="title">类别管理</span>-->
                <el-menu-item index="/showKinds" class="el-icon-document">查看</el-menu-item>
                <el-menu-item index="/addShopKinds" class="el-icon-circle-plus">添加</el-menu-item>
                <el-menu-item index="/updateShopKinds" class="el-icon-edit" disabled>修改</el-menu-item>
              </el-submenu>
              <el-submenu index="6">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span slot="title">用户管理</span>
                </template>
                <!--<el-menu-item-group>-->
                <!--<span slot="title">类别管理</span>-->
                <el-menu-item index="/userManager" class="el-icon-document">查看</el-menu-item>
                <!--<el-menu-item index="/addShopKinds" class="el-icon-circle-plus">添加</el-menu-item>-->
                <el-menu-item index="/updateShopKinds" class="el-icon-edit" disabled>修改</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-aside>
          <el-main>
              <!--<el-table :data="tableData">-->
                <!--<el-table-column prop="date" label="日期" width="140">-->
                <!--</el-table-column>-->
                <!--<el-table-column prop="name" label="姓名" width="120">-->
                <!--</el-table-column>-->
                <!--<el-table-column prop="address" label="地址">-->
                <!--</el-table-column>-->
              <!--</el-table>-->
            <template>
              <router-view/>
            </template>
          </el-main>
        </el-container>
        <!--</el-container>-->
      <!--</el-container>-->
      <el-footer style="font-weight: bolder">
        <el-image src="../static/img/bala2.gif" style="height: 80px;width:100px"></el-image>
      </el-footer>
    </el-container>
  </div>
</template>


<style>


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
              msg:'Welcome to 后台管理界面',
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
        this.$router.push("/adminLogin")
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
