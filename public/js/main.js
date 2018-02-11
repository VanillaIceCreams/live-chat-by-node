/**
 * Created by Administrator on 2017/6/7.
 */

//让点击的左侧li变成活动状态，并将右侧聊天窗口显示
function beActive(friendName){
    $("li[data-friendUserName]").removeClass("active");
    $("li[data-friendUserName="+friendName+"]").addClass("active");
    $("div[data-friendUserName]").removeClass("active");
    $("div[data-friendUserName="+friendName+"]").addClass("active");
}
//获取表情
function getFeeling(){
    $.get("/getFeeling",function(result){
        if(result.status==200){
            $("#feelingContainer").html("");
            $.each(result.data,function(index,feeling){

                $("#feelingContainer").append("<div class='col-xs-2' data-dismiss='modal'>"+
                    "<a href='javascript:void(0)' class='thumbnail' >"+
                    "<img src="+feeling+" onclick='useFeeling(this)' >"+
                    "</a>"+
                    "</div>")
            })
        }else{
            alert(result.message)
        }

    });
}
//使用表情
function useFeeling(element){

    let bigFeeling =  $(element).attr("src").replace("50x50","");
    $(".active .input-window").append("<img src="+bigFeeling+">");
}
$(function(){
    //获取用户自己的信息
    $.get("/getUser",function(result){
        $("#userhead").attr("src",result.data.userhead);
        $("#username").html(result.data.username);
        $("#nickname").val(result.data.nickname);
        $("#nickname-hidden").html(result.data.nickname);
    });
    //获取好友列表
    $.get("/findFriends",function(result){
        if(result.status==200){
            $.each(result.data,function(index,user){
                $("#left-friend-list").append("<li class='list-group-item' data-friendUserName="+user.username+" onclick='beActive("+user.username+")'><img src="+user.userhead+"><span>"+user.nickname+"</span></li>")

                $("#container-relative").append("<div class='col-xs-10 right-container' data-friendUserName="+user.username+">" +
                                                "    <div class='right-top-window'>" +
                                                "        <div class='chat-window' >" +
                                                        //插入聊天内容
                                                "        </div>" +
                                                "    </div>" +
                                                "    <div class='right-bottom-window'>" +
                                                "        <div class='edit-window'>" +
                                                "            <div class='tools'>" +
                                                "                <span class='glyphicon glyphicon-heart-empty' aria-hidden='true'  data-toggle='modal' data-target='#feelingModal' onclick='getFeeling()'></span>" +
                                                "                <span class='glyphicon glyphicon-new-window' aria-hidden='true' data-toggle='modal' data-target='#feelingUploadModal'></span>" +
                                                "            </div>" +
                                                "            <div class='input-window' contenteditable='true'  onkeydown='return sendMessage(event)'>" +
                                                        //插入聊天内容
                                                "            </div>" +
                                                "        </div>" +
                                                "    </div>" +
                                                "</div>")
            });
            //将第一个好友和聊天框active
            $('li[data-friendUserName]:first').addClass("active");
            $('div[data-friendUserName]:first').addClass("active");
        }else{
            alert("获取好友列表出现问题")
        }
    });
});
//表情上传
function feelingUpload(){
    var extension =  $("#feelingUploadForm>input").val().split(".")[1];
    if(extension=="png"||extension=="jpg"){
        var form = new FormData(document.getElementById("feelingUploadForm"));
        $.ajax({
            url:"/uploadFeeling",
            type:"post",
            data:form,
            cache: false,
            processData: false,
            contentType: false,
            success:function(result){
                if(result.status==200){
                    alert("上传表情成功！");

                }else{
                    alert(result.message);
                }
            },
            error:function(e){
                alert("网络错误，请重试！！");
            }
        });
    }else{
        alert("请上传png或者jpg格式的图片")
    }

}

//修改昵称
function updataUserNickName(){
    var nickname = $("#nickname").val();
    $.get("/updateNickName",{"nickname":$("#nickname").val()},function(result){
        if( result.status == 200){
            $("#nickname-hidden").html(nickname);
            alert("修改昵称成功");
        }else{
            alert(result.message);
        }
    })
}
//修改头像
function uploadUserhead(){
    var extension =  $("#userheadInput").val().split(".")[1];
    if(extension=="png"||extension=="jpg"){
        var form = new FormData(document.getElementById("userheadForm"));
        $.ajax({
            url:"/uploadUserHead",
            type:"post",
            data:form,
            cache: false,
            processData: false,
            contentType: false,
            success:function(result){
                if(result.status==200){
                    alert("操作成功！");
                    $("#userhead").attr("src",result.data);
                }else{
                    alert(result.message);
                }
            },
            error:function(e){
                alert("网络错误，请重试！！");
            }
        });
    }else{
        alert("请上传png或者jpg格式的图片")
    }

}
//获取用户好友信息，将头像与昵称填充到左侧好友栏

//通过好友用户名以及自己的用户名，查询聊天记录，填充到对应聊天框中(限制为最近的30条记录)

//查询其他人
function findUser(){
    $.get("/findUser",{"username":$("#findUserInput").val()},function(result){
        $("#friend-list").html("");
        $.each(result.data,function(index,user){
            $("#friend-list").append("<li class='list-group-item'><img src="+user.userhead+">" +
                "<span>"+user.nickname+"</span><i>("+user.username+")</i><button type='button' class='btn btn-default pull-right'  onclick='addFriend(this,"+user.username+")'>添加好友</button></li>")
        });
    })
}
function addFriend(element,username){
    $.get("/addFriend",{"username":username},function(result){
        if(result.status==200){
            alert("添加成功");
            $(element).parent().remove();
        }else{
            alert(result.message);
        }
    })
}


//显示tab栏动画
$(".tab").mouseover(function(){
    if($(this).is(":animated")){
        return;
    }
    $(this).animate({
        width: "300px"
    }, 500 );
});
$(".tab").mouseleave(function(){
    if($(this).is(":animated")){
        $(this).stop();
    }
    $(this).animate({
        width: "30px"
    }, 500)
});