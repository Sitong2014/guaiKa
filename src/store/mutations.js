
import {
    GET_USERINFO,
    USER_LOGIN,
    GET_USERINFO_BY_NAME,
    GET_TOPIC,
    GET_TOPIC_BY_ID

} from './mutation-types.js'

export default{
//获取用户信息存入vuex
    [GET_USERINFO](state,info){  
        state.userInfo = {...info};
    },
    [USER_LOGIN](state,info){
        state.isLogin = true;
        state.nowUserName = info.data.info[0].username;
        state.imgPath = info.data.info[0].avatarImg;
    },
    [GET_USERINFO_BY_NAME](state,info){
        state.userInfo = info;
    },
    [GET_TOPIC](state,info){
        state.topicList = info;
    },
    [GET_TOPIC_BY_ID](state,info){
        state.topicInfo = info;
    }
}