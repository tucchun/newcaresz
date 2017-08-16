(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS之类的
    module.exports = factory(require('jquery'));
  } else {
    // 浏览器全局变量(root 即 window)
    root.Util = factory(root.jQuery);
  }
}(this, function($) {
  "use strict";

  // 2次封装log
  if (!window.console) {
    window.console = {};
  }
  if (typeof window.console.log != 'function') {
    window.console.log = function(msg) {};
  }

  console.log = (function(log) {
    return function() {
      //Array.prototype.slice.call(arguments).forEach(function(item, index) {});
      log.apply(console, arguments);
    };
  })(window.console.log);

  // 页面js错误
  window.onerror = function(msg, url, line) {
    try {
      throw new Error('[msg:' + msg + ',url:' + url + ',line:' + line + "]");
    } catch (error) {
      console.log("页面JS错误\n" + error.stack);
    }
    return false;
  };

  var Util = {};


  Util.demo = true;

  // 线上 测试环境 demo数据改为false
  if (location.href.indexOf('admin.newcaresz.com') > 0 || location.href.indexOf('192.168.1.232') > 0) {
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

  if (pc_host) {
    (function(global) {
      var _Base64 = global.Base64;
      var version = "2.1.9";
      var buffer;
      if (typeof module !== "undefined" && module.exports) {
        try { buffer = require("buffer").Buffer } catch (err) {}
      }
      var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var b64tab = function(bin) {
        var t = {};
        for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
        return t
      }(b64chars);
      var fromCharCode = String.fromCharCode;
      var cb_utob = function(c) {
        if (c.length < 2) {
          var cc = c.charCodeAt(0);
          return cc < 128 ? c : cc < 2048 ? fromCharCode(192 | cc >>> 6) + fromCharCode(128 | cc & 63) : fromCharCode(224 | cc >>> 12 & 15) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63)
        } else {
          var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
          return fromCharCode(240 | cc >>> 18 & 7) + fromCharCode(128 | cc >>> 12 & 63) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63)
        }
      };
      var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
      var utob = function(u) {
        return u.replace(re_utob, cb_utob)
      };
      var cb_encode = function(ccc) {
        var padlen = [0, 2, 1][ccc.length % 3],
          ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0),
          chars = [b64chars.charAt(ord >>> 18), b64chars.charAt(ord >>> 12 & 63), padlen >= 2 ? "=" : b64chars.charAt(ord >>> 6 & 63), padlen >= 1 ? "=" : b64chars.charAt(ord & 63)];
        return chars.join("")
      };
      var btoa = global.btoa ? function(b) {
        return global.btoa(b)
      } : function(b) {
        return b.replace(/[\s\S]{1,3}/g, cb_encode)
      };
      var _encode = buffer ? function(u) {
        return (u.constructor === buffer.constructor ? u : new buffer(u)).toString("base64")
      } : function(u) {
        return btoa(utob(u))
      };
      var encode = function(u, urisafe) {
        return !urisafe ? _encode(String(u)) : _encode(String(u)).replace(/[+\/]/g, function(m0) {
          return m0 == "+" ? "-" : "_"
        }).replace(/=/g, "")
      };
      var encodeURI = function(u) {
        return encode(u, true)
      };
      var re_btou = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"), "g");
      var cb_btou = function(cccc) {
        switch (cccc.length) {
          case 4:
            var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3),
              offset = cp - 65536;
            return fromCharCode((offset >>> 10) + 55296) + fromCharCode((offset & 1023) + 56320);
          case 3:
            return fromCharCode((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
          default:
            return fromCharCode((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1))
        }
      };
      var btou = function(b) {
        return b.replace(re_btou, cb_btou)
      };
      var cb_decode = function(cccc) {
        var len = cccc.length,
          padlen = len % 4,
          n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0),
          chars = [fromCharCode(n >>> 16), fromCharCode(n >>> 8 & 255), fromCharCode(n & 255)];
        chars.length -= [0, 0, 2, 1][padlen];
        return chars.join("")
      };
      var atob = global.atob ? function(a) {
        return global.atob(a)
      } : function(a) {
        return a.replace(/[\s\S]{1,4}/g, cb_decode)
      };
      var _decode = buffer ? function(a) {
        return (a.constructor === buffer.constructor ? a : new buffer(a, "base64")).toString()
      } : function(a) {
        return btou(atob(a))
      };
      var decode = function(a) {
        return _decode(String(a).replace(/[-_]/g, function(m0) {
          return m0 == "-" ? "+" : "/"
        }).replace(/[^A-Za-z0-9\+\/]/g, ""))
      };
      var noConflict = function() {
        var Base64 = global.Base64;
        global.Base64 = _Base64;
        return Base64
      };
      global.Base64 = { VERSION: version, atob: atob, btoa: btoa, fromBase64: decode, toBase64: encode, utob: utob, encode: encode, encodeURI: encodeURI, btou: btou, decode: decode, noConflict: noConflict };
      if (typeof Object.defineProperty === "function") {
        var noEnum = function(v) {
          return { value: v, enumerable: false, writable: true, configurable: true }
        };
        global.Base64.extendString = function() {
          Object.defineProperty(String.prototype, "fromBase64", noEnum(function() {
            return decode(this)
          }));
          Object.defineProperty(String.prototype, "toBase64", noEnum(function(urisafe) {
            return encode(this, urisafe)
          }));
          Object.defineProperty(String.prototype, "toBase64URI", noEnum(function() {
            return encode(this, true)
          }))
        }
      }
      if (global["Meteor"]) { Base64 = global.Base64 }
    })(window);
  }

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
        return pc_host + '/hca/api/business/getfile/' + encodeURI(Base64.encode(str));
      }
      return ''; //./image/boy.png
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
    }).done(settings.success).fail(function(XMLHttpRequest, textStatus, errorThrown) {
      console.log("响应失败：" + textStatus + ", " + errorThrown + "\n");
      console.log("===============请求接口结束===============\n");
    }).fail(settings.error);

    return deferred;
  };


  return Util;

}));