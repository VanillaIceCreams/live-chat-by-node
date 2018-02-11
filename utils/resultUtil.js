/**
 * 自定义返回信息
 */
class MyResult{
    constructor(status,message,data){
        this.status = status;
        this.message = message;
        this.data = data;

    }
    static ok(){
        if (arguments.length==0){
            return new MyResult(200)
        }
        if (arguments.length==1){
            return new MyResult(200,null,arguments[0])
        }
    }
    static error(){
        if (arguments.length==0){
            return new MyResult(400,"发生了未知错误")
        }
        if (arguments.length==1){
            return new MyResult(400,arguments[0])
        }
    }
}
module.exports = MyResult;