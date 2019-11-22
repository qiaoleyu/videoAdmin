 <template>
  <div class="hello" style="width: 100%;margin: auto">
     <!--<div style="width: 900px;;height: 40px;margin: auto">-->
       <div >
         <el-row :gutter="10">
           <el-col :span="20">
             <h2 style="font-weight: 600;text-align: center">{{ msg }}</h2>
           </el-col>
           <el-col :span="4">
               <form action="api/exportVideo" method="post">
                 <button style="float: left;margin-top: 30px">导出Excel</button>
               </form>
           </el-col>
         </el-row>
       </div>

    <el-table align="center"
              :data="video"
              border
              style="width: 100%">
      <el-table-column align="center"
                       prop="videoId"
                       label="视频编号"
                       width="50">
      </el-table-column>
      <el-table-column align="center"
                       prop="videoName"
                       label="视频名称"
                       width="80">
      </el-table-column>
      <el-table-column align="center"
        label="视频封面"
        width="80" >
        <template slot-scope="scope">
          <img :src="scope.row.videoPic" width="40" height="40" class="pic"/>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       prop="videoInfo"
                       label="视频介绍信息"
                       width="260">
      </el-table-column>
      <el-table-column align="center"
                       label="视频详情"
                       width="260">
        <video  width=100%  style="margin: auto;height:130px;border-radius: 10px"    class="video-js vjs-default-skin vjs-big-play-centered" playRate controls>
          <source :src="video.videoUrl"
                   type="video/mp4">
        </video>
      </el-table-column>
      <el-table-column align="center"
                       prop="videoUsername"
                       label="视频发布人"
                       width="80">
      </el-table-column>
      <el-table-column align="center"
                       type="Date"
                       prop="videoUptime"
                       label="视频上传时间"
                       width="100">
      </el-table-column>
      <el-table-column align="center"
                       label="视频状态"
                       width="80"  >
        <template slot-scope="scope">
          <span v-if="scope.row.videoStatue==0">未审核</span>
          <span v-if="scope.row.videoStatue==1">正常</span>
          <span v-if="scope.row.videoStatue==2">VIP视频</span>
          <span v-if="scope.row.videoStatue==3">禁播</span>
        </template>

      </el-table-column>

      <el-table-column align="center"
                       label="操作"
                       width="105">
        <template slot-scope="video">
          <el-button type="primary" @click="update(video.row.videoId)" plain>审核</el-button>
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
        msg: '视频详情页面',
        video:[],
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
        var url ="api/findAllVideo/"+this.params.page+"/"+this.params.size
        axios.get(url).then(res=>{
          this.video = res.data.list;
          this.total=res.data.total;
        })
      },
      update:function (videoId) {
        axios.get("api/updateVideoStatue/"+videoId).then(res=>{
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
              icon: "error",
              button: "确定",
            });
          }
        })
      },
      changePage:function (page) {
        this.params.page=page;
        this.query();
      },
    }
  }
</script>
