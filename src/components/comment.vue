<template>
  <div class="hello" style="width: 100%;margin: auto">
     <!--<div style="width: 900px;;height: 40px;margin: auto">-->
       <div >
         <el-row :gutter="10">
           <el-col :span="20">
             <h2 style="font-weight: 600;text-align: center">{{ msg }}</h2>
           </el-col>
           <el-col :span="4">
             <el-button style="float: left;margin-top: 20px" plain type="primary">导出POI</el-button>
           </el-col>
         </el-row>
       <!--</div>-->

       <!--<div style="float: left;width: 900px;height: 80px;line-height: 90px">-->

       <!--<template>-->
         <!--<el-select v-model="value" placeholder="请选择">-->
           <!--<el-option-->
             <!--v-for="item in options"-->
             <!--:key="item.value"-->
             <!--:label="item.label"-->
             <!--:value="item.value">-->
           <!--</el-option>-->
         <!--</el-select>-->
       <!--</template>-->
      <!--<el-input type="text" style="width: 200px;height: 40px"-->
                <!--v-model="input" placeholder="输入要查询内容"></el-input>-->
       <!--<el-button plain type="primary" style="width: 80px;height: 40px" @click="search()">查询</el-button>-->
         <!--<template>-->
           <!--<el-select v-model="name" placeholder="请选择">-->
             <!--<el-option-->
               <!--v-for="item in orderBy"-->
               <!--:key="item.name"-->
               <!--:label="item.info"-->
               <!--:value="item.name">-->
             <!--</el-option>-->
           <!--</el-select>-->
         <!--</template>-->
         <!--<el-button plain type="primary" style="width: 80px;height: 40px" @click="orderShops()">排序-->
         <!--</el-button>-->
       <!--</div>-->
     </div>


    <!--<el-button type="primary" round @click="toinsert()">新增商品</el-button>-->
    <el-table :data="comment" stripe style="width: 100%;">
      <el-table-column
        prop="videoId"
        label="视频ID"
        width="80">
      </el-table-column>

      <el-table-column
        prop="commentId"
        label="评论ID"
        width="80">
      </el-table-column>

      <el-table-column
        prop="userName"
        label="用户ID"
        width="80">
      </el-table-column>

      <el-table-column
        label="用户头像"
        width="80" >
        <template slot-scope="scope">
          <img :src="scope.row.userPic" width="40" height="40" class="pic"/>
        </template>
      </el-table-column>

      <el-table-column
        prop="commentContent"
        label="评论内容"
        width="260">
      </el-table-column>

      <el-table-column align="center"
                       label="评论状态"
                       width="180"  >
        <template slot-scope="scope">
          <span v-if="scope.row.commentStatue==0">正常</span>
          <span v-if="scope.row.commentStatue==1">禁言</span>
        </template>

      </el-table-column>
      <el-table-column label="操作" width="150">
        <el-button-group slot-scope="scope">
          <el-button type="primary" plain icon="el-icon-edit" @click="update(scope.row.commentId)">审核</el-button>
          <!--<el-button type="primary" plain icon="el-icon-delete" @click="deleteUser(scope.row.commentId)">举报</el-button>-->
        </el-button-group>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" :page-size="this.params.size" v-on:current-change="changePage"
                   :total="total" :current-page="this.params.page"></el-pagination>

    <el-row style="height: 20px"></el-row>

  </div>
</template>

<style>
  .el-main{
    /*background-color: inherit;*/
    line-height: inherit;
  }
</style>
<script>
  import axios from 'axios'
  import ElRow from "element-ui/packages/row/src/row";
  import ElInput from "../../node_modules/element-ui/packages/input/src/input";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {
      ElButton,
      ElInput,
      ElRow},
    name: 'comment',
    data (){
      return {
        input:'',
        msg: '评论信息展示',
        comment:[],
        total:0,
        params:{
          size:8,
          page:1,
        },

      }
    },
    mounted(){
      this.query();
    },
    methods:{
      query:function () {
        axios.get("api/findAllComment/"+this.params.page+"/"+this.params.size).then(res=>{
          this.comment = res.data;
        })
      },
      update:function(commentId){
          axiox.get("api/updateCommentStatue/"+commentId).then(res=>{
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
      }

    }
  }
</script>
