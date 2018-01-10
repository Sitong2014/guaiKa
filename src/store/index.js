import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
Vue.use(Vuex)

const state = {
    latitude: '', // 当前位置纬度
    longitude: '', // 当前位置经度
    userInfo:null,//用户信息
    topic:{},//话题
    hotTopicList:{},//最热话题列表
    newTopicList:{},//最新话题列表
    topicList:{},//话题列表（总列表）
    isLogin: false,//是否登录
    imgPath:null,//头像地址
    nowUserName:"",//此时登录的用户名,
    topicInfo:null//点击进入的话题
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})