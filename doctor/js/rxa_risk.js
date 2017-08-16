/**
 * Created by Administrator on 2017/6/3.
 */
require(['../js/config'],function(config){
    require.config(config);
    require(['modules/tool'],function(tool){
        // console.log(localStorage.getItem('usinfo'));
        var loginUser = JSON.parse(localStorage.getItem('usinfo'));
        var user_id = "";
        if(loginUser){
          user_id = loginUser.user_id;
        }else{
          user_id =  window.jsObj.getLoginUserId();
        }
        // console.log(localStorage.getItem('residentInfo'));
        var target_user = JSON.parse(localStorage.getItem('residentInfo'));
        if(target_user){
            $("#gender").html(target_user.decodeSex);
            $("#age").html(target_user.decodeAge);
        }else{
            if(tool.getUrlParam('decodeSex') == 1){
                $("#gender").html('男');
            }else{
                $("#gender").html('女');
            }
            $("#age").html(tool.getUrlParam('decodeAge'));
        }
        $('#rxa_risk').submit(function () {
            var paramArr = $(this).serializeArray();
            var jsonData = {};
            for(var i = 0; i < paramArr.length; i++){
                if(jsonData[paramArr[i]["name"]]){
                    var str = ','+paramArr[i]["value"];
                    jsonData[paramArr[i]["name"]] += str;
                }else{
                    jsonData[paramArr[i]["name"]] = paramArr[i]["value"];
                }
            }
            jsonData.personId = tool.getUrlParam('IDcard');
            jsonData.user_id = user_id;
            $.extend(jsonData,tool.pubArgument());
            // console.log(jsonData);
            tool.fetch({
                url:'/web/doctor/evaluate/create',
                data:JSON.stringify(jsonData),
                success:function(res){
                    if(res.ret_code === 1){
                        if(window.jsObj){
                            window.jsObj.toast('您的评估已经提交，待医生进一步分析后给您提供更专业的健康建议！');
                            window.jsObj.finish();
                        }else{
                            window.close();
                        }
                    }else{
                        alert(res.ret_msg || "提交失败");
                    }
                }
            });
            return false;
        });
    });
});
