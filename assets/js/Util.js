import $ from 'jquery';
import forge from 'node-forge';
import doT from 'dot';
import '../lib/jquery.mloading-master/jquery.mloading';
import '../lib/jquery.mloading-master/jquery.mloading.css';

// 2次封装log
if (!window.console) {
  window.console = {};
}
if (typeof window.console.log !== 'function') {
  window.console.log = function() {};
}

window.console.log = (function(log) {
  return function() {
    //Array.prototype.slice.call(arguments).forEach(function(item, index) {});
    log.apply(console, arguments);
  };
})(window.console.log);

// 页面js错误
window.onerror = function(msg, url, line) {
  try {
    throw new Error('[msg:' + msg + ',url:' + url + ',line:' + line + ']');
  } catch (error) {
    console.log("页面JS错误\n" + error.stack);
  }
  return false;
};

var Util = {};

if (process.env.NODE_ENV === 'production') {
  Util.demo = false;
} else {
  Util.demo = true;
}


// 线上 测试环境 demo数据改为false
if (location.href.indexOf('newcaresz.com') > 0 || location.href.indexOf('192.168.1.232') > 0) {
  Util.demo = false;
}


Util.param = function(uri) {
  uri = uri || "";
  var paramStr = uri.substring(uri.indexOf("?") + 1);
  var paramArr = paramStr.split("&");
  var paramObj = {};
  var temp = [];
  paramArr.forEach(function(item) {
    temp = item.split("=");
    paramObj[temp[0]] = temp[1];
  });
  return paramObj;
};

// PC端地址
var pc_host = Util.param(location.href)['from_host'];
var src_type = Util.param(location.href)['src_type'];


try {
  if (!window.jsObj) {
    window.jsObj = {};
  }
  for (var item in window.jsObj) {
    console.log(item);
  }
  Util.host = (function() {
    if (window.jsObj.getHost) { // 健教专干
      return window.jsObj.getHost();
    }
    if (src_type == 'DOCTOR') { // PC端
      return '';
    }
    return ''; //"http://proxy.newcaresz.com:8080";
  })();

  Util.browser = {
    versions: function() {
      var u = navigator.userAgent,
        app = navigator.appVersion;
      return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) == " qq" //是否QQ
      };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  };

  Util.pf_type = (function() {
    var pf_type = 'Web';
    if (Util.browser.versions.ios) {
      pf_type = 'iOS';
    } else if (Util.browser.versions.android) {
      pf_type = 'Android';
    } else {
      pf_type = 'Web';
    }
    return pf_type;
  })();

  console.log("浏览器环境：" + Util.pf_type);

  Util.load = function(msg) {
    if (window.jsObj.loading) {
      return window.jsObj.loading(msg);
    }
    return console.log("load...", msg);
  };

  Util.hideLoad = function() {
    if (window.jsObj.loadingFinish) {
      return window.jsObj.loadingFinish();
    }
    return console.log("hideLoad");
  };

  Util.result = function() {
    if (window.jsObj.result) {
      return window.jsObj.result();
    }
    return console.log("result");
  };

  Util.finish = function() {
    if (window.jsObj.finish) {
      return window.jsObj.finish();
    }
    return console.log("finish");
  };

  Util.showGalleryImages = function(picUrlListArr) {
    if (window.jsObj.showGalleryImages) {
      return window.jsObj.showGalleryImages(picUrlListArr);
    }
    return console.log("showGalleryImages");
  }

  Util.alert = function(msg) {
    if (window.jsObj.toast) {
      return window.jsObj.toast(msg);
    }
    return alert(msg);
  };

  /**
   * 上传照片
   * @param params: {
   *    maxsize[num]: 允许最大数量;
   *    success(url)[string]: 成功回调,返回图片url;
   *    error[string]：失败回调;
   * }
   * @param type : 类型 默认为1（需要认证）、2：不需认真；
   */
  Util.upload = function(params, type) {
    params = params || {};
    if (window.jsObj.pickAndUploadPicWithoutAuth && type == 2) {
      return window.jsObj.pickAndUploadPicWithoutAuth(params.maxsize || 1, params.success, params.error);
    }
    if (window.jsObj.pickAndUploadPic) {
      return window.jsObj.pickAndUploadPic(params.maxsize || 1, params.success, params.error);
    }
    return window[params["success"]](""); //./image/boy.png

  };


  Util.getPicUrl = function(str) {
    console.log("getPicUrl:" + str);
    if (window.jsObj.getPicUrl) {
      return window.jsObj.getPicUrl(str);
    }
    if (pc_host) {
      return pc_host + '/hca/api/business/getfile/' + encodeURI(forge.util.encode64(str));
    }
    if (Util.demo) {
      return '../../src/app/image/boy.png';
    }
    return '';
  };

  Util.getLoginUserId = function() {
    if (window.jsObj.getLoginUserId) {
      return window.jsObj.getLoginUserId();
    }
    return '';
  };

  Util.onNext = function() {
    if (window.jsObj.onNext) {
      return window.jsObj.onNext();
    }
    return console.log("onNext");
  };

  Util.getScrType = function() {
    if (window.jsObj.getSrcTypeStr) {
      return window.jsObj.getSrcTypeStr();
    }
    return "Web";
  };

  Util.getCommunicationAuth = function() {
    if (window.jsObj.getCorrespondAuthStr) {
      return window.jsObj.getCorrespondAuthStr();
    }
    return "";
  };
  Util.userId = Util.getLoginUserId();


} catch (e) {
  console.log(e.message);
}


