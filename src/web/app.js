import $ from 'jquery';
import doT from 'dot';
import _ from 'lodash';
import Viewer from 'viewerjs';
import Util from '../../assets/js/Util.js';
import '../../assets/css/normalize.css';
import '../../node_modules/viewerjs/dist/viewer.min.css';
import '../../assets/css/flex.css';
import './css/style.css';


let common = {};
let container = $("#container");
let pattern = "noused";
let uri = location.href;
let paramObj = Util.param(uri);
let isShowNext;

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


// console.log(paramObj);

if (Util.demo) {
  paramObj = {
    "doc_id": 1,
    "isShowNext": "",
    "user_id_doc": 2026,
    "doc_type": 90
  };
}

// 获得要被处理的数据
function getModifyCollection(flag, $html) {
  let $norequiredList = $html.find("tr[data-" + flag + "]");
  let $norequiredListFirst = $norequiredList.first();
  let firstIndex = $norequiredListFirst.index();
  let lastIndex = $norequiredList.last().index();
  let index = firstIndex;
  let temp = $norequiredListFirst;
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
    let value = $.trim($(this).children(":last").html());

    if (!value || value == 0) {

      if ($(this).children("[data-norequired]").size() > 0) {
        // 该行有跨列 不能直接删除； 把最后一个td删掉，再不最后一个td的前一个td内容置空并跨行加1；
        $(this).children(":last").remove();
        let $last = $(this).children(":last");
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
  let $enableList = $norequiredList.filter(":not([" + pattern + "])");
  // 如果分类值为空，把下一个值往上移；
  if (!$enableList.eq(0).children(":last").html()) {
    if ($enableList.size() >= 2) {
      $enableList.eq(0).children(":last").remove();
      $enableList.eq(0).append($enableList.eq(1).html());
      $enableList.eq(1).hide();
      $enableList.eq(1).attr(pattern, pattern);
      $enableList = $norequiredList.filter(":not([" + pattern + "])");
    }
  }
  // 重新计算跨行
  // 如果跨行数为1 并且 第一个行值为空 则把分类名置空 跨行加1
  let rowspan = $enableList.size();
  let $firstNorequired = $enableList.eq(0);
  $firstNorequired.children("[data-norequired]").prop("rowspan", rowspan);

  let flag = $firstNorequired.children("[data-norequired]").data("belong");
  let $list = getModifyCollection(flag, $html);
  // 如果只有1个可用元素，并且值为空
  if (rowspan == 1 && !$.trim($firstNorequired.children(":last").html())) {
    // 如果还有数据 则把后面的数据往上移； 反之，隐藏该行；
    let $next = $firstNorequired.next();
    let lastIndex = $list.last().index();
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
  let enableSize = $enableList.size();
  $list.eq(0).children(":first").prop("rowspan", enableSize || 1);
  if (enableSize == 1 && !$.trim($enableList.eq(0).children(":last").html())) {
    $enableList.eq(0).hide();
    $enableList.eq(0).attr(pattern, pattern);
  }
}


function norequired($norequired, $html) {
  let $this = $norequired;
  let flag = $this.data("norequired");
  let $norequiredList = getModifyCollection(flag, $html);
  modifyCol($norequiredList);
  doArrange($norequiredList, $html);
}

common.render = function(templateUrl, data) {
  return Util.fetch({
    type: "get",
    url: templateUrl,
    dataType: "text",
    success: function(response) {
      $.extend(data, { Util: Util, _: _ });
      let template = {};
      if (paramObj["doc_type"] == 20 || paramObj["doc_type"] == 180) {
        template = _.template(response);
      } else {
        template = doT.template(response);
      }
      // let htmlStr = template(data)
      let $html = $(template(data));

      if (paramObj["doc_type"] == 220) {
        // 2型糖尿病患者随访服务记录表， 把胰岛素挑到最后一排
        let $useMedicationList = $html.find(".js-useMedicationList");
        let $insulin = $useMedicationList.filter("[data-flag]");
        let temp = {
          name: $insulin.find(".js-useMedicationList-medDrugName").html(),
          value: $insulin.find(".js-useMedicationList-medConsumption").html(),
        };
        $insulin.find(".js-useMedicationList-medDrugName").html($useMedicationList.last().find(".js-useMedicationList-medDrugName").html());
        $insulin.find(".js-useMedicationList-medConsumption").html($useMedicationList.last().find(".js-useMedicationList-medConsumption").html());
        $useMedicationList.last().find(".js-useMedicationList-medDrugName").prev().remove().end().html(temp.name).prop("colspan", 2);
        $useMedicationList.last().find(".js-useMedicationList-medConsumption").html(temp.value);

      }

      if (paramObj["doc_type"] == 30) {

        let $list = $html.find("td[data-norequired]");
        let index = $list.size() - 1;
        let $temp = {};
        while (index >= 0) {
          $temp = $list.eq(index);
          if (!$temp.parent().attr(pattern)) {
            norequired($temp, $html);
          }
          index--;
        }

      }
      // 预览图片
      if (paramObj['doc_type'] == 450 || paramObj['doc_type'] == 460 || paramObj['doc_type'] == 40 || paramObj['doc_type'] == 50 || paramObj['doc_type'] == 60 || paramObj['doc_type'] == 70) {
        let dom_imgArr = $html.find('.js-img');
        dom_imgArr.each(function() {
          let width = this.width;
          let height = this.height;
          if (width > height) {
            this.style.width = "auto";
            this.style.height = "100%";
          } else {
            this.style.width = "100%";
            this.style.height = "auto";
          }
        });
        if (window.jsObj.showGalleryImages) {
          let img_src_arr = [];

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
          // Promise.all([
          //   import ('viewerjs'),
          //   import ('../../node_modules/viewerjs/dist/viewer.min.css')
          // ]).then(function(result) {
          // let Viewer = result[0];
          // let dom_imagesCnt = $html.find("#js-images-cnt").get(0);
          // new Viewer(dom_imagesCnt, {});
          // });
          // require.ensure([], function(require) {
          //   require('../../node_modules/viewerjs/dist/viewer.min.css');
          // var Viewer = require('viewerjs');
          let dom_imagesCnt = $html.find("#js-images-cnt").get(0);
          new Viewer(dom_imagesCnt, {});
          // });
        }


      }
      if(paramObj['doc_type'] == 10){
        $html.find("#js-residentHealthCover-next").on("touchend", function(e){
          console.log("居民健康档案onNext");
          Util.onNext();
        });
      }

      container.append($html);
    },
    error: function(err, errorType, msg) {
      // console.log("获取页面失败；" + msg);
      Util.alert("当前网络不可用，请检查你的网络设置！");
    }
  });
}








if (paramObj.isShowNext) {
  isShowNext = paramObj.isShowNext;
}

// 男童生长发育检测图 || 女童生长发育监测图
if (paramObj["doc_type"] == 170 || paramObj["doc_type"] == 160) {
  let template = "../../src/web/template/" + common.settings[paramObj.doc_type] + ".template";
  common.render(template, {});
} else {
  let src_type = "HECadre APP";
  if (paramObj['src_type'] == 'DOCTOR') {
    src_type = 'Web Admin';
  }
  Util.fetch({
    url: Util.host + '/hca/web/inhabitant/getdoc',
    demoUrl: "../../assets/rss/" + common.settings[paramObj.doc_type] + ".json",
    data: JSON.stringify({
      "doc_id": paramObj['doc_id'],
      "user_id_doc": paramObj['user_id_doc'],
      "doc_type": paramObj['doc_type'],
      "src_type": src_type, //请求源的类型，如"HECadre APP"、"Inhabitant APP"等
      "pf_type": Util.pf_type, //请求源的终端平台类型，如"Android"、"iOS"、"Web"等
      "user_id": Util.userId || paramObj['user_id'], //用户ID，u64
      "auth_str": Util.getCommunicationAuth() || paramObj['authStr'] //通信认证密文串
    }),
    success: function(data) {
      //            common.hideLoad();
      data = data || {};
      if (data.ret_code === 1) {
        let template = '../../src/web/template/' + common.settings[paramObj.doc_type] + ".template";
        let templateData = data.ret_data;
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
      Util.alert("当前网络不可用，请检查你的网络设置！");
      // console.log(err);
    }
  });
}
