/*=========================================
•                                         •
•   # Tornado UI - Beta v1.0              •
•   https://eng-code.info/tornado-ui      •
•                                         •
•   Copyright 2016 Eng Code               •
•   Released under the MIT license        •
•   http://opensource.org/licenses/MIT    •
•                                         •
======================================== */

/*! jRange * http://nitinhayaran.github.io/jRange/demo/ */
!function(a,b,c,d){"use strict";var e=function(){return this.init.apply(this,arguments)};e.prototype={defaults:{onstatechange:function(){},ondragend:function(){},onbarclicked:function(){},isRange:!1,showLabels:!0,showScale:!0,step:1,format:"%s",theme:"theme-tornado",width:300,disable:!1,snap:!1},template:'<div class="slider-container">			<div class="back-bar">                <div class="selected-bar"></div>                <div class="pointer low"></div><div class="pointer-label low">123456</div>                <div class="pointer high"></div><div class="pointer-label high">456789</div>                <div class="clickable-dummy"></div>            </div>            <div class="scale"></div>		</div>',init:function(b,c){this.options=a.extend({},this.defaults,c),this.inputNode=a(b),this.options.value=this.inputNode.val()||(this.options.isRange?this.options.from+","+this.options.from:""+this.options.from),this.domNode=a(this.template),this.domNode.addClass(this.options.theme),this.inputNode.after(this.domNode),this.domNode.on("change",this.onChange),this.pointers=a(".pointer",this.domNode),this.lowPointer=this.pointers.first(),this.highPointer=this.pointers.last(),this.labels=a(".pointer-label",this.domNode),this.lowLabel=this.labels.first(),this.highLabel=this.labels.last(),this.scale=a(".scale",this.domNode),this.bar=a(".selected-bar",this.domNode),this.clickableBar=this.domNode.find(".clickable-dummy"),this.interval=this.options.to-this.options.from,this.render()},render:function(){return 0!==this.inputNode.width()||this.options.width?(this.options.width=this.options.width||this.inputNode.width(),this.domNode.width(this.options.width),this.inputNode.hide(),this.isSingle()&&(this.lowPointer.hide(),this.lowLabel.hide()),this.options.showLabels||this.labels.hide(),this.attachEvents(),this.options.showScale&&this.renderScale(),void this.setValue(this.options.value)):void console.log("jRange : no width found, returning")},isSingle:function(){return"number"===typeof this.options.value?!0:-1!==this.options.value.indexOf(",")||this.options.isRange?!1:!0},attachEvents:function(){this.clickableBar.click(a.proxy(this.barClicked,this)),this.pointers.on("mousedown touchstart",a.proxy(this.onDragStart,this)),this.pointers.bind("dragstart",function(a){a.preventDefault()})},onDragStart:function(b){if(!(this.options.disable||"mousedown"===b.type&&1!==b.which)){b.stopPropagation(),b.preventDefault();var d=a(b.target);this.pointers.removeClass("last-active"),d.addClass("focused last-active"),this[(d.hasClass("low")?"low":"high")+"Label"].addClass("focused"),a(c).on("mousemove.slider touchmove.slider",a.proxy(this.onDrag,this,d)),a(c).on("mouseup.slider touchend.slider touchcancel.slider",a.proxy(this.onDragEnd,this))}},onDrag:function(a,b){b.stopPropagation(),b.preventDefault(),b.originalEvent.touches&&b.originalEvent.touches.length?b=b.originalEvent.touches[0]:b.originalEvent.changedTouches&&b.originalEvent.changedTouches.length&&(b=b.originalEvent.changedTouches[0]);var c=b.clientX-this.domNode.offset().left;this.domNode.trigger("change",[this,a,c])},onDragEnd:function(){this.pointers.removeClass("focused").trigger("rangeslideend"),this.labels.removeClass("focused"),a(c).off(".slider"),this.options.ondragend.call(this,this.options.value)},barClicked:function(a){if(!this.options.disable){var b=a.pageX-this.clickableBar.offset().left;if(this.isSingle())this.setPosition(this.pointers.last(),b,!0,!0);else{var i,c=Math.abs(parseFloat(this.pointers.first().css("left"),10)),d=this.pointers.first().width()/2,e=Math.abs(parseFloat(this.pointers.last().css("left"),10)),f=this.pointers.first().width()/2,g=Math.abs(c-b+d),h=Math.abs(e-b+f);i=g==h?b<c?this.pointers.first():this.pointers.last():g<h?this.pointers.first():this.pointers.last(),this.setPosition(i,b,!0,!0)}this.options.onbarclicked.call(this,this.options.value)}},onChange:function(a,b,c,d){var e,f;e=0,f=b.domNode.width(),b.isSingle()||(e=c.hasClass("high")?parseFloat(b.lowPointer.css("left"))+b.lowPointer.width()/2:0,f=c.hasClass("low")?parseFloat(b.highPointer.css("left"))+b.highPointer.width()/2:b.domNode.width());var g=Math.min(Math.max(d,e),f);b.setPosition(c,g,!0)},setPosition:function(a,b,c,d){var e,f,g=parseFloat(this.lowPointer.css("left")),h=parseFloat(this.highPointer.css("left"))||0,i=this.highPointer.width()/2;if(c||(b=this.prcToPx(b)),this.options.snap){var j=this.correctPositionForSnap(b);if(-1===j)return;b=j}a[0]===this.highPointer[0]?h=Math.round(b-i):g=Math.round(b-i),a[d?"animate":"css"]({left:Math.round(b-i)}),this.isSingle()?e=0:(e=g+i,f=h+i);var k=Math.round(h+i-e);this.bar[d?"animate":"css"]({width:Math.abs(k),left:k>0?e:e+k}),this.showPointerValue(a,b,d),this.isReadonly()},correctPositionForSnap:function(a){var b=this.positionToValue(a)-this.options.from,c=this.options.width/(this.interval/this.options.step),d=b/this.options.step*c;return a<=d+c/2&&a>=d-c/2?d:-1},setValue:function(a){var b=a.toString().split(",");b[0]=Math.min(Math.max(b[0],this.options.from),this.options.to)+"",b.length>1&&(b[1]=Math.min(Math.max(b[1],this.options.from),this.options.to)+""),this.options.value=a;var c=this.valuesToPrc(2===b.length?b:[0,b[0]]);this.isSingle()?this.setPosition(this.highPointer,c[1]):(this.setPosition(this.lowPointer,c[0]),this.setPosition(this.highPointer,c[1]))},renderScale:function(){for(var b=this.options.scale||[this.options.from,this.options.to],c=Math.round(100/(b.length-1)*10)/10,d="",e=0;e<b.length;e++)d+='<span style="left: '+e*c+'%">'+("|"!=b[e]?"<ins>"+b[e]+"</ins>":"")+"</span>";this.scale.html(d),a("ins",this.scale).each(function(){a(this).css({marginLeft:-a(this).outerWidth()/2})})},getBarWidth:function(){var a=this.options.value.split(",");return a.length>1?parseFloat(a[1])-parseFloat(a[0]):parseFloat(a[0])},showPointerValue:function(b,c,e){var g,f=a(".pointer-label",this.domNode)[b.hasClass("low")?"first":"last"](),h=this.positionToValue(c);if(a.isFunction(this.options.format)){var i=this.isSingle()?d:b.hasClass("low")?"low":"high";g=this.options.format(h,i)}else g=this.options.format.replace("%s",h);var j=f.html(g).width(),k=c-j/2;k=Math.min(Math.max(k,0),this.options.width-j),f[e?"animate":"css"]({left:k}),this.setInputValue(b,h)},valuesToPrc:function(a){var b=100*(parseFloat(a[0])-parseFloat(this.options.from))/this.interval,c=100*(parseFloat(a[1])-parseFloat(this.options.from))/this.interval;return[b,c]},prcToPx:function(a){return this.domNode.width()*a/100},isDecimal:function(){return-1===(this.options.value+this.options.from+this.options.to).indexOf(".")?!1:!0},positionToValue:function(a){var b=a/this.domNode.width()*this.interval;if(b=parseFloat(b,10)+parseFloat(this.options.from,10),this.isDecimal()){var c=Math.round(Math.round(b/this.options.step)*this.options.step*100)/100;if(0!==c)for(c=""+c,-1===c.indexOf(".")&&(c+=".");c.length-c.indexOf(".")<3;)c+="0";else c="0.00";return c}return Math.round(b/this.options.step)*this.options.step},setInputValue:function(a,b){if(this.isSingle())this.options.value=b.toString();else{var c=this.options.value.split(",");this.options.value=a.hasClass("low")?b+","+c[1]:c[0]+","+b}this.inputNode.val()!==this.options.value&&(this.inputNode.val(this.options.value).trigger("change"),this.options.onstatechange.call(this,this.options.value))},getValue:function(){return this.options.value},getOptions:function(){return this.options},getRange:function(){return this.options.from+","+this.options.to},isReadonly:function(){this.domNode.toggleClass("slider-readonly",this.options.disable)},disable:function(){this.options.disable=!0,this.isReadonly()},enable:function(){this.options.disable=!1,this.isReadonly()},toggleDisable:function(){this.options.disable=!this.options.disable,this.isReadonly()},updateRange:function(a,b){var c=a.toString().split(",");this.interval=parseInt(c[1])-parseInt(c[0]),this.setValue(b?b:this.getValue())}};var f="jRange";a.fn[f]=function(c){var g,d=arguments;return this.each(function(){var h=a(this),i=a.data(this,"plugin_"+f),j="object"===typeof c&&c;i||(h.data("plugin_"+f,i=new e(this,j)),a(b).resize(function(){i.setValue(i.getValue())})),"string"===typeof c&&(g=i[c].apply(i,Array.prototype.slice.call(d,1)))}),g||this}}(jQuery,window,document);
/*==== Sticky-kit v1.1.2 | WTFPL | Leaf Corcoran 2015 | http://leafo.net/sticky-kit ====*/
(function(){var b,f;b=this.jQuery||window.jQuery;f=b(window);b.fn.stick_in_parent=function(d){var A,w,J,n,B,K,p,q,k,E,t;null==d&&(d={});t=d.sticky_class;B=d.inner_scrolling;E=d.recalc_every;k=d.parent;q=d.offset_top;p=d.spacer;w=d.bottoming;null==q&&(q=0);null==k&&(k=void 0);null==B&&(B=!0);null==t&&(t="is_stuck");A=b(document);null==w&&(w=!0);J=function(a,d,n,C,F,u,r,G){var v,H,m,D,I,c,g,x,y,z,h,l;if(!a.data("sticky_kit")){a.data("sticky_kit",!0);I=A.height();g=a.parent();null!=k&&(g=g.closest(k));
if(!g.length)throw"failed to find stick parent";v=m=!1;(h=null!=p?p&&a.closest(p):b("<div />"))&&h.css("position",a.css("position"));x=function(){var c,f,e;if(!G&&(I=A.height(),c=parseInt(g.css("border-top-width"),10),f=parseInt(g.css("padding-top"),10),d=parseInt(g.css("padding-bottom"),10),n=g.offset().top+c+f,C=g.height(),m&&(v=m=!1,null==p&&(a.insertAfter(h),h.detach()),a.css({position:"",top:"",width:"",bottom:""}).removeClass(t),e=!0),F=a.offset().top-(parseInt(a.css("margin-top"),10)||0)-q,
u=a.outerHeight(!0),r=a.css("float"),h&&h.css({width:a.outerWidth(!0),height:u,display:a.css("display"),"vertical-align":a.css("vertical-align"),"float":r}),e))return l()};x();if(u!==C)return D=void 0,c=q,z=E,l=function(){var b,l,e,k;if(!G&&(e=!1,null!=z&&(--z,0>=z&&(z=E,x(),e=!0)),e||A.height()===I||x(),e=f.scrollTop(),null!=D&&(l=e-D),D=e,m?(w&&(k=e+u+c>C+n,v&&!k&&(v=!1,a.css({position:"fixed",bottom:"",top:c}).trigger("sticky_kit:unbottom"))),e<F&&(m=!1,c=q,null==p&&("left"!==r&&"right"!==r||a.insertAfter(h),
h.detach()),b={position:"",width:"",top:""},a.css(b).removeClass(t).trigger("sticky_kit:unstick")),B&&(b=f.height(),u+q>b&&!v&&(c-=l,c=Math.max(b-u,c),c=Math.min(q,c),m&&a.css({top:c+"px"})))):e>F&&(m=!0,b={position:"fixed",top:c},b.width="border-box"===a.css("box-sizing")?a.outerWidth()+"px":a.width()+"px",a.css(b).addClass(t),null==p&&(a.after(h),"left"!==r&&"right"!==r||h.append(a)),a.trigger("sticky_kit:stick")),m&&w&&(null==k&&(k=e+u+c>C+n),!v&&k)))return v=!0,"static"===g.css("position")&&g.css({position:"relative"}),
a.css({position:"absolute",bottom:d,top:"auto"}).trigger("sticky_kit:bottom")},y=function(){x();return l()},H=function(){G=!0;f.off("touchmove",l);f.off("scroll",l);f.off("resize",y);b(document.body).off("sticky_kit:recalc",y);a.off("sticky_kit:detach",H);a.removeData("sticky_kit");a.css({position:"",bottom:"",top:"",width:""});g.position("position","");if(m)return null==p&&("left"!==r&&"right"!==r||a.insertAfter(h),h.remove()),a.removeClass(t)},f.on("touchmove",l),f.on("scroll",l),f.on("resize",
y),b(document.body).on("sticky_kit:recalc",y),a.on("sticky_kit:detach",H),setTimeout(l,0)}};n=0;for(K=this.length;n<K;n++)d=this[n],J(b(d));return this}}).call(this);
/*==== jQuery-viewport-checker - v1.8.7 - 2015-12-17 ====*/
!function(a){a.fn.viewportChecker=function(b){var c={classToAdd:"visible",classToRemove:"invisible",classToAddForFullView:"full-visible",removeClassAfterAnimation:!1,offset:100,repeat:!1,invertBottomOffset:!0,callbackFunction:function(a,b){},scrollHorizontal:!1,scrollBox:window};a.extend(c,b);var d=this,e={height:a(c.scrollBox).height(),width:a(c.scrollBox).width()},f=-1!=navigator.userAgent.toLowerCase().indexOf("webkit")||-1!=navigator.userAgent.toLowerCase().indexOf("windows phone")?"body":"html";return this.checkElements=function(){var b,g;c.scrollHorizontal?(b=a(f).scrollLeft(),g=b+e.width):(b=a(f).scrollTop(),g=b+e.height),d.each(function(){var d=a(this),f={},h={};if(d.data("vp-add-class")&&(h.classToAdd=d.data("vp-add-class")),d.data("vp-remove-class")&&(h.classToRemove=d.data("vp-remove-class")),d.data("vp-add-class-full-view")&&(h.classToAddForFullView=d.data("vp-add-class-full-view")),d.data("vp-keep-add-class")&&(h.removeClassAfterAnimation=d.data("vp-remove-after-animation")),d.data("vp-offset")&&(h.offset=d.data("vp-offset")),d.data("vp-repeat")&&(h.repeat=d.data("vp-repeat")),d.data("vp-scrollHorizontal")&&(h.scrollHorizontal=d.data("vp-scrollHorizontal")),d.data("vp-invertBottomOffset")&&(h.scrollHorizontal=d.data("vp-invertBottomOffset")),a.extend(f,c),a.extend(f,h),!d.data("vp-animated")||f.repeat){String(f.offset).indexOf("%")>0&&(f.offset=parseInt(f.offset)/100*e.height);var i=f.scrollHorizontal?d.offset().left:d.offset().top,j=f.scrollHorizontal?i+d.width():i+d.height(),k=Math.round(i)+f.offset,l=f.scrollHorizontal?k+d.width():k+d.height();f.invertBottomOffset&&(l-=2*f.offset),g>k&&l>b?(d.removeClass(f.classToRemove),d.addClass(f.classToAdd),f.callbackFunction(d,"add"),g>=j&&i>=b?d.addClass(f.classToAddForFullView):d.removeClass(f.classToAddForFullView),d.data("vp-animated",!0),f.removeClassAfterAnimation&&d.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){d.removeClass(f.classToAdd)})):d.hasClass(f.classToAdd)&&f.repeat&&(d.removeClass(f.classToAdd+" "+f.classToAddForFullView),f.callbackFunction(d,"remove"),d.data("vp-animated",!1))}})},("ontouchstart"in window||"onmsgesturechange"in window)&&a(document).bind("touchmove MSPointerMove pointermove",this.checkElements),a(c.scrollBox).bind("load scroll",this.checkElements),a(window).resize(function(b){e={height:a(c.scrollBox).height(),width:a(c.scrollBox).width()},d.checkElements()}),this.checkElements(),this}}(jQuery);
/*==== Datepicker v0.4.0 * https://github.com/fengyuanchen/datepicker ====*/
!function(t){"function"==typeof define&&define.amd?define("datepicker",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(t){return j.call(t).slice(8,-1).toLowerCase()}function i(t){return"string"==typeof t}function s(t){return"number"==typeof t&&!isNaN(t)}function a(t){return"undefined"==typeof t}function n(t){return"date"===e(t)}function r(t,e){var i=[];return Array.from?Array.from(t).slice(e||0):(s(e)&&i.push(e),i.slice.apply(t,i))}function h(t,e){var i=r(arguments,2);return function(){return t.apply(e,i.concat(r(arguments)))}}function o(t){return t%4===0&&t%100!==0||t%400===0}function l(t,e){return[31,o(t)?29:28,31,30,31,30,31,31,30,31,30,31][e]}function d(t){var e,i,s=String(t).toLowerCase(),a=s.match(x);if(!a||0===a.length)throw new Error("Invalid date format.");for(t={source:s,parts:a},e=a.length,i=0;i<e;i++)switch(a[i]){case"dd":case"d":t.hasDay=!0;break;case"mm":case"m":t.hasMonth=!0;break;case"yyyy":case"yy":t.hasYear=!0}return t}function u(e,i){i=t.isPlainObject(i)?i:{},i.language&&(i=t.extend({},u.LANGUAGES[i.language],i)),this.$element=t(e),this.options=t.extend({},u.DEFAULTS,i),this.isBuilt=!1,this.isShown=!1,this.isInput=!1,this.isInline=!1,this.initialValue="",this.initialDate=null,this.startDate=null,this.endDate=null,this.init()}var c=t(window),f=window.document,p=t(f),w=window.Number,y="datepicker",m="click."+y,g="keyup."+y,v="focus."+y,D="resize."+y,k="show."+y,b="hide."+y,$="pick."+y,x=/(y|m|d)+/g,C=/\d+/g,S=/^\d{2,4}$/,F=y+"-inline",V=y+"-dropdown",M=y+"-top-left",I=y+"-top-right",T=y+"-bottom-left",Y=y+"-bottom-right",A=[M,I,T,Y].join(" "),P=y+"-hide",N=Math.min,j=Object.prototype.toString;u.prototype={constructor:u,init:function(){var e=this.options,i=this.$element,s=e.startDate,a=e.endDate,n=e.date;this.$trigger=t(e.trigger||i),this.isInput=i.is("input")||i.is("textarea"),this.isInline=e.inline&&(e.container||!this.isInput),this.format=d(e.format),this.oldValue=this.initialValue=this.getValue(),n=this.parseDate(n||this.initialValue),s&&(s=this.parseDate(s),n.getTime()<s.getTime()&&(n=new Date(s)),this.startDate=s),a&&(a=this.parseDate(a),s&&a.getTime()<s.getTime()&&(a=new Date(s)),n.getTime()>a.getTime()&&(n=new Date(a)),this.endDate=a),this.date=n,this.viewDate=new Date(n),this.initialDate=new Date(this.date),this.bind(),(e.autoShow||this.isInline)&&this.show(),e.autoPick&&this.pick()},build:function(){var e,i=this.options,s=this.$element;this.isBuilt||(this.isBuilt=!0,this.$picker=e=t(i.template),this.$week=e.find('[data-view="week"]'),this.$yearsPicker=e.find('[data-view="years picker"]'),this.$yearsPrev=e.find('[data-view="years prev"]'),this.$yearsNext=e.find('[data-view="years next"]'),this.$yearsCurrent=e.find('[data-view="years current"]'),this.$years=e.find('[data-view="years"]'),this.$monthsPicker=e.find('[data-view="months picker"]'),this.$yearPrev=e.find('[data-view="year prev"]'),this.$yearNext=e.find('[data-view="year next"]'),this.$yearCurrent=e.find('[data-view="year current"]'),this.$months=e.find('[data-view="months"]'),this.$daysPicker=e.find('[data-view="days picker"]'),this.$monthPrev=e.find('[data-view="month prev"]'),this.$monthNext=e.find('[data-view="month next"]'),this.$monthCurrent=e.find('[data-view="month current"]'),this.$days=e.find('[data-view="days"]'),this.isInline?t(i.container||s).append(e.addClass(F)):(t(f.body).append(e.addClass(V)),e.addClass(P)),this.fillWeek())},unbuild:function(){this.isBuilt&&(this.isBuilt=!1,this.$picker.remove())},bind:function(){var e=this.options,i=this.$element;t.isFunction(e.show)&&i.on(k,e.show),t.isFunction(e.hide)&&i.on(b,e.hide),t.isFunction(e.pick)&&i.on($,e.pick),this.isInput&&(i.on(g,t.proxy(this.keyup,this)),e.trigger||i.on(v,t.proxy(this.show,this))),this.$trigger.on(m,t.proxy(this.show,this))},unbind:function(){var e=this.options,i=this.$element;t.isFunction(e.show)&&i.off(k,e.show),t.isFunction(e.hide)&&i.off(b,e.hide),t.isFunction(e.pick)&&i.off($,e.pick),this.isInput&&(i.off(g,this.keyup),e.trigger||i.off(v,this.show)),this.$trigger.off(m,this.show)},showView:function(t){var e=this.$yearsPicker,i=this.$monthsPicker,s=this.$daysPicker,a=this.format;if(a.hasYear||a.hasMonth||a.hasDay)switch(w(t)){case 2:case"years":i.addClass(P),s.addClass(P),a.hasYear?(this.fillYears(),e.removeClass(P)):this.showView(0);break;case 1:case"months":e.addClass(P),s.addClass(P),a.hasMonth?(this.fillMonths(),i.removeClass(P)):this.showView(2);break;default:e.addClass(P),i.addClass(P),a.hasDay?(this.fillDays(),s.removeClass(P)):this.showView(1)}},hideView:function(){this.options.autoHide&&this.hide()},place:function(){var t=this.options,e=this.$element,i=this.$picker,s=p.outerWidth(),a=p.outerHeight(),n=e.outerWidth(),r=e.outerHeight(),h=i.width(),o=i.height(),l=e.offset(),d=l.left,u=l.top,c=parseFloat(t.offset)||10,f=M;u>o&&u+r+o>a?(u-=o+c,f=T):u+=r+c,d+h>s&&(d=d+n-h,f=f.replace("left","right")),i.removeClass(A).addClass(f).css({top:u,left:d,zIndex:parseInt(t.zIndex,10)})},trigger:function(e,i){var s=t.Event(e,i);return this.$element.trigger(s),s},createItem:function(e){var i=this.options,s=i.itemTag,a={text:"",view:"",muted:!1,picked:!1,disabled:!1};return t.extend(a,e),"<"+s+" "+(a.disabled?'class="'+i.disabledClass+'"':a.picked?'class="'+i.pickedClass+'"':a.muted?'class="'+i.mutedClass+'"':"")+(a.view?' data-view="'+a.view+'"':"")+">"+a.text+"</"+s+">"},fillAll:function(){this.fillYears(),this.fillMonths(),this.fillDays()},fillWeek:function(){var e,i=this.options,s=parseInt(i.weekStart,10)%7,a=i.daysMin,n="";for(a=t.merge(a.slice(s),a.slice(0,s)),e=0;e<=6;e++)n+=this.createItem({text:a[e]});this.$week.html(n)},fillYears:function(){var e,i=this.options,s=i.disabledClass||"",a=i.yearSuffix||"",n=t.isFunction(i.filter)&&i.filter,r=this.startDate,h=this.endDate,o=this.viewDate,l=o.getFullYear(),d=o.getMonth(),u=o.getDate(),c=this.date,f=c.getFullYear(),p=!1,w=!1,y=!1,m=!1,g=!1,v="",D=-5,k=6;for(e=D;e<=k;e++)c=new Date(l+e,d,u),g=e===D||e===k,m=l+e===f,y=!1,r&&(y=c.getFullYear()<r.getFullYear(),e===D&&(p=y)),!y&&h&&(y=c.getFullYear()>h.getFullYear(),e===k&&(w=y)),!y&&n&&(y=n.call(this.$element,c)===!1),v+=this.createItem({text:l+e,view:y?"year disabled":m?"year picked":"year",muted:g,picked:m,disabled:y});this.$yearsPrev.toggleClass(s,p),this.$yearsNext.toggleClass(s,w),this.$yearsCurrent.toggleClass(s,!0).html(l+D+a+" - "+(l+k)+a),this.$years.html(v)},fillMonths:function(){var e,i=this.options,s=i.disabledClass||"",a=i.monthsShort,n=t.isFunction(i.filter)&&i.filter,r=this.startDate,h=this.endDate,o=this.viewDate,l=o.getFullYear(),d=o.getDate(),u=this.date,c=u.getFullYear(),f=u.getMonth(),p=!1,w=!1,y=!1,m=!1,g="";for(e=0;e<=11;e++)u=new Date(l,e,d),m=l===c&&e===f,y=!1,r&&(p=u.getFullYear()===r.getFullYear(),y=p&&u.getMonth()<r.getMonth()),!y&&h&&(w=u.getFullYear()===h.getFullYear(),y=w&&u.getMonth()>h.getMonth()),!y&&n&&(y=n.call(this.$element,u)===!1),g+=this.createItem({index:e,text:a[e],view:y?"month disabled":m?"month picked":"month",picked:m,disabled:y});this.$yearPrev.toggleClass(s,p),this.$yearNext.toggleClass(s,w),this.$yearCurrent.toggleClass(s,p&&w).html(l+i.yearSuffix||""),this.$months.html(g)},fillDays:function(){var e,i,s,a=this.options,n=a.disabledClass||"",r=a.yearSuffix||"",h=a.monthsShort,o=parseInt(a.weekStart,10)%7,d=t.isFunction(a.filter)&&a.filter,u=this.startDate,c=this.endDate,f=this.viewDate,p=f.getFullYear(),w=f.getMonth(),y=p,m=w,g=p,v=w,D=this.date,k=D.getFullYear(),b=D.getMonth(),$=D.getDate(),x=!1,C=!1,S=!1,F=!1,V=[],M=[],I=[],T=42;for(0===w?(y-=1,m=11):m-=1,e=l(y,m),D=new Date(p,w,1),s=D.getDay()-o,s<=0&&(s+=7),u&&(x=D.getTime()<=u.getTime()),i=e-(s-1);i<=e;i++)D=new Date(y,m,i),S=!1,u&&(S=D.getTime()<u.getTime()),!S&&d&&(S=d.call(this.$element,D)===!1),V.push(this.createItem({text:i,view:"day prev",muted:!0,disabled:S}));for(11===w?(g+=1,v=0):v+=1,e=l(p,w),s=T-(V.length+e),D=new Date(p,w,e),c&&(C=D.getTime()>=c.getTime()),i=1;i<=s;i++)D=new Date(g,v,i),S=!1,c&&(S=D.getTime()>c.getTime()),!S&&d&&(S=d.call(this.$element,D)===!1),M.push(this.createItem({text:i,view:"day next",muted:!0,disabled:S}));for(i=1;i<=e;i++)D=new Date(p,w,i),F=p===k&&w===b&&i===$,S=!1,u&&(S=D.getTime()<u.getTime()),!S&&c&&(S=D.getTime()>c.getTime()),!S&&d&&(S=d.call(this.$element,D)===!1),I.push(this.createItem({text:i,view:S?"day disabled":F?"day picked":"day",picked:F,disabled:S}));this.$monthPrev.toggleClass(n,x),this.$monthNext.toggleClass(n,C),this.$monthCurrent.toggleClass(n,x&&C).html(a.yearFirst?p+r+" "+h[w]:h[w]+" "+p+r),this.$days.html(V.join("")+I.join(" ")+M.join(""))},click:function(e){var i,s,a,n,r,h,o=t(e.target),l=this.viewDate;if(e.stopPropagation(),e.preventDefault(),!o.hasClass("disabled"))switch(i=l.getFullYear(),s=l.getMonth(),a=l.getDate(),h=o.data("view")){case"years prev":case"years next":i="years prev"===h?i-10:i+10,r=o.text(),n=S.test(r),n&&(i=parseInt(r,10),this.date=new Date(i,s,N(a,28))),this.viewDate=new Date(i,s,N(a,28)),this.fillYears(),n&&(this.showView(1),this.pick("year"));break;case"year prev":case"year next":i="year prev"===h?i-1:i+1,this.viewDate=new Date(i,s,N(a,28)),this.fillMonths();break;case"year current":this.format.hasYear&&this.showView(2);break;case"year picked":this.format.hasMonth?this.showView(1):this.hideView();break;case"year":i=parseInt(o.text(),10),this.date=new Date(i,s,N(a,28)),this.viewDate=new Date(i,s,N(a,28)),this.format.hasMonth?this.showView(1):this.hideView(),this.pick("year");break;case"month prev":case"month next":s="month prev"===h?s-1:"month next"===h?s+1:s,this.viewDate=new Date(i,s,N(a,28)),this.fillDays();break;case"month current":this.format.hasMonth&&this.showView(1);break;case"month picked":this.format.hasDay?this.showView(0):this.hideView();break;case"month":s=t.inArray(o.text(),this.options.monthsShort),this.date=new Date(i,s,N(a,28)),this.viewDate=new Date(i,s,N(a,28)),this.format.hasDay?this.showView(0):this.hideView(),this.pick("month");break;case"day prev":case"day next":case"day":s="day prev"===h?s-1:"day next"===h?s+1:s,a=parseInt(o.text(),10),this.date=new Date(i,s,a),this.viewDate=new Date(i,s,a),this.fillDays(),"day"===h&&this.hideView(),this.pick("day");break;case"day picked":this.hideView(),this.pick("day")}},clickDoc:function(t){for(var e,i=t.target,s=this.$trigger[0];i!==f;){if(i===s){e=!0;break}i=i.parentNode}e||this.hide()},keyup:function(){this.update()},getValue:function(){var t=this.$element,e="";return this.isInput?e=t.val():this.isInline?this.options.container&&(e=t.text()):e=t.text(),e},setValue:function(t){var e=this.$element;t=i(t)?t:"",this.isInput?e.val(t):this.isInline?this.options.container&&e.text(t):e.text(t)},show:function(){this.isBuilt||this.build(),this.isShown||this.trigger(k).isDefaultPrevented()||(this.isShown=!0,this.$picker.removeClass(P).on(m,t.proxy(this.click,this)),this.showView(this.options.startView),this.isInline||(c.on(D,this._place=h(this.place,this)),p.on(m,this._clickDoc=h(this.clickDoc,this)),this.place()))},hide:function(){this.isShown&&(this.trigger(b).isDefaultPrevented()||(this.isShown=!1,this.$picker.addClass(P).off(m,this.click),this.isInline||(c.off(D,this._place),p.off(m,this._clickDoc))))},update:function(){var t=this.getValue();t!==this.oldValue&&(this.setDate(t,!0),this.oldValue=t)},pick:function(t){var e=this.$element,i=this.date;this.trigger($,{view:t||"",date:i}).isDefaultPrevented()||(this.setValue(i=this.formatDate(this.date)),this.isInput&&e.trigger("change"))},reset:function(){this.setDate(this.initialDate,!0),this.setValue(this.initialValue),this.isShown&&this.showView(this.options.startView)},getMonthName:function(e,i){var n=this.options,r=n.months;return t.isNumeric(e)?e=w(e):a(i)&&(i=e),i===!0&&(r=n.monthsShort),r[s(e)?e:this.date.getMonth()]},getDayName:function(e,i,n){var r=this.options,h=r.days;return t.isNumeric(e)?e=w(e):(a(n)&&(n=i),a(i)&&(i=e)),h=n===!0?r.daysMin:i===!0?r.daysShort:h,h[s(e)?e:this.date.getDay()]},getDate:function(t){var e=this.date;return t?this.formatDate(e):new Date(e)},setDate:function(e,s){var a=this.options.filter;if(n(e)||i(e)){if(e=this.parseDate(e),t.isFunction(a)&&a.call(this.$element,e)===!1)return;this.date=e,this.viewDate=new Date(e),s||this.pick(),this.isBuilt&&this.fillAll()}},setStartDate:function(t){(n(t)||i(t))&&(this.startDate=this.parseDate(t),this.isBuilt&&this.fillAll())},setEndDate:function(t){(n(t)||i(t))&&(this.endDate=this.parseDate(t),this.isBuilt&&this.fillAll())},parseDate:function(t){var e,s,a,r,h,o,l=this.format,d=[];if(n(t))return new Date(t.getFullYear(),t.getMonth(),t.getDate());if(i(t)&&(d=t.match(C)||[]),t=new Date,s=t.getFullYear(),a=t.getDate(),r=t.getMonth(),e=l.parts.length,d.length===e)for(o=0;o<e;o++)switch(h=parseInt(d[o],10)||1,l.parts[o]){case"dd":case"d":a=h;break;case"mm":case"m":r=h-1;break;case"yy":s=2e3+h;break;case"yyyy":s=h}return new Date(s,r,a)},formatDate:function(t){var e,i,s,a,r,h=this.format,o="";if(n(t))for(o=h.source,i=t.getFullYear(),a={d:t.getDate(),m:t.getMonth()+1,yy:i.toString().substring(2),yyyy:i},a.dd=(a.d<10?"0":"")+a.d,a.mm=(a.m<10?"0":"")+a.m,e=h.parts.length,r=0;r<e;r++)s=h.parts[r],o=o.replace(s,a[s]);return o},destroy:function(){this.unbind(),this.unbuild(),this.$element.removeData(y)}},u.LANGUAGES={},u.DEFAULTS={autoShow:!1,autoHide:!1,autoPick:!1,inline:!1,container:null,trigger:null,language:"",format:"mm/dd/yyyy",date:null,startDate:null,endDate:null,startView:0,weekStart:0,yearFirst:!1,yearSuffix:"",days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],itemTag:"li",mutedClass:"muted",pickedClass:"picked",disabledClass:"disabled",template:'<div class="datepicker-container"><div class="datepicker-panel" data-view="years picker"><ul><li data-view="years prev">&lsaquo;</li><li data-view="years current"></li><li data-view="years next">&rsaquo;</li></ul><ul data-view="years"></ul></div><div class="datepicker-panel" data-view="months picker"><ul><li data-view="year prev">&lsaquo;</li><li data-view="year current"></li><li data-view="year next">&rsaquo;</li></ul><ul data-view="months"></ul></div><div class="datepicker-panel" data-view="days picker"><ul><li data-view="month prev">&lsaquo;</li><li data-view="month current"></li><li data-view="month next">&rsaquo;</li></ul><ul data-view="week"></ul><ul data-view="days"></ul></div></div>',offset:10,zIndex:1e3,filter:null,show:null,hide:null,pick:null},u.setDefaults=function(e){e=t.isPlainObject(e)?e:{},e.language&&(e=t.extend({},u.LANGUAGES[e.language],e)),t.extend(u.DEFAULTS,e)},u.other=t.fn.datepicker,t.fn.datepicker=function(e){var s,n=r(arguments,1);return this.each(function(){var a,r,h=t(this),o=h.data(y);if(!o){if(/destroy/.test(e))return;a=t.extend({},h.data(),t.isPlainObject(e)&&e),h.data(y,o=new u(this,a))}i(e)&&t.isFunction(r=o[e])&&(s=r.apply(o,n))}),a(s)?this:s},t.fn.datepicker.Constructor=u,t.fn.datepicker.languages=u.LANGUAGES,t.fn.datepicker.setDefaults=u.setDefaults,t.fn.datepicker.noConflict=function(){return t.fn.datepicker=u.other,this}});
/** jQuery Tags Input Plugin 1.3.3 - Copyright (c) 2011 XOXCO, Inc * http://xoxco.com/projects/code/tagsinput/ */
!function(a){var b=new Array,c=new Array;a.fn.doAutosize=function(b){var c=a(this).data("minwidth"),d=a(this).data("maxwidth"),e="",f=a(this),g=a("#"+a(this).data("tester_id"));if(e!==(e=f.val())){var h=e.replace(/&/g,"&amp;").replace(/\s/g," ").replace(/</g,"&lt;").replace(/>/g,"&gt;");g.html(h);var i=g.width(),j=i+b.comfortZone>=c?i+b.comfortZone:c,k=f.width(),l=j<k&&j>=c||j>c&&j<d;l&&f.width(j)}},a.fn.resetAutosize=function(b){var c=a(this).data("minwidth")||b.minInputWidth||a(this).width(),d=a(this).data("maxwidth")||b.maxInputWidth||a(this).closest(".tagsinput").width()-b.inputPadding,f=a(this),g=a("<tester/>").css({position:"absolute",top:-9999,left:-9999,width:"auto",fontSize:f.css("fontSize"),fontFamily:f.css("fontFamily"),fontWeight:f.css("fontWeight"),letterSpacing:f.css("letterSpacing"),whiteSpace:"nowrap"}),h=a(this).attr("id")+"_autosize_tester";!a("#"+h).length>0&&(g.attr("id",h),g.appendTo("body")),f.data("minwidth",c),f.data("maxwidth",d),f.data("tester_id",h),f.css("width",c)},a.fn.addTag=function(d,e){return e=jQuery.extend({focus:!1,callback:!0},e),this.each(function(){var f=a(this).attr("id"),g=a(this).val().split(b[f]);if(""==g[0]&&(g=new Array),d=jQuery.trim(d),e.unique){var h=a(this).tagExist(d);1==h&&a("#"+f+"_tag").addClass("not_valid")}else var h=!1;if(""!=d&&1!=h){if(a("<span>").addClass("tag").append(a("<span>").text(d).append("&nbsp;&nbsp;"),a("<a>",{href:"#",title:"Removing tag",text:"x"}).click(function(){return a("#"+f).removeTag(escape(d))})).insertBefore("#"+f+"_addTag"),g.push(d),a("#"+f+"_tag").val(""),e.focus?a("#"+f+"_tag").focus():a("#"+f+"_tag").blur(),a.fn.tagsInput.updateTagsField(this,g),e.callback&&c[f]&&c[f].onAddTag){var i=c[f].onAddTag;i.call(this,d)}if(c[f]&&c[f].onChange){var j=g.length,i=c[f].onChange;i.call(this,a(this),g[j-1])}}}),!1},a.fn.removeTag=function(d){return d=unescape(d),this.each(function(){var e=a(this).attr("id"),f=a(this).val().split(b[e]);for(a("#"+e+"_tagsinput .tag").remove(),str="",i=0;i<f.length;i++)f[i]!=d&&(str=str+b[e]+f[i]);if(a.fn.tagsInput.importTags(this,str),c[e]&&c[e].onRemoveTag){var g=c[e].onRemoveTag;g.call(this,d)}}),!1},a.fn.tagExist=function(c){var d=a(this).attr("id"),e=a(this).val().split(b[d]);return jQuery.inArray(c,e)>=0},a.fn.importTags=function(b){var c=a(this).attr("id");a("#"+c+"_tagsinput .tag").remove(),a.fn.tagsInput.importTags(this,b)},a.fn.tagsInput=function(e){var f=jQuery.extend({interactive:!0,defaultText:"add a tag",minChars:0,width:"300px",height:"100px",autocomplete:{selectFirst:!1},hide:!0,delimiter:",",unique:!0,removeWithBackspace:!0,placeholderColor:"#666666",autosize:!0,comfortZone:20,inputPadding:12},e),g=0;return this.each(function(){if("undefined"===typeof a(this).attr("data-tagsinput-init")){a(this).attr("data-tagsinput-init",!0),f.hide&&a(this).hide();var e=a(this).attr("id");(!e||b[a(this).attr("id")])&&(e=a(this).attr("id","tags"+(new Date).getTime()+g++).attr("id"));var h=jQuery.extend({pid:e,real_input:"#"+e,holder:"#"+e+"_tagsinput",input_wrapper:"#"+e+"_addTag",fake_input:"#"+e+"_tag"},f);b[e]=h.delimiter,(f.onAddTag||f.onRemoveTag||f.onChange)&&(c[e]=new Array,c[e].onAddTag=f.onAddTag,c[e].onRemoveTag=f.onRemoveTag,c[e].onChange=f.onChange);var i='<div id="'+e+'_tagsinput" class="tagsinput"><div id="'+e+'_addTag">';if(f.interactive&&(i=i+'<input id="'+e+'_tag" value="" data-default="'+f.defaultText+'" />'),i+='</div><div class="tags_clear"></div></div>',a(i).insertAfter(this),a(h.holder).css("width",f.width),a(h.holder).css("min-height",f.height),a(h.holder).css("height",f.height),""!=a(h.real_input).val()&&a.fn.tagsInput.importTags(a(h.real_input),a(h.real_input).val()),f.interactive){if(a(h.fake_input).val(a(h.fake_input).attr("data-default")),a(h.fake_input).css("color",f.placeholderColor),a(h.fake_input).resetAutosize(f),a(h.holder).bind("click",h,function(b){a(b.data.fake_input).focus()}),a(h.fake_input).bind("focus",h,function(b){a(b.data.fake_input).val()==a(b.data.fake_input).attr("data-default")&&a(b.data.fake_input).val(""),a(b.data.fake_input).css("color","#000000")}),void 0!=f.autocomplete_url){autocomplete_options={source:f.autocomplete_url};for(attrname in f.autocomplete)autocomplete_options[attrname]=f.autocomplete[attrname];void 0!==jQuery.Autocompleter?(a(h.fake_input).autocomplete(f.autocomplete_url,f.autocomplete),a(h.fake_input).bind("result",h,function(b,c){c&&a("#"+e).addTag(c[0]+"",{focus:!0,unique:f.unique})})):void 0!==jQuery.ui.autocomplete&&(a(h.fake_input).autocomplete(autocomplete_options),a(h.fake_input).bind("autocompleteselect",h,function(b,c){return a(b.data.real_input).addTag(c.item.value,{focus:!0,unique:f.unique}),!1}))}else a(h.fake_input).bind("blur",h,function(b){var c=a(this).attr("data-default");return""!=a(b.data.fake_input).val()&&a(b.data.fake_input).val()!=c?b.data.minChars<=a(b.data.fake_input).val().length&&(!b.data.maxChars||b.data.maxChars>=a(b.data.fake_input).val().length)&&a(b.data.real_input).addTag(a(b.data.fake_input).val(),{focus:!0,unique:f.unique}):(a(b.data.fake_input).val(a(b.data.fake_input).attr("data-default")),a(b.data.fake_input).css("color",f.placeholderColor)),!1});a(h.fake_input).bind("keypress",h,function(b){return d(b)?(b.preventDefault(),b.data.minChars<=a(b.data.fake_input).val().length&&(!b.data.maxChars||b.data.maxChars>=a(b.data.fake_input).val().length)&&a(b.data.real_input).addTag(a(b.data.fake_input).val(),{focus:!0,unique:f.unique}),a(b.data.fake_input).resetAutosize(f),!1):void(b.data.autosize&&a(b.data.fake_input).doAutosize(f))}),h.removeWithBackspace&&a(h.fake_input).bind("keydown",function(b){if(8==b.keyCode&&""==a(this).val()){b.preventDefault();var c=a(this).closest(".tagsinput").find(".tag:last").text(),d=a(this).attr("id").replace(/_tag$/,"");c=c.replace(/[\s]+x$/,""),a("#"+d).removeTag(escape(c)),a(this).trigger("focus")}}),a(h.fake_input).blur(),h.unique&&a(h.fake_input).keydown(function(b){(8==b.keyCode||String.fromCharCode(b.which).match(/\w+|[\xe1\xe9\xed\xf3\xfa\xc1\xc9\xcd\xd3\xda\xf1\xd1,/]+/))&&a(this).removeClass("not_valid")})}}}),this},a.fn.tagsInput.updateTagsField=function(c,d){var e=a(c).attr("id");a(c).val(d.join(b[e]))},a.fn.tagsInput.importTags=function(d,e){a(d).val("");var f=a(d).attr("id"),g=e.split(b[f]);for(i=0;i<g.length;i++)a(d).addTag(g[i],{focus:!1,callback:!1});if(c[f]&&c[f].onChange){var h=c[f].onChange;h.call(d,d,g[i])}};var d=function(b){var c=!1;return 13==b.which?!0:("string"===typeof b.data.delimiter?b.which==b.data.delimiter.charCodeAt(0)&&(c=!0):a.each(b.data.delimiter,function(a,d){b.which==d.charCodeAt(0)&&(c=!0)}),c)}}(jQuery);
/*! MenuSpy v1.0.0 (Nov 29 2016) - http://leocs.me/menuspy/ - Copyright (c) 2016 Leonardo Santos; MIT License */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.MenuSpy=e()}(this,function(){"use strict";var t={extend:function(t,e){for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s]);return t},offset:function(t){var e=t.getBoundingClientRect();return{top:e.top+document.body.scrollTop,left:e.left+document.body.scrollLeft}},scrollTop:function(){return window.pageYOffset||document.documentElement.scrollTop},addClass:function(t,e){if(t.classList)t.classList.add(e);else{var s=t.className.split(" "),o=s.indexOf(e);o===-1&&s.push(e),t.className=s.join(" ")}},removeClass:function(t,e){t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ")},debounce:function(t,e){var s=null;return function(){var o=arguments,n=this;s||(s=setTimeout(function(){return s=0,t.apply(n,o)},e))}}},e=function(e,s){var o=this;
if(e){var n={menuItemSelector:'[data-scroll]',activeClass:"active",threshold:15,hashTimeout:600,callback:null};this.element=e,this.options=t.extend(n,s),this.assignValues(),window.addEventListener("resize",t.debounce(function(){return o.assignValues()})),this.debouncedHashFn=t.debounce(function(){if(history.replaceState)history.replaceState(null,null,"#"+o.lastId);else{var e=t.scrollTop();window.location.hash=o.lastId,window.scrollTo(0,e)}},this.options.hashTimeout),this.cacheItems(),this.scrollFn()}};return e.prototype.assignValues=function(){this.currScrollTop=0,this.lastId="",this.menuHeight=this.element.offsetHeight+this.options.threshold,this.menuItems=[].slice.call(this.element.querySelectorAll(this.options.menuItemSelector))},e.prototype.cacheItems=function(){this.scrollItems=this.menuItems.map(function(e){var s=document.querySelector(e.getAttribute("href"));if(s){var o=t.offset(s).top;return{elm:s,offset:o}}console.warn("MenuSpy warning: %s not found on page.",e.href)}),this.scrollItems=this.scrollItems.filter(Boolean)},e.prototype.tick=function(){var t=this.currScrollTop+this.menuHeight,e=this.scrollItems.filter(function(e){return e.offset<t}).map(function(t){return t.elm});this.activateItem(e.pop())},e.prototype.activateItem=function(e){var s=this,o=e?e.id:"",n=this.options.activeClass,i=this.options.callback;this.lastId!==o&&(this.lastId=o,this.menuItems.forEach(function(l){t.removeClass(l.parentNode,n),l.getAttribute("href")==="#"+o&&(t.addClass(l.parentNode,n),"function"==typeof i&&i.call(s,l,e),s.debouncedHashFn())}))},e.prototype.scrollFn=function(){var e=t.scrollTop();this.currScrollTop!==e&&(this.currScrollTop=e,this.tick()),window.requestAnimationFrame(this.scrollFn.bind(this))},e});