Util.formatDate = function(dateStr) {
  if (!dateStr) return "";
  var date = new Date(dateStr);
  var arr = [];
  arr.push(date.getFullYear());
  arr.push(date.getMonth() + 1);
  arr.push(date.getDate());
  return arr.join("-");
};


Util.cvt = function(num) {
  var ch = "";
  switch (num) {
    case 0:
      ch = "零";
      break;
    case 1:
      ch = "一";
      break;
    case 2:
      ch = "二";
      break;
    case 3:
      ch = "三";
      break;
    case 4:
      ch = "四";
      break;
    case 5:
      ch = "五";
      break;
    case 6:
      ch = "六";
      break;
    case 7:
      ch = "七";
      break;
    case 8:
      ch = "八";
      break;
    case 9:
      ch = "九";
      break;
    default:
      ch = "零";
      break;
  }
  return ch;
};
Util._param = {};
Util.data = function(name, data, ctx) {
  ctx = ctx || Util._param;
  if (data) {
    ctx[name] = data;
  }
  return ctx[name];
};

Util.defaultValue = function() {
  return "无";
};

Util.value = function(value) {
  return value || "无";
};
//转换金额
Util.convertMoney = function(amount) {
  var am = amount / 100;
  return am.toFixed(2);
};

// ajax 设置
Util.ajaxSettings = {
  type: 'POST',
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  cache: false
};

Util.param = function(uri) {
  uri = uri || "";
  var paramStr = uri.substring(uri.indexOf("?") + 1);
  var paramArr = paramStr.split("&");
  var paramObj = {};
  var temp = [];
  paramArr.forEach(function(item) {
    temp = item.split("=");
    paramObj[temp[0]] = temp[1];
  });
  return paramObj;
};

//解析
Util.render = function(tempObj, targetObj, data, way) {
  var tmpText = doT.template(tempObj.text());
  way ? targetObj.append(tmpText(data)) : targetObj.html(tmpText(data));
};

//获取链接上的参数
Util.getUrlParam = function(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};
// ajax请求2次封装
Util.fetch = function(settings) {
  var opts = $.extend({}, Util.ajaxSettings, settings, {
    success: function() {},
    error: function() {}
  });
  var deferred = {};
  if (opts.url.indexOf("?") > 0) {
    opts.url += ('&ver=' + +new Date());
  } else {
    opts.url += ('?ver=' + +new Date());
  }
  console.log("===============请求接口开始===============\n");
  console.log("请求接口：" + opts.url + "\n");
  console.log("参数：" + opts.data + "\n");
  $(document.body).mLoading({mask: false});//显示loading组件
  if (Util.demo) {
    // 用本地数据
    deferred = $.Deferred();
    $.ajax({
      type: 'get',
      url: opts.demoUrl || opts.url,
      dataType: opts.dataType || "json",
      success: function(result) {
        deferred.resolve(result);
      },
      error: function(xhr, errorType, error) {
        if (errorType === "parsererror") {
          deferred.reject(JSON.stringify("json解析失败！"));
        }
        deferred.reject(JSON.stringify(error.stack));
      }
    });
  } else {
    deferred = $.ajax(opts);
  }

  deferred.done(function(data) {
    console.log("响应数据：" + JSON.stringify(data) + "\n");
    console.log("===============请求接口结束===============\n");
    $(document.body).mLoading("hide");//隐藏loading组件
  }).done(settings.success).fail(function(XMLHttpRequest, textStatus, errorThrown) {
    console.log("响应失败：" + textStatus + ", " + errorThrown + "\n");
    console.log("===============请求接口结束===============\n");
    $(document.body).mLoading("hide");//隐藏loading组件
  }).fail(settings.error);

  return deferred;
};


export default Util;
