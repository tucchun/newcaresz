define([
  "jquery"
], function ($) {
  var tab = {},
    $tab = $("#myTabs"),
    $tabContent = $("#myTabContent"),
    $minTabMenuLi= $("#js-tab-menu"),
    $minTabMenu = $("#js-min-tab-menu");

  // tab事件初始化
  $tab.on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
    // 选中项 标签列表标记选中状态
    var id = $(e.target).attr("aria-controls");
    $minTabMenu.find(">li").removeClass("active");
    $minTabMenu.find("#js-mini-tab-item-" + id).addClass("active");
  }).on('show.bs.tab', 'a[data-toggle="tab"]', function (e) {
    // 选中项 移除隐藏
    var id = $(e.target).attr("aria-controls");
    $tab.find("#tab-li-" + id).removeClass("hide");
  }).on('show.bs.tab', 'a[data-toggle="tab"]', function (e) {
    // 当标签页数量大于5的时候， 显示迷你标签页菜单
    // 把第一个显示的标签页隐藏

    var $lst = $tab.find("> li[role='presentation']");
    if($lst.size() > 5){
      $minTabMenuLi.removeClass("hide");
    }else{
      $minTabMenuLi.addClass("hide");
    }

	  var visibleLst =  $lst.filter(":visible"),
		    visibleLstLen = visibleLst.length;

	  if(visibleLstLen > 5){
		  var id = $(e.target).attr("aria-controls");
		  if(visibleLst.eq(0).attr("id") === ("tab-li-" + id)){
			  visibleLst.eq(1).addClass("hide");
		  }else{
			  visibleLst.eq(0).addClass("hide");
		  }

	  }else{
		  var hiddenLst =  $lst.filter(":hidden");
		  for(var i = 0; i < 5 - visibleLstLen; i++){
			  hiddenLst.eq(i).removeClass("hide");
		  }
	  }
  });


  // 关闭tab事件
  $tab.on("click", ".js-tab-close", function (e) {
    var id = $(this).parent().attr("aria-controls");
    tab.close(id);
	  $minTabMenu.find("#js-mini-tab-item-" + id).remove();
    e.stopPropagation();
  });
  // 迷你标签列表
  $minTabMenu.on("click", "> li > a", function(e){
    // 点击显示相应标签
    var target = this.dataset["target"];
    $tab.find("#tab-a-"+ target).tab('show');
    //e.stopPropagation();
  }).on("click", ".js-icon-close", function(e){
    // 关闭标签
    var id = $(this).parent().data("target");
    tab.close(id);
    $minTabMenu.find("#js-mini-tab-item-" + id).remove();
    e.stopPropagation();
  });

  tab = {
    create: function (id, data, html) {
      var contents = [
        '<div role="tabpanel" class="tab-pane fade" id=' + id + ' aria-labelledby="' + id + '-tab">',
          html,
        '</div>'
      ];
      var currentTab = $("#myTabs #tab-a-"+ id );
      if(currentTab.size() === 1){
    	  //更新数据
    	  $('#'+id).html(html);
          currentTab.tab("show");
          return;
      }
      var tabs = [
        '<li role="presentation" id="tab-li-' + id + '">',
          '<a href="#' + id + '" role="tab" id="tab-a-' + id + '" data-toggle="tab" aria-controls=' + id + ' aria-expanded="true">',
            '<span class="nav-tabs-txt">' + data.name + '</span><span  data-id="' + id + '" class="nav-tabs-btn icon-close js-tab-close"></span>',
          '</a>',
        '</li>'
      ];
      
      $tab.find("#js-tab-menu").before(tabs.join(""));
      $tabContent.append(contents.join(""));
      $minTabMenu.append("<li id='js-mini-tab-item-"+ id +"'><a data-target='"+ id +"'><span>"+ data.name +"</span><i class='icon icon-close js-icon-close'></i></a></li>");
      $tab.find("#tab-a-" + id).tab('show');
    },
    close: function (id) {
      var tabItem = $tab.find("> li:first"),
          tabItem_a = tabItem.find("> a");

      $tab.find("#tab-li-" + id).remove();
      $tabContent.find("#" + id).remove();
	    if(tabItem.hasClass("active")){
	      tabItem_a.trigger("show.bs.tab").trigger("shown.bs.tab");
      }else{
		    tabItem_a.tab("show");
      }
      // $tab.find("> li:first > a").tab("show");
    }
  };

  return tab;

});