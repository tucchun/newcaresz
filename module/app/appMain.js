define([
  "doT",
  "lodash",
  'jquery',
  "js/Util",
], function(doT, _, $, Util) {
  var $container = $("#container");
  // 表单字典
  var common = {};
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

  var uri = location.href;
  var paramObj = Util.param(uri);
  console.log(paramObj);
  if (Util.demo) {
    paramObj = {
      "doc_id": 1,
      "user_id_doc": 2026,
      "doc_type": 40
    };
  }

  common.render = function(templateUrl, data, tab) {
    return Util.fetch({
      type: "get",
      url: templateUrl,
      dataType: "text",
      success: function(response) {
        $.extend(data, { Util: Util, _: _ });
        //var template = doT.template(response);
        /*     for(var item in data){
         if(!data[item]){
         data[item] = "无";
         }
         }*/
        var template = {};
        if (paramObj["doc_type"] == 180) {
          template = _.template(response);
        } else {
          template = doT.template(response);
        }
        var html = template(data);
        if (tab) {
          html = $(html).filter(".js-tab-content");
          html.attr("id", "js-" + data.createDate);
        }
        var $html = $(html);

        if (paramObj["doc_type"] == 220) {
          var $useMedicationList = $html.find(".js-useMedicationList");
          var $insulin = $useMedicationList.find("[data-flag]");
          $useMedicationList.append($insulin);
        }

        if (paramObj['doc_type'] == 30) {

          $html.find('[data-norequired]').each(function() {
            // if ($(this).data("norequired") == 'examAuxiliaryOther') {
            //   debugger;
            // }
            norequired($(this), $html);
          });
        }
        // 预览图片
        if (paramObj['doc_type'] == 450 || paramObj['doc_type'] == 460 || paramObj['doc_type'] == 40 || paramObj['doc_type'] == 50 || paramObj['doc_type'] == 60 || paramObj['doc_type'] == 70) {
          var dom_imgArr = $html.find('.js-img');
          dom_imgArr.each(function() {
            var width = this.width;
            var height = this.height;
            if (width > height) {
              this.style.width = "auto";
              this.style.height = "100%";
            } else {
              this.style.width = "100%";
              this.style.height = "auto";
            }
          });
          if (window.jsObj.showGalleryImages) {
            var img_src_arr = [];

            dom_imgArr.each(function() {
              img_src_arr.push(this.getAttribute('src'));
            });

            dom_imgArr.on('click', function() {
              var index = dom_imgArr.index(this);
              console.log("图片索引：" + index);
              // window.jsObj.showGalleryImages(img_src_arr);
              window.jsObj.showGalleryImagesWithIndex(img_src_arr, index);
            });
          } else {
            var dom_imagesCnt = $html.find("#js-images-cnt").get(0);
            new Viewer(dom_imagesCnt, {});
          }
        }
        $container.append($html);
        // $container.append(html);
      },
      error: function(err, errorType, msg) {
        console.log("网络错误；" + msg);
        Util.alert("网络错误!");
      }
    });
  }

  var pattern = 'noused';

  function norequired($this, $html) {
    var flag = $this.data('norequired');
    var $list = $this.children();
    var $temp = {};
    if ($this.data("norequireditem")) {
      if (!$.trim($this.children().eq(1).html())) {
        $this.attr(pattern, pattern);
        // $temp.hide();
        $this.remove();
      }
      var $parent_level2 = $html.find('[data-' + $this.data('belong') + ']');
      if ($parent_level2.children(":last").children().size() === 0) {
        $parent_level2.remove();
      }
    } else {
      $list.each(function() {
        $temp = $(this);
        if (!$.trim($temp.children().eq(1).html())) {
          $temp.attr(pattern, pattern);
          // $temp.hide();
          $temp.remove();
        }
      });
    }

    // var $parent_level2 = $html.find('[data-' + $this.data('belong') + ']');
    // if ($list.filter(':not([' + pattern + '])').size() <= 0) {
    //   $parent_level2 = $html.find('[data-' + $this.data('belong') + ']');
    //   $parent_level2.attr(pattern, pattern);
    //   $parent_level2.hide();
    // }

    var $parent_level2 = $html.find('[data-' + $this.data('belong') + ']');
    if ($list.filter(':not([' + pattern + '])').size() <= 0) {
      $parent_level2.attr(pattern, pattern);
      $parent_level2.remove();
    }

    var $parent_level1 = $html.find('[data-' + $parent_level2.data('belong') + ']');
    if ($parent_level1.children(":last").children().size() === 0) {
      $parent_level1.remove();
    }
    // var $parent_silbings = $parent_level2.parent().children();

    // if ($parent_silbings.filter(':not([' + pattern + '])').size() <= 0) {
    //   $html.find('[data-' + $parent_level2.data('belong') + ']').remove();
    // }

  }


  function f(name, o) {
    var val = o[name];
    if (val) {
      if (_.isString(val)) {
        return val;
      } else if (_.isObject(val)) {
        for (var item in val) {
          f(item, val);
        }
      } else if (_.isArray(val)) {
        _.forEach(val, function(item) {

        });
      }

    } else {
      o[name] = "无";
    }
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
  deferred.done(function(Viewer) {
    Util.fetch({
      url: Util.host + '/hca/web/inhabitant/getdoc',
      demoUrl: "../../static/rss/" + common.settings[paramObj.doc_type] + ".json",
      // data: JSON.stringify(paramObj),
      data: JSON.stringify({
        "doc_id": paramObj['doc_id'],
        "user_id_doc": paramObj['user_id_doc'],
        "doc_type": paramObj['doc_type'],
        "src_type": "Inhabitant APP", //请求源的类型，如"HECadre APP"、"Inhabitant APP"等
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
          /*          if (templateData.imageUrlList && templateData.imageUrlList.length > 0) {
                      template = "./template/videoMaterial.template";
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
        console.log(err);
      }
    });
  });

  deferred.fail(function() {
    Util.alert("获取信息失败");
  });

});