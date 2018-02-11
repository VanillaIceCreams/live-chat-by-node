/**
 * Created by Administrator on 2017/6/6.
 */
var userDao = require("../dao/userDao.js");
var MyResult = require("../utils/resultUtil.js")
function register(req, res){
    userDao.addUser(req.body,function(result){
        if(result){
            res.redirect("/login.html")
        }else{
            res.json(MyResult.error("用户名已存在"));
        }
    });
}
function login(req, res){
    userDao.loginValidate(req.body,function(result){
        if(result){
            //将用户信息存入session
            req.session.user = result;
            res.redirect("/index");
        }else{
            res.json(MyResult.error("用户名或密码错误"));
        }
    });
}

module.exports = {register,login};