const express = require('express')
const router = express.Router()
const User = require('../models/user')
var moment = require('moment');

//查询所有用户
router.get("/user",(req,res)=>{
    User.find({}).then(users=>{
        res.json(users)
    }).catch(err=>{
        res.json(err)
    })
})
//注册用户
router.post("/reg",(req,res)=>{
    console.log(req.body)
    var username = req.body.username,
        password = req.body.password,
        nickname = req.body.nickname,
        createDate = moment().format('llll');
    var wherestr = {'username' : username};
    //判断是否已经有了相同的用户名
    User.find(wherestr, function(err,info){
        if (err) {
            console.log("注册失败");
            res.json({msg:"fail"});
        }
        if(info.length == 0){
            var user = new User({
                username:username,          
                password:password,                                                          
                createDate: createDate,
                nickname:nickname
            });  
            user.save(function (err,r){
                if (err) {
                    console.log("Error:" + err);
                }
                else {
                    console.log("Res:" + r);
                }
            });
            res.json({msg:"success"});
        }else{
            console.log("用户名已经存在");
            res.json({msg:"fail"});
        }          
    })
})

//用户登录
router.post("/login",(req,res)=>{
    console.log("登录信息"+req.body.username)
    var username = req.body.username,
        password = req.body.password;
    var wherestr = {'username' : username};
    //判断是否已经有了相同的用户名
    User.find(wherestr, function(err,info){
        console.log(info);
        if(err){
            console.log("登录失败");
            res.json({msg:"fail"});
        }
        //判断登录情况
        if(info.length == 0){
            res.json({msg:"noReg"});
        }else if(info[0].password != password){
            res.json({msg:"password is wrong"});
        }else if(info.length !=0 && info[0].password == password){
            res.json({msg:"success",info:info});
        }
    })
})
//获取用户信息
router.post("/getUserInfo",(req,res)=>{
    console.log("用户姓名"+req.body.data);
    let name = req.body.data;
    //从数据库获取信息
    var wherestr = {'username':name};
    User.find(wherestr,function(err,info){
        console.log("获取到了信息"+info);
        if(err){
            res.json({
                msg:"fail"
            })
        }
        if(info){
            res.json(info);
        }
    })
})
module.exports = router
