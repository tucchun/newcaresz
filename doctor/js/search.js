/**
 * Created by Administrator on 2017/6/3.
 */
require(['modules/tool'],function(tool){
    var IDcard = '';
    var loginUser = JSON.parse(localStorage.getItem('usinfo'));
    var communication_str= tool.getCommunication_str();
    $('#form_search').submit(function(){
        IDcard = $(this).find('input').val();
        // var flag = tool.validateId(IDcard);
        var argument = {
            auth_str:communication_str,
            user_id:loginUser.user_id,
            personId:IDcard
        };
        $.extend(argument,tool.pubArgument());
        // if (flag){
            tool.fetch({
                url:'/web/doctor/evaluate/search',
                data:JSON.stringify(argument),
                success:function(ret){
                    if(ret.ret_code === 1){
                        var data = ret.ret_data;
                        localStorage.uname = data.user.realName;
                        localStorage.residentInfo = JSON.stringify(data.resident);
                        data = $.extend(data,{Util:tool});
                        tool.render('search_result',data,$('#result'));
                    }else{
                        alert(ret.ret_msg);
                    }
                },
                error:function(err){}
            });
        /*}else{
            alert('请填写正确的身份证号码');
        }*/
        return false;
    });
    $(document).on('click','#save_suggection',function(){
       var sugg = $('#text_suggection').val();
       var data = {
           "user_id":loginUser.user_id,
           "auth_str":communication_str,
           "personId":IDcard,
           "type":"HEALTH_SUGGESTION",
           "suggestion":sugg
       };
       data = $.extend(data,tool.pubArgument());
       tool.fetch({
           url:'/web/doctor/evaluate/create',
           type:'POST',
           data:JSON.stringify(data),
           success:function(ret){
               if(ret.ret_code === 1){
                   alert("提交成功");
                   $('#text_suggection').val('');
               }else{
                   alert('数据提交失败');
               }
           }
       });
    });
});