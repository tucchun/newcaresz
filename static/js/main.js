var main = document.querySelector("#js-main");
var ctx = main.getAttribute("data-ctx") || '../';
var entrance = main.getAttribute("data-entrance");
require.config({
    urlArgs: 'v=1.03',
    baseUrl: ctx,
    waitSeconds: 0,
    shim: {
        jquery: {
            export: "jQuery"
        },
        bootstrap: {
            deps: ['jquery'],
            exports: "bootstrap"
        },
        datetimepicker: {
            deps: ['bootstrap'],
            exports: 'datetimepicker'
        },
        "local.datetimepicker": {
            deps: ['datetimepicker']
        },
        KindEditor:{
            exports:'KindEditor'
        },
        zh_CN:{
            deps:['KindEditor'],
            exports:'zh_CN'
        },
        upload:{
            deps:['jquery']
        },
        validate:{
            deps:['jquery']
        },
        ztree:{
            deps:['jquery']
        },
        Util: {
            exports: "Util"
        },
        zepto: {
            deps: ["zeptoModule/callbacks", "zeptoModule/deferred"]
        },
        'zeptoModule/callbacks':{
            deps: ['zepto'],
            exports: ["callbacks"]
        },
        'zeptoModule/deferred':{
            deps: ['zepto'],
            exports: "deferred"
        }
    },
    paths: {
        jquery: 'static/assets/jquery/jquery-1.9.1.min',
        zepto: 'static/assets/zepto-master/dist/zepto.min',
        zeptoModule: 'static/assets/zepto-master/dist/module',
        doT: 'static/assets/doT-master/doT.min',
        bootstrap:'static/assets/bootstrap/dist/js/bootstrap.min',
        Util: "static/js/Util",
        js: 'static/js',
        datetimepicker: 'static/assets/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker',
        zh_CN : 'static/assets/kinditor/zh_CN',
        KindEditor :+'static/assets/kinditor/kindeditor-min',
        "local.datetimepicker": 'static/assets/bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.zh-CN',
        "lodash": "static/assets/lodash/lodash.min",
        upload : 'static/js/ajaxupload.3.6',
        validate : 'static/js/jquery.validate',
        message_zh : 'static/js/messages_zh',
        forge: 'static/assets/forge/forge.min',
        zTree:'static/assets/zTree/js/jquery.ztree.all.min',
        viewer:'static/assets/viewerjs/viewer.min'
    }
});

entrance && require([entrance]);

/*require([
 "jquery",
 "js/common",
 "js/menu",
 "datetimepicker",
 "local.datetimepicker"
 ], function($, common, menu){

 window.common = common;
 $(document).ready(function () {
 common.tree('#js-menu');
 });



 });*/
