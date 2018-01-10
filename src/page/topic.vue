<template>
  <div class='container'>
      <gk-head :goBack="true">
        
      </gk-head>
      <div class='topic-box'>
          <div class='left'>
            <img :src='topicInfo[0].userAvatar'>
          </div>
          <div class='right'>
            <span class='date'>{{topicInfo[0].createDate}}</span>
            <span class='topic-username'>{{topicInfo[0].username}}</span>
            <p>{{topicInfo[0].content}}</p>
          </div>
          <div class='tool'>
            <img class='fav' src='../../static/imgs/fav.png' @click='addFav()'>
            <span class='fav-num'>{{topicInfo[0].fav}}</span>
            <img class='reply' src='../../static/imgs/reply.png' @click='addReply()'>                                                                                              
          </div>
      </div>
      <div class='reply-box'>
        <ul class='reply-list'>
          <li v-for="(data,index) in topicInfo[0].reply">
            <img :src='data.replyAvatar'>
            <p>
              {{data.content}}
            </p>
            <span class='name'>{{data.replyName}}</span>
            <span class='data'>{{data.replyDate}}</span>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import {state,mapActions,mapState} from 'vuex'
import gkHead from "../components/head.vue"
export default {
  name: 'topic',
  components:{
    gkHead
  },
  data () {
    return {
      msg: 'this is topic'
    }
  },
  computed:{
    ...mapState([
        "topicList",
        "isLogin",
        "userInfo",
        "topicInfo"
    ])
  },
  methods:{
     ...mapActions([
        'getTopicInfo',
        'postReply',
        "addOneFav"
    ]),
  //点击图标刷新页面
    reload(){
        window.location.href = "#/home"
    },
    addReply(){
      var f_this = this;
      if(this.isLogin){
        //弹出输入框输入要发表的内容
        layer.open({
                content: '<div class=\'topic-input-box\' style="position:relative;">'+
                            '<textarea class="textContent" rows="5" cols="30" placeholder="你想评论点什么？" style="padding:1rem;font-size:1.6rem;outline:none;resize:none;border:none;background:#F4F6F6;color:#1E8449;"></textarea>'+
                            '<button class="topicBtn" type="button" class="post" ontouchstart="" style="position:absolute;border-radius:1rem;width:7.4rem;height:3rem;border:none;bottom:-2.8rem;right:0.6rem;color:#fff;background:#58D68D;font-size:1.8rem;">发布</button>'+
                          '</div>',
                time: 200, //2秒后自动关闭
                success:()=>{
                   console.log(this.userInfo);
                }
            });
      }else{
        layer.open({
                content: '您还没有登录哦！',
                skin: 'msg',
                time: 2, //2秒后自动关闭
                success:()=>{
                  window.location.href = "#/login"
                }
            });
      }
      var postBtn = document.querySelector(".topicBtn");
        postBtn.ontouchstart = function(e){
          var textarea = document.querySelector("textarea");
          //发布的话题内容
          var postContent = textarea.value;
          //发布的用户名
          var username = f_this.userInfo.nickname;
          //发布用户的头像
          var userAvatar = f_this.userInfo.avatarImg;
          var _url = location.hash;
          var _topicid = _url.split('/')[2];
          var postObj ={
            postContent:postContent,
            username:username,
            userAvatar:userAvatar,
            replyWhat:f_this.topicInfo[0].content,
            r_username:f_this.topicInfo[0].username,
            thatTime:f_this.topicInfo[0].createDate,
            r_id:_topicid
          } 
          f_this.postReply(postObj);
          
      }
      
    },
    addFav(){
      var f_this = this;
      var _url = location.hash;
      var _topicid = _url.split('/')[2];
      var Obj = {
        replyWhat:f_this.topicInfo[0].content,
        r_username:f_this.topicInfo[0].username,
        thatTime:f_this.topicInfo[0].createDate,
        r_id:_topicid
      }
      this.addOneFav(Obj);
    }
  },
  mounted(){
    var nowUrl = location.hash;
    var topicid = nowUrl.split('/')[2];
    console.log(topicid);
    //获取topic信息
    this.getTopicInfo(topicid);
    console.log(this.topicInfo);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
   .container{
    height:100%;
  }
  .head_logo{
    position:absolute;
    display:block;
    width:4rem;
    height:3.5rem;
    background-image:url(../../static/imgs/logo.png);
    background-size:100% 100%;
    left:1rem;
    top:1.2rem;
  }
   
  .topic-box{
    margin-top:6rem;
    background:#f1f9f7;
    position:relative;
    box-sizing:border-box;
    display:flex;
    justify-content:left;
    width:100%;
    padding:1rem 2rem 5rem 2rem;
    .left{
      flex:1;
      width:5rem;
      height:5rem;
      border-radius:50%;
      img{
        width:100%;
        height:100%;
        border-radius:50%;
      }
    }
    .right{
      position:relative;
      flex:5;
      box-sizing:border-box;
      padding:0  0 0 2.2rem;
      text-align:left;
      .date{
        position:absolute;
        right:0;
        top:0;
        color:#88a199;
        font-size:1.2rem;
      }
      span{
        display:block;
        font-size:1.6rem;
        margin:0 0 1rem 0;
      }
      p{
        font-size:1.4rem;
      }
    }
    .tool{
      position:absolute;
      width:100%;
      bottom:1.8rem;
      left:0rem;
      text-align:right;
      .fav{
        position:relative;
        top:-0.1rem;
        width:1.8rem;
        height:1.8rem;
        vertical-align:text-bottom;
      }
      .fav-num{
        font-size:1.4rem;
        margin-left:0.5rem;
        color:#65667F;
      }
      .reply{
        position:relative;
        top:0.4rem;
        width:2.2rem;
        height:2rem;
        margin:0 3rem;
      }
    }
  }
  .reply-list{
    background:#F1F5F4;
    li{
      position:relative;
      display:flex;
      justify-content:left;
      margin:0rem 2rem 1rem 2rem;
      padding:1rem 0 0 0 ;
      border-bottom:1px solid #D3D3DB;
      &:last-child{
        border-bottom:none;
      }
      img{
        width:3rem;
        height:3rem;
        border-radius:50%;
      }
      p{
        margin:2.8rem 1rem 1.5rem 1rem;
        font-size:1.2rem;
      }
      .name{
        position:absolute;
        left:4rem;
        font-size:1.2rem;
        color:#4A4B62;
      }
      .data{
        position:absolute;
        right:0;
        top:1rem;
        font-size:1.1rem;
        color:#88a199;
      }
    }
  }
</style>
