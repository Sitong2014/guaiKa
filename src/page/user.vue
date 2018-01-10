<template>
  <div class='head-container'>
    <img :src='userInfo.avatarImg' class='head-bg-img'>
    <div class='head-box'>
      <div class='user-avatar'>
        <img :src='userInfo.avatarImg'>
      </div>
      <div class='user-head-info'>
        <h3>{{userInfo.nickname}}</h3>
        <span>{{userInfo.address}}</span>
        <p>{{userInfo.status}}</p>
      </div>
    </div>
    <div class='topic-info'>
      <button type='button' class='update-info'>更新资料</button>
      <div class='info-item'>
        <span class='num'>{{userInfo.topicList.length}}</span>
        <span class='content'>主题</span>
      </div>
      <div class='info-item'>
        <span class='num'>{{userInfo.follow}}</span>
        <span class='content'>正在关注</span>
      </div>
      <div class='info-item'>
        <span class='num'>{{userInfo.star}}</span>
        <span class='content'>关注者</span>
      </div>
    </div>
    <div class='tool-box'>
      <ul>
        <li>隐私设置</li>
        <li>黑名单管理</li>
        <li @click='$router.go(-1)'>返回上层</li>
        <li @click='close()'>退出登录</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'user',
  data () {
    return {
      msg: 'this is user'
    }
  },
  created(){
    var nowUrl = location.hash;
    var username = nowUrl.split('/')[2];
    //获取用户信息
    this.getUserInfoByName(username);

  },
   computed:{
    ...mapState([
        "userInfo"
    ]),
    isLogin:{
      get(){
        return this.$store.state.isLogin;
      },
      set(val){
        this.$store.state.isLogin = val
      }
    },
    nowUserName:{
      get(){
        return this.$store.state.nowUserName;
      },
      set(val){
        this.$store.state.nowUserName = val;
      }
    }
  },
  methods:{
    ...mapActions([
        'getUserInfoByName'
    ]),
    close(){
      this.isLogin = false;
      this.nowUserName = null;
      var storage = window.localStorage; 
      storage.username = null;
      this.$router.go(-1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.head-container{
  position:relative;
  .head-bg-img{
    position:fixed;
    left:0;
    top:0;
    width:100%;
    height:30rem;
    z-index:-1;
    filter: blur(40px);
  }
}
  .head-box{
    display:flex;
    justify-content:space-around;
    .user-avatar{
      margin:1rem 0 0 1rem;
      width:12rem;
      height:12rem;
      border-radius:50%;
      background:#f0f0f0;
      img{
        display:block;
        width:100%;
        height:100%;
        border-radius:50%;
      }
    }
    .user-head-info{
      flex:3;
      text-align:left;
      margin:1rem 0 0 1rem;
      h3{
        font-size:1.8rem;
        font-weight:400;

        margin:0.5rem  1rem 0 1rem;
      }
      span{
        display:block;
        font-size:1.3rem;
        margin:1rem;
      }
      p{
        margin:1rem;
        font-size:1.3rem;
      }
    }
  }

  .topic-info{
    .update-info{
      display:block;
      position:absolute;
      top:1.5rem;
      left:3.5rem;
      width:8rem;
      height:3rem;
      background-color:#93D0D2;
      border:none;
      border-radius:0.5rem;
      font-size:1.6rem;
      color:#333;
    }
    position:relative;
    padding:6rem 0 3rem 0;
    display:flex;
    justify-content:space-around;
    .info-item{
      display:flex;
      flex-direction:column;
      .num{
        font-size:2.2rem;
      }
      .content{
        font-size:1.2rem;
      }
    }
  }
  .tool-box{
    width:100%;
    ul{
      width:100%;
      li{
        box-sizing:border-box;
        width:100%;
        height:6rem;
        line-height:6rem;
        background:rgba(255,255,255,0.5);
        text-align:left;
        padding-left:4rem;
        font-size:1.6rem;
        border-top:1px solid #f0f0f0;
      }
    }
  }
</style>
