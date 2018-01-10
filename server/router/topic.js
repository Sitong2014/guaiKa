const express = require('express')
const router = express.Router()
const Topic = require('../models/topic');
const moment = require('moment');

//查询获取所有话题
router.get("/topic",(req,res)=>{
    var _res = res;
    let num = parseInt(req.query.data) || 10;
    Topic.count({}, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log(res);
            num >= res ? res : num;
        }
    });
    Topic.find({}).sort({'_id':-1}).limit(num).then(topics=>{
        res.json(topics);
    }).catch(err=>{
        res.json(err)
    })
})
//发布话题
router.post("/postTopic",(req,res)=>{
    let data = req.body;
    var topic = new Topic({
        username :data.username,                
        content:data.postContent,                   
        userAvatar: data.userAvatar,                              
        createDate : moment().format('llll')     
    });
    topic.save(function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    });
    res.json({msg:"success"});
})
//根据id获取topic
router.get("/topicById",(req,res)=>{
    let id = req.query.id;
    Topic.find({"_id":id}).then(topic=>{
        res.json(topic);
    }).catch(err=>{
        res.json(err)
    })
})
//提交评论
router.post("/postReply",(req,res)=>{
    _res = res;
    let data = req.body;
    console.log(data);
    var replyWhat = data.replyWhat;
    var oldReply = null;
    Topic.find({"content":replyWhat},(err,res)=>{
        if (err) {
            console.log("Error:" + err);
        }
        else {
            oldReply = res[0].reply;
            console.log("____))")
            console.log(oldReply);
            console.log("____))")
            oldReply.push({
                "replyDate":moment().format('llll'),
                "content":data.postContent,
                "replyName":data.username,
                "replyAvatar":data.userAvatar
            });
            console.log("____")
            console.log(oldReply);
            console.log("____")
            var wherestr = {'username' : data.r_username,
                            "content" : data.replyWhat,
                            "createDate":data.thatTime
                            };
            var updatestr = {'reply':oldReply};
            Topic.update(wherestr, updatestr, function(err, res){
                if (err) {
                    console.log("Error:" + err);
                }
                else {
                    console.log("Res:" + res);
                    _res.json({msg:"success"});
                    
                }
            })
        }
    });
})

//点赞
router.post("/addFav",(req,res)=>{
    let data = req.body;
    console.log(data);
    var _res = res; 
    var replyWhat = data.replyWhat;
    var theFav = 0;
    Topic.find({"content":replyWhat},(err,res)=>{
        if (err) {
            console.log("Error:" + err);
        }else{
            theFav = parseInt(res[0].fav) +1;
            var wherestr = {'username' : data.r_username,
                    "content" : data.replyWhat,
                    "createDate":data.thatTime
                    };
    
            var updatestr = {'fav':theFav};
            Topic.update(wherestr,updatestr,function(err,res){
                if (err) {
                    console.log("Error:" + err);
                }
                else {
                    console.log("Res:" + res);
                    _res.json({msg:"success"});
                    
                }
            })
        }
    });
})

module.exports = router