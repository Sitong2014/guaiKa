<template>
 <div class='container'>
    <div class='head'>
        <span  @click="$router.go(-1)">取消</span>
    </div>
     <h2 class='title'>注册 怪咖 </h2>
     <div class='form-box'>
        <input type='text' placeholder='手机号/邮箱' v-model='reg_info.username'>
        <input type='password' placeholder='密码(不少于6位)' v-model='reg_info.password'>
        <input type='text' placeholder='昵称' v-model='reg_info.nickname'>
        <button type='button' @click="reg(reg_info)">注册</button>
     </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import{ regUser } from '../data.js'
export default {
  name: 'reg',
  data () {
    return {
      reg_info:{
        username:null,
        password:null,
        nickname:""
      },
      layer:layer
    }
  },
   methods:{
    ...mapActions([
        'reg'
    ]),
    //注册用户
    async reg(data){
        let res = await regUser(data);
    }
  },
  computed:{
    ...mapState([
        "regSuccess"
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .container{
        display:flex;
        flex-direction:column ; 
      .head{
        position:relative;
        line-height:4rem;
        height:4rem;
        color:#93D0D2;
        border-bottom:1px solid #ccc;
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
            height:4.2rem;
            border-radius:0.2rem;
            font-size:1.8rem;
            outline:none;
            color:#93D0D2;
            text-align:left;
        }
          button{
              width:100%;
              height:4.2rem;
              margin:0.5rem 0;
              color:#fff;
              background:#93D0D2;
              border:none;
              border-radius:0.2rem;
              outline:medium;
              font-size:1.8rem;
          }
      }
    }
    
    
     
    
    
      
     
</style>
