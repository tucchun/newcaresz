/**
 * Created by Administrator on 2017/5/31.
 */
"use strict";
var common = {};
common.demo = true;
common.render = function(tempObj,targetObj,data,way){
    var tmpText = doT.template(tempObj.text());
    way ? targetObj.append(tmpText(data)) : targetObj.html(tmpText(data));
};
common.fetch = function(settings){
    var opts = $.extend({},settings, {success: function(){}, error: function(){}});
    var deferred = {};
    // console.log("===============请求接口开始===============");
    console.log("请求接口：" + opts.url);
    console.log("参数：" + JSON.stringify(opts.data));
    if(common.demo){
        //请求本地文件
        console.log("获取本地数据文件");
        deferred = $.Deferred();
        $.ajax({
            url: common.demoUrl,
            dataType: "json",
            success: function(result){
                deferred.resolve(result);
            },
            error: function(xhr, errorType, error){
                if(errorType === "parsererror"){
                    deferred.reject(JSON.stringify("json解析失败！"));
                }
                deferred.reject(JSON.stringify(error.stack));
            }
        });
    }else{
        //发送远程请求
        console.log("发送远程请求");
        deferred = $.ajax(opts);
    }
    deferred.done(function(data){
        /*console.log("响应数据：" + JSON.stringify(data) + "\n");
        console.log("===============请求接口结束===============\n");*/
    }).done(settings.success).fail(function(err){
        /*console.log("响应失败：" + err + "\n");
        console.log("===============请求接口结束===============\n");*/
    }).fail(settings.error);
    return deferred;
};
common.getUrlParam = function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
};