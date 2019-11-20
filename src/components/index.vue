<template>
  <div class="note" style="margin-top: 200px" id="in">
    <h1 style="font-weight: bolder">{{msg}}</h1>
    <br>
    <br>
    <el-button type="primary" round plain @click="login()" style="width: 100px">登录</el-button>
    <el-button type="primary" round plain @click="logout()" style="width: 100px">注销</el-button>
  </div>
</template>

<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  /*设置全页面背景色background-color: #9ae1e4*/
  body{width: 100%;height: 100%;position: relative;}
  .el-icon-arrow-down {
    font-size: 12px;
  }
   .el-row {
     margin-bottom: 20px;
    &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
<script>

export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to 后台管理页面',
      activeIndex: '1',
      activeIndex2: '1'
    }
  },methods:{
     login:function () {
       this.$router.push("/adminLogin")
     },
    logout:function () {
      Cookies.remove('name'); // fail!
      Cookies.remove('name',{path:'/'})
      this.$router.push("/")
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
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

<style>
  body{
    background-color: aquamarine;
  }
</style>
