
var ctx = document.querySelector("[data-main]").getAttribute("data-ctx") || '../';
require.config({
    urlArgs: '',
    baseUrl: "",
    waitSeconds: 0,
    shim: {
        jquery: {
            export: "jQuery"
        }
    },
    paths: {
        jquery: ctx + 'static/assets/jquery/jquery-1.9.1.min',
        js: ctx + 'static/js',
        forge: ctx + 'static/assets/forge/forge.min'
    }
});
require([
    'jquery',
    'js/security'
], function($, security) {

    $("#loginForm").on("submit", function (e) {
        var pwd = $("#passwordstr").val();
        var username = $("#username").val();
        var converPwd = security.convertedPassword(pwd);
        var randomCode = security.random();

        localStorage.setItem("randomCode", randomCode);
        localStorage.setItem("username", username);
        localStorage.setItem("pwd", security.base64.encode(converPwd));

        /**
         * opts{
			 *    randomCode: 32Byte随机密钥
			 *    username: 登录名
			 *    passowrd: 变换后的密码
			 *  }
         */
        var rpwd = security.authStr({
            randomCode: randomCode,
            username: username,
            passowrd: converPwd
        });
        console.log(rpwd);
        $("#password").val(rpwd);

    })
    //    debugger
});