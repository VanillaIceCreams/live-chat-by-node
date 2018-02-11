/**
 * Created by Administrator on 2017/6/7.
 */
var offsetLeft,offsetTop,timer,mouse_x,mouse_y,margin_left,margin_top;
var to_x,to_y;

function drag(id,type){
    var item=document.getElementById(id);
    document.onmousemove=function(e){
        var e=e||window.event;
        mouse_y=e.pageY;
    };
    item.onmousedown=function(){
        // offsetTop以及offsetTop必须要放在mousedown里面，每次都要计算
        offsetLeft=item.offsetLeft;
        offsetTop=item.offsetTop;
        margin_top=mouse_y-offsetTop;
        timer=setInterval(function(){
            if(timer){
                var max_with=800,max_height=600;
                to_y=mouse_y-margin_top;
                to_x=Math.min(to_x,max_with);
                to_y=Math.min(to_y,max_height);
               if(type=="y"){
                    item.style.top=to_y+"px";
                    document.getElementById("#div_03").style.top=to_y+"px";
                    document.getElementById("#div_wrapper").style.height=to_y+10+"px";
                }
                //默认为上下左右移动
                else {

                    item.style.top=to_y+"px";
                    // Style刷新
                    document.getElementById("#div_02").style.top=to_y+"px";
                    document.getElementById("#div_wrapper").style.height=to_y+10+"px";
                }
            }
        },5);
    };
    document.onmouseup=function(){
        clearInterval(timer);
        timer=0;
    }
}

window.onload=function(){
    drag("div_02","y");
    drag("div_03");
}