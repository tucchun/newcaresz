webpackJsonp([2],{"3T0E":function(e,t,i){var n=i("tucq");"string"==typeof n&&(n=[[e.i,n,""]]);var o={};o.transform=void 0;i("MTIv")(n,o);n.locals&&(e.exports=n.locals)},"6ppN":function(e,t,i){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function norequired(e,t){var i=e.children(),n={};if(e.data("norequireditem")){o["default"].trim(e.children().eq(1).html())||(e.attr(h,h),e.remove());var r=t.find("[data-"+e.data("belong")+"]");0===r.children(":last").children().size()&&r.remove()}else i.each(function(){n=(0,o["default"])(this),o["default"].trim(n.children().eq(1).html())||(n.attr(h,h),n.remove())});var a=t.find("[data-"+e.data("belong")+"]");i.filter(":not(["+h+"])").size()<=0&&(a.attr(h,h),a.remove());var l=t.find("[data-"+a.data("belong")+"]");0===l.children(":last").children().size()&&l.remove()}var n=i("7t+N"),o=_interopRequireDefault(n),r=i("/xYi"),a=_interopRequireDefault(r),l=i("M4fF"),s=_interopRequireDefault(l),d=i("IinW"),c=_interopRequireDefault(d),f=i("v35j"),u=_interopRequireDefault(f);i("/x3v"),i("YK/q"),i("VkC+"),i("3T0E");var p={},g=(0,o["default"])("#container"),m=location.href,b=u["default"].param(m),h="noused";if(p.settings={10:"residentHealthCover",20:"personalInformation",30:"healthChecklist",40:"acceptanceRecordForm",50:"consultationRecord",60:"two-wayTurnOut",70:"two-wayTurnBack",80:"residentHealthFileInformationCard",90:"prenatalInspectionServiceRecords",100:"morePrenatalInspectionServiceRecords",110:"postpartumVisitRecord",120:"postpartumHealthCheklist",130:"newborns",139:"childHealthCheckRecords",140:"moreChildHealthCheckRecords",160:"boyGrowth",170:"girlGrowth",180:"vaccinationCard",190:"childHealthManagementService",200:"moreChildHealthManagementService",210:"hypertensivePatients",220:"visitDiabeticPatients",230:"tuberculosisPatients",240:"moreTuberculosisPatients",250:"patientsWithMentalDisorders",260:"visitPatientsWithMentalDisorders",270:"coronaryHeartDisease",280:"visitCoronaryHeartDisease",290:"tumorDisease",300:"strokeDisease",420:"generalFollowUp",430:"maternalBasic",450:"pregnantWomen",460:"archives",500:"healthAdvice"},u["default"].demo&&(b={doc_id:1,user_id_doc:2026,doc_type:10}),p.render=function(e,t,i){return u["default"].fetch({type:"get",url:e,dataType:"text",success:function(e){o["default"].extend(t,{Util:u["default"],_:s["default"]});var i={};i=180==b.doc_type?s["default"].template(e):a["default"].template(e);var n=i(t),r=(0,o["default"])(n);if(220==b.doc_type){var l=r.find(".js-useMedicationList"),d=l.find("[data-flag]");l.append(d)}if(30==b.doc_type&&r.find("[data-norequired]").each(function(){norequired((0,o["default"])(this),r)}),450==b.doc_type||460==b.doc_type||40==b.doc_type||50==b.doc_type||60==b.doc_type||70==b.doc_type){var f=r.find(".js-img");if(f.each(function(){this.width>this.height?(this.style.width="auto",this.style.height="100%"):(this.style.width="100%",this.style.height="auto")}),window.jsObj.showGalleryImages){var p=[];f.each(function(){p.push(this.getAttribute("src"))}),f.on("click",function(){var e=f.index(this);console.log("图片索引："+e),window.jsObj.showGalleryImagesWithIndex(p,e)})}else{var m=r.find("#js-images-cnt").get(0);new c["default"](m,{})}}if(190==b.doc_type||200==b.doc_type){var h=r.find(".js-tab-content"),x=r.find(".js-tab-btn");x.on("touchend",function(e){x.removeClass("primary-color").addClass("secondary-color"),(0,o["default"])(this).removeClass("secondary-color").addClass("primary-color");var t=(0,o["default"])(this).data("target");h.addClass("hide"),r.find("#"+t).removeClass("hide")})}g.append(r)},error:function(e,t,i){console.log("网络错误；"+i),u["default"].alert("网络错误!")}})},170==b.doc_type||160==b.doc_type){var x="../../src/web/template/"+p.settings[b.doc_type]+".template";p.render(x,{})}else u["default"].fetch({url:u["default"].host+"/hca/web/inhabitant/getdoc",demoUrl:"../../assets/rss/"+p.settings[b.doc_type]+".json",data:JSON.stringify({doc_id:b.doc_id,user_id_doc:b.user_id_doc,doc_type:b.doc_type,src_type:"Inhabitant APP",pf_type:u["default"].pf_type,user_id:u["default"].userId||b.user_id,auth_str:u["default"].getCommunicationAuth()||b.authStr}),success:function(e){if(e=e||{},1===e.ret_code){var t="../../src/app/template/"+p.settings[b.doc_type]+".template",i=e.ret_data;if(139==b.doc_type)switch(i.onemMonth){case 1:i.onemMonth=1;break;case 2:i.onemMonth=3;break;case 3:i.onemMonth=6;break;case 4:i.onemMonth=8;break;case 5:i.onemMonth=12;break;case 6:i.onemMonth=18;break;case 7:i.onemMonth=24;break;case 8:i.onemMonth=30}if(140==b.doc_type)switch(i.visitAge){case 1:i.visitAge=3;break;case 2:i.visitAge=4;break;case 3:i.visitAge=5;break;case 4:i.visitAge=6}p.render(t,i)}else u["default"].alert(e.ret_msg||"查询信息错误！")},error:function(e){u["default"].alert("网络错误！"),console.log(e)}})},"VkC+":function(e,t,i){var n=i("rDCj");"string"==typeof n&&(n=[[e.i,n,""]]);var o={};o.transform=void 0;i("MTIv")(n,o);n.locals&&(e.exports=n.locals)},rDCj:function(e,t,i){t=e.exports=i("FZ+f")(undefined),t.push([e.i,".flex{display:-webkit-box!important;display:-ms-flexbox!important;display:flex!important;-ms-flex-wrap:wrap;flex-wrap:wrap}.flex,.flex *,.flex :after,.flex :before{-webkit-box-sizing:border-box;box-sizing:border-box}.flex.vertical{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.flex.vertical.reverse{-webkit-box-orient:vertical;-webkit-box-direction:reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse}.flex.vertical .cell{width:auto}.flex.vertical>.cell>.inner{position:absolute;width:100%;height:100%}.flex.horizental{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.flex.reverse{-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse}.flex.justify-start{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.flex.justify-end{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.flex.justify-center{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.flex.justify-between{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.flex.justify-around{-ms-flex-pack:distribute;justify-content:space-around}.flex.align-start{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.flex.align-end{-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end}.flex.align-center{-webkit-box-align:center;-ms-flex-align:center;align-items:center}.flex.align-stretch{-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch}.flex.align-stretch .cell{height:auto!important}.flex.center{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.flex>.cell{-webkit-box-flex:1;-ms-flex:1;flex:1;width:0;-ms-flex-preferred-size:0;flex-basis:0;max-width:100%;display:block;padding:0!important;position:relative}.flex>.cell.fixed{-webkit-box-flex:0!important;-ms-flex:none!important;flex:none!important;width:auto}.flex>.cell.align-start{-webkit-align-self:flex-start;-ms-flex-item-align:start;align-self:flex-start}.flex>.cell.align-end{-webkit-align-self:flex-end;-ms-flex-item-align:end;align-self:flex-end}.flex>.cell.align-center{-webkit-align-self:center;-ms-flex-item-align:center;align-self:center}.flex>.cell.align-stretch{-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;height:auto!important}",""])},tucq:function(e,t,i){t=e.exports=i("FZ+f")(undefined),t.push([e.i,'*,:after,:before{-webkit-box-sizing:border-box;box-sizing:border-box}li,ul{list-style:none}textarea{resize:none}.clearfix:after,.clearfix:before{display:table;content:" "}.clearfix:after{clear:both}.center-block{display:block;margin-right:auto;margin-left:auto}.pull-right{float:right!important}.pull-left{float:left!important}.hide{display:none!important}.show{display:block!important}.invisible{visibility:hidden}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.text-hide{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0}.hidden{display:none!important}.affix{position:fixed}.list,.list-inline{padding:0;margin:0}.list{padding-top:4px;padding-top:.25rem}.list>li{padding-top:3.2px;padding-top:.2rem;color:#333}.list>li:first-child{padding-top:0}.list-inline>li{float:left;padding:2.72px 6.24px;padding:.17rem .39rem;margin:0 4px 0 0;margin:0 .25rem 0 0;color:#fff}.list-inline>li:last-child{margin-right:0}.importantColor{color:#3fb5ea}.bgColor{background-color:#ededed!important}.bgWhite{background-color:#fff!important}.primary-color{background-color:#00a0e9!important}.secondary-color{background-color:#c3c3c3!important}.tertiary-color{background-color:#e1e1e1!important}.border-right{border-right:1px solid #e5e5e5}.border-bottom{border-bottom:1px solid #e5e5e5}.border-bottom-none{border-bottom:none!important}.w230{width:36.8px;width:2.3rem}.w60{width:9.6px;width:.6rem}.w100{width:16px;width:1rem}.mt8{margin-top:1.28px;margin-top:.08rem}.mt20{margin-top:3.2px;margin-top:.2rem}.pt5{padding-top:.8px!important;padding-top:.05rem!important}.pt30{padding-top:4.8px!important;padding-top:.3rem!important}body{color:#333;margin:0 auto}body,body *{max-width:120px;max-width:7.5rem}.container{-webkit-box-flex:1;-ms-flex:1;flex:1}.container>.item:last-child{border-bottom:none}.item{padding:0 4.8px 4px;padding:0 .3rem .25rem;background-color:#fff;border-bottom:1px solid #e5e5e5}.item>div{padding-top:4px;padding-top:.25rem;word-wrap:break-word;word-break:break-all}.cntColor,.item>div:last-child{color:#333}.item>div:first-child{color:#666}.item.list-inline>li{margin-top:4px;margin-top:.25rem}.title{padding:0 0 .8px;padding:0 0 .05rem;margin:0;font-size:4.48px;font-size:.28rem;font-weight:100;color:#666}.auto{padding:4px 0 0 4.8px;padding:.25rem 0 0 .3rem;margin:0}.sub-title{color:#999}.unit{padding:0 .8px;padding:0 .05rem}.txt{word-break:break-all}.fill{width:100%}.about_us{background:#f4f4f4;padding:3.84px;padding:.24rem}.about_us>div{background:#fff;border:1px solid #e5e5e5;padding:3.2px;padding:.2rem}.about_us .app_icon img{width:65.6px;width:4.1rem;height:33.6px;height:2.1rem}.about_us p{text-indent:8.32px;text-indent:.52rem;font-size:4.16px;font-size:.26rem;color:#333}.images>div{width:20.992px;width:1.312rem;height:20.992px;height:1.312rem;overflow:hidden;display:inline-block;margin-right:.01px;background-color:#ccc;text-align:center}.images>div img{width:100%}',""])},v35j:function(e,t,i){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=i("7t+N"),o=_interopRequireDefault(n),r=i("zHze"),a=_interopRequireDefault(r),l=i("/xYi"),s=_interopRequireDefault(l);window.console||(window.console={}),"function"!=typeof window.console.log&&(window.console.log=function(e){}),console.log=function(e){return function(){e.apply(console,arguments)}}(window.console.log),window.onerror=function(e,t,i){try{throw new Error("[msg:"+e+",url:"+t+",line:"+i+"]")}catch(n){console.log("页面JS错误\n"+n.stack)}return!1};var d={};d.demo=!1,(location.href.indexOf("admin.newcaresz.com")>0||location.href.indexOf("192.168.1.232")>0||location.href.indexOf("test.newcaresz.com")>0)&&(d.demo=!1),d.param=function(e){e=e||"";var t=e.substring(e.indexOf("?")+1),i=t.split("&"),n={},o=[];return i.forEach(function(e){o=e.split("="),n[o[0]]=o[1]}),n};var c=d.param(location.href).from_host;d.param(location.href).src_type;try{window.jsObj||(window.jsObj={});for(var f in window.jsObj)console.log(f);d.host=function(){return window.jsObj.getHost?window.jsObj.getHost():""}(),d.browser={versions:function(){var e=navigator.userAgent;navigator.appVersion;return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&-1==e.indexOf("KHTML"),mobile:!!e.match(/AppleWebKit.*Mobile.*/),ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1||e.indexOf("Adr")>-1,iPhone:e.indexOf("iPhone")>-1,iPad:e.indexOf("iPad")>-1,webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,qq:" qq"==e.match(/\sQQ/i)}}(),language:(navigator.browserLanguage||navigator.language).toLowerCase()},d.pf_type=function(){return d.browser.versions.ios?"iOS":d.browser.versions.android?"Android":"Web"}(),console.log("浏览器环境："+d.pf_type),d.load=function(e){return window.jsObj.loading?window.jsObj.loading(e):console.log("load...",e)},d.hideLoad=function(){return window.jsObj.loadingFinish?window.jsObj.loadingFinish():console.log("hideLoad")},d.result=function(){return window.jsObj.result?window.jsObj.result():console.log("result")},d.finish=function(){return window.jsObj.finish?window.jsObj.finish():console.log("finish")},d.showGalleryImages=function(e){return window.jsObj.showGalleryImages?window.jsObj.showGalleryImages(e):console.log("showGalleryImages")},d.alert=function(e){return window.jsObj.toast?window.jsObj.toast(e):alert(e)},d.upload=function(e,t){return e=e||{},window.jsObj.pickAndUploadPicWithoutAuth&&2==t?window.jsObj.pickAndUploadPicWithoutAuth(e.maxsize||1,e.success,e.error):window.jsObj.pickAndUploadPic?window.jsObj.pickAndUploadPic(e.maxsize||1,e.success,e.error):window[e.success]("")},d.getPicUrl=function(e){return console.log("getPicUrl:"+e),window.jsObj.getPicUrl?window.jsObj.getPicUrl(e):c?c+"/hca/api/business/getfile/"+encodeURI(a["default"].util.encode64(e)):d.demo?"../../src/app/image/boy.png":""},d.getLoginUserId=function(){return window.jsObj.getLoginUserId?window.jsObj.getLoginUserId():""},d.onNext=function(){return window.jsObj.onNext?window.jsObj.onNext():console.log("onNext")},d.getScrType=function(){return window.jsObj.getSrcTypeStr?window.jsObj.getSrcTypeStr():"Web"},d.getCommunicationAuth=function(){return window.jsObj.getCorrespondAuthStr?window.jsObj.getCorrespondAuthStr():""},d.userId=d.getLoginUserId()}catch(u){console.log(u.message)}d.formatDate=function(e){if(!e)return"";var t=new Date(e),i=[];return i.push(t.getFullYear()),i.push(t.getMonth()+1),i.push(t.getDate()),i.join("-")},d.cvt=function(e){var t="";switch(e){case 0:t="零";break;case 1:t="一";break;case 2:t="二";break;case 3:t="三";break;case 4:t="四";break;case 5:t="五";break;case 6:t="六";break;case 7:t="七";break;case 8:t="八";break;case 9:t="九";break;default:t="零"}return t},d._param={},d.data=function(e,t,i){return i=i||d._param,t&&(i[e]=t),i[e]},d.defaultValue=function(){return"无"},d.value=function(e){return e||"无"},d.convertMoney=function(e){return(e/100).toFixed(2)},d.ajaxSettings={type:"POST",contentType:"application/json; charset=utf-8",dataType:"json",cache:!1},d.param=function(e){e=e||"";var t=e.substring(e.indexOf("?")+1),i=t.split("&"),n={},o=[];return i.forEach(function(e){o=e.split("="),n[o[0]]=o[1]}),n},d.render=function(e,t,i,n){var o=s["default"].template(e.text());n?t.append(o(i)):t.html(o(i))},d.getUrlParam=function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),i=window.location.search.substr(1).match(t);return null!=i?unescape(i[2]):null},d.fetch=function(e){var t=o["default"].extend({},d.ajaxSettings,e,{success:function(){},error:function(){}}),i={};return t.url.indexOf("?")>0?t.url+="&ver="+ +new Date:t.url+="?ver="+ +new Date,console.log("===============请求接口开始===============\n"),console.log("请求接口："+t.url+"\n"),console.log("参数："+t.data+"\n"),d.demo?(i=o["default"].Deferred(),o["default"].ajax({type:"get",url:t.demoUrl||t.url,dataType:t.dataType||"json",success:function(e){i.resolve(e)},error:function(e,t,n){"parsererror"===t&&i.reject(JSON.stringify("json解析失败！")),i.reject(JSON.stringify(n.stack))}})):i=o["default"].ajax(t),i.done(function(e){console.log("响应数据："+JSON.stringify(e)+"\n"),console.log("===============请求接口结束===============\n")}).done(e.success).fail(function(e,t,i){console.log("响应失败："+t+", "+i+"\n"),console.log("===============请求接口结束===============\n")}).fail(e.error),i},t["default"]=d}},["6ppN"]);