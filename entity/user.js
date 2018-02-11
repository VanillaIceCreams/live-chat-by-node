/**
 * Created by Administrator on 2017/6/6.
 */
var mongoose = require('mongoose');
var db = require('../utils/db.js');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type:String,unique:true,index:true},//用户名
    password: String,//密码
    nickname: String,//昵称
    userhead:String,
    friends:  Array//存好友的用户名
});


userSchema.statics.saveUser = function(user,callback) {
    user.save();
    callback();
};
//类是基于schema创建的。
var userModel = db.model('user', userSchema);

module.exports = userModel;