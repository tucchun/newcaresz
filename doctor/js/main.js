/**
 * Created by kevinzhou on 2017/4/28.
 */
require(['../js/config'],function(config){
    require.config(config);
    require(['path_module','jquery','bootstrap'],function(Router){;
        /**
         * PATHJS路由配置
         *
         * */
        var userInfo = localStorage.getItem('usinfo');
        if(!userInfo){
            window.location.href = "../login.html";
        }
        $('#login_out').on('click',function(){
            localStorage.setItem('usinfo','');
            window.location.href = "../login.html";
        });
        $('#head_usname').html(JSON.parse(userInfo).username);
        Router.AddPage('healthDoucment',{title:'医生端-健康档案'});
        Router.AddPage('searchResult',{title:'医生端-搜索'});
        Router.init();
    });
});
