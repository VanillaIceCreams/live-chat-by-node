function sendMessage(){
    var content = $(".active.input-window").html();
            if(content!=""){
                //把文本框的内容上传：
                socket.emit("chat",{
                    "content" : content,
                    "username": $("div.active").attr("data-friendUserName")
                });



                $(".active.chat-window").append("<div class='message-container'>"+
                        "<span class='message-username'>"+$("#nickname-hidden").html()+"</span>"+
                        "<div>"+
                        "<img src="+$("#userhead").attr("src")+" class='message-head'>"+
                        "<div class='message-body'>"+
                        content+
                        "</div>"+
                        "</div>"+
                        "</div>");

                $(".active.input-window").html("");
            }
}