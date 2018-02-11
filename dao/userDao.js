/**
 * Created by Administrator on 2017/6/6.
 */
var userModel = require("../entity/user.js");
var MyResult = require("../utils/resultUtil.js");
//添加用户
function addUser(user,callback){


    //插入对象
    userModel.create(user,function(error){
        if(error){
            console.log("新增用户失败");
            callback(false);
        }else{
            console.log("新增用户成功");
            callback(true);
        }

    });

}
//通过用户名查询用户
function findByName(user,callback){
    userModel.findOne({"username":user.username},function(err,doc){
        callback(doc);
    });
}
//登录验证
function loginValidate(user,callback){
    findByName(user,function(result){
        if(result.password!=user.password){
            result = false;
        }
        callback(result)
    })
}
function updateUserHead(username,userhead,callback){
    userModel.update({"username":username},{$set:{"userhead":userhead}},function(err){
        if(err){
            callback(MyResult.error("更新头像失败"));
        }
        callback(MyResult.ok(userhead));
    });
}

function updateNickName(username,nickname,callback){
    userModel.update({"username":username},{$set:{"nickname":nickname}},function(err){
        if(err){
            callback(MyResult.error("更新昵称失败"));
        }
        callback(MyResult.ok());
    });
}
function findUser(username,callback){
    if(username){
        userModel.find({"username":username},{userhead:true,nickname:true,username:true},function(err,doc){
            if(err){
                console.log("通过用户名查询用户头像与昵称与用户名失败");
                callback(MyResult.error())
            }
            callback(MyResult.ok(doc));
        });
    }else{
        userModel.find({},{userhead:true,nickname:true,username:true},function(err,doc){
            if(err){
                console.log("查询所有用户头像与昵称与用户名失败");
                callback(MyResult.error())
            }
            callback(MyResult.ok(doc));
        });
    }

}
function addFriend(myUsername,hisUsername,callback){
    if(myUsername==hisUsername){
        callback(MyResult.error("加自己，你是傻逼吗"))
    }else{
        userModel.findOne({"username":myUsername,"friends":hisUsername},{name:true}, function (error, doc) {
            if (error) {
                callback(MyResult.error("发生未知错误"))
            } else if(doc){
                callback(MyResult.error("对方已经是你的好友"))
            }else{//执行添加好友操作
                //我方添加好友
                userModel.update({"username" : myUsername},
                {'$push':{ friends : hisUsername}}, function(err){
                    if(err) {
                        callback(MyResult.error("发生未知错误"))
                    }
                    //对方添加好友
                    userModel.update({"username" : hisUsername},
                        {'$push':{ friends : myUsername}}, function(err){
                            if(err) {
                                callback(MyResult.error("发生未知错误"))
                            }
                            //最后的回调函数
                            callback(MyResult.ok());
                        });
                });
            }
        });
    }
}


function findFriends(username,callback){
    userModel.findOne({"username":username},{friends:true}, function (error, doc) {
        if (error) {
            console.error(error);
            callback(MyResult.error(error.toString()));
        } else {
            //通过好友用户名数组查询好友信息
            userModel.find({"username": {"$in": doc.friends}},{userhead:true,nickname:true,username:true}, function (error, doc) {
                if (error) {
                    console.error(error);
                    callback(MyResult.error(error.toString()));
                } else {
                    callback(MyResult.ok(doc));
                }
            });
        }
    });
//    userModel.update({"username":username},{$set:{"nickname":nickname}},function(err){
//        if(err){
//            callback(MyResult.error("更新昵称失败"));
//        }
//        callback(MyResult.ok());
//    });
}

//userModel.update({"username" : "1234"},
//    {'$pull':{ friends : "12345"}}, function(err, data){
//        if(err) {
//            console.log(err);}
//        console.log(data);
//    });

//userModel.find({"username": {"$in": ["123","1234"]}},{userhead:true,nickname:true,username:true}, function (error, doc) {
//    if (error) {
//        console.error(error);
//    } else {
//        console.error("查询结果：", doc)
//    }
//});

//userModel.findOne({"username":"123"},{friends:true}, function (error, doc) {
//    if (error) {
//        console.error(error);
//    } else {
//        console.error("查询结果：", doc.friends)
//    }
//});
module.exports  = {addUser,findByName,loginValidate,updateUserHead,updateNickName,findUser,addFriend,findFriends};