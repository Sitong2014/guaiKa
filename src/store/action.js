import{ login,getUserInfo_byName,getTopic,post_topic,getTopicById,post_reply,add_fav } from '../data.js'
import{ GET_USERINFO,USER_LOGIN,GET_USERINFO_BY_NAME }from './mutation-types.js'
export default {
    // async getUserInfo({commit,state}){
    //     let res = await getUser();
    //     commit(GET_USERINFO,res)
    // }
     //用户登录
     async loginUser({commit,state},data){
        let res = await login(data,commit);

        //触发USER_LOGIN 更改isLogin、nowUserName的状态
    },
    //通过用户姓名获取用户信息
    async getUserInfoByName({commit,state},data){
        let res = await getUserInfo_byName(data,commit);
    },
    //获取主题
    async getTopicList({commit,state},data){
        let res = await getTopic(data,commit);
    },
    //发布话题
    async postTopic({commit,state},data){
        console.log("进入了action")
        console.log(data);
        let res = await post_topic(data,commit);
    },
    async getTopicInfo({commit,state},data){
        let res = await getTopicById(data,commit);
    },
    async postReply({commit,state},data){
        let res = await post_reply(data,commit);
    },
    async addOneFav({commit,state},data){
        let res = await add_fav(data,commit);
    }

}