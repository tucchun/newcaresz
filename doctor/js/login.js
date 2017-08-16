/**
 * Created by Administrator on 2017/6/1.
 */
require(['../js/config'],function(config){
    require.config(config);
    require(['jquery','modules/security','modules/tool'],function($,security,tool){
        $("#loginForm").submit(function(){
            var name = $('input[name=username]').val(),pwd = $('input[name=pwd]').val();
            if(name==''||pwd==''){
                alert('用户名和密码不能为空');
                return false;
            }
            pwd = security.convertedPassword(pwd);
            var pwdc = security.authStr({
                username:name,
                passowrd:pwd
            });
            var data = {
                src_type: tool.src_type,
                dev_id:"xxxx",
                pf_type:"Web",
                "login_name":name,
                "login_auth_str":pwdc
            };
            //$.extend(data,tool.pubArgument());
            tool.fetch({
                url:'/api/auth/userlogin',
                data:JSON.stringify(data),
                success:function(res){
                    if(res.ret_code === 1){
                        var coverPass = {coverPass:pwd};
                        var tranKey = security.deAuthResultStr({
                            target:res.ret_data.auth_ret_str,
                            key:localStorage.getItem('randomKey')
                        });
                        var username = {
                            username:tranKey[1]
                        };
                        var transKey = {trankey:tranKey[0]};
                        $.extend(res.ret_data,coverPass,transKey,username);
                        console.log("JSON.stringify(res.ret_data):" + JSON.stringify(res.ret_data));
                        localStorage.setItem("usinfo", JSON.stringify(res.ret_data));
                        var arg = {
                            user_id:res.ret_data.user_id,
                            svc_ticket_str:res.ret_data.svc_ticket_str
                        };
                        arg = $.extend(arg,tool.pubArgument());
                        tool.fetch({
                            url:'/api/business/login',
                            data:JSON.stringify(arg),
                            success:function(rets){
                               if(rets.ret_code === 1){
                                   window.location.href="html/search.html";
                               }else{
                                   alert('服务登录失败');
                               }
                            }
                        });
                    }else{
                        alert(res.ret_msg);
                    }
                },
                error:function(err){
                    console.log(JSON.stringify(err));
                }
            });
            return false;
        });
    });
});