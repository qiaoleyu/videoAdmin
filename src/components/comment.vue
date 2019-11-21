<template>
  <div class="hello" style="width: 100%;margin: auto">
     <div style="width: 900px;;height: 40px;margin: auto">
       <div style="width: 200px;height: 20px;line-height: 20px;margin: auto">
         <h2 style="text-align: left">{{ msg }}</h2>
       </div>

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
    <el-table :data="shops" stripe style="width: 100%;">
      <el-table-column prop="shopId" label="用户ID" width="180"> </el-table-column>

      <el-table-column label="用户头像" width="180" >
        <template slot-scope="scope">
          <img :src="scope.row.shopBigPic" width="40" height="40" class="pic"/>
        </template>
      </el-table-column>

      <el-table-column prop="shopName" label="标题内容" width="180"></el-table-column>
      <el-table-column prop="factory" label="评论者" width="180"></el-table-column>
      <el-table-column prop="shopInfo" label="评论内容" width="180"></el-table-column>
      <el-table-column label="操作" width="150">
        <el-button-group slot-scope="scope">
          <el-button type="primary" plain icon="el-icon-edit" @click="toupdate(scope.row.shopId)">审核通过</el-button>
          <el-button type="primary" plain icon="el-icon-delete" @click="deleteUser(scope.row.shopId,scope.row.skId)">举报</el-button>
          <el-button type="primary" plain icon="el-icon-edit" @click="toupdate(scope.row.shopId)">小黑屋</el-button>
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
    name: 'shops',
    data (){
      return {
        input:'',
        msg: '评论信息展示',
        shops:[],
        shopKinds:[],
        total:0,
        params:{
          size:8,
          page:1,
        },
        orderBy:[{
          name: 'shopPrice',
          info: '商品价格'
          }, {
          name: 'shopNumber',
          info: '商品销量'
          }, {
          name: 'skName',
          info: '商品类别'
          }],
        options: [{
          value: 'shopName',
          label: '商品名称'
        }, {
          value: 'shopInfo',
          label: '商品描述'
        }],
        value: '',
        name:''
      }

    },
    mounted(){
      this.queryShopKinds();
        this.queryShops();

    },
    methods:{

      search:function () {
          axios.post("api/xm-shop/findByValues/"+this.params.page+"/"+this.params.size,{value:this.value,name:this.input}).then(res=>{
              if (res.data!=null){
                this.shops = res.data.list;
                this.total=res.data.total;
              }else {
//                  alert("无此类商品")
                this.$message.error('错了哦，无此类商品');

              }
          })
        },
      orderShops:function () {
          console.log(this.name);
        axios.post("api/xm-shop/orderShops/"+this.params.page+"/"+this.params.size+"/"+this.name).then(res=>{
            if (res.data!=null){
              this.shops = res.data.list;
              this.total=res.data.total;
            }else {
//              alert("无此类商品")
              this.$message.error('错了哦，无此类商品');

            }
        })

      },

      toinsert:function () {
        this.$router.push('/addShops');
       /* axios.get("api/xm-shop/unauth").then(res=>{
          if(res.data==1){
            this.$router.push('/addShops');
          }if(res.data==0) {
            this.$message.error('错了哦，您没有添加商品的权限');
            this.$router.push('/unauth')
          }
        })*/
      },
      toupdate:function (shopId) {
        this.$router.push({path:'/updateShops/'+shopId})

      },
      deleteUser:function (shopId,skId) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get("api/xm-shop/deleteShops/"+shopId+"/"+skId).then(res=>{
            if(res.data==1){
              this.queryShops();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else if(res.data==0) {
              this.$router.push('/unauth')
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      changePage:function (page) {
        this.params.page=page;
        if (this.value!=''&& this.input!=''){
          this.search();
        }else if (this.name!='') {
            this.orderShops();
        }else{
          this.queryShops();
        }
      },
      queryShops:function() {
        var url = "api/xm-shop/findAllShops/"+this.params.page+"/"+this.params.size;
        axios.get(url).then(res => {
          this.shops = res.data.list;
          this.total=res.data.total;
        })
      },
      queryShopKinds:function() {
        var url = "api/xm-shop/show1";
        axios.get(url).then(res => {
          this.shopKinds = res.data;
        })
      }
    }
  }
</script>
