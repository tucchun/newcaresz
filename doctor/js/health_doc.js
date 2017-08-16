/**
 * Created by Administrator on 2017/6/3.
 */
require(['modules/tool'],function(tool){
    var loginUser = JSON.parse(localStorage.getItem('usinfo'));
    var url = window.location.href;
    var start = url.lastIndexOf('/');
    var id = url.substring(start+1)
    var data = {
        user_id_get:id,
        user_id:loginUser.user_id,
        begin:0
    };
    tool.fetch({
        url:'/api/business/getdoclist',
        data:JSON.stringify(data),
        success:function(res){
            if(res.ret_code === 1){
                var dataes = res.ret_data;
                dataes.user_id_doc = id;
                $.extend(dataes,{Util:tool},{uid:loginUser.user_id});
                dataes.realName = localStorage.uname;
                tool.render('health_doc',dataes,$('#healthDocument'));
            }
        }
    })
});