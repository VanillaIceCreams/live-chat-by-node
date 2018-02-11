/**
 * Created by Administrator on 2017/6/7.
 */
var userDao = require("../dao/userDao.js");
var MyResult = require("../utils/resultUtil.js")
var fs = require("fs");

function findByName(user,callback){
    userDao.findByName(user,callback)
}
function updateNickName(req,res,callback){
    userDao.updateNickName(req.session.user.username, req.query.nickname,function(result){
        res.send(result);
    })
}
function findUser(req,res){
    userDao.findUser(req.query.username,function(result){
        res.send(result);
    })
}
function addFriend(req,res){
                         //自己的用户名          //对方的用户名
    userDao.addFriend(req.session.user.username,req.query.username,function(result){
        res.send(result);
    })
}
function findFriends(req,res){
    userDao.findFriends(req.session.user.username,function(result){
        res.send(result);
    })
}

function getFeeling(req,res){

    fs.readdir(__dirname + "/../public/feelings/", function(err, files) {
        if(err){
            res.send(MyResult.error("获取表情失败"));
            return
        }
        let feelings = [];
        for(let feeling of files) {
            if(feeling.indexOf("50x50") >= 0){
                feelings.push("/feelings/"+feeling);
            }
        }
         res.send(MyResult.ok(feelings));
    })


}


module.exports = {findByName,updateNickName,findUser,addFriend,findFriends,getFeeling};
