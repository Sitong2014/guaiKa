
const config = require('./config/db')
const mongoose = require('mongoose')
const User = require('./server/models/user')
const Topic = require('./server/models/topic')
mongoose.connect(config.mongodb)
var insert = function insert(){
    var topic = new Topic({
        username:"ghost",
        content:"为什么刮风要下雨？为什么天冷要穿棉袄？",
        fav:0,
        reply:[
            {
                content:"因为你是傻瓜！",
                replyTime:new Date(),
                replyName:"花卷"
            },
            {
                content:"因为苍老师结婚了！",
                replyTime:new Date(),
                replyName:"馒头"
            }
        ],
        createDate:new Date()
    })
    
    topic.save(function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }

    });
}
module.exports = insert





