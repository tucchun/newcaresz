webpackJsonp([1],{"/c2W":function(e,t,i){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function getModifyCollection(e,t){for(var i=t.find("tr[data-"+e+"]"),n=i.first(),o=n.index(),r=i.last().index(),a=o,l=n;a<r;)l=l.next(),a++,l.is("["+b+"]")||(i=i.add(l));return i}function modifyCol(e){e.each(function(e){var t=o["default"].trim((0,o["default"])(this).children(":last").html());if(!t||0==t)if((0,o["default"])(this).children("[data-norequired]").size()>0){(0,o["default"])(this).children(":last").remove();var i=(0,o["default"])(this).children(":last");i.html(""),i.prop("colspan",parseInt(i.prop("colspan")||0)+1)}else(0,o["default"])(this).hide(),(0,o["default"])(this).attr(b,b)})}function doArrange(e,t){var i=e.filter(":not(["+b+"])");i.eq(0).children(":last").html()||i.size()>=2&&(i.eq(0).children(":last").remove(),i.eq(0).append(i.eq(1).html()),i.eq(1).hide(),i.eq(1).attr(b,b),i=e.filter(":not(["+b+"])"));var n=i.size(),r=i.eq(0);r.children("[data-norequired]").prop("rowspan",n);var a=r.children("[data-norequired]").data("belong"),l=getModifyCollection(a,t);if(1==n&&!o["default"].trim(r.children(":last").html())){for(var s=r.next(),d=l.last().index();d>=s.index();){if(!s.is("["+b+"]")){r.children("[data-norequired]").next().remove(),r.children("[data-norequired]").remove(),r.append(s.html()),s.hide(),s.attr(b,b);break}if(s=s.next(),s.index()<0)break}i=e.filter(":not(["+b+"])"),1!=i.size()||o["default"].trim(i.eq(0).children(":last").html())||(i.eq(0).hide(),i.eq(0).attr(b,b))}i=l.filter(":not(["+b+"])");var c=i.size();l.eq(0).children(":first").prop("rowspan",c||1),1!=c||o["default"].trim(i.eq(0).children(":last").html())||(i.eq(0).hide(),i.eq(0).attr(b,b))}function norequired(e,t){var i=e,n=i.data("norequired"),o=getModifyCollection(n,t);modifyCol(o),doArrange(o,t)}var n=i("7t+N"),o=_interopRequireDefault(n),r=i("/xYi"),a=_interopRequireDefault(r),l=i("M4fF"),s=_interopRequireDefault(l),d=i("IinW"),c=_interopRequireDefault(d),f=i("v35j"),u=_interopRequireDefault(f);i("/x3v"),i("YK/q"),i("VkC+"),i("LIeV");var p={},h=(0,o["default"])("#container"),b="noused",g=location.href,m=u["default"].param(g),w=void 0;if(p.settings={10:"residentHealthCover",20:"personalInformation",30:"healthChecklist",31:"healthChecklist",40:"acceptanceRecordForm",50:"consultationRecord",60:"two-wayTurnOut",70:"two-wayTurnBack",80:"residentHealthFileInformationCard",90:"prenatalInspectionServiceRecords",100:"morePrenatalInspectionServiceRecords",110:"postpartumVisitRecord",120:"postpartumHealthCheklist",130:"newborns",139:"childHealthCheckRecords",140:"moreChildHealthCheckRecords",160:"boyGrowth",170:"girlGrowth",180:"vaccinationCard",190:"childHealthManagementService",200:"moreChildHealthManagementService",210:"hypertensivePatients",220:"visitDiabeticPatients",230:"tuberculosisPatients",240:"moreTuberculosisPatients",250:"patientsWithMentalDisorders",260:"visitPatientsWithMentalDisorders",270:"coronaryHeartDisease",280:"visitCoronaryHeartDisease",290:"tumorDisease",300:"strokeDisease",420:"generalFollowUp",430:"maternalBasic",450:"pregnantWomen",460:"archives",500:"healthAdvice"},u["default"].demo&&(m={doc_id:1,isShowNext:"",user_id_doc:2026,doc_type:30}),p.render=function(e,t){return u["default"].fetch({type:"get",url:e,dataType:"text",success:function(e){o["default"].extend(t,{Util:u["default"],_:s["default"]});var i={};i=20==m.doc_type||180==m.doc_type?s["default"].template(e):a["default"].template(e);var n=(0,o["default"])(i(t));if(220==m.doc_type){var r=n.find(".js-useMedicationList"),l=r.filter("[data-flag]"),d={name:l.find(".js-useMedicationList-medDrugName").html(),value:l.find(".js-useMedicationList-medConsumption").html()};l.find(".js-useMedicationList-medDrugName").html(r.last().find(".js-useMedicationList-medDrugName").html()),l.find(".js-useMedicationList-medConsumption").html(r.last().find(".js-useMedicationList-medConsumption").html()),r.last().find(".js-useMedicationList-medDrugName").prev().remove().end().html(d.name).prop("colspan",2),r.last().find(".js-useMedicationList-medConsumption").html(d.value)}if(30==m.doc_type||31==m.doc_type)for(var f=n.find("td[data-norequired]"),p=f.size()-1,g={};p>=0;)g=f.eq(p),g.parent().attr(b)||norequired(g,n),p--;if(450==m.doc_type||460==m.doc_type||40==m.doc_type||50==m.doc_type||60==m.doc_type||70==m.doc_type){var w=n.find(".js-img");if(w.each(function(){this.width>this.height?(this.style.width="auto",this.style.height="100%"):(this.style.width="100%",this.style.height="auto")}),window.jsObj.showGalleryImages){var x=[];w.each(function(){x.push(this.getAttribute("src"))}),w.on("click",function(){var e=w.index(this);console.log("图片索引："+e),window.jsObj.showGalleryImagesWithIndex(x,e)})}else{var j=n.find("#js-images-cnt").get(0);new c["default"](j,{})}}10==m.doc_type&&n.find("#js-residentHealthCover-next").on("touchend",function(e){console.log("居民健康档案onNext"),u["default"].onNext()}),h.append(n)},error:function(e,t,i){u["default"].alert("当前网络不可用，请检查你的网络设置！")}})},m.isShowNext&&(w=m.isShowNext),170==m.doc_type||160==m.doc_type){var x="../../src/web/template/"+p.settings[m.doc_type]+".template";p.render(x,{})}else{var j="HECadre APP";"DOCTOR"==m.src_type&&(j="Web Admin"),u["default"].fetch({url:u["default"].host+"/hca/web/inhabitant/getdoc",demoUrl:"../../assets/rss/"+p.settings[m.doc_type]+".json",data:JSON.stringify({doc_id:m.doc_id,user_id_doc:m.user_id_doc,doc_type:m.doc_type,src_type:j,pf_type:u["default"].pf_type,user_id:u["default"].userId||m.user_id,auth_str:u["default"].getCommunicationAuth()||m.authStr}),success:function(e){if(e=e||{},1===e.ret_code){var t="../../src/web/template/"+p.settings[m.doc_type]+".template",i=e.ret_data;if(w&&(i.isShowNext=w),i.__doc_type__=m.doc_type,139==m.doc_type)switch(i.onemMonth){case 1:i.onemMonth=1;break;case 2:i.onemMonth=3;break;case 3:i.onemMonth=6;break;case 4:i.onemMonth=8;break;case 5:i.onemMonth=12;break;case 6:i.onemMonth=18;break;case 7:i.onemMonth=24;break;case 8:i.onemMonth=30}if(140==m.doc_type)switch(i.visitAge){case 1:i.visitAge=3;break;case 2:i.visitAge=4;break;case 3:i.visitAge=5;break;case 4:i.visitAge=6}p.render(t,i)}else u["default"].alert(e.ret_msg||"查询信息错误！")},error:function(e){u["default"].alert("当前网络不可用，请检查你的网络设置！")}})}},D0S1:function(e,t,i){t=e.exports=i("FZ+f")(undefined),t.push([e.i,'*,:after,:before{-webkit-box-sizing:border-box;box-sizing:border-box}li,ul{list-style:none}textarea{resize:none}body{color:#1a1a1a;font-family:Microsoft YaHei;font-size:16px;background-color:#fafafa;padding:20px}.clearfix:after,.clearfix:before{display:table;content:" "}.clearfix:after{clear:both}.center-block{display:block;margin-right:auto;margin-left:auto}.pull-right{float:right!important}.pull-left{float:left!important}.hide{display:none!important}.show{display:block!important}.invisible{visibility:hidden}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.text-hide{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0}.hidden{display:none!important}.tb{border-collapse:collapse}.tb td,.tb th{line-height:32px}.tb td{padding:12px}.tb th{padding:7px 12px}.tb-auto{width:100%}.tb-border{border:1px solid #e5e5e5}.tb-border>tbody>tr>td,.tb-border>thead>tr>th{border-right:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;background-color:#fff;word-wrap:break-word;word-break:break-all}.tb-border>tbody>tr:last-child>td{border-left:none;border-bottom:none}.label{color:#666}.bgColor{background-color:#f7f7f7!important}.border-bottom{border-bottom:1px solid #e5e5e5}.border-top-none{border-top:none}.w200{width:168px!important}.w80,.w200{overflow:hidden}.w80{width:67.2px}.w115{width:89px!important}.w115,.w630{overflow:hidden}.w630{width:250px}.w315{width:252px;overflow:hidden}.h27{height:27px!important}.mt20{margin-top:20px!important}.sub-tb{padding:0!important}.sub-tb table{border-left:0;border-bottom:0}.sub-tb table,.sub-tb table tr td:last-child{border-right:0}.container{width:860px;margin:0 auto}.sub-title{color:#666;font-weight:100}.sub-title,.tb-border>tbody>tr>td.sub-title,.tb-border>thead>tr>th.sub-title{background-color:#ededed}.text-center{padding-right:0}.text-center,.text-right{padding-left:0}.images-cnt{margin-right:-20px}.images-cnt>div{float:left;width:195px;height:195px;margin-right:20px;text-align:center;overflow:hidden}.images-cnt>div img{width:100%;vertical-align:middle}.updates{background:#fff}.updates .content{max-width:550px;margin:0 auto;text-align:center;font-size:16px}',""])},LIeV:function(e,t,i){var n=i("D0S1");"string"==typeof n&&(n=[[e.i,n,""]]);var o={};o.transform=void 0;i("MTIv")(n,o);n.locals&&(e.exports=n.locals)},"VkC+":function(e,t,i){var n=i("rDCj");"string"==typeof n&&(n=[[e.i,n,""]]);var o={};o.transform=void 0;i("MTIv")(n,o);n.locals&&(e.exports=n.locals)},rDCj:function(e,t,i){t=e.exports=i("FZ+f")(undefined),t.push([e.i,".flex{display:-webkit-box!important;display:-ms-flexbox!important;display:flex!important;-ms-flex-wrap:wrap;flex-wrap:wrap}.flex,.flex *,.flex :after,.flex :before{-webkit-box-sizing:border-box;box-sizing:border-box}.flex.vertical{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.flex.vertical.reverse{-webkit-box-orient:vertical;-webkit-box-direction:reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse}.flex.vertical .cell{width:auto}.flex.vertical>.cell>.inner{position:absolute;width:100%;height:100%}.flex.horizental{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.flex.reverse{-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse}.flex.justify-start{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.flex.justify-end{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.flex.justify-center{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.flex.justify-between{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.flex.justify-around{-ms-flex-pack:distribute;justify-content:space-around}.flex.align-start{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.flex.align-end{-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end}.flex.align-center{-webkit-box-align:center;-ms-flex-align:center;align-items:center}.flex.align-stretch{-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch}.flex.align-stretch .cell{height:auto!important}.flex.center{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.flex>.cell{-webkit-box-flex:1;-ms-flex:1;flex:1;width:0;-ms-flex-preferred-size:0;flex-basis:0;max-width:100%;display:block;padding:0!important;position:relative}.flex>.cell.fixed{-webkit-box-flex:0!important;-ms-flex:none!important;flex:none!important;width:auto}.flex>.cell.align-start{-webkit-align-self:flex-start;-ms-flex-item-align:start;align-self:flex-start}.flex>.cell.align-end{-webkit-align-self:flex-end;-ms-flex-item-align:end;align-self:flex-end}.flex>.cell.align-center{-webkit-align-self:center;-ms-flex-item-align:center;align-self:center}.flex>.cell.align-stretch{-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;height:auto!important}",""])},v35j:function(e,t,i){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=i("7t+N"),o=_interopRequireDefault(n),r=i("zHze"),a=_interopRequireDefault(r),l=i("/xYi"),s=_interopRequireDefault(l);i("V2oP"),i("9ayS"),window.console||(window.console={}),"function"!=typeof window.console.log&&(window.console.log=function(){}),window.console.log=function(e){return function(){e.apply(console,arguments)}}(window.console.log),window.onerror=function(e,t,i){try{throw new Error("[msg:"+e+",url:"+t+",line:"+i+"]")}catch(n){console.log("页面JS错误\n"+n.stack)}return!1};var d={};d.demo=!1,(location.href.indexOf("newcaresz.com")>0||location.href.indexOf("192.168.1.232")>0)&&(d.demo=!1),d.param=function(e){e=e||"";var t=e.substring(e.indexOf("?")+1),i=t.split("&"),n={},o=[];return i.forEach(function(e){o=e.split("="),n[o[0]]=o[1]}),n};var c=d.param(location.href).from_host;d.param(location.href).src_type;try{window.jsObj||(window.jsObj={});for(var f in window.jsObj)console.log(f);d.host=function(){return window.jsObj.getHost?window.jsObj.getHost():""}(),d.browser={versions:function(){var e=navigator.userAgent;navigator.appVersion;return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&-1==e.indexOf("KHTML"),mobile:!!e.match(/AppleWebKit.*Mobile.*/),ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1||e.indexOf("Adr")>-1,iPhone:e.indexOf("iPhone")>-1,iPad:e.indexOf("iPad")>-1,webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,qq:" qq"==e.match(/\sQQ/i)}}(),language:(navigator.browserLanguage||navigator.language).toLowerCase()},d.pf_type=function(){return d.browser.versions.ios?"iOS":d.browser.versions.android?"Android":"Web"}(),console.log("浏览器环境："+d.pf_type),d.load=function(e){return window.jsObj.loading?window.jsObj.loading(e):console.log("load...",e)},d.hideLoad=function(){return window.jsObj.loadingFinish?window.jsObj.loadingFinish():console.log("hideLoad")},d.result=function(){return window.jsObj.result?window.jsObj.result():console.log("result")},d.finish=function(){return window.jsObj.finish?window.jsObj.finish():console.log("finish")},d.showGalleryImages=function(e){return window.jsObj.showGalleryImages?window.jsObj.showGalleryImages(e):console.log("showGalleryImages")},d.alert=function(e){return window.jsObj.toast?window.jsObj.toast(e):alert(e)},d.logout=function(e){return window.jsObj.logout?window.jsObj.logout(e):console.log("logout")},d.upload=function(e,t){return e=e||{},window.jsObj.pickAndUploadPicWithoutAuth&&2==t?window.jsObj.pickAndUploadPicWithoutAuth(e.maxsize||1,e.success,e.error):window.jsObj.pickAndUploadPic?window.jsObj.pickAndUploadPic(e.maxsize||1,e.success,e.error):window[e.success]("")},d.getPicUrl=function(e){return console.log("getPicUrl:"+e),window.jsObj.getPicUrl?window.jsObj.getPicUrl(e):c?c+"/hca/api/business/getfile/"+encodeURI(a["default"].util.encode64(e)):d.demo?"../../src/app/image/boy.png":""},d.getLoginUserId=function(){return window.jsObj.getLoginUserId?window.jsObj.getLoginUserId():""},d.onNext=function(){return window.jsObj.onNext?window.jsObj.onNext():console.log("onNext")},d.getScrType=function(){return window.jsObj.getSrcTypeStr?window.jsObj.getSrcTypeStr():"Web"},d.getCommunicationAuth=function(){return window.jsObj.getCorrespondAuthStr?window.jsObj.getCorrespondAuthStr():""},d.userId=d.getLoginUserId()}catch(u){console.log(u.message)}d.formatDate=function(e){if(!e)return"";var t=new Date(e),i=[];return i.push(t.getFullYear()),i.push(t.getMonth()+1),i.push(t.getDate()),i.join("-")},d.cvt=function(e){var t="";switch(e){case 0:t="零";break;case 1:t="一";break;case 2:t="二";break;case 3:t="三";break;case 4:t="四";break;case 5:t="五";break;case 6:t="六";break;case 7:t="七";break;case 8:t="八";break;case 9:t="九";break;default:t="零"}return t},d._param={},d.data=function(e,t,i){return i=i||d._param,t&&(i[e]=t),i[e]},d.defaultValue=function(){return"无"},d.value=function(e){return e||"无"},d.convertMoney=function(e){return(e/100).toFixed(2)},d.ajaxSettings={type:"POST",contentType:"application/json; charset=utf-8",dataType:"json",cache:!1},d.param=function(e){e=e||"";var t=e.substring(e.indexOf("?")+1),i=t.split("&"),n={},o=[];return i.forEach(function(e){o=e.split("="),n[o[0]]=o[1]}),n},d.render=function(e,t,i,n){var o=s["default"].template(e.text());n?t.append(o(i)):t.html(o(i))},d.getUrlParam=function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),i=window.location.search.substr(1).match(t);return null!=i?unescape(i[2]):null},d.fetch=function(e){var t=o["default"].extend({},d.ajaxSettings,e,{success:function(){},error:function(){}}),i={};return t.url.indexOf("?")>0?t.url+="&ver="+ +new Date:t.url+="?ver="+ +new Date,console.log("===============请求接口开始===============\n"),console.log("请求接口："+t.url+"\n"),console.log("参数："+t.data+"\n"),(0,o["default"])(document.body).mLoading({mask:!1}),d.demo?(i=o["default"].Deferred(),o["default"].ajax({type:"get",url:t.demoUrl||t.url,dataType:t.dataType||"json",success:function(e){i.resolve(e)},error:function(e,t,n){"parsererror"===t&&i.reject(JSON.stringify("json解析失败！")),i.reject(JSON.stringify(n.stack))}})):i=o["default"].ajax(t),i.done(function(e){if(console.log("响应数据："+JSON.stringify(e)+"\n"),console.log("===============请求接口结束===============\n"),(0,o["default"])(document.body).mLoading("hide"),e&&2001===e.ret_code)return d.logout(e.ret_code),!1}).done(e.success).fail(function(e,t,i){console.log("响应失败："+t+", "+i+"\n"),console.log("===============请求接口结束===============\n"),(0,o["default"])(document.body).mLoading("hide")}).fail(e.error),i},t["default"]=d}},["/c2W"]);