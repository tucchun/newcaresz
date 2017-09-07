import $ from 'jquery';
import doT from 'dot';
import _ from 'lodash';
import Util from '../../assets/js/Util.js';
import '../../assets/css/normalize.css';
import '../../assets/css/flex.css';
import './css/style.css';


let common = {};
let $container = $('#container');
let uri = location.href;
let paramObj = Util.param(uri);
let pattern = 'noused';
// console.log(paramObj);
// 表单字典
common.settings = {
  10: 'residentHealthCover', //健康档案封面
  20: 'personalInformation', //个人基本信息
  30: 'healthChecklist', //健康体检表
  40: 'acceptanceRecordForm', //接诊记录
  50: 'consultationRecord', //会诊记录
  60: 'two-wayTurnOut', //双向转诊(转出)
  70: 'two-wayTurnBack', //双向转诊(回转)
  80: 'residentHealthFileInformationCard', //居民健康档案信息卡
  90: 'prenatalInspectionServiceRecords', //孕妇第1次产前检查服务记录表
  100: 'morePrenatalInspectionServiceRecords', //第2~5次产前随访记录表
  110: 'postpartumVisitRecord', //产后访视记录表
  120: 'postpartumHealthCheklist', //产后42天健康检查记录表
  130: 'newborns', //新生儿家庭访视表
  139: 'childHealthCheckRecords', //1~30月儿童健康检查记录表
  140: 'moreChildHealthCheckRecords', //3~6岁儿童健康检查记录表
  160: 'boyGrowth', //男童生长发育检测图
  170: 'girlGrowth', //女童生长发育监测图
  180: 'vaccinationCard', //预防接种卡
  190: 'childHealthManagementService', //6～18月龄儿童中医药健康管理服务记录表
  200: 'moreChildHealthManagementService', //24～36月龄儿童中医药健康管理服务记录表
  210: 'hypertensivePatients', //高血压患者健康管理服务
  220: 'visitDiabeticPatients', //2型糖尿病患者随访服务记录表
  230: 'tuberculosisPatients', //肺结核患者第一次入户随访记录表
  240: 'moreTuberculosisPatients', //肺结核患者随访服务记录表
  250: 'patientsWithMentalDisorders', //严重精神障碍患者个人信息补
  260: 'visitPatientsWithMentalDisorders', //严重精神障碍患者随访服务记录表
  270: 'coronaryHeartDisease', //冠心病专项档案
  280: 'visitCoronaryHeartDisease', //五华区冠心病人随访表
  290: 'tumorDisease', //五华区肿瘤病例随访表
  300: 'strokeDisease', //脑卒中病例随访表
  420: 'generalFollowUp', //一般随访表
  430: 'maternalBasic', //孕妇基本档案
  //440: 'healthChecklistExt',                     //体检扩展表
  450: 'pregnantWomen', //孕产妇结题
  460: 'archives', //添加历史&院外档案
  500: 'healthAdvice' //健康建议
};


if (Util.demo) {
  paramObj = {
    'doc_id': 1,
    'user_id_doc': 2026,
    'doc_type': 500
  };
}



