<template>
  <div class="hello">
    <div >
      <el-row :gutter="10">
        <el-col :span="20">
          <h2 style="font-weight: 600;text-align: center">{{ msg }}</h2>
        </el-col>
        <el-col :span="4">
          <el-button style="float: left;margin-top: 20px" plain type="primary">导出POI</el-button>
        </el-col>
      </el-row>
    </div>

      <el-table align="center"
              :data="user"
              border
              style="width: 100%">
      <el-table-column align="center"
                       prop="userId"
                       label="用户编号"
                       width="260">
      </el-table-column>
      <el-table-column align="center"
                       prop="userName"
                       label="用户姓名"
                       width="260">
      </el-table-column>
        <el-table-column align="center"
                       label="用户状态"
                       width="260"  >
          <template slot-scope="scope">
            <span v-if="scope.row.userStatue==0">未激活</span>
            <span v-if="scope.row.userStatue==1">正常</span>
            <span v-if="scope.row.userStatue==2">禁用</span>
          </template>

        </el-table-column>

      <el-table-column align="center"
                       label="操作"
                       width="260">
        <template slot-scope="user">

          <el-button type="primary" @click="update(user.row.userId)" plain>审核</el-button>
          <!--<el-button type="primary" icon="el-icon-edit" circle @click="update(role.row.rid)" v-if="role.row.rid!=1">禁用</el-button>-->
        </template>

      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :page-size="this.params.size" v-on:current-change="changePage"
                   :total="total" :current-page="this.params.page"></el-pagination>

    <el-row style="height: 20px"></el-row>
      </div>
</template>
<style>
  .el-main{
    line-height: inherit;
  }
</style>
<script>
  import axios from 'axios'
  import swal from 'sweetalert'
  export default {
    data () {
      return {
        msg: '用户详情页面',
        user:[],
        total:0,
        params:{
          size:8,
          page:1,
        },
      }
    },
    mounted(){
      this.query()
    },
    methods: {
      query:function () {
        var url ="api/findAllUser"+"/"+this.params.page+"/"+this.params.size
        axios.get(url).then(res=>{
          this.user=res.data

          })
       },
      update:function (userId) {
        axios.get("api/updateUserStatue"+"/"+userId).then(res=>{
          if(res.data!=null){
            swal({
              text: "审核成功！",
              icon: "success",
              button: "确定",
            });
            this.query()
          }else{
            swal({
              text: "审核失败！",
              icon: "info",
              button: "确定",
            });
          }
        })
      },

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
</style>
