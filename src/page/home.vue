<template>
  <div class='container'>
    <gk-head :goBack="false">
      <span slot='logo' class="head_logo"  @click="reload"></span>
    </gk-head>
    <div id='wrap' class='topic-list'>
      <ul class='list-box'>
        <li v-for="(data,index) in topicList">
          <div class='left'>
            <img :src='data.userAvatar'>
          </div>
          <div class='right'>
            <span class='date'>{{data.createDate.split(" ")[1]+" "+data.createDate.split(" ")[2]+" "+data.createDate.split(" ")[3]+" "+data.createDate.split(" ")[4]}}</span>
            <span class='topic-username'>{{data.username}}</span>
            <p>{{data.content}}</p>
          </div>
          <div class='tool'>
            <img class='fav' :src='!data.isLove?love_notRed:love_red' @click="love(data.isLove,index)">
            <img class='reply' src='../../static/imgs/reply.png' @click='goTopic(data._id)'>
          </div>
        </li>
      </ul>
    </div>
    <button class='add-topic' @touchstart.prevent="addTopic()">✚</button>
  </div>
</template>

<script>
import {state,mapActions,mapState} from 'vuex'
import gkHead from "../components/head.vue"
//发布话题

export default {
  name: 'home',
  components:{
    gkHead
  },
  mounted(){
    //获取主题列表
    var _this = this;
    var num = 10;
    this.getTopicList(num);
    //获取设置transform
    function cssTransform(el,attr,val) {
        if(!el.transform){
          el.transform = {};
        }
        if(arguments.length>2) {
          el.transform[attr] = val;
          var sVal = "";
          for(var s in el.transform){
            switch(s) {
              case "rotate":
              case "skewX":
              case "skewY":
                sVal +=s+"("+el.transform[s]+"deg) ";
                break;
              case "translateX":
              case "translateY":
              case "translateZ":
                sVal +=s+"("+el.transform[s]+"px) ";
                break;
              case "scaleX":
              case "scaleY":
              case "scale":
                sVal +=s+"("+el.transform[s]+") ";
                break;	
            }
            el.style.WebkitTransform = el.style.transform = sVal;
          }
        } else {
          val  = el.transform[attr];
          if(typeof val == "undefined" ) {
            if(attr == "scale" || attr == "scaleX" || attr == "scaleY"  ){
              val = 1;
            } else {
              val = 0;
            }
          }
          return val;
        }
    }
    function mscroll(wrap) {
      var child = wrap.children[0]; 
      var startPoint = 0;
      var startY = 0;
      var minY = wrap.clientHeight - child.offsetHeight;
      var step = 1;
      var lastY = 0; 
      var lastTime = 0;
      var lastDis = 0;
      var lastTimeDis = 1;
      cssTransform(child,"translateZ",0.01);
      wrap.addEventListener(
        'touchstart', 
        function(e) {
          child.style.transition = "none";
          startPoint = e.changedTouches[0].pageY;
          startY = cssTransform(child,"translateY");
          step = 1;
          lastY = startPoint;
          lastTime = new Date().getTime();
          lastDis = 0;
          lastTimeDis = 1;
        }
      );
      wrap.addEventListener(
        'touchmove', 
        function(e) {
          var nowPoint = e.changedTouches[0].pageY;
          var dis = nowPoint - startPoint;
          var t = startY + dis;
          var nowTime = new Date().getTime();
          if(t > 0) {
            step = 1-t / wrap.clientHeight; 
            t = parseInt(t*step);
          }
          if(t < minY) {
            var over = minY - t; 
            step = 1-over / wrap.clientHeight;
            over = parseInt(over*step);
            t = minY - over;
          }
          lastDis = nowPoint - lastY; 
          lastTimeDis = nowTime - lastTime; 
          lastY = nowPoint;
          lastTime = nowTime;
          cssTransform(child,"translateY",t);
        }
      );
      wrap.addEventListener(
        'touchend', 
        function (){
           var finalTrans = cssTransform(child,"translateY");
            if( finalTrans < -80){
              layer.open({
                type: 2
                ,content: '加载中',
                time:1,
                end:function(){
                  num +=5;
                  _this.getTopicList(num);
                }
              });
            }
          var speed = (lastDis/lastTimeDis)*300; 
          var t = cssTransform(child,"translateY");
          var target = t + speed; 
          var type = "cubic-bezier(.34,.92,.58,.9)";
          var time = Math.abs(speed*.9);
          time = time<300?300:time;
          if(target > 0) {
            target = 0;
            type ="cubic-bezier(.08,1.44,.6,1.46)";
          }
          if(target < minY) {
            target = minY;
            type ="cubic-bezier(.08,1.44,.6,1.46)";
          }
          child.style.transition = time+"ms " + type;
          cssTransform(child,"translateY",target);
        }
      );
    };
      var wrap  = document.querySelector("#wrap");
      mscroll(wrap);
    
    
		
    },
  data () {
    return {
      msg: 'this is home',
      isLove:false,
      love_notRed:"../../static/imgs/love_notRed.png",
      love_red:"../../static/imgs/love_red.png"
    }
  },
  computed:{
    ...mapState([
        "topicList",
        "isLogin",
        "userInfo"
    ])
  },
  methods:{
    ...mapActions([
        'getTopicList',
        'postTopic'
    ]),
  //点击图标刷新页面
    reload(){
        window.location.href = "#/home"
    },
    love(i,index){
      i = !i;
      this.topicList[index].isLove = i;
    },
    addTopic(){
      var f_this = this;
      if(this.isLogin){
        //弹出输入框输入要发表的内容
        layer.open({
                content: '<div class=\'topic-input-box\' style="position:relative;">'+
                            '<textarea class="textContent" rows="5" cols="30" placeholder="你想说点什么？" style="padding:1rem;font-size:1.6rem;outline:none;resize:none;border:none;background:#F4F6F6;color:#1E8449;"></textarea>'+
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
          var postObj ={
            postContent:postContent,
            username:username,
            userAvatar:userAvatar
          } 
          f_this.postTopic(postObj);
          
      }
    },
    goTopic(id){
      var url = "#/topic/"+id;
      location.href = url;
    }
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
  .topic-list{
    margin-top:6rem;
    width:100%;
    ul{
      width:100%;
      li{
        background:#f1f9f7;
        position:relative;
        box-sizing:border-box;
        display:flex;
        justify-content:left;
        width:100%;
        padding:1rem 2rem 5rem 2rem;
        border-bottom:5px solid #fff;
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
            right:0rem;
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
            width:2rem;
            height:2rem;
            vertical-align:text-bottom;
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
    }
  }
  .add-topic{
    display:flex;
    justify-content:center;
    align-item:center;
    position:fixed;
    width:6rem;
    height:6rem;
    border-radius:50%;
    bottom:4rem;
    background:#93D0D2;
    border:none;
    font-size:3rem;
    color:#fff;
    left:50%;
    margin-left:-3rem;
  }
  .reply-box{
    position:absolute;
  }
</style>
