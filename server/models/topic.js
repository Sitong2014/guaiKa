const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//话题信息
const topicSchema = new Schema({
    //话题的发起者
    username:String,
    //话题的创建时间
    createDate:{
        type:String
    },
    //话题内容
    content:String,
    //话题点赞数
    fav:{
        type:Number,
        default:0
    },
    //话题回复列表
    reply:{
        type:Array,
        default:[]
    },
    userAvatar:{
        type:String,
        default:"../../static/imgs/defaultAvatar.jpg"
    },
    isLove:false
})
const Topic = module.exports = mongoose.model('Topic',topicSchema);