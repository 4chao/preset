import{a7 as t,a8 as o,I as e,a9 as n,o as i,c as s,w as l,e as p,R as r,X as c,Y as a,W as h,V as d,Z as u,a0 as w,u as f,aa as g,ab as m,ac as y,ad as S,ae as D,af as T,a1 as x,ag as U,ah as v,g as b,n as L,ai as B,aj as H,ak as k,a3 as O,a5 as P}from"./vendor.4bd5975a.js";import{b as C,S as E}from"./index.ddf3cfc9.js";var M=(t,o)=>{const e=t.__vccOpts||t;for(const[n,i]of o)e[n]=i;return e};function N(t,o){let e=this;e.version="1.3.7",e.options=t||{},e.isScrollBody=o||!1,e.isDownScrolling=!1,e.isUpScrolling=!1;let n=e.options.down&&e.options.down.callback;e.initDownScroll(),e.initUpScroll(),setTimeout((function(){(e.optDown.use||e.optDown.native)&&e.optDown.auto&&n&&(e.optDown.autoShowLoading?e.triggerDownScroll():e.optDown.callback&&e.optDown.callback(e)),e.isUpAutoLoad||setTimeout((function(){e.optUp.use&&e.optUp.auto&&!e.isUpAutoLoad&&e.triggerUpScroll()}),100)}),30)}N.prototype.extendDownScroll=function(t){N.extend(t,{use:!0,auto:!0,native:!1,autoShowLoading:!1,isLock:!1,offset:80,startTop:100,inOffsetRate:1,outOffsetRate:.2,bottomOffset:20,minAngle:45,textInOffset:"下拉刷新",textOutOffset:"释放更新",textLoading:"加载中 ...",textSuccess:"加载成功",textErr:"加载失败",beforeEndDelay:0,bgColor:"transparent",textColor:"gray",inited:null,inOffset:null,outOffset:null,onMoving:null,beforeLoading:null,showLoading:null,afterLoading:null,beforeEndDownScroll:null,endDownScroll:null,afterEndDownScroll:null,callback:function(t){t.resetUpScroll()}})},N.prototype.extendUpScroll=function(t){N.extend(t,{use:!0,auto:!0,isLock:!1,isBoth:!0,callback:null,page:{num:0,size:10,time:null},noMoreSize:5,offset:150,textLoading:"加载中 ...",textNoMore:"-- END --",bgColor:"transparent",textColor:"gray",inited:null,showLoading:null,showNoMore:null,hideUpScroll:null,errDistance:60,toTop:{src:null,offset:1e3,duration:300,btnClick:null,onShow:null,zIndex:9990,left:null,right:20,bottom:120,safearea:!1,width:72,radius:"50%"},empty:{use:!0,icon:null,tip:"~ 暂无相关数据 ~",btnText:"",btnClick:null,onShow:null,fixed:!1,top:"100rpx",zIndex:99},onScroll:!1})},N.extend=function(t,o){if(!t)return o;for(let e in o)if(null==t[e]){let n=o[e];t[e]=null!=n&&"object"==typeof n?N.extend({},n):n}else"object"==typeof t[e]&&N.extend(t[e],o[e]);return t},N.prototype.hasColor=function(t){if(!t)return!1;let o=t.toLowerCase();return"#fff"!=o&&"#ffffff"!=o&&"transparent"!=o&&"white"!=o},N.prototype.initDownScroll=function(){let t=this;t.optDown=t.options.down||{},!t.optDown.textColor&&t.hasColor(t.optDown.bgColor)&&(t.optDown.textColor="#fff"),t.extendDownScroll(t.optDown),t.isScrollBody&&t.optDown.native?t.optDown.use=!1:t.optDown.native=!1,t.downHight=0,t.optDown.use&&t.optDown.inited&&setTimeout((function(){t.optDown.inited(t)}),0)},N.prototype.touchstartEvent=function(t){this.optDown.use&&(this.startPoint=this.getPoint(t),this.startTop=this.getScrollTop(),this.startAngle=0,this.lastPoint=this.startPoint,this.maxTouchmoveY=this.getBodyHeight()-this.optDown.bottomOffset,this.inTouchend=!1)},N.prototype.touchmoveEvent=function(t){if(!this.optDown.use)return;let o=this,e=o.getScrollTop(),n=o.getPoint(t);if(n.y-o.startPoint.y>0&&(o.isScrollBody&&e<=0||!o.isScrollBody&&(e<=0||e<=o.optDown.startTop&&e===o.startTop))&&!o.inTouchend&&!o.isDownScrolling&&!o.optDown.isLock&&(!o.isUpScrolling||o.isUpScrolling&&o.optUp.isBoth)){if(o.startAngle||(o.startAngle=o.getAngle(o.lastPoint,n)),o.startAngle<o.optDown.minAngle)return;if(o.maxTouchmoveY>0&&n.y>=o.maxTouchmoveY)return o.inTouchend=!0,void o.touchendEvent();o.preventDefault(t);let e=n.y-o.lastPoint.y;o.downHight<o.optDown.offset?(1!==o.movetype&&(o.movetype=1,o.isDownEndSuccess=null,o.optDown.inOffset&&o.optDown.inOffset(o),o.isMoveDown=!0),o.downHight+=e*o.optDown.inOffsetRate):(2!==o.movetype&&(o.movetype=2,o.optDown.outOffset&&o.optDown.outOffset(o),o.isMoveDown=!0),o.downHight+=e>0?e*o.optDown.outOffsetRate:e),o.downHight=Math.round(o.downHight);let i=o.downHight/o.optDown.offset;o.optDown.onMoving&&o.optDown.onMoving(o,i,o.downHight)}o.lastPoint=n},N.prototype.touchendEvent=function(t){if(this.optDown.use)if(this.isMoveDown)this.downHight>=this.optDown.offset?this.triggerDownScroll():(this.downHight=0,this.endDownScrollCall(this)),this.movetype=0,this.isMoveDown=!1;else if(!this.isScrollBody&&this.getScrollTop()===this.startTop){if(this.getPoint(t).y-this.startPoint.y<0){this.getAngle(this.getPoint(t),this.startPoint)>80&&this.triggerUpScroll(!0)}}},N.prototype.getPoint=function(t){return t?t.touches&&t.touches[0]?{x:t.touches[0].pageX,y:t.touches[0].pageY}:t.changedTouches&&t.changedTouches[0]?{x:t.changedTouches[0].pageX,y:t.changedTouches[0].pageY}:{x:t.clientX,y:t.clientY}:{x:0,y:0}},N.prototype.getAngle=function(t,o){let e=Math.abs(t.x-o.x),n=Math.abs(t.y-o.y),i=Math.sqrt(e*e+n*n),s=0;return 0!==i&&(s=Math.asin(n/i)/Math.PI*180),s},N.prototype.triggerDownScroll=function(){this.optDown.beforeLoading&&this.optDown.beforeLoading(this)||(this.showDownScroll(),!this.optDown.native&&this.optDown.callback&&this.optDown.callback(this))},N.prototype.showDownScroll=function(){this.isDownScrolling=!0,this.optDown.native?(t(),this.showDownLoadingCall(0)):(this.downHight=this.optDown.offset,this.showDownLoadingCall(this.downHight))},N.prototype.showDownLoadingCall=function(t){this.optDown.showLoading&&this.optDown.showLoading(this,t),this.optDown.afterLoading&&this.optDown.afterLoading(this,t)},N.prototype.onPullDownRefresh=function(){this.isDownScrolling=!0,this.showDownLoadingCall(0),this.optDown.callback&&this.optDown.callback(this)},N.prototype.endDownScroll=function(){if(this.optDown.native)return this.isDownScrolling=!1,this.endDownScrollCall(this),void o();let t=this,e=function(){t.downHight=0,t.isDownScrolling=!1,t.endDownScrollCall(t),t.isScrollBody||(t.setScrollHeight(0),t.scrollTo(0,0))},n=0;t.optDown.beforeEndDownScroll&&(n=t.optDown.beforeEndDownScroll(t),null==t.isDownEndSuccess&&(n=0)),"number"==typeof n&&n>0?setTimeout(e,n):e()},N.prototype.endDownScrollCall=function(){this.optDown.endDownScroll&&this.optDown.endDownScroll(this),this.optDown.afterEndDownScroll&&this.optDown.afterEndDownScroll(this)},N.prototype.lockDownScroll=function(t){null==t&&(t=!0),this.optDown.isLock=t},N.prototype.lockUpScroll=function(t){null==t&&(t=!0),this.optUp.isLock=t},N.prototype.initUpScroll=function(){let t=this;t.optUp=t.options.up||{use:!1},!t.optUp.textColor&&t.hasColor(t.optUp.bgColor)&&(t.optUp.textColor="#fff"),t.extendUpScroll(t.optUp),!1!==t.optUp.use&&(t.optUp.hasNext=!0,t.startNum=t.optUp.page.num+1,t.optUp.inited&&setTimeout((function(){t.optUp.inited(t)}),0))},N.prototype.onReachBottom=function(){this.isScrollBody&&!this.isUpScrolling&&!this.optUp.isLock&&this.optUp.hasNext&&this.triggerUpScroll()},N.prototype.onPageScroll=function(t){this.isScrollBody&&(this.setScrollTop(t.scrollTop),t.scrollTop>=this.optUp.toTop.offset?this.showTopBtn():this.hideTopBtn())},N.prototype.scroll=function(t,o){this.setScrollTop(t.scrollTop),this.setScrollHeight(t.scrollHeight),null==this.preScrollY&&(this.preScrollY=0),this.isScrollUp=t.scrollTop-this.preScrollY>0,this.preScrollY=t.scrollTop,this.isScrollUp&&this.triggerUpScroll(!0),t.scrollTop>=this.optUp.toTop.offset?this.showTopBtn():this.hideTopBtn(),this.optUp.onScroll&&o&&o()},N.prototype.triggerUpScroll=function(t){if(!this.isUpScrolling&&this.optUp.use&&this.optUp.callback){if(!0===t){let t=!1;if(!this.optUp.hasNext||this.optUp.isLock||this.isDownScrolling||this.getScrollBottom()<=this.optUp.offset&&(t=!0),!1===t)return}this.showUpScroll(),this.optUp.page.num++,this.isUpAutoLoad=!0,this.num=this.optUp.page.num,this.size=this.optUp.page.size,this.time=this.optUp.page.time,this.optUp.callback(this)}},N.prototype.showUpScroll=function(){this.isUpScrolling=!0,this.optUp.showLoading&&this.optUp.showLoading(this)},N.prototype.showNoMore=function(){this.optUp.hasNext=!1,this.optUp.showNoMore&&this.optUp.showNoMore(this)},N.prototype.hideUpScroll=function(){this.optUp.hideUpScroll&&this.optUp.hideUpScroll(this)},N.prototype.endUpScroll=function(t){null!=t&&(t?this.showNoMore():this.hideUpScroll()),this.isUpScrolling=!1},N.prototype.resetUpScroll=function(t){if(this.optUp&&this.optUp.use){let o=this.optUp.page;this.prePageNum=o.num,this.prePageTime=o.time,o.num=this.startNum,o.time=null,this.isDownScrolling||!1===t||(null==t?(this.removeEmpty(),this.showUpScroll()):this.showDownScroll()),this.isUpAutoLoad=!0,this.num=o.num,this.size=o.size,this.time=o.time,this.optUp.callback&&this.optUp.callback(this)}},N.prototype.setPageNum=function(t){this.optUp.page.num=t-1},N.prototype.setPageSize=function(t){this.optUp.page.size=t},N.prototype.endByPage=function(t,o,e){let n;this.optUp.use&&null!=o&&(n=this.optUp.page.num<o),this.endSuccess(t,n,e)},N.prototype.endBySize=function(t,o,e){let n;if(this.optUp.use&&null!=o){n=(this.optUp.page.num-1)*this.optUp.page.size+t<o}this.endSuccess(t,n,e)},N.prototype.endSuccess=function(t,o,e){let n=this;if(n.isDownScrolling&&(n.isDownEndSuccess=!0,n.endDownScroll()),n.optUp.use){let i;if(null!=t){let s=n.optUp.page.num,l=n.optUp.page.size;if(1===s&&e&&(n.optUp.page.time=e),t<l||!1===o)if(n.optUp.hasNext=!1,0===t&&1===s)i=!1,n.showEmpty();else{i=!((s-1)*l+t<n.optUp.noMoreSize),n.removeEmpty()}else i=!1,n.optUp.hasNext=!0,n.removeEmpty()}n.endUpScroll(i)}},N.prototype.endErr=function(t){if(this.isDownScrolling){this.isDownEndSuccess=!1;let t=this.optUp.page;t&&this.prePageNum&&(t.num=this.prePageNum,t.time=this.prePageTime),this.endDownScroll()}this.isUpScrolling&&(this.optUp.page.num--,this.endUpScroll(!1),this.isScrollBody&&0!==t&&(t||(t=this.optUp.errDistance),this.scrollTo(this.getScrollTop()-t,0)))},N.prototype.showEmpty=function(){this.optUp.empty.use&&this.optUp.empty.onShow&&this.optUp.empty.onShow(!0)},N.prototype.removeEmpty=function(){this.optUp.empty.use&&this.optUp.empty.onShow&&this.optUp.empty.onShow(!1)},N.prototype.showTopBtn=function(){this.topBtnShow||(this.topBtnShow=!0,this.optUp.toTop.onShow&&this.optUp.toTop.onShow(!0))},N.prototype.hideTopBtn=function(){this.topBtnShow&&(this.topBtnShow=!1,this.optUp.toTop.onShow&&this.optUp.toTop.onShow(!1))},N.prototype.getScrollTop=function(){return this.scrollTop||0},N.prototype.setScrollTop=function(t){this.scrollTop=t},N.prototype.scrollTo=function(t,o){this.myScrollTo&&this.myScrollTo(t,o)},N.prototype.resetScrollTo=function(t){this.myScrollTo=t},N.prototype.getScrollBottom=function(){return this.getScrollHeight()-this.getClientHeight()-this.getScrollTop()},N.prototype.getStep=function(t,o,e,n,i){let s=o-t;if(0===n||0===s)return void(e&&e(o));let l=(n=n||300)/(i=i||30),p=s/l,r=0,c=setInterval((function(){r<l-1?(t+=p,e&&e(t,c),r++):(e&&e(o,c),clearInterval(c))}),i)},N.prototype.getClientHeight=function(t){let o=this.clientHeight||0;return 0===o&&!0!==t&&(o=this.getBodyHeight()),o},N.prototype.setClientHeight=function(t){this.clientHeight=t},N.prototype.getScrollHeight=function(){return this.scrollHeight||0},N.prototype.setScrollHeight=function(t){this.scrollHeight=t},N.prototype.getBodyHeight=function(){return this.bodyHeight||0},N.prototype.setBodyHeight=function(t){this.bodyHeight=t},N.prototype.preventDefault=function(t){t&&t.cancelable&&!t.defaultPrevented&&t.preventDefault()};const z={down:{offset:80,native:!1},up:{offset:150,toTop:{src:"https://www.mescroll.com/img/mescroll-totop.png",offset:1e3,right:20,bottom:120,width:72},empty:{use:!0,icon:"https://www.mescroll.com/img/mescroll-empty.png"}},i18n:{zh:{down:{textInOffset:"下拉刷新",textOutOffset:"释放更新",textLoading:"加载中 ...",textSuccess:"加载成功",textErr:"加载失败"},up:{textLoading:"加载中 ...",textNoMore:"-- END --",empty:{tip:"~ 空空如也 ~"}}},en:{down:{textInOffset:"drop down refresh",textOutOffset:"release updates",textLoading:"loading ...",textSuccess:"loaded successfully",textErr:"loading failed"},up:{textLoading:"loading ...",textNoMore:"-- END --",empty:{tip:"~ absolutely empty ~"}}}}},Y={def:"zh",getType(){return e("mescroll-i18n")||this.def},setType(t){n("mescroll-i18n",t)}};var A=M({props:{option:{type:Object,default:()=>({})}},computed:{icon(){if(null!=this.option.icon)return this.option.icon;{let t=Y.getType();return this.option.i18n?this.option.i18n[t].icon:z.i18n[t].up.empty.icon||z.up.empty.icon}},tip(){if(null!=this.option.tip)return this.option.tip;{let t=Y.getType();return this.option.i18n?this.option.i18n[t].tip:z.i18n[t].up.empty.tip||z.up.empty.tip}},btnText(){if(this.option.i18n){let t=Y.getType();return this.option.i18n[t].btnText}return this.option.btnText}},methods:{emptyClick(){this.$emit("emptyclick")}}},[["render",function(t,o,e,n,f,g){const m=u,y=w;return i(),s(y,{class:h(["mescroll-empty",{"empty-fixed":e.option.fixed}]),style:d({"z-index":e.option.zIndex,top:e.option.top})},{default:l((()=>[p(y,null,{default:l((()=>[g.icon?(i(),s(m,{key:0,class:"empty-icon",src:g.icon,mode:"widthFix"},null,8,["src"])):r("v-if",!0)])),_:1}),g.tip?(i(),s(y,{key:0,class:"empty-tip"},{default:l((()=>[c(a(g.tip),1)])),_:1})):r("v-if",!0),g.btnText?(i(),s(y,{key:1,class:"empty-btn",onClick:g.emptyClick},{default:l((()=>[c(a(g.btnText),1)])),_:1},8,["onClick"])):r("v-if",!0)])),_:1},8,["class","style"])}],["__scopeId","data-v-52abc8f8"]]);var R=M({props:{option:Object,value:!1},computed:{mOption(){return this.option||{}},left(){return this.mOption.left?this.addUnit(this.mOption.left):"auto"},right(){return this.mOption.left?"auto":this.addUnit(this.mOption.right)}},methods:{addUnit:t=>t?"number"==typeof t?t+"rpx":t:0,toTopClick(){this.$emit("input",!1),this.$emit("click")}}},[["render",function(t,o,e,n,l,p){const c=u;return p.mOption.src?(i(),s(c,{key:0,class:h(["mescroll-totop",[e.value?"mescroll-totop-in":"mescroll-totop-out",{"mescroll-totop-safearea":p.mOption.safearea}]]),style:d({"z-index":p.mOption.zIndex,left:p.left,right:p.right,bottom:p.addUnit(p.mOption.bottom),width:p.addUnit(p.mOption.width),"border-radius":p.addUnit(p.mOption.radius)}),src:p.mOption.src,mode:"widthFix",onClick:p.toTopClick},null,8,["class","style","src","onClick"])):r("v-if",!0)}],["__scopeId","data-v-2b2af46f"]]);const $={data:()=>({wxsProp:{optDown:{},scrollTop:0,bodyHeight:0,isDownScrolling:!1,isUpScrolling:!1,isScrollBody:!0,isUpBoth:!0,t:0},callProp:{callType:"",t:0}}),methods:{wxsCall(t){"setWxsProp"===t.type?this.wxsProp={optDown:this.mescroll.optDown,scrollTop:this.mescroll.getScrollTop(),bodyHeight:this.mescroll.getBodyHeight(),isDownScrolling:this.mescroll.isDownScrolling,isUpScrolling:this.mescroll.isUpScrolling,isUpBoth:this.mescroll.optUp.isBoth,isScrollBody:this.mescroll.isScrollBody,t:Date.now()}:"setLoadType"===t.type?(this.downLoadType=t.downLoadType,this.$set(this.mescroll,"downLoadType",this.downLoadType),this.$set(this.mescroll,"isDownEndSuccess",null)):"triggerDownScroll"===t.type?this.mescroll.triggerDownScroll():"endDownScroll"===t.type?this.mescroll.endDownScroll():"triggerUpScroll"===t.type&&this.mescroll.triggerUpScroll(!0)}},mounted(){this.mescroll.optDown.afterLoading=()=>{this.callProp={callType:"showLoading",t:Date.now()}},this.mescroll.optDown.afterEndDownScroll=()=>{this.callProp={callType:"endDownScroll",t:Date.now()};let t=300+(this.mescroll.optDown.beforeEndDelay||0);setTimeout((()=>{4!==this.downLoadType&&0!==this.downLoadType||(this.callProp={callType:"clearTransform",t:Date.now()}),this.$set(this.mescroll,"downLoadType",this.downLoadType)}),t)},this.wxsCall({type:"setWxsProp"})}};var _={};function I(t,o){if(_.isMoveDown)_.downHight>=_.optDown.offset?(_.downHight=_.optDown.offset,_.callMethod(o,{type:"triggerDownScroll"})):(_.downHight=0,_.callMethod(o,{type:"endDownScroll"})),_.movetype=0,_.isMoveDown=!1;else if(!_.isScrollBody&&_.getScrollTop()===_.startTop){if(_.getPoint(t).y-_.startPoint.y<0)_.getAngle(_.getPoint(t),_.startPoint)>80&&_.callMethod(o,{type:"triggerUpScroll"})}_.callMethod(o,{type:"setWxsProp"})}_.onMoving=function(t,o,e){t.requestAnimationFrame((function(){t.selectComponent(".mescroll-wxs-content").setStyle({"will-change":"transform",transform:"translateY("+e+"px)",transition:""});var n=t.selectComponent(".mescroll-wxs-progress");n&&n.setStyle({transform:"rotate("+360*o+"deg)"})}))},_.showLoading=function(t){_.downHight=_.optDown.offset,t.requestAnimationFrame((function(){t.selectComponent(".mescroll-wxs-content").setStyle({"will-change":"auto",transform:"translateY("+_.downHight+"px)",transition:"transform 300ms"})}))},_.endDownScroll=function(t){_.downHight=0,_.isDownScrolling=!1,t.requestAnimationFrame((function(){t.selectComponent(".mescroll-wxs-content").setStyle({"will-change":"auto",transform:"translateY(0)",transition:"transform 300ms"})}))},_.clearTransform=function(t){t.requestAnimationFrame((function(){t.selectComponent(".mescroll-wxs-content").setStyle({"will-change":"",transform:"",transition:""})}))},_.disabled=function(){return!_.optDown||!_.optDown.use||_.optDown.native},_.getPoint=function(t){return t?t.touches&&t.touches[0]?{x:t.touches[0].pageX,y:t.touches[0].pageY}:t.changedTouches&&t.changedTouches[0]?{x:t.changedTouches[0].pageX,y:t.changedTouches[0].pageY}:{x:t.clientX,y:t.clientY}:{x:0,y:0}},_.getAngle=function(t,o){var e=Math.abs(t.x-o.x),n=Math.abs(t.y-o.y),i=Math.sqrt(e*e+n*n),s=0;return 0!==i&&(s=Math.asin(n/i)/Math.PI*180),s},_.getScrollTop=function(){return _.scrollTop||0},_.getBodyHeight=function(){return _.bodyHeight||0},_.callMethod=function(t,o){t&&t.callMethod("wxsCall",o)};const j={propObserver:function(t){t&&(_.optDown=t.optDown,_.scrollTop=t.scrollTop,_.bodyHeight=t.bodyHeight,_.isDownScrolling=t.isDownScrolling,_.isUpScrolling=t.isUpScrolling,_.isUpBoth=t.isUpBoth,_.isScrollBody=t.isScrollBody,_.startTop=t.scrollTop)},callObserver:function(t,o,e){_.disabled()||t.callType&&("showLoading"===t.callType?_.showLoading(e):"endDownScroll"===t.callType?_.endDownScroll(e):"clearTransform"===t.callType&&_.clearTransform(e))},touchstartEvent:function(t,o){_.downHight=0,_.startPoint=_.getPoint(t),_.startTop=_.getScrollTop(),_.startAngle=0,_.lastPoint=_.startPoint,_.maxTouchmoveY=_.getBodyHeight()-_.optDown.bottomOffset,_.inTouchend=!1,_.callMethod(o,{type:"setWxsProp"})},touchmoveEvent:function(t,o){var e=!0;if(_.disabled())return e;var n=_.getScrollTop(),i=_.getPoint(t);if(i.y-_.startPoint.y>0&&(_.isScrollBody&&n<=0||!_.isScrollBody&&(n<=0||n<=_.optDown.startTop&&n===_.startTop))&&!_.inTouchend&&!_.isDownScrolling&&!_.optDown.isLock&&(!_.isUpScrolling||_.isUpScrolling&&_.isUpBoth)){if(_.startAngle||(_.startAngle=_.getAngle(_.lastPoint,i)),_.startAngle<_.optDown.minAngle)return e;if(_.maxTouchmoveY>0&&i.y>=_.maxTouchmoveY)return _.inTouchend=!0,I(t,o),e;e=!1;var s=i.y-_.lastPoint.y;_.downHight<_.optDown.offset?(1!==_.movetype&&(_.movetype=1,_.callMethod(o,{type:"setLoadType",downLoadType:1}),_.isMoveDown=!0),_.downHight+=s*_.optDown.inOffsetRate):(2!==_.movetype&&(_.movetype=2,_.callMethod(o,{type:"setLoadType",downLoadType:2}),_.isMoveDown=!0),_.downHight+=s>0?s*_.optDown.outOffsetRate:s),_.downHight=Math.round(_.downHight);var l=_.downHight/_.optDown.offset;_.onMoving(o,l,_.downHight)}return _.lastPoint=i,e},touchendEvent:I};var X=t=>{t.$wxs||(t.$wxs=[]),t.$wxs.push("wxsBiz"),t.mixins||(t.mixins=[]),t.mixins.push({beforeCreate(){this.wxsBiz=j}})},q={};function F(t){q.optDown=t.optDown,q.scrollTop=t.scrollTop,q.isDownScrolling=t.isDownScrolling,q.isUpScrolling=t.isUpScrolling,q.isUpBoth=t.isUpBoth}window&&!window.$mescrollRenderInit&&(window.$mescrollRenderInit=!0,window.addEventListener("touchstart",(function(t){q.disabled()||(q.startPoint=q.getPoint(t))}),{passive:!0}),window.addEventListener("touchmove",(function(t){if(!q.disabled()&&(!(q.getScrollTop()>0)&&q.getPoint(t).y-q.startPoint.y>0&&!q.isDownScrolling&&!q.optDown.isLock&&(!q.isUpScrolling||q.isUpScrolling&&q.isUpBoth))){for(var o=t.target,e=!1;o&&o.tagName&&"UNI-PAGE-BODY"!==o.tagName&&"BODY"!=o.tagName;){var n=o.classList;if(n&&n.contains("mescroll-render-touch")){e=!0;break}o=o.parentNode}e&&t.cancelable&&!t.defaultPrevented&&t.preventDefault()}}),{passive:!1})),q.getScrollTop=function(){return q.scrollTop||0},q.disabled=function(){return!q.optDown||!q.optDown.use||q.optDown.native},q.getPoint=function(t){return t?t.touches&&t.touches[0]?{x:t.touches[0].pageX,y:t.touches[0].pageY}:t.changedTouches&&t.changedTouches[0]?{x:t.changedTouches[0].pageX,y:t.changedTouches[0].pageY}:{x:t.clientX,y:t.clientY}:{x:0,y:0}};const W={mixins:[{data:()=>({propObserver:F})}]};var V=t=>{t.$renderjs||(t.$renderjs=[]),t.$renderjs.push("renderBiz"),t.mixins||(t.mixins=[]),t.mixins.push({beforeCreate(){this.renderBiz=this},mounted(){this.$ownerInstance=this.$gcd(this,!0)}}),t.mixins.push(W)};const G={name:"mescroll-body",mixins:[$],components:{MescrollEmpty:A,MescrollTop:R},props:{down:Object,up:Object,i18n:Object,top:[String,Number],topbar:[Boolean,String],bottom:[String,Number],safearea:Boolean,height:[String,Number],bottombar:{type:Boolean,default:!0},sticky:Boolean},data:()=>({mescroll:{optDown:{},optUp:{}},downHight:0,downRate:0,downLoadType:0,upLoadType:0,isShowEmpty:!1,isShowToTop:!1,windowHeight:0,windowBottom:0,statusBarHeight:0}),computed:{minHeight(){return this.toPx(this.height||"100%")+"px"},numTop(){return this.toPx(this.top)},padTop(){return this.numTop+"px"},numBottom(){return this.toPx(this.bottom)},padBottom(){return this.numBottom+"px"},isDownReset(){return 3===this.downLoadType||4===this.downLoadType},transition(){return this.isDownReset?"transform 300ms":""},translateY(){return this.downHight>0?"translateY("+this.downHight+"px)":""},isDownLoading(){return 3===this.downLoadType},downRotate(){return"rotate("+360*this.downRate+"deg)"},downText(){if(!this.mescroll)return"";switch(this.downLoadType){case 1:default:return this.mescroll.optDown.textInOffset;case 2:return this.mescroll.optDown.textOutOffset;case 3:return this.mescroll.optDown.textLoading;case 4:return this.mescroll.isDownEndSuccess?this.mescroll.optDown.textSuccess:0==this.mescroll.isDownEndSuccess?this.mescroll.optDown.textErr:this.mescroll.optDown.textInOffset}}},methods:{toPx(t){if("string"==typeof t)if(-1!==t.indexOf("px"))if(-1!==t.indexOf("rpx"))t=t.replace("rpx","");else{if(-1===t.indexOf("upx"))return Number(t.replace("px",""));t=t.replace("upx","")}else if(-1!==t.indexOf("%")){let o=Number(t.replace("%",""))/100;return this.windowHeight*o}return t?f(Number(t)):0},emptyClick(){this.$emit("emptyclick",this.mescroll)},toTopClick(){this.mescroll.scrollTo(0,this.mescroll.optUp.toTop.duration),this.$emit("topclick",this.mescroll)}},created(){let t=this,o={down:{inOffset(){t.downLoadType=1},outOffset(){t.downLoadType=2},onMoving(o,e,n){t.downHight=n,t.downRate=e},showLoading(o,e){t.downLoadType=3,t.downHight=e},beforeEndDownScroll:o=>(t.downLoadType=4,o.optDown.beforeEndDelay),endDownScroll(){t.downLoadType=4,t.downHight=0,t.downResetTimer&&(clearTimeout(t.downResetTimer),t.downResetTimer=null),t.downResetTimer=setTimeout((()=>{4===t.downLoadType&&(t.downLoadType=0)}),300)},callback:function(o){t.$emit("down",o)}},up:{showLoading(){t.upLoadType=1},showNoMore(){t.upLoadType=2},hideUpScroll(o){t.upLoadType=o.optUp.hasNext?0:3},empty:{onShow(o){t.isShowEmpty=o}},toTop:{onShow(o){t.isShowToTop=o}},callback:function(o){t.$emit("up",o)}}},e=Y.getType(),n={type:e};N.extend(n,t.i18n),N.extend(n,z.i18n),N.extend(o,n[e]),N.extend(o,{down:z.down,up:z.up});let i=JSON.parse(JSON.stringify({down:t.down,up:t.up}));N.extend(i,o),t.mescroll=new N(i,!0),t.mescroll.i18n=n,t.$emit("init",t.mescroll);const s=g();s.windowHeight&&(t.windowHeight=s.windowHeight),s.windowBottom&&(t.windowBottom=s.windowBottom),s.statusBarHeight&&(t.statusBarHeight=s.statusBarHeight),t.mescroll.setBodyHeight(s.windowHeight),t.mescroll.resetScrollTo(((o,e)=>{"string"==typeof o?setTimeout((()=>{let n;-1==o.indexOf("#")&&-1==o.indexOf(".")?n="#"+o:(n=o,-1!=o.indexOf(">>>")&&(n=o.split(">>>")[1].trim())),m().select(n).boundingClientRect((function(o){if(o){let n=o.top;n+=t.mescroll.getScrollTop(),y({scrollTop:n,duration:e})}else console.error(n+" does not exist")})).exec()}),30):y({scrollTop:o,duration:e})})),t.up&&t.up.toTop&&null!=t.up.toTop.safearea||(t.mescroll.optUp.toTop.safearea=t.safearea),S("setMescrollGlobalOption",(o=>{if(!o)return;let e=o.i18n?o.i18n.type:null;if(e&&t.mescroll.i18n.type!=e&&(t.mescroll.i18n.type=e,Y.setType(e),N.extend(o,t.mescroll.i18n[e])),o.down){let e=N.extend({},o.down);t.mescroll.optDown=N.extend(e,t.mescroll.optDown)}if(o.up){let e=N.extend({},o.up);t.mescroll.optUp=N.extend(e,t.mescroll.optUp)}}))},destroyed(){D("setMescrollGlobalOption")}};X(G),V(G);var J=M(G,[["render",function(t,o,e,n,u,f){const g=w,m=T("mescroll-empty"),y=T("mescroll-top");return i(),s(g,{class:h(["mescroll-body mescroll-render-touch",{"mescorll-sticky":e.sticky}]),style:d({minHeight:f.minHeight,"padding-top":f.padTop,"padding-bottom":f.padBottom}),onTouchstart:t.wxsBiz.touchstartEvent,onTouchmove:t.wxsBiz.touchmoveEvent,onTouchend:t.wxsBiz.touchendEvent,onTouchcancel:t.wxsBiz.touchendEvent,"change:prop":t.wxsBiz.propObserver,prop:t.wxsProp},{default:l((()=>[r(" 状态栏 "),e.topbar&&u.statusBarHeight?(i(),s(g,{key:0,class:"mescroll-topbar",style:d({height:u.statusBarHeight+"px",background:e.topbar})},null,8,["style"])):r("v-if",!0),p(g,{class:"mescroll-body-content mescroll-wxs-content",style:d({transform:f.translateY,transition:f.transition}),"change:prop":t.wxsBiz.callObserver,prop:t.callProp},{default:l((()=>[r(" 下拉加载区域 (支付宝小程序子组件传参给子子组件仍报单项数据流的异常,暂时不通过mescroll-down组件实现)"),r(' <mescroll-down :option="mescroll.optDown" :type="downLoadType" :rate="downRate"></mescroll-down> '),u.mescroll.optDown.use?(i(),s(g,{key:0,class:"mescroll-downwarp",style:d({background:u.mescroll.optDown.bgColor,color:u.mescroll.optDown.textColor})},{default:l((()=>[p(g,{class:"downwarp-content"},{default:l((()=>[p(g,{class:h(["downwarp-progress mescroll-wxs-progress",{"mescroll-rotate":f.isDownLoading}]),style:d({"border-color":u.mescroll.optDown.textColor,transform:f.downRotate})},null,8,["class","style"]),p(g,{class:"downwarp-tip"},{default:l((()=>[c(a(f.downText),1)])),_:1})])),_:1})])),_:1},8,["style"])):r("v-if",!0),r(" 列表内容 "),x(t.$slots,"default",{},void 0,!0),r(" 空布局 "),u.isShowEmpty?(i(),s(m,{key:1,option:u.mescroll.optUp.empty,onEmptyclick:f.emptyClick},null,8,["option","onEmptyclick"])):r("v-if",!0),r(" 上拉加载区域 (下拉刷新时不显示, 支付宝小程序子组件传参给子子组件仍报单项数据流的异常,暂时不通过mescroll-up组件实现)"),r(' <mescroll-up v-if="mescroll.optUp.use && !isDownLoading && upLoadType!==3" :option="mescroll.optUp" :type="upLoadType"></mescroll-up> '),u.mescroll.optUp.use&&!f.isDownLoading&&3!==u.upLoadType?(i(),s(g,{key:2,class:"mescroll-upwarp",style:d({background:u.mescroll.optUp.bgColor,color:u.mescroll.optUp.textColor})},{default:l((()=>[r(" 加载中 (此处不能用v-if,否则android小程序快速上拉可能会不断触发上拉回调) "),U(p(g,null,{default:l((()=>[p(g,{class:"upwarp-progress mescroll-rotate",style:d({"border-color":u.mescroll.optUp.textColor})},null,8,["style"]),p(g,{class:"upwarp-tip"},{default:l((()=>[c(a(u.mescroll.optUp.textLoading),1)])),_:1})])),_:1},512),[[v,1===u.upLoadType]]),r(" 无数据 "),2===u.upLoadType?(i(),s(g,{key:0,class:"upwarp-nodata"},{default:l((()=>[c(a(u.mescroll.optUp.textNoMore),1)])),_:1})):r("v-if",!0)])),_:1},8,["style"])):r("v-if",!0)])),_:3},8,["style","change:prop","prop"]),r(" 底部是否偏移TabBar的高度(默认仅在H5端的tab页生效) "),e.bottombar&&u.windowBottom>0?(i(),s(g,{key:1,class:"mescroll-bottombar",style:d({height:u.windowBottom+"px"})},null,8,["style"])):r("v-if",!0),r(" 适配iPhoneX "),e.safearea?(i(),s(g,{key:2,class:"mescroll-safearea"})):r("v-if",!0),r(" 回到顶部按钮 (fixed元素需写在transform外面,防止降级为absolute)"),p(y,{modelValue:u.isShowToTop,"onUpdate:modelValue":o[0]||(o[0]=t=>u.isShowToTop=t),option:u.mescroll.optUp.toTop,onClick:f.toTopClick},null,8,["modelValue","option","onClick"]),r(" renderjs的数据载体,不可写在mescroll-downwarp内部,避免use为false时,载体丢失,无法更新数据 "),p(g,{"change:prop":t.renderBiz.propObserver,prop:t.wxsProp},null,8,["change:prop","prop"])])),_:3},8,["class","style","onTouchstart","onTouchmove","onTouchend","onTouchcancel","change:prop","prop"])}],["__scopeId","data-v-6f774954"]]);const Z=b({setup(t){const o=C(),e=L(o,"t");B((()=>D(e.value)));const n=H(E)||{},s=L(n,"mescroll"),c=L(n,"fetch"),a=L(n,"enable");let h=k((()=>["all","up"].some((t=>t==a.value)))),d=k((()=>["all","down"].some((t=>t==a.value))));return(t,o)=>(i(),O(P,null,[r(" 本组件将由uni-provider插件自动混入到每一个页面中 "),p(J,{up:{use:h.value},down:{use:d.value},onInit:o[0]||(o[0]=t=>s.value=t),onUp:c.value,onDown:o[1]||(o[1]=t=>h.value?t.resetUpScroll():c.value(t))},{default:l((()=>[x(t.$slots,"default")])),_:3},8,["up","down","onUp"]),x(t.$slots,"fixed")],64))}});export{M as _,Z as a};
