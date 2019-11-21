<template>
  <div class="hello">
    <h2 style="font-weight: 600">{{ msg }}</h2>
      <el-table align="center"
              :data="role"
              border
              style="width: 100%">
      <el-table-column align="center"
                       prop="rid"
                       label="角色编号"
                       width="260">
      </el-table-column>
      <el-table-column align="center"
                       prop="aid"
                       label="管理员姓名"
                       width="260">
        <template slot-scope="scope">
          <div  v-for="(admin,index) in admin">
            <span v-if="scope.row.aid==admin.aid">{{admin.aname}}</span>
          </div>
        </template>
      </el-table-column>
        <el-table-column align="center"
                        prop="rname"
                       label="角色名称"
                       width="260"  >
      </el-table-column>

      <el-table-column align="center"
                       label="操作"
                       width="260">
        <template slot-scope="role">

          <el-button type="danger" icon="el-icon-delete" circle @click="del(role.row.rid)" v-if="role.row.rid!=1">正常</el-button>
          <el-button type="primary" icon="el-icon-edit" circle @click="update(role.row.rid)" v-if="role.row.rid!=1">禁用</el-button>
        </template>

      </el-table-column>
    </el-table>

      </div>
</template>
<style>
  .el-main{
    line-height: inherit;
  }
</style>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        msg: '用户详情页面',
        role:[],
        admin:[]
      }
    },
    mounted(){
      this.query()
      this.queryRole()
    },
    methods: {
      query:function () {
        var url ="api/findAll"
        axios.get(url).then(res=>{
          this.admin=res.data

          })
       },
      queryRole:function () {
        var url ="api/findAllRoles"
        axios.get(url).then(res=>{
          this.role=res.data

        })
      },
      update:function (id) {

        axios.get("api/unauth").then(res=>{
          if(res.data==1){
            this.$router.push({path:"/updateRole/"+id})
          }if(res.data==0) {
            this.$message.error('错了哦，您没有修改权限');
            this.$router.push('/unauth')

          }
        })
      },
      del:function (id) {
       // alert(id)
        var url="api/deleteRole/"+id
        axios.get(url).then(res=>{
            if(res.data==1){
              this.queryRole()
              this.$message({
                message: '恭喜你，删除角色成功',
                type: 'success'
              });
            }else if(res.data==0) {
              this.$message.error('错了哦，您没有删除权限');
              this.$router.push('/unauth')
            }
            else{
//                alert("删除失败！")
              this.$message.error('错了哦，删除失败');

            }
        })

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
</style>
