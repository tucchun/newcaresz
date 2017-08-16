define([
  "doT",
  "lodash",
  'jquery',
  "js/Util",
], function(doT, _, $, Util) {
  var $container = $("#container");
  var common = {};
  // 表单字典
  common.settings = {
    10: "residentHealthCover", //健康档案封面
    20: "personalInformation", //个人基本信息
    30: "healthChecklist", //健康体检表
    40: "acceptanceRecordForm", //接诊记录
    50: "consultationRecord", //会诊记录
    60: "two-wayTurnOut", //双向转诊(转出)
    70: "two-wayTurnBack", //双向转诊(回转)
    80: "residentHealthFileInformationCard", //居民健康档案信息卡
    90: "prenatalInspectionServiceRecords", //孕妇第1次产前检查服务记录表
    100: "morePrenatalInspectionServiceRecords", //第2~5次产前随访记录表
    110: "postpartumVisitRecord", //产后访视记录表
    120: "postpartumHealthCheklist", //产后42天健康检查记录表
    130: "newborns", //新生儿家庭访视表
    139: "childHealthCheckRecords", //1~30月儿童健康检查记录表
    140: "moreChildHealthCheckRecords", //3~6岁儿童健康检查记录表
    160: "boyGrowth", //男童生长发育检测图
    170: "girlGrowth", //女童生长发育监测图
    180: "vaccinationCard", //预防接种卡
    190: "childHealthManagementService", //6～18月龄儿童中医药健康管理服务记录表
    200: "moreChildHealthManagementService", //24～36月龄儿童中医药健康管理服务记录表
    210: "hypertensivePatients", //高血压患者健康管理服务
    220: "visitDiabeticPatients", //2型糖尿病患者随访服务记录表
    230: "tuberculosisPatients", //肺结核患者第一次入户随访记录表
    240: "moreTuberculosisPatients", //肺结核患者随访服务记录表
    250: "patientsWithMentalDisorders", //严重精神障碍患者个人信息补
    260: "visitPatientsWithMentalDisorders", //严重精神障碍患者随访服务记录表
    270: "coronaryHeartDisease", //冠心病专项档案
    280: "visitCoronaryHeartDisease", //五华区冠心病人随访表
    290: "tumorDisease", //五华区肿瘤病例随访表
    300: "strokeDisease", //脑卒中病例随访表
    420: "generalFollowUp", //一般随访表
    430: "maternalBasic", //孕妇基本档案
    //440: "healthChecklistExt",                     //体检扩展表
    450: "pregnantWomen", //孕产妇结题
    460: "archives", //添加历史&院外档案
    500: "healthAdvice" //健康建议
  };
  var pattern = "noused";
  //  var uri = location.href;
  var uri = location.href;
  var paramObj = Util.param(uri);

  // console.log(paramObj);

  if (Util.demo) {
    paramObj = {
      "doc_id": 1,
      "isShowNext": "false",
      "user_id_doc": 2026,
      "doc_type": 430
    };
  }


  common.render = function(templateUrl, data) {
    return Util.fetch({
      type: "get",
      url: templateUrl,
      dataType: "text",
      success: function(response) {
        $.extend(data, { Util: Util, _: _ });
        var template = {};
        if (paramObj["doc_type"] == 20 || paramObj["doc_type"] == 180) {
          template = _.template(response);
        } else {
          template = doT.template(response);
        }
        // var htmlStr = template(data)
        var $html = $(template(data));

        if (paramObj["doc_type"] == 220) {
          // 2型糖尿病患者随访服务记录表， 把胰岛素挑到最后一排
          var $useMedicationList = $html.find(".js-useMedicationList");
          var $insulin = $useMedicationList.filter("[data-flag]");
          var temp = {
            name: $insulin.find(".js-useMedicationList-medDrugName").html(),
            value: $insulin.find(".js-useMedicationList-medConsumption").html(),
          };
          $insulin.find(".js-useMedicationList-medDrugName").html($useMedicationList.last().find(".js-useMedicationList-medDrugName").html())
          $insulin.find(".js-useMedicationList-medConsumption").html($useMedicationList.last().find(".js-useMedicationList-medConsumption").html())
          $useMedicationList.last().find(".js-useMedicationList-medDrugName").prev().remove().end().html(temp.name).prop("colspan", 2);
          $useMedicationList.last().find(".js-useMedicationList-medConsumption").html(temp.value);

        }

        if (paramObj["doc_type"] == 30) {

          var $list = $html.find("td[data-norequired]");
          var index = $list.size() - 1;
          var $temp = {};
          while (index >= 0) {
            $temp = $list.eq(index)
            if (!$temp.parent().attr(pattern)) {
              norequired($temp, $html);
            }
            index--;
          }

        }
        $container.append($html);
      },
      error: function(err, errorType, msg) {
        // console.log("获取页面失败；" + msg);
        Util.alert("网络错误!");
      }
    });
  }

  function norequired($norequired, $html) {
    var $this = $norequired;
    var flag = $this.data("norequired");
    var $norequiredList = getModifyCollection(flag, $html);
    modifyCol($norequiredList);
    doArrange($norequiredList, $html);


  }
  // 获得要被处理的数据
  function getModifyCollection(flag, $html) {
    var $norequiredList = $html.find("tr[data-" + flag + "]");
    var $norequiredListFirst = $norequiredList.first();
    var firstIndex = $norequiredListFirst.index();
    var lastIndex = $norequiredList.last().index();
    var index = firstIndex;
    var temp = $norequiredListFirst;
    while (index < lastIndex) {
      temp = temp.next();
      index++;
      if (!temp.is('[' + pattern + ']')) {
        $norequiredList = $norequiredList.add(temp);
      }
    }
    return $norequiredList;
  }

  // 处理行
  function modifyCol($norequiredList) {
    $norequiredList.each(function(index) {
      var value = $.trim($(this).children(":last").html());
     
      if (!value || value == 0) {
        
        if ($(this).children("[data-norequired]").size() > 0) {
          // 该行有跨列 不能直接删除； 把最后一个td删掉，再不最后一个td的前一个td内容置空并跨行加1；
          $(this).children(":last").remove();
          var $last = $(this).children(":last");
          $last.html("");
          $last.prop("colspan", parseInt($last.prop("colspan") || 0) + 1);
          // $(this).attr("enable", "enable");
          // visibleArr.push($(this));
        } else {
          // 隐藏
          $(this).hide();
          $(this).attr(pattern, pattern);
          //console.log( $norequiredList)
        }
      } 
    });
  }



  // 整理数据
  function doArrange($norequiredList, $html) {
    var $enableList = $norequiredList.filter(":not([" + pattern + "])");
    // 如果分类值为空，把下一个值往上移；
    if (!$enableList.eq(0).children(":last").html()) {
      if ($enableList.size() >= 2) {
        $enableList.eq(0).children(":last").remove();
        $enableList.eq(0).append($enableList.eq(1).html())
        $enableList.eq(1).hide();
        $enableList.eq(1).attr(pattern, pattern);
        $enableList = $norequiredList.filter(":not([" + pattern + "])");
      }
    }
    // 重新计算跨行
    // 如果跨行数为1 并且 第一个行值为空 则把分类名置空 跨行加1
    var rowspan = $enableList.size();
    var $firstNorequired = $enableList.eq(0);
    $firstNorequired.children("[data-norequired]").prop("rowspan", rowspan);

    var flag = $firstNorequired.children("[data-norequired]").data("belong");
    var $list = getModifyCollection(flag, $html);
    // 如果只有1个可用元素，并且值为空
    if (rowspan == 1 && !$.trim($firstNorequired.children(":last").html())) {
      // 如果还有数据 则把后面的数据往上移； 反之，隐藏该行；
      var $next = $firstNorequired.next();
      var lastIndex = $list.last().index();
      while (lastIndex >= $next.index()) {
        if (!$next.is("[" + pattern + "]")) {
          $firstNorequired.children("[data-norequired]").next().remove();
          $firstNorequired.children("[data-norequired]").remove();
          $firstNorequired.append($next.html());
          $next.hide();
          $next.attr(pattern, pattern);
          break;
        }
        $next = $next.next();
        if ($next.index() < 0) break;
      }
      $enableList = $norequiredList.filter(":not([" + pattern + "])");
      if ($enableList.size() == 1 && !$.trim($enableList.eq(0).children(":last").html())) {
        $enableList.eq(0).hide();
        $enableList.eq(0).attr(pattern, pattern);
      }
    }


    $enableList = $list.filter(":not([" + pattern + "])");
    var enableSize = $enableList.size();
    $list.eq(0).children(":first").prop("rowspan", enableSize || 1);
    if (enableSize == 1 && !$.trim($enableList.eq(0).children(":last").html())) {
      $enableList.eq(0).hide();
      $enableList.eq(0).attr(pattern, pattern);
    }
  }




  var isShowNext;
  if (paramObj.isShowNext) {
    isShowNext = paramObj.isShowNext;
  }
  // paramObj = _.pick(paramObj, ["doc_id", "user_id_doc", "doc_type"]);

  if (paramObj["doc_type"] == 170 || paramObj["doc_type"] == 160) {
    var template = "./template/" + common.settings[paramObj.doc_type] + ".template";
    common.render(template, {});
    return true;
  }
  var deferred = $.Deferred();
  if (paramObj["doc_type"] == 450 || paramObj["doc_type"] == 460 || paramObj["doc_type"] == 40 || paramObj["doc_type"] == 50 || paramObj["doc_type"] == 60 || paramObj["doc_type"] == 70) {
    require(['viewer'], function(Viewer) {
      deferred.resolve();
    });
  } else {
    deferred.resolve();
  }
  //    common.load();
  deferred.done(function() {
    Util.fetch({
      url: Util.host + '/hca/web/inhabitant/getdoc',
      demoUrl: "../../static/rss/" + common.settings[paramObj.doc_type] + ".json",
      // data: JSON.stringify($.extend({}, paramObj, {
      //   "src_type": "HECadre", //请求源的类型，如"HECadre APP"、"Inhabitant APP"等
      //   "pf_type": Util.pf_type, //请求源的终端平台类型，如"Android"、"iOS"、"Web"等
      //   "user_id": Util.userId || paramObj['user_id'], //用户ID，u64
      //   "auth_str": Util.getCommunicationAuth() || paramObj['authStr']//通信认证密文串
      // })),
      data: JSON.stringify({
        "doc_id": paramObj['doc_id'],
        "user_id_doc": paramObj['user_id_doc'],
        "doc_type": paramObj['doc_type'],
        "src_type": "HECadre", //请求源的类型，如"HECadre APP"、"Inhabitant APP"等
        "pf_type": Util.pf_type, //请求源的终端平台类型，如"Android"、"iOS"、"Web"等
        "user_id": Util.userId || paramObj['user_id'], //用户ID，u64
        "auth_str": Util.getCommunicationAuth() || paramObj['authStr'] //通信认证密文串
      }),
      success: function(data) {
        //            common.hideLoad();
        data = data || {};
        if (data.ret_code === 1) {
          var template = "./template/" + common.settings[paramObj.doc_type] + ".template";
          var templateData = data.ret_data;
          if (isShowNext) {
            templateData['isShowNext'] = isShowNext;
          }
          /*if (templateData.imageUrlList && templateData.imageUrlList.length > 0) {
            template = "./template/videoMaterial.template";
            templateData["getPicUrl"] = Util.getPicUrl;
          }*/
          if (paramObj["doc_type"] == 139) {
            switch (templateData.onemMonth) {
              case 1:
                templateData.onemMonth = 1;
                break;
              case 2:
                templateData.onemMonth = 3;
                break;
              case 3:
                templateData.onemMonth = 6;
                break;
              case 4:
                templateData.onemMonth = 8;
                break;
              case 5:
                templateData.onemMonth = 12;
                break;
              case 6:
                templateData.onemMonth = 18;
                break;
              case 7:
                templateData.onemMonth = 24;
                break;
              case 8:
                templateData.onemMonth = 30;
                break;
            }
          }
          if (paramObj["doc_type"] == 140) {
            switch (templateData.visitAge) {
              case 1:
                templateData.visitAge = 3;
                break;
              case 2:
                templateData.visitAge = 4;
                break;
              case 3:
                templateData.visitAge = 5;
                break;
              case 4:
                templateData.visitAge = 6;
                break;
            }
          }
          common.render(template, templateData);
        } else {
          Util.alert(data.ret_msg || "查询信息错误！");
        }
      },
      error: function(err) {
        Util.alert("网络错误！");
        // console.log(err);
      }
    });
  }).fail(function() {
    Util.alert("获取信息失败");
  });

});