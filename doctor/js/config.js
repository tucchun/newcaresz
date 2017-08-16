/**
 * Created by Administrator on 2017/6/1.
 */
define([],function(){
    return {
        baseUrl:'/doctor/js',
        shim:{
            jquery: {
                export: "jQuery"
            },
            path_router:{
                export:"Path"
            },
            bootstrap: {
                deps: ['jquery'],
                exports: "bootstrap"
            }
        },
        paths:{
            jquery : 'lib/jquery-1.9.1.min',
            path_router : 'lib/path',
            forge : 'lib/forge.min',
            bootstrap : 'lib/bootstrap.min',
            path_module : 'modules/path_module',
            doT : 'lib/doT.min'
        }
    }
});
