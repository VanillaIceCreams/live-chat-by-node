/**
 * Created by Administrator on 2017/6/7.
 */

var http = require("http");
var formidable = require('formidable');
var util = require("util");
var fs = require("fs");
var sd = require("silly-datetime");
var path = require("path");
var userDao = require("../dao/userDao");
var gm = require('gm');
var MyResult = require("../utils/resultUtil.js");


function uploadUserHead(req,res){
    //Creates a new incoming form.
    var form = new formidable.IncomingForm();
    //设置文件上传存放地址
    form.uploadDir =__dirname + "/../public/userhead/";
    //执行里面的回调函数的时候，表单已经全部接收完毕了。
    form.parse(req, function(err, fields, files) {

            //时间，使用了第三方模块，silly-datetime
            var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
            var ran = parseInt(Math.random() * 89999 + 10000);
            var extname = path.extname(files.userhead.name);
            //执行改名
            var oldpath = files.userhead.path;

            //新的路径由三个部分组成：时间戳、随机数、拓展名
            var newpath = __dirname + "/../public/userhead/" + ttt + ran + extname;
             // 缩略图路径
            var thumbnailpath= __dirname + "/../public/userhead/" + ttt + ran + "50x50" + extname;
            var userhead = "/userhead/" + ttt + ran + "50x50" + extname;
            //改名
            fs.rename(oldpath,newpath,function(err){
                if(err){
                    throw Error("改名失败");
                }
                gm(newpath)
                    .resize(50, 50,"!")
                    .write(thumbnailpath, function (err) {
                        if (err) {
                            console.log("缩小图片失败");
                        }
                        //设置头像路径给用户
                        userDao.updateUserHead(req.session.user.username,userhead, function (myResult) {
                            res.send(myResult)
                        })
                    });
            });

        }
    )}
function uploadFeeling(req,res){
    //Creates a new incoming form.
    var form = new formidable.IncomingForm();
    //设置文件上传存放地址
    form.uploadDir =__dirname + "/../public/feelings/";
    //执行里面的回调函数的时候，表单已经全部接收完毕了。
    form.parse(req, function(err, fields, files) {

            //时间，使用了第三方模块，silly-datetime
            var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
            var ran = parseInt(Math.random() * 89999 + 10000);
            var extname = path.extname(files.feeling.name);
            //执行改名
            var oldpath = files.feeling.path;

            //新的路径由三个部分组成：时间戳、随机数、拓展名
            var newpath = __dirname + "/../public/feelings/" + ttt + ran + extname;
            // 缩略图路径
            var thumbnailpath= __dirname + "/../public/feelings/" + ttt + ran + "50x50" + extname;
            var userhead = "/feelings/" + ttt + ran + "50x50" + extname;
            //改名
            fs.rename(oldpath,newpath,function(err){
                if(err){
                    console.log("改名失败");
                    res.send(MyResult.error("改名失败"))
                }
                gm(newpath)
                    .resize(50, 50,"!")
                    .write(thumbnailpath, function (err) {
                        if (err) {
                            console.log("缩小图片失败");
                            res.send(MyResult.error("缩小图片失败"))
                        }
                            res.send(MyResult.ok())
                    });
            });

        }
    )
}

module.exports = {uploadUserHead,uploadFeeling};