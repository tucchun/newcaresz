/**
 * Created by zhouyun on 2017/5/17.
 */
define(['path_router','jquery'],function(path,$){
    'use strict';
    var Router = {};
    function laodUri(uri){
        var url = '../html/'+uri+'.html';
        // console.log(uri);
        $('#content').load(url);
    }
    Router.AddPage = function(uri,argobj){
        var that = this;
        Path.map('#/'+uri+'(/:id)').to(function(){
            laodUri(uri);
            document.title = argobj.title;
        }).enter(function(){});
    };
    Router.init = function(){
        Path.root('#/searchResult');
        Path.listen();
    };
    return Router;
});