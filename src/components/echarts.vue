<template>
  <div>
  <h2>{{msg}}</h2>
    <!--<div style="float: left;margin: auto">-->
    <el-button type="success" round plain style="width: 200px;margin-left: 10px" @click="show1()">点赞量</el-button>
    <el-button type="success" round plain style="width: 200px"@click="show2()">收藏量</el-button>
    <el-button type="success" round plain style="width: 200px"@click="show3()">下载量</el-button>
    <el-button type="success" round plain style="width: 200px"@click="show4()">评论量</el-button>
    <div id="saleShow" style="width: 1000px;height: 500px;margin: auto ;padding-top: 20px"></div>
  </div>

</template>
<style>
  .el-main{
    line-height: inherit;
  }
</style>


<script>
  import axios from 'axios'
  // 引入基本模板
  //var echarts = require('echarts/lib/echarts')
  export default{
      data(){
          return{
            msg:'各类视频统计表',
            x:[],
            y:[],
            title:''
          }
      },
    mounted(){

    },

    methods:{
     showtitle:function (id) {
         if(id==1){
           this.title= '各类视频本月点赞量统计图'
         }else if(id==2){
           this.title= '各类视频本月收藏量统计图'
         }else if(id==3){
           this.title= '各类视频本月下载量统计图'
         }else if(id==4){
           this.title= '各类视频本月评论量统计图'
         }
        this.draw()
       },
        show:function (id) {
          var url="api/findAllTypes"
          axios.get(url).then(res=>{
            var data=res.data
            for(var i=0;i<data.length;i++){
              this.x.push( data[i].typeName)
              if(id==1){
                this.y.push(data[i].typeLike)
              }else if(id==2){
                this.y.push(data[i].typeFavorite)
              }else if(id==3){
                this.y.push(data[i].typeDownload)
              }else if(id==4){
                this.y.push(data[i].typeComment)
              }
             }
            this.draw()
          })

        },
      show1:function () {
        this.x=[]
        this.y=[]
        var id=1
        this.show(id)
       this.showtitle(id)

      },
      show2:function () {
       this.x=[]
       this.y=[]
       var id=2
       this.showtitle(id)
       this.show(id)
       },
       show3:function () {
       this.x=[]
       this.y=[]
       var id=3
       this.showtitle(id)
       this.show(id)
       },
       show4:function () {
       this.x=[]
       this.y=[]
       var id=4
       this.showtitle(id)
       this.show(id)
       },
       draw:function () {
          var myChart=this.$echarts.init(document.getElementById("saleShow"))
          myChart.clear()
          myChart.setOption({
            title:{
                text:this.title
            },
            tooltip:{
                show:true
            },
            legend:{
                data:['数量']
            },
            xAxis:{
                data:this.x,
              axisLabel: {
                interval: 0,
                formatter: function (params) {
                  var newParamsName = "";
                  var paramsNameNumber = params.length;
                  var provideNumber = 4;  //一行显示几个字
                  var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                  if (paramsNameNumber > provideNumber) {
                    for (var p = 0; p < rowNumber; p++) {
                      var tempStr = "";
                      var start = p * provideNumber;
                      var end = start + provideNumber;
                      if (p == rowNumber - 1) {
                        tempStr = params.substring(start, paramsNameNumber);
                      } else {
                        tempStr = params.substring(start, end) + "\n";
                      }
                      newParamsName += tempStr;
                    }

                  } else {
                    newParamsName = params;
                  }
                  return newParamsName
                },
              }
            },
            yAxis:{
                style:"value"
            },
            series:[
              {
                  name:'销量',
                color:'darkseagreen',
                type:'bar',
                barWidth : 30,//柱状图柱子的宽度
                data:this.y
              },
              {
                  name:'销量',
                color:'blue',
                type:'line',
                data:this.y,
                markLine:{
                      data:[
                        {type:'average',name:'平均值'}
                      ]
                },
                markPoint:{
                      data:[
                        {type:'max',name:'最大值'},
                        {type:'min',name:'最小值'}
                      ]
                }

              }
            ]

          },);

        }
    }
  }
</script>