function norequired($this, $html) {
  // let flag = $this.data('norequired');
  let $list = $this.children();
  let $temp = {};
  if ($this.data('norequireditem')) {
    if (!$.trim($this.children().eq(1).html())) {
      $this.attr(pattern, pattern);
      // $temp.hide();
      $this.remove();
    }
    let $parent_level2 = $html.find('[data-' + $this.data('belong') + ']');
    if ($parent_level2.children(':last').children().size() === 0) {
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


  let $parent_level2 = $html.find('[data-' + $this.data('belong') + ']');
  if ($list.filter(':not([' + pattern + '])').size() <= 0) {
    $parent_level2.attr(pattern, pattern);
    $parent_level2.remove();
  }

  let $parent_level1 = $html.find('[data-' + $parent_level2.data('belong') + ']');
  if ($parent_level1.children(':last').children().size() === 0) {
    $parent_level1.remove();
  }


}

common.render = function(templateUrl, data, tab) {
  return Util.fetch({
    type: 'get',
    url: templateUrl,
    dataType: 'text',
    success: function(response) {
      $.extend(data, { Util: Util, _: _ });
      //let template = doT.template(response);
      /*     for(let item in data){
       if(!data[item]){
       data[item] = '无';
       }
       }*/
      let template = {};
      if (paramObj['doc_type'] == 180) {
        template = _.template(response);
      } else {
        template = doT.template(response);
      }
      let html = template(data);
      // if (tab) {
      //   html = $(html).filter('.js-tab-content');
      //   html.attr('id', 'js-' + data.createDate);
      // }
      let $html = $(html);

      if (paramObj['doc_type'] == 220) {
        let $useMedicationList = $html.find('.js-useMedicationList');
        let $insulin = $useMedicationList.find('[data-flag]');
        $useMedicationList.append($insulin);
      }

      if (paramObj['doc_type'] == 30) {

        $html.find('[data-norequired]').each(function() {
          norequired($(this), $html);
        });
      }

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
          //   let Viewer = result[0];
          // let dom_imagesCnt = $html.find("#js-images-cnt").get(0);
          // new Viewer(dom_imagesCnt, {});
          // });
          require.ensure([], function(require) {
            require('../../node_modules/viewerjs/dist/viewer.min.css');
            var Viewer = require('viewerjs');
            let dom_imagesCnt = $html.find("#js-images-cnt").get(0);
            new Viewer(dom_imagesCnt, {});
          });
        }

      }

      if (paramObj['doc_type'] == 190 || paramObj['doc_type'] == 200) {
        var $tabCnts = $html.find(".js-tab-content"),
          $tabs = $html.find(".js-tab-btn");

        $tabs.on("touchend", function(e) {
          $tabs.removeClass("primary-color").addClass("secondary-color");
          $(this).removeClass("secondary-color").addClass("primary-color");
          var target = $(this).data("target");
          $tabCnts.addClass("hide");
          $html.find("#" + target).removeClass("hide");
        });
      }

      $container.append($html);
    },
    error: function(err, errorType, msg) {
      console.log('网络错误；' + msg);
      Util.alert('网络错误!');
    }
  });
};


// 男童生长发育检测图 || 女童生长发育监测图
if (paramObj["doc_type"] == 170 || paramObj["doc_type"] == 160) {
  let template = "../../src/web/template/" + common.settings[paramObj.doc_type] + ".template";
  common.render(template, {});
} else {
  Util.fetch({
    url: Util.host + '/hca/web/inhabitant/getdoc',
    demoUrl: '../../assets/rss/' + common.settings[paramObj.doc_type] + '.json',
    data: JSON.stringify({
      'doc_id': paramObj['doc_id'],
      'user_id_doc': paramObj['user_id_doc'],
      'doc_type': paramObj['doc_type'],
      'src_type': 'HECadre', //请求源的类型，如'HECadre APP'、'Inhabitant APP'等
      'pf_type': Util.pf_type, //请求源的终端平台类型，如'Android'、'iOS'、'Web'等
      'user_id': Util.userId || paramObj['user_id'], //用户ID，u64
      'auth_str': Util.getCommunicationAuth() || paramObj['authStr'] //通信认证密文串
    }),
    success: function(data) {
      //            common.hideLoad();
      data = data || {};
      if (data.ret_code === 1) {
        let template = '../../src/app/template/' + common.settings[paramObj.doc_type] + '.template';
        let templateData = data.ret_data;
        /*          if (templateData.imageUrlList && templateData.imageUrlList.length > 0) {
                    template = './template/videoMaterial.template';
                  }*/
        if (paramObj['doc_type'] == 139) {
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
        if (paramObj['doc_type'] == 140) {
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
        Util.alert(data.ret_msg || '查询信息错误！');
      }
    },
    error: function(err) {
      Util.alert('网络错误！');
      console.log(err);
    }
  });
}