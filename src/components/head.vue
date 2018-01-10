<template>
  <header>
    <slot name='logo'></slot>
    <slot name='search'></slot>
    <section class="head-goback" v-if="goBack" @click="$router.go(-1)">
        <span class='icon-goback'>‹</span>
    </section>
    <section class='head-login-reg' v-if="!this.isLogin">
        <router-link to='/login'>
            <span>登录</span>
        </router-link>
        <router-link to='/reg'>
            <span>注册</span>
        </router-link>
    </section>
    <section v-else>
        <div class='user-avatar'>
            <img :src='this.userInfo.avatarImg'  @click='toUser' :user-name='nowUserName' :userInfo='userInfo'>
        </div>
    </section>
  </header>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'gkHead',
  data () {
    return {
     avatarUrl:"",
    }
  },
   mounted(){
        //获取用户信息
        var storage = window.localStorage;
        //获取用户信息
        this.getUserInfoByName(storage.username);
        console.log(this.userInfo);
        console.log(storage);
        if(storage.username != "null"){
            console.log(this.$store.state.nowUserName)
            this.nowUserName = storage.username;
            this.isLogin = true;
        }else{
            this.isLogin = false;
        }
    },
    props: ['goBack'],
    computed:{
        ...mapState([
            "userInfo"
        ]),
        imgPath:{
            get(){
                
            }
        },
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
        },
        userInfo:{
            get(){
                return this.$store.state.userInfo;
            }
        }
  },
  methods:{
      ...mapActions([
        'getUserInfoByName'
    ]),
    //获取用户信息
    ...mapActions([
        
    ]),
    toUser(){
        location.href = "#/user/"+this.$store.state.nowUserName
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$bgc:#93D0D2;
$pos-ab:absolute;
$pos-re:relative;
    header{  
        position:fixed;
        z-index:99;
        top:0;
        left:0;
        width:100%;
        height:6rem;
        background:$bgc;
    }
    .icon-goback{
        position:$pos-ab;
        left:2rem;
        font-size:4.5rem;
        color:#fff;
    }
    .head-login-reg{
        position:$pos-ab;
        right:1rem;
        top:1.8rem;
        font-size:1.8rem;
        a{
            text-decoration:none; 
            color:#fff; 
            font-weight:600;
            margin-left:1rem;
        }
    }
    .user-avatar{
        position:$pos-ab;
        width:4.5rem;
        height:4.5rem;
        right:1rem;
        top:0.7rem;
        border-radius:50%;
        img{
            width:100%;
            height:100%;
            border-radius:50%;
        }
    }
</style>
