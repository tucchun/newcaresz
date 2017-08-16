/**
 * Created by Administrator on 2017/7/8.
 */
require(['../js/config'],function(config){
    require.config(config);
    require(['modules/tool'],function(tool){
        var sex = tool.getUrlParam('decodeSex');
        if(sex == 1){
            $('#rxa').remove();
        }
    });
});