/** Tornado jQuery **/
$(document).ready(function () {
    "use strict";

    /*=== reordering Boxs & columns ===*/
    $(".row > *[data-order],.row-reverse > *[data-order]").each(function () {
        var colOrder = $(this).attr("data-order");
        $(this).css("order", colOrder)
    });

    /*=== Fix Gutter Container Overflow ===*/
    $(".cols-gutter-40").parent().css({
        "padding-right": "20px",
        "padding-left": "20px",
    });

    $(".cols-gutter-50").parent().css({
        "padding-right": "25px",
        "padding-left": "25px",
    });

    /*=== Navigation menu ===*/
    $(".navigation-menu").each(function () {
        $(this).prepend(" <button class='menu-button ti-menu'></button> ");
        $(this).children("ul").not(".mobile-menu").parent().append("<div class='mobile-menu'></div>");
        $(this).append("<span class='overlay-close'></span>");
        var mobileClone = $(this).children("div.mobile-menu");
        $(this).children("ul").not(".mobile-menu").clone().appendTo(mobileClone);
        $(".navigation-menu ul").parent("li").children("a").addClass("submenu ti-arrow-down");
        $(".navigation-menu .megamenu").siblings("a").addClass("submenu ti-arrow-down").parent("li").css("position", "static");
    });
	
    $(".navigation-menu .menu-button,.navigation-menu .overlay-close").on("click", function () {
        $(this).siblings(".mobile-menu").toggleClass("active").siblings(".menu-button").toggleClass("active");
    });
	
    $(".mobile-menu .submenu").on("click", function (mobtnEvent) {
        mobtnEvent.preventDefault();
        $(this).siblings("ul,.megamenu").slideToggle(700);
        $(this).parent("li").toggleClass("active").siblings("li").removeClass("active").children("ul,.megamenu").slideUp(700);
    });
	
    $(".sticky-navbar,[data-sticky]").stick_in_parent();
	
    $(".sticky-footer").each(function () {
        var stickyFooter = $(this).height();
        $(this).parent().css({
            "padding-bottom": stickyFooter + "px",
            "position": "relative",
        });
    });

    /*=== Dropdowns ===*/
    $(".dropdown-btn").each(function () {
        var dropdownbg = $(this).css("background-color");
        var dropdowncolor = $(this).css("color");
        $(this).next(".dropdown").css({
            "background-color": dropdownbg,
            "color": dropdowncolor
        }).parent().css("position", "relative");

        $(this).next(".dropdown").find("a").css({
            "color": dropdowncolor
        });

        $(this).click(function (e) {
            e.preventDefault();
            $(this).next(".dropdown").slideToggle(300).toggleClass("opened")
        });
    });

    /*=== Close if clicks outside ===*/
    window.onclick = function (event) {
        if (!event.target.matches('.dropdown-btn')) {
            var dropdowns = document.getElementsByClassName("opened");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('opened')) {
                    $(".opened").fadeOut(350);
                    openDropdown.classList.remove('opened');
                }
            }
        }
    }
    
    /*=== Forms ===*/
    $("*[placeholder]").each(function () {
        var placeHold = $(this).attr("placeholder");
        $(this).on({
            focusin: function () {
                $(this).attr("placeholder", " ");
            },
            
            focusout: function () {
                $(this).attr("placeholder", placeHold);
            }
        })
    });
    
    $('[type="date"],.datepicker').datepicker({
        autoHide:true,
        zIndex:99,
    });
    
    $(".file-input input[type='file']").on("change", function (){
        var filePath = [];
        for (var i = 0; i < $(this).get(0).files.length; ++i) {
            filePath.push($(this).get(0).files[i].name);
        }
        $(this).siblings(".file-path").val(filePath); 
    });
    
    $('.tags-input').tagsInput({
		'height':'auto',
		'width':'100%',
	})
	
	$(".range-slider").each(function(){
		var dataMin = $(this).attr("data-min");
		var dataMax = $(this).attr("data-max");
		var rangeWidth = $(this).parent().innerWidth();
		$(this).jRange({
			from: dataMin,
			to: dataMax,
			step: 1,
			scale: [dataMin,dataMax],
			format: '%s',
			width:rangeWidth -15,
			showLabels: true,
			snap:true,
		});
	});
	
	/*=== Tooltip ===*/
	$(".tooltip").each(function (){
		var tooltipTitle = $(this).attr("title");
		$(this).append("<a href='javascript:void(0)' class='tooltip-box'>" + tooltipTitle + "</a>");
		$(this).removeAttr("title");
	});
	
	/*=== accordion ===*/
	$(".accordion-title").on("click", function(){
		$(this).toggleClass("active").siblings(".accordion-title").removeClass("active");
		$(this).next(".accordion-content").slideToggle(350).toggleClass("active").siblings(".accordion-content").slideUp(350).removeClass("active");
	});
	
	/*=== Tabs System ===*/
	$(".tabs-menu li").on("click", function (){
		var tabID = $(this).attr("data-tab");
		$(this).addClass("active").siblings().removeClass("active");
		$("#" + tabID).fadeIn(500).addClass("active").siblings(".tab-content").fadeOut(0).removeClass("active");
	});
	
	/*=== Modals ===*/
	$(".modal-box").each(function (){
		$(this).prepend("<span class='modal-overlay'></span>");
	});
	
	$("[data-modal]").on("click", function(){
		$('a[data-modal]').attr('href','javascript:void(0)');
		var modalName = $(this).attr("data-modal");
		$("#" + modalName).toggleClass("active");
	});
	
	$(".modal-box .modal-overlay,.modal-box .close-modal").on("click", function(){
		$('a.close-modal').attr('href','javascript:void(0)');
		$(".modal-box").removeClass("active");
	});
	
	
    /*=== Smoth Scroll ===*/
    $('[data-scroll]').on('click', function (smothScroll) {
        var smothScrollTarget = $(this.getAttribute('href'));
        var fixedHeader = $("*[data-fixed]").height();
        if (smothScrollTarget.length) {
            smothScroll.preventDefault();
            $('html, body').stop().animate({
                scrollTop: smothScrollTarget.offset().top - fixedHeader
            }, 1000);
        }
    });
	
	var elm = document.querySelector('*[data-fixed],.MenuSpy-Wraper');
	var ms = new MenuSpy(elm);
    
    /* === Fire Scroll ===*/
    $("[data-vp]").each(function () {
        var vpOffset = $(this).attr("data-vp");
        var vpAnimation = $(this).attr("data-animation");
        var vpDelay = $(this).att("data-delay");
        $(this).viewportChecker({
            classToAdd: "viewActive " + vpAnimation,
            offset: vpOffset,
            removeClassAfterAnimation: false,
        });
        
        $(this).css({
            "-webkit-animation-delay": vpDelay + "ms",
            "animation-delay": vpDelay + "ms",
        });
    });
    
    
    
    
    
    
})