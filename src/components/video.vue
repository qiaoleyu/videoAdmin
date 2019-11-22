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
          {{video.videoUrl}}
          <template slot-scope="scope">
            {{scope.row.videoUrl}}
            <!--<source :src="scope.row.videoUrl" type="video/mp4">-->
          </template>
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
        playerOptions: {
          playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
          autoplay: false, // 如果为true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 是否视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4", // 类型
            src: 'http://candy-jing.oss-cn-beijing.aliyuncs.com/111.mp4' // url地址
          }],
          poster: '../static/img/bala.jpg', // 封面地址
          notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true, // 当前时间和持续时间的分隔符
            durationDisplay: true, // 显示持续时间
            remainingTimeDisplay: false, // 是否显示剩余时间功能
            fullscreenToggle: true // 是否显示全屏按钮
          },
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

    //播放回调
    onPlayerPlay(player) {
//        console.log('player play!', player)
    },

    // 暂停回调
    onPlayerPause(player) {
//        console.log('player pause!', player)
    },

    // 视频播完回调
    onPlayerEnded($event) {
//        console.log(player)
    },

    // DOM元素上的readyState更改导致播放停止
    onPlayerWaiting($event) {
//        console.log(player)
    },

    // 已开始播放回调
    onPlayerPlaying($event) {
//        console.log(player)
    },

    // 当播放器在当前播放位置下载数据时触发
    onPlayerLoadeddata($event) {
//        console.log(player)
    },

    // 当前播放位置发生变化时触发。
    onPlayerTimeupdate($event) {
//        console.log(player)
    },

    //媒体的readyState为HAVE_FUTURE_DATA或更高
    onPlayerCanplay(player) {
      // console.log('player Canplay!', player)
    },

    //媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。
    onPlayerCanplaythrough(player) {
      // console.log('player Canplaythrough!', player)
    },

    //播放状态改变回调
    playerStateChanged(playerCurrentState) {
//        console.log('player current update state', playerCurrentState)
    },

    //将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。
    playerReadied(player) {
//        console.log('example player 1 readied', player);
    }


    }
  }
</script>
