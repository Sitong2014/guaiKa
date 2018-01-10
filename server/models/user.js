const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// 用户信息
const userSchema = new Schema({
    username:String,
    nickname:String,
    userage:{
        type:Number,
        default:20
    },
    avatarImg:{
        type:String,
        default:"../../static/imgs/defaultAvatar.jpg"
    },
    password:String,
    star:{
        type:Number,
        default:0
    },
    starList:{
        type:Array,
        default:[]
    },
    follow:{
        type:Number,
        default:0
    },
    followList:{
        type:Array,
        default:[]
    },
    sex:{
        type:String,
        default:"男"
    },
    logindate:{
        type:String
    },
    createDate:{
        type:String
    },
    status:{
        type:String,
        default:""
    },
    address:{
        type:String
    },
    topicList:{
        type:Array,
        default:[]
    }
})
const User = module.exports = mongoose.model('User',userSchema);