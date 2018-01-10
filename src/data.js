import axios from 'axios'
import {mapState, mapActions} from 'vuex'
import{USER_LOGIN,GET_USERINFO_BY_NAME,GET_TOPIC,GET_TOPIC_BY_ID }from './store/mutation-types.js'
/**
 * 获取本地存储的用户信息
 */
// export const getUser = ()=>{
//     let url = '/api/user'
//     axios.get(`${url}`).then(res=>{
//         console.log(res.data);
//     });
// }

// 注册用户
export const regUser = (data)=>{
    let url = '/api/reg'
    console.log(data);
    axios.post(`${url}`,data).then(res=>{
        var info = res.data
        if(info.msg == "success"){
            layer.open({
                content: '注册成功',
                skin: 'msg',
                time: 2, //2秒后自动关闭
                success:(val)=>{
                  val = false;
                  window.location.href = "#/home"           
                }
            });
        }else{
            layer.open({
                content: '注册失败',
                skin: 'msg',
                time: 2, //2秒后自动关闭
                success:(val)=>{
                  val = false;
                  window.location.href = "#/home"           
                }
            });
        }
    })
}

//用户登录
export const login = (data,commit)=>{
    let url = '/api/login';
    console.log("登录信息"+data);
    axios.post(`${url}`,data).then(res=>{
        if(res.data.msg == "fail"){
            layer.open({
                content: '登录出现错误',
                skin: 'msg',
                time: 2, //2秒后自动关闭
                success:()=>{
                  window.location.href = "#/home"           
                }
            });
        }else if(res.data.msg == "noReg"){
            layer.open({
                content: '账号未注册',
                skin: 'msg',
                time: 2, //2秒后自动关闭
                success:()=>{
                  window.location.href = "#/reg"           
                }
            });
        }else if(res.data.msg == "password is wrong"){
            layer.open({
                content: '密码有误！',
                skin: 'msg',
                time: 2, //2秒后自动关闭
                success:()=>{
                  window.location.href = "#/login"           
                }
            });
        }else if(res.data.msg == "success"){
            layer.open({
                content: '登录成功',
                skin: 'msg',
                time: 2, //2秒后自动关闭
                success:()=>{
                    console.log("heihei")
                    console.log(res);
                  commit(USER_LOGIN,res);
                  window.location.href = "#/home"
                }
            });
        }
    })
}

//获取用户信息
export const getUserInfo_byName = (data,commit)=>{
    console.log("传过来的"+data);
    let url = '/api/getUserInfo';
    axios.post(`${url}`,{data:data}).then(res=>{
        let userInfo = res.data[0];
        console.log(userInfo);
        commit(GET_USERINFO_BY_NAME,userInfo);
    })
}

//获取主题列表
export const getTopic = (data,commit)=>{
    let url = '/api/topic?data='+data;
    axios.get(`${url}`).then(res=>{
        let topicInfo = res.data;
        console.log(topicInfo);
        commit(GET_TOPIC,topicInfo);
    })
}

//发布话题
export const post_topic = (data,commit)=>{
    console.log("进入了data.js")
    console.log(data);
    let url = '/api/postTopic';
    axios.post(`${url}`,data).then(res=>{
        console.log("发布完毕");
        if(res.data.msg == "success"){
            layer.open({
                content: '发布成功',
                skin: 'msg',
                time: 2, //2秒后自动关闭
                success:()=>{
                    let url = '/api/topic';
                    axios.get(`${url}`).then(res=>{
                        let topicInfo = res.data;
                        console.log(topicInfo);
                        commit(GET_TOPIC,topicInfo);
                    })
                    
                }
            });
        }
    })
}

//根据id获取话题内容
export const getTopicById = (data,commit)=>{
    let url = '/api/topicById?id='+data;
    axios.get(`${url}`).then(res=>{
        let info = res.data;
        commit(GET_TOPIC_BY_ID,info);
    })
}

export const post_reply = (data,commit)=>{
    let url = '/api/postReply';
    axios.post(`${url}`,data).then(res=>{
        console.log("发布完毕");
        if(res.data.msg == "success"){
            layer.open({
                content: '评论成功',
                skin: 'msg',
                time: 2, //2秒后自动关闭
                success:()=>{
                    let url = '/api/topicById?id='+data.r_id;
                    axios.get(`${url}`).then(res=>{
                        let info = res.data;
                        commit(GET_TOPIC_BY_ID,info);
                    })
                }
            });
        }
    })
}

export const add_fav = (data,commit)=>{
    let url = '/api/addFav';
    axios.post(`${url}`,data).then(res=>{
        console.log("增加了一个fav");
        if(res.data.msg == "success"){
            layer.open({
                content: '赞+1',
                skin: 'msg',
                time: 2, //2秒后自动关闭
                success:()=>{
                    let url = '/api/topicById?id='+data.r_id;
                    axios.get(`${url}`).then(res=>{
                        let info = res.data;
                        commit(GET_TOPIC_BY_ID,info);
                    })
                }
            });
        }
    })
}