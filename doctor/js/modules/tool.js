/**
 * Created by Administrator on 2017/6/2.
 */
define(['jquery','doT','modules/security'],function($,doT,security){
    "use strict";
    // 页面js错误
    window.onerror = function (msg, url, line) {
    try {
      throw new Error('[msg:' + msg + ',url:' + url + ',line:' + line + "]");
    } catch (error) {
      // console.log("页面JS错误\n" + error.stack);
    }
      return false;
    };
    var tool = {};
    tool.src_type = "Doctor Web";
    tool.fetch = function(settings){
        var pubSetting = {contentType:'application/json',dataType:'json',type:'POST',};
        var opts = $.extend({},settings,pubSetting,{success: function(){}, error: function(){}});
        opts.url = '/hca' + settings.url;
        /*console.log("===============请求接口开始===============\n");
        console.log("请求接口：" + opts.url + "\n");
        console.log("参数：" + opts.data + "\n");*/

        var deferred =  $.ajax(opts);
        deferred.done(function(data){
           /* console.log("响应数据：" + JSON.stringify(data) + "\n");
            console.log("===============请求接口结束===============\n");*/
        }).done(settings.success).fail(function(XMLHttpRequest, textStatus, errorThrown){
            /*console.log("响应失败：" + textStatus + ", " + errorThrown + "\n");
            console.log("===============请求接口结束===============\n");*/
        }).fail(settings.error);
        return deferred;
    };
    tool.validateId = function(IDcard){
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return reg.test(IDcard);
    };
    tool.render = function(tempId,data,target,append){
        $.get('template/'+tempId+'.template',function(response){
            var template = doT.template(response);
            var html = template(data);
            append ? target.append(html):target.html(html);
        });
    };
    tool.getCommunication_str = function(){
        var userInfo = JSON.parse(localStorage.getItem('usinfo'));
        if(userInfo){
            var trankey = userInfo.trankey;
            var userName = userInfo.username;
            var pwd_communication = security.communicationCertification({
                username:userName,
                key:trankey
            });
            return pwd_communication;
        }else{
            return window.jsObj.getCorrespondAuthStr();
        }
    };
    tool.getUrlParam = function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    };
    tool.pubArgument = function(){
        // var src_type = 'Inhabitant APP';
        if(window.jsObj){
          tool.src_type = window.jsObj.getSrcTypeStr();
        }
        return {
            src_type:tool.src_type,
            pf_type:"Web",
            auth_str:this.getCommunication_str(),
            dev_id:"xxxx"
        };
    };
    tool.formatTime = function(dateStr){
        var fmt = 'yyyy-MM-dd hh:mm:ss';
        var date = new Date(dateStr);
        return fmtdate(fmt,date);
        function fmtdate(fmt,date){
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        /*var date = new Date(dateStr);
        var arr = [];
        arr.push(date.getFullYear());
        arr.push(date.getMonth() + 1);
        arr.push(date.getDate());
        return arr.join("-");*/
    };
    return tool;
});