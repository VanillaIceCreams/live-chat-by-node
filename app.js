/**
 * Created by Administrator on 2017/6/6.
 */
var express = require('express');
var app = express();
//socket.io公式：
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var session =  require("express-session");
var registerAndLoginService = require('./service/registerAndLoginService');
var uploadService = require("./service/uploadService");
var userService = require("./service/userService");
var MyResult = require("./utils/resultUtil.js");


app.set("view engine","ejs");//会默认找项目路径下的views文件夹
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

//bodyParser 用于处理post请求
app.use(bodyParser.urlencoded({ extended: false }));


//登录
app.post('/login',registerAndLoginService.login);
//注册
app.post('/register', registerAndLoginService.register);
//主页
app.get('/index', function(req, res){
    if(req.session.user){//若已经登录，则放行
        res.sendfile(__dirname+"/views/index.html");
    }else{//没登录，跳转回登录页面
        res.redirect("/login.html")
    }
});
//ajax获取用户信息
app.get('/getUser', function(req, res){
    if(req.session.user){//若已经登录，则返回对象信息
        userService.findByName(req.session.user,function(user){
            user.password = "";
            res.send(MyResult.ok(user))
        });
    }else{//没登录，返回空字符串
        res.send("")
    }
});
//上传头像
app.post('/uploadUserHead', uploadService.uploadUserHead);
//上传表情
app.post('/uploadFeeling', uploadService.uploadFeeling);
//修改昵称
app.get('/updateNickName', userService.updateNickName);
//查找用户的头像与姓名
app.get('/findUser', userService.findUser);
//添加好友
app.get('/addFriend', userService.addFriend);
//获取好友列表
app.get('/findFriends', userService.findFriends);
//获取表情
app.get('/getFeeling', userService.getFeeling);

app.use(express.static('public'));

var map = new Map();//用于装socket
io.on("connection",function(socket){

    socket.on('username',function(username){
        map.set(username,socket);

    });

    socket.on("chat",function(msg){
        var friendSocket = map.get(msg.to);
        if(friendSocket){
            friendSocket.emit('chat',msg);
        }

    });
});



//监听
http.listen(3000);

