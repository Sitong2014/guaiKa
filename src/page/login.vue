<template>
 <div class='container'>
    <div class='head'>
        <span  @click="back()">取消</span>
    </div>
     <h2 class='title'>欢迎登录 怪咖 </h2>
     <div class='form-box'>
        <input type='text' placeholder='手机号/邮箱' v-model='login_info.username'>
        <input type='password' placeholder='密码' v-model='login_info.password'>
        <button type='button' @click="user_login(login_info)">登录</button>
     </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import{ USER_LOGIN } from '../store/mutation-types.js'
export default {
  name: 'login',
  data () {
    return {
      login_info:{
        username:"",
        password:""
      }
    }
  },
   methods:{
    ...mapActions([
        'loginUser'
    ]),
    user_login(data){
        this.loginUser(data);
        var storage = window.localStorage; 
        storage.username = data.username;
        storage.password = data.password;
    },
    back(){
        var storage = window.localStorage;
        storage.username = null; 
        this.$router.go(-1);
    }
  },
  computed:{
    ...mapState([
        "isLogin"
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container{
  display:flex;
  flex-direction:column;
  .head{
      position:relative;
      line-height:4rem;
      height:4rem;
      color:#93D0D2;
      border-bottom:1px solid #f0f0f0;
      background:#fff;
      text-align:center;
      span{
          position:absolute;
          left:0.5rem;
          font-weight:400;
          font-size:1.8rem;
      }
  }
  .title{
      padding:0.5rem 0 0 0;
      text-align:center;
      color:#93D0D2;
      font-size:2.6rem;
  } 
  .form-box{
      padding:0.5rem;
      display:flex;
      flex-direction:column ; 
      input{
        box-sizing:border-box;
        padding:0.25rem 0.3rem;
        margin:0.5rem 0 0 0;
        border:none;
        background:#f0f0f0;
        height:4.3rem;
        border-radius:0.2rem;
        font-size:0.8rem;
        outline:none;
        color:#93D0D2;
        text-align:left;
        font-size:1.8rem;
    }
     button{
        width:100%;
        height:4.3rem;
        margin:0.5rem 0;
        color:#fff;
        background:#93D0D2;
        border:none;
        border-radius:0.2rem;
        outline:none;
        font-size:1.8rem;
    }
  }
}

  

</style>
