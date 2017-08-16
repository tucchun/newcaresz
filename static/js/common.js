define([
  "jquery",
  "js/tab",
  "bootstrap",
], function($, tab) {
  "use strict";
  var common = {};
  common.tab = tab;


  // 创建tab
  /**
   * @param
   *  opts: {
   *    uri: 页面地址
   *    key: tab唯一标示
   *    data: {
   *      name: tab名字
   *    }
   *  }
   *
   *  example:
      var opts = {
  			uri: 'seminarList',
  			data: {name: '新增研讨会'},
  			key: 'seminarList'
  		}
      common.createTab(opts)
   */
  common.createTab = function(opts) {
    			var currentTab = $("#myTabs #tab-a-" + opts.key);
    if (currentTab.size() == 1) {
      currentTab.tab("show");
    }
    getHtml(opts.uri).done(function(htmlStr) {
      common.tab.create(opts.key, opts.data, htmlStr);
    });
  }
  //关闭tab页签
  common.closeTab = function(id) {
    common.tab.close(id);
  }

  // 菜单
  common.tree = function(menu) {

    var animationSpeed = 500;
    $(document).on('click', menu + ' li a', function(e) {
      //Get the clicked link and the next element
      var $this = $(this);
      var data = $this.data();
      var parent = $this.parent();
      var checkElement = $this.next();
      var currentTab = $("#myTabs #tab-a-" + data.key);

      //Check if the next element is a menu and is visible
      if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
        //Close the menu
        checkElement.slideUp(animationSpeed, function() {
          parent.removeClass('menu-open');
        });
      }
      //If the menu is not visible
      else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
        //Open the target menu and add the menu-open class
        checkElement.slideDown(animationSpeed);
        parent.addClass('menu-open');
      }

      $(menu + " li").removeClass("active");
      $this.parentsUntil(menu, 'li').addClass("active");
      //if this isn't a link, prevent the page from being redirected
      if (checkElement.is('.treeview-menu')) {
        e.preventDefault();
      }
      if (data && JSON.stringify(data) != '{}' && currentTab.size() == 0) {
        getHtml(data.uri).done(function(htmlStr) {
          common.tab.create(data.key, data, htmlStr);
        });
      } else if (currentTab.size() == 1) {
        currentTab.tab("show");
      }

    });
  };

  /**
   * 加载页面
   * @param opts
   *  opts: {
   *     container: '页面容器ID'
   *     url      : '待装入 HTML 网页网址'
   *     data:    : '发送至服务器的 key/value 数据'
   *     callback : '载入成功时回调函数'
   *  }
   */
  common.load = function(opts) {
    var container = opts.container;
    $("#" + container).load(opts.url, opts.data, opts.callback);
  };

  /**
   * 重新加载
   * @param opts
   * opts{
   *  url: '请求地址'
   *  data：'提交数据'
   *  cnt: '页面容器id'
   * }
   * @returns {*}
   */
  common.post = function(opts) {

    var url = opts.url; //'${ctx}/post'
    var data = opts.data; //$("#js-form").serialize();
    var modal = opts.modal;

    var promise = $.Deferred();
    $.ajax({
      url: url,
      type: "post",
      data: data,
      success: function(data) {
        if (data === "success") {
          if (modal) {
            modal.off('hidden.bs.modal.submit');
            modal.on('hidden.bs.modal.submit', function(e) {
              promise.resolve(data);
            });
            modal.modal("hide");
          } else {
            promise.resolve(data);
          }
        } else {
          promise.resolve(data);
        }
      },
      error: function(error) {
        promise.reject(error);
      }
    });
    return promise;
  }

  common.getJSONPromise = function(opts) {
    var promise = $.Deferred();
    $.ajax({
      url: opts.url,
      dataType: "JSON",
      type: "get",
      success: function(result) {
        promise.resolve(result);
      },
      error: function(err) {
        promise.resolve([]);
      }
    });
    return promise;
  }

  common.getArea = function() {}

  function getHtml(uri) {
    return $.ajax({
      url: './views/' + uri + '.html',
      // url:  uri,
      dataType: "html",
      success: function(data) {
        //				console.log(data)
      },
      error: function(error) {
        // console.log(error)
      }
    });
  }
  return common;
});