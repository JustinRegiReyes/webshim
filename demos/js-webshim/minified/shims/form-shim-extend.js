(!Modernizr.formvalidation||webshims.bugs.bustedValidity)&&webshims.register("form-shim-extend",function(e,t,i,n,a,r){"use strict";t.inputTypes=t.inputTypes||{};var o,s=t.cfg.forms,l=t.bugs,u=function(e){return"number"==typeof e||e&&e==1*e},c=t.inputTypes,p={radio:1,checkbox:1},d=function(e){return(e.getAttribute("type")||e.type||"").toLowerCase()};(function(){if("querySelector"in n){try{l.findRequired=!e('<form action="#" style="width: 1px; height: 1px; overflow: hidden;"><select name="b" required="" /></form>')[0].querySelector("select:required")}catch(t){l.findRequired=!1}(l.bustedValidity||l.findRequired)&&function(){var t=e.find,i=e.find.matchesSelector,a=/(\:valid|\:invalid|\:optional|\:required|\:in-range|\:out-of-range)(?=[\s\[\~\.\+\>\:\#*]|$)/gi,r=function(e){return e+"-element"};e.find=function(){var e=Array.prototype.slice,i=function(i){var n=arguments;return n=e.call(n,1,n.length),n.unshift(i.replace(a,r)),t.apply(this,n)};for(var n in t)t.hasOwnProperty(n)&&(i[n]=t[n]);return i}(),(!Modernizr.prefixed||Modernizr.prefixed("matchesSelector",n.documentElement))&&(e.find.matchesSelector=function(e,t){return t=t.replace(a,r),i.call(this,e,t)})}()}})(),t.addInputType=function(e,t){c[e]=t};var f={customError:!1,typeMismatch:!1,badInput:!1,rangeUnderflow:!1,rangeOverflow:!1,stepMismatch:!1,tooLong:!1,patternMismatch:!1,valueMissing:!1,valid:!0},h=function(t){if("select-one"==t.type&&2>t.size){var i=e("> option:first-child",t);return!!i.prop("selected")}return!1},m=t.modules,v=e([]),g=function(t){t=e(t);var i,a,r=v;return"radio"==t[0].type&&(a=t.prop("form"),i=t[0].name,r=i?a?e(a[i]):e(n.getElementsByName(i)).filter(function(){return!e.prop(this,"form")}):t,r=r.filter('[type="radio"]')),r},y={valueMissing:function(e,t,i){if(!e.prop("required"))return!1;var n=!1;return"type"in i||(i.type=d(e[0])),n="select"==i.nodeName?!t&&(0>e[0].selectedIndex||h(e[0])):p[i.type]?"checkbox"==i.type?!e.is(":checked"):!g(e).filter(":checked")[0]:!t},tooLong:function(){return!1},patternMismatch:function(e,i,n){if(""===i||"select"==n.nodeName)return!1;var a=e.attr("pattern");if(!a)return!1;try{a=RegExp("^(?:"+a+")$")}catch(r){t.error('invalid pattern value: "'+a+'" | '+r),a=!1}return a?!a.test(i):!1}};e.each({typeMismatch:"mismatch",badInput:"bad"},function(e,t){y[e]=function(i,n,a){if(""===n||"select"==a.nodeName)return!1;var r=!1;return"type"in a||(a.type=d(i[0])),c[a.type]&&c[a.type][t]?r=c[a.type][t](n,i):"validity"in i[0]&&"name"in i[0].validity&&(r=i[0].validity[e]||!1),r}}),t.addValidityRule=function(e,t){y[e]=t},e.event.special.invalid={add:function(){e.event.special.invalid.setup.call(this.form||this)},setup:function(){var i=this.form||this;return e.data(i,"invalidEventShim")?(i=null,a):(e(i).data("invalidEventShim",!0).on("submit",e.event.special.invalid.handler),t.moveToFirstEvent(i,"submit"),t.bugs.bustedValidity&&e.nodeName(i,"form")&&function(){var e=i.getAttribute("novalidate");i.setAttribute("novalidate","novalidate"),t.data(i,"bustedNoValidate",null==e?null:e)}(),i=null,a)},teardown:e.noop,handler:function(t){if("submit"==t.type&&!t.testedValidity&&t.originalEvent&&e.nodeName(t.target,"form")&&!e.prop(t.target,"noValidate")){o=!0,t.testedValidity=!0;var i=!e(t.target).checkValidity();return i?(t.stopImmediatePropagation(),o=!1,!1):(o=!1,a)}}};var b=!("submitBubbles"in e.support)||e.support.submitBubbles,w=function(t){b||!t||"object"!=typeof t||t._submit_attached||(e.event.add(t,"submit._submit",function(e){e._submit_bubble=!0}),t._submit_attached=!0)};!b&&e.event.special.submit&&(e.event.special.submit.setup=function(){return e.nodeName(this,"form")?!1:(e.event.add(this,"click._submit keypress._submit",function(t){var i=t.target,n=e.nodeName(i,"input")||e.nodeName(i,"button")?e.prop(i,"form"):a;w(n)}),a)}),e.event.special.submit=e.event.special.submit||{setup:function(){return!1}};var T=e.event.special.submit.setup;e.extend(e.event.special.submit,{setup:function(){return e.nodeName(this,"form")?e(this).on("invalid",e.noop):e("form",this).on("invalid",e.noop),T.apply(this,arguments)}}),e(i).on("invalid",e.noop),t.addInputType("email",{mismatch:function(){var e=s.emailReg||/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;return function(t){if(i.punycode&&punycode.toASCII)try{if(e.test(punycode.toASCII(t)))return!1}catch(n){}return!e.test(t)}}()}),t.addInputType("url",{mismatch:function(){var e=s.urlReg||/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;return function(t){return!e.test(t)}}()}),t.defineNodeNameProperty("input","type",{prop:{get:function(){var e=this,i=(e.getAttribute("type")||"").toLowerCase();return t.inputTypes[i]?i:e.type}}}),t.defineNodeNamesProperties(["button","fieldset","output"],{checkValidity:{value:function(){return!0}},willValidate:{value:!1},setCustomValidity:{value:e.noop},validity:{writeable:!1,get:function(){return e.extend({},f)}}},"prop");var N=function(i){var n,a=e.prop(i,"validity");if(!a)return!0;if(e.data(i,"cachedValidity",a),!a.valid){n=e.Event("invalid");var r=e(i).trigger(n);!o||N.unhandledInvalids||n.isDefaultPrevented()||(t.validityAlert.showFor(r),N.unhandledInvalids=!0)}return e.removeData(i,"cachedValidity"),a.valid},x=/^(?:select|textarea|input)/i;if(t.defineNodeNameProperty("form","checkValidity",{prop:{value:function(){var i=!0,n=e(e.prop(this,"elements")).filter(function(){if(!x.test(this.nodeName))return!1;var e=t.data(this,"shadowData");return!e||!e.nativeElement||e.nativeElement===this});N.unhandledInvalids=!1;for(var a=0,r=n.length;r>a;a++)N(n[a])||(i=!1);return i}}}),t.defineNodeNamesProperties(["input","textarea","select"],{checkValidity:{value:function(){return N.unhandledInvalids=!1,N(e(this).getNativeElement()[0])}},setCustomValidity:{value:function(i){e.removeData(this,"cachedValidity"),t.data(this,"customvalidationMessage",""+i)}},willValidate:{writeable:!1,get:function(){var t={button:1,reset:1,hidden:1,image:1};return function(){var i=e(this).getNativeElement()[0];return!(i.disabled||i.readOnly||t[i.type])}}()},validity:{writeable:!1,get:function(){var i=e(this).getNativeElement(),n=i[0],a=e.data(n,"cachedValidity");if(a)return a;if(a=e.extend({},f),!e.prop(n,"willValidate")||"submit"==n.type)return a;var r=i.val(),o={nodeName:n.nodeName.toLowerCase()};return a.customError=!!t.data(n,"customvalidationMessage"),a.customError&&(a.valid=!1),e.each(y,function(e,t){t(i,r,o)&&(a[e]=!0,a.valid=!1)}),e(this).getShadowFocusElement().attr("aria-invalid",a.valid?"false":"true"),i=null,n=null,a}}},"prop"),t.defineNodeNamesBooleanProperty(["input","textarea","select"],"required",{set:function(t){e(this).getShadowFocusElement().attr("aria-required",!!t+"")},initAttr:Modernizr.localstorage}),t.reflectProperties(["input"],["pattern"]),!("maxLength"in n.createElement("textarea"))){var E=function(){var t,i=0,n=e([]),a=1e9,r=function(){var e=n.prop("value"),t=e.length;t>i&&t>a&&(t=Math.max(i,a),n.prop("value",e.substr(0,t))),i=t},o=function(){clearTimeout(t),n.unbind(".maxlengthconstraint")};return function(s,l){o(),l>-1&&(a=l,i=e.prop(s,"value").length,n=e(s),n.on({"keydown.maxlengthconstraint keypress.maxlengthconstraint paste.maxlengthconstraint cut.maxlengthconstraint":function(){setTimeout(r,0)},"keyup.maxlengthconstraint":r,"blur.maxlengthconstraint":o}),t=setInterval(r,200))}}();E.update=function(t,i){e(t).is(":focus")&&(i||(i=e.prop(t,"maxlength")),E(t,i))},e(n).on("focusin",function(t){var i;"TEXTAREA"==t.target.nodeName&&(i=e.prop(t.target,"maxlength"))>-1&&E(t.target,i)}),t.defineNodeNameProperty("textarea","maxlength",{attr:{set:function(e){this.setAttribute("maxlength",""+e),E.update(this)},get:function(){var e=this.getAttribute("maxlength");return null==e?a:e}},prop:{set:function(e){if(u(e)){if(0>e)throw"INDEX_SIZE_ERR";return e=parseInt(e,10),this.setAttribute("maxlength",e),E.update(this,e),a}this.setAttribute("maxlength","0"),E.update(this,0)},get:function(){var e=this.getAttribute("maxlength");return u(e)&&e>=0?parseInt(e,10):-1}}}),t.defineNodeNameProperty("textarea","maxLength",{prop:{set:function(t){e.prop(this,"maxlength",t)},get:function(){return e.prop(this,"maxlength")}}})}var A={submit:1,button:1,image:1},k={};[{name:"enctype",limitedTo:{"application/x-www-form-urlencoded":1,"multipart/form-data":1,"text/plain":1},defaultProp:"application/x-www-form-urlencoded",proptype:"enum"},{name:"method",limitedTo:{get:1,post:1},defaultProp:"get",proptype:"enum"},{name:"action",proptype:"url"},{name:"target"},{name:"novalidate",propName:"noValidate",proptype:"boolean"}].forEach(function(t){var i="form"+(t.propName||t.name).replace(/^[a-z]/,function(e){return e.toUpperCase()}),a="form"+t.name,r=t.name,o="click.webshimssubmittermutate"+r,s=function(){var n=this;if("form"in n&&A[n.type]){var o=e.prop(n,"form");if(o){var s=e.attr(n,a);if(null!=s&&(!t.limitedTo||s.toLowerCase()===e.prop(n,i))){var l=e.attr(o,r);e.attr(o,r,s),setTimeout(function(){if(null!=l)e.attr(o,r,l);else try{e(o).removeAttr(r)}catch(t){o.removeAttribute(r)}},9)}}}};switch(t.proptype){case"url":var l=n.createElement("form");k[i]={prop:{set:function(t){e.attr(this,a,t)},get:function(){var t=e.attr(this,a);return null==t?"":(l.setAttribute("action",t),l.action)}}};break;case"boolean":k[i]={prop:{set:function(t){t=!!t,t?e.attr(this,"formnovalidate","formnovalidate"):e(this).removeAttr("formnovalidate")},get:function(){return null!=e.attr(this,"formnovalidate")}}};break;case"enum":k[i]={prop:{set:function(t){e.attr(this,a,t)},get:function(){var i=e.attr(this,a);return!i||(i=i.toLowerCase())&&!t.limitedTo[i]?t.defaultProp:i}}};break;default:k[i]={prop:{set:function(t){e.attr(this,a,t)},get:function(){var t=e.attr(this,a);return null!=t?t:""}}}}k[a]||(k[a]={}),k[a].attr={set:function(t){k[a].attr._supset.call(this,t),e(this).unbind(o).on(o,s)},get:function(){return k[a].attr._supget.call(this)}},k[a].initAttr=!0,k[a].removeAttr={value:function(){e(this).unbind(o),k[a].removeAttr._supvalue.call(this)}}}),t.defineNodeNamesProperties(["input","button"],k),e.support.getSetAttribute||null!=e("<form novalidate></form>").attr("novalidate")?t.bugs.bustedValidity&&(t.defineNodeNameProperty("form","novalidate",{attr:{set:function(e){t.data(this,"bustedNoValidate",""+e)},get:function(){var e=t.data(this,"bustedNoValidate");return null==e?a:e}},removeAttr:{value:function(){t.data(this,"bustedNoValidate",null)}}}),e.each(["rangeUnderflow","rangeOverflow","stepMismatch"],function(e,t){y[t]=function(e){return(e[0].validity||{})[t]||!1}})):t.defineNodeNameProperty("form","novalidate",{attr:{set:function(e){this.setAttribute("novalidate",""+e)},get:function(){var e=this.getAttribute("novalidate");return null==e?a:e}}}),t.defineNodeNameProperty("form","noValidate",{prop:{set:function(t){t=!!t,t?e.attr(this,"novalidate","novalidate"):e(this).removeAttr("novalidate")},get:function(){return null!=e.attr(this,"novalidate")}}}),Modernizr.inputtypes.date&&/webkit/i.test(navigator.userAgent)&&function(){var t={updateInput:1,input:1},i={date:1,time:1,month:1,week:1,"datetime-local":1},a={focusout:1,blur:1},r={updateInput:1,change:1},o=function(e){var i,n,o=!0,s=e.prop("value"),l=s,u=function(i){if(e){var n=e.prop("value");n!==s&&(s=n,i&&t[i.type]||e.trigger("input")),i&&r[i.type]&&(l=n),o||n===l||e.trigger("change")}},c=function(){clearTimeout(n),n=setTimeout(u,9)},p=function(t){clearInterval(i),setTimeout(function(){t&&a[t.type]&&(o=!1),e&&(e.unbind("focusout blur",p).unbind("input change updateInput",u),u()),e=null},1)};clearInterval(i),i=setInterval(u,160),c(),e.off({"focusout blur":p,"input change updateInput":u}).on({"focusout blur":p,"input updateInput change":u})};e(n).on("focusin",function(t){t.target&&i[t.target.type]&&!t.target.readOnly&&!t.target.disabled&&o(e(t.target))})}(),t.addReady(function(t,i){var a;e("form",t).add(i.filter("form")).bind("invalid",e.noop);try{t!=n||"form"in(n.activeElement||{})||(a=e("input[autofocus], select[autofocus], textarea[autofocus]",t).eq(0).getShadowFocusElement()[0],a&&a.offsetHeight&&a.offsetWidth&&a.focus())}catch(r){}}),Modernizr.input.list||t.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var i,n=this,a=e("select",n);return a[0]?i=a[0].options:(i=e("option",n).get(),i.length&&t.warn("you should wrap your option-elements for a datalist in a select element to support IE and other old browsers.")),i}}}),Modernizr.formattribute!==!1&&Modernizr.fieldsetdisabled||function(){(function(t,i){e.prop=function(a,r,o){var s;return a&&1==a.nodeType&&o===i&&e.nodeName(a,"form")&&a.id&&(s=n.getElementsByName(r),s&&s.length||(s=n.getElementById(r)),s&&(s=e(s).filter(function(){return e.prop(this,"form")==a}).get(),s.length))?1==s.length?s[0]:s:t.apply(this,arguments)}})(e.prop,a);var i=function(t){var i=e.data(t,"webshimsAddedElements");i&&(i.remove(),e.removeData(t,"webshimsAddedElements"))};if(Modernizr.formattribute||(t.defineNodeNamesProperty(["input","textarea","select","button","fieldset"],"form",{prop:{get:function(){var i=t.contentAttr(this,"form");return i&&(i=n.getElementById(i),i&&!e.nodeName(i,"form")&&(i=null)),i||this.form},writeable:!1}}),t.defineNodeNamesProperty(["form"],"elements",{prop:{get:function(){var t=this.id,i=e.makeArray(this.elements);return t&&(i=e(i).add('input[form="'+t+'"], select[form="'+t+'"], textarea[form="'+t+'"], button[form="'+t+'"], fieldset[form="'+t+'"]').not(".webshims-visual-hide > *").get()),i},writeable:!1}}),e(function(){var t=function(e){e.stopPropagation()},a={image:1,submit:1};e(n).on("submit",function(t){if(!t.isDefaultPrevented()){var n,a=t.target,r=a.id;r&&(i(a),n=e('input[form="'+r+'"], select[form="'+r+'"], textarea[form="'+r+'"]').filter(function(){return!this.disabled&&this.name&&this.form!=a}).clone(),n.length&&(e.data(a,"webshimsAddedElements",e('<div class="webshims-visual-hide" />').append(n).appendTo(a)),setTimeout(function(){i(a)},9)),n=null)}}),e(n).on("click",function(i){if(a[i.target.type]&&!i.isDefaultPrevented()&&e(i.target).is("input[form], button[form]")){var n,r=e.prop(i.target,"form"),o=i.target.form;r&&r!=o&&(n=e(i.target).clone().removeAttr("form").addClass("webshims-visual-hide").on("click",t).appendTo(r),o&&i.preventDefault(),w(r),n.trigger("click"),setTimeout(function(){n.remove(),n=null},9))}})})),Modernizr.fieldsetdisabled||t.defineNodeNamesProperty(["fieldset"],"elements",{prop:{get:function(){return e("input, select, textarea, button, fieldset",this).get()||[]},writeable:!1}}),!e.fn.finish&&1.9>parseFloat(e.fn.jquery,10)){var r=/\r?\n/g,o=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,s=/^(?:select|textarea)/i;e.fn.serializeArray=function(){return this.map(function(){var t=e.prop(this,"elements");return t?e.makeArray(t):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||s.test(this.nodeName)||o.test(this.type))}).map(function(t,i){var n=e(this).val();return null==n?null:e.isArray(n)?e.map(n,function(e){return{name:i.name,value:e.replace(r,"\r\n")}}):{name:i.name,value:n.replace(r,"\r\n")}}).get()}}}(),null==e("<input />").prop("labels")&&t.defineNodeNamesProperty("button, input, keygen, meter, output, progress, select, textarea","labels",{prop:{get:function(){if("hidden"==this.type)return null;var t=this.id,i=e(this).closest("label").filter(function(){var e=this.attributes["for"]||{};return!e.specified||e.value==t});return t&&(i=i.add('label[for="'+t+'"]')),i.get()},writeable:!1}}),"value"in n.createElement("progress")||function(){var i=parseInt("NaN",10),n=function(t){var i;i=e.prop(t,"position"),e.attr(t,"data-position",i),e("> span",t).css({width:(0>i?100:100*i)+"%"})},a={position:{prop:{get:function(){var t,a=this.getAttribute("value"),r=-1;return a=a?1*a:i,isNaN(a)?n.isInChange&&e(this).removeAttr("aria-valuenow"):(t=e.prop(this,"max"),r=Math.max(Math.min(a/t,1),0),n.isInChange&&(e.attr(this,"aria-valuenow",100*r),"max"==n.isInChange&&e.attr(this,"aria-valuemax",t))),r},writeable:!1}}};e.each({value:0,max:1},function(i,r){var o="value"==i&&!e.fn.finish;a[i]={attr:{set:function(e){var t=a[i].attr._supset.call(this,e);return n.isInChange=i,n(this),n.isInChange=!1,t}},removeAttr:{value:function(){if(this.removeAttribute(i),o)try{delete this.value}catch(e){}n.isInChange=i,n(this),n.isInChange=!1}},prop:{get:function(){var t=1*a[i].attr.get.call(this);return 0>t||isNaN(t)?t=r:"value"==i?t=Math.min(t,e.prop(this,"max")):0===t&&(t=r),t},set:function(e){return e=1*e,isNaN(e)&&t.error("Floating-point value is not finite."),a[i].attr.set.call(this,e)}}}}),t.createElement("progress",function(){var i=e(this).attr({role:"progressbar","aria-valuemin":"0"}).html('<span class="progress-value" />').jProp("labels").map(function(){return t.getID(this)}).get();i.length?e.attr(this,"aria-labelledby",i.join(" ")):t.info("you should use label elements for your prgogress elements"),n.isInChange="max",n(this),n.isInChange=!1},a)}();try{n.querySelector(":checked")}catch(S){(function(){e("html").addClass("no-csschecked");var i={radio:1,checkbox:1},a=function(){var t,i,n,a=this.options||[];for(t=0,i=a.length;i>t;t++)n=e(a[t]),n[e.prop(a[t],"selected")?"addClass":"removeClass"]("prop-checked")},r=function(){var t,i=e.prop(this,"checked")?"addClass":"removeClass",n=this.className||"";-1==n.indexOf("prop-checked")==("addClass"==i)&&(e(this)[i]("prop-checked"),(t=this.parentNode)&&(t.className=t.className))};t.onNodeNamesPropertyModify("select","value",a),t.onNodeNamesPropertyModify("select","selectedIndex",a),t.onNodeNamesPropertyModify("option","selected",function(){e(this).closest("select").each(a)}),t.onNodeNamesPropertyModify("input","checked",function(t,n){var a=this.type;"radio"==a&&n?g(this).each(r):i[a]&&e(this).each(r)}),e(n).on("change",function(t){i[t.target.type]?"radio"==t.target.type?g(t.target).each(r):e(t.target)[e.prop(t.target,"checked")?"addClass":"removeClass"]("prop-checked"):"select"==t.target.nodeName.toLowerCase()&&e(t.target).each(a)}),t.addReady(function(t,n){e("option, input",t).add(n.filter("option, input")).each(function(){var t;i[this.type]?t="checked":"option"==this.nodeName.toLowerCase()&&(t="selected"),t&&e(this)[e.prop(this,t)?"addClass":"removeClass"]("prop-checked")})})})()}(function(){var n;if(Modernizr.textareaPlaceholder=!!("placeholder"in e("<textarea />")[0]),Modernizr.input.placeholder&&r.overridePlaceholder&&(n=!0),Modernizr.input.placeholder&&Modernizr.textareaPlaceholder&&!n)return function(){var t=navigator.userAgent;-1!=t.indexOf("Mobile")&&-1!=t.indexOf("Safari")&&e(i).on("orientationchange",function(){var t,i=function(e,t){return t},n=function(){e("input[placeholder], textarea[placeholder]").attr("placeholder",i)};return function(){clearTimeout(t),t=setTimeout(n,9)}}())}(),a;var o="over"==t.cfg.forms.placeholderType,s=t.cfg.forms.responsivePlaceholder,l=["textarea"];t.debug!==!1,(!Modernizr.input.placeholder||n)&&l.push("input");var u=function(e){try{if(e.setSelectionRange)return e.setSelectionRange(0,0),!0;if(e.createTextRange){var t=e.createTextRange();return t.collapse(!0),t.moveEnd("character",0),t.moveStart("character",0),t.select(),!0}}catch(i){}},c=function(t,i,n,r){if(n===!1&&(n=e.prop(t,"value")),o||"password"==t.type){if(!n&&r)return e(t).off(".placeholderremove").on({"keydown.placeholderremove keypress.placeholderremove paste.placeholderremove input.placeholderremove":function(n){(!n||17!=n.keyCode&&16!=n.keyCode)&&(i.box.removeClass("placeholder-visible"),e(t).unbind(".placeholderremove"))},"blur.placeholderremove":function(){e(t).unbind(".placeholderremove")}}),a}else{if(!n&&r&&u(t)){var s=setTimeout(function(){u(t)},9);return e(t).off(".placeholderremove").on({"keydown.placeholderremove keypress.placeholderremove paste.placeholderremove input.placeholderremove":function(n){(!n||17!=n.keyCode&&16!=n.keyCode)&&(t.value=e.prop(t,"value"),i.box.removeClass("placeholder-visible"),clearTimeout(s),e(t).unbind(".placeholderremove"))},"mousedown.placeholderremove drag.placeholderremove select.placeholderremove":function(){u(t),clearTimeout(s),s=setTimeout(function(){u(t)},9)},"blur.placeholderremove":function(){clearTimeout(s),e(t).unbind(".placeholderremove")}}),a}r||n||!t.value||(t.value=n)}i.box.removeClass("placeholder-visible")},p=function(t,i,n){n===!1&&(n=e.prop(t,"placeholder")),o||"password"==t.type||(t.value=n),i.box.addClass("placeholder-visible")},d=function(t,i,n,r,s){if(r||(r=e.data(t,"placeHolder"))){var l=e(t).hasClass("placeholder-visible");return n===!1&&(n=e.attr(t,"placeholder")||""),e(t).unbind(".placeholderremove"),i===!1&&(i=e.prop(t,"value")),i||"focus"!=s&&(s||!e(t).is(":focus"))?i?(c(t,r,i),a):(n&&!i?p(t,r,n):c(t,r,i),a):(("password"==t.type||o||l)&&c(t,r,"",!0),a)}},f=function(t){return t=e(t),!!(t.prop("title")||t.attr("aria-labelledby")||t.attr("aria-label")||t.jProp("labels").length)},h=function(t){return t=e(t),e(f(t)?'<span class="placeholder-text"></span>':'<label for="'+t.prop("id")+'" class="placeholder-text"></label>')},v=function(){var n={text:1,search:1,url:1,email:1,password:1,tel:1,number:1};return m["form-number-date-ui"].loaded&&delete n.number,{create:function(t){var n,a,r=e.data(t,"placeHolder");if(r)return r;if(r=e.data(t,"placeHolder",{}),e(t).on("focus.placeholder blur.placeholder",function(e){d(this,!1,!1,r,e.type),r.box["focus"==e.type?"addClass":"removeClass"]("placeholder-focused")}),(n=e.prop(t,"form"))&&e(t).onWSOff("reset.placeholder",function(e){setTimeout(function(){d(t,!1,!1,r,e.type)},0)},!1,n),"password"==t.type||o)r.text=h(t),s||e(t).is(".responsive-width")||-1!=(t.currentStyle||{width:""}).width.indexOf("%")?(a=!0,r.box=r.text):r.box=e(t).wrap('<span class="placeholder-box placeholder-box-'+(t.nodeName||"").toLowerCase()+" placeholder-box-"+e.css(t,"float")+'" />').parent(),r.text.insertAfter(t).on("mousedown.placeholder",function(){d(this,!1,!1,r,"focus");try{setTimeout(function(){t.focus()},0)}catch(e){}return!1}),e.each(["lineHeight","fontSize","fontFamily","fontWeight"],function(i,n){var a=e.css(t,n);r.text.css(n)!=a&&r.text.css(n,a)}),e.each(["Left","Top"],function(i,n){var a=(parseInt(e.css(t,"padding"+n),10)||0)+Math.max(parseInt(e.css(t,"margin"+n),10)||0,0)+(parseInt(e.css(t,"border"+n+"Width"),10)||0);r.text.css("padding"+n,a)}),e(t).onWSOff("updateshadowdom",function(){var i,n;((n=t.offsetWidth)||(i=t.offsetHeight))&&r.text.css({width:n,height:i}).css(e(t).position())},!0);else{var l=function(i){e(t).hasClass("placeholder-visible")&&(c(t,r,""),setTimeout(function(){(!i||"submit"!=i.type||i.isDefaultPrevented())&&d(t,!1,!1,r)},9))};e(t).onWSOff("beforeunload",l,!1,i),r.box=e(t),n&&e(t).onWSOff("submit",l,!1,n)}return r},update:function(i,r){var o=(e.attr(i,"type")||e.prop(i,"type")||"").toLowerCase();if(!n[o]&&!e.nodeName(i,"textarea"))return t.warn('placeholder not allowed on input[type="'+o+'"], but it is a good fallback :-)'),a;var s=v.create(i);s.text&&s.text.text(r),d(i,!1,r,s)}}}();e.webshims.publicMethods={pHolder:v},l.forEach(function(e){t.defineNodeNameProperty(e,"placeholder",{attr:{set:function(e){var i=this;n?(t.data(i,"bustedPlaceholder",e),i.placeholder=""):t.contentAttr(i,"placeholder",e),v.update(i,e)},get:function(){var e;return n&&(e=t.data(this,"bustedPlaceholder")),e||t.contentAttr(this,"placeholder")}},reflect:!0,initAttr:!0})}),l.forEach(function(i){var a,r={};["attr","prop"].forEach(function(i){r[i]={set:function(r){var o,s=this;n&&(o=t.data(s,"bustedPlaceholder")),o||(o=t.contentAttr(s,"placeholder")),e.removeData(s,"cachedValidity");var l=a[i]._supset.call(s,r);return o&&"value"in s&&d(s,r,o),l},get:function(){var t=this;return e(t).hasClass("placeholder-visible")?"":a[i]._supget.call(t)}}}),a=t.defineNodeNameProperty(i,"value",r)})})(),function(){var i=n;if(!("value"in n.createElement("output"))){t.defineNodeNameProperty("output","value",{prop:{set:function(t){var i=e.data(this,"outputShim");i||(i=a(this)),i(t)},get:function(){return t.contentAttr(this,"value")||e(this).text()||""}}}),t.onNodeNamesPropertyModify("input","value",function(t,i,n){if("removeAttr"!=n){var a=e.data(this,"outputShim");a&&a(t)}});var a=function(a){if(!a.getAttribute("aria-live")){a=e(a);var r=(a.text()||"").trim(),o=a.prop("id"),s=a.attr("for"),l=e('<input class="output-shim" type="text" disabled name="'+(a.attr("name")||"")+'" value="'+r+'" style="display: none !important;" />').insertAfter(a);l[0].form||i;var u=function(e){l[0].value=e,e=l[0].value,a.text(e),t.contentAttr(a[0],"value",e)};return a[0].defaultValue=r,t.contentAttr(a[0],"value",r),a.attr({"aria-live":"polite"}),o&&(l.attr("id",o),a.attr("aria-labelledby",a.jProp("labels").map(function(){return t.getID(this)}).get().join(" "))),s&&(o=t.getID(a),s.split(" ").forEach(function(e){e=n.getElementById(e),e&&e.setAttribute("aria-controls",o)})),a.data("outputShim",u),l.data("outputShim",u),u}};t.addReady(function(t,i){e("output",t).add(i.filter("output")).each(function(){a(this)})}),function(){var n={updateInput:1,input:1},a={radio:1,checkbox:1,submit:1,button:1,image:1,reset:1,file:1,color:1},r=function(e){var i,a,r=e.prop("value"),o=function(i){if(e){var a=e.prop("value");a!==r&&(r=a,i&&n[i.type]||t.triggerInlineForm&&t.triggerInlineForm(e[0],"input"))}},s=function(){clearTimeout(a),a=setTimeout(o,9)},l=function(){e.unbind("focusout",l).unbind("keyup keypress keydown paste cut",s).unbind("input change updateInput",o),clearInterval(i),setTimeout(function(){o(),e=null},1)};clearInterval(i),i=setInterval(o,200),s(),e.on({"keyup keypress keydown paste cut":s,focusout:l,"input updateInput change":o})};e(i).on("focusin",function(i){!i.target||i.target.readOnly||i.target.disabled||"input"!=(i.target.nodeName||"").toLowerCase()||a[i.target.type]||(t.data(i.target,"implemented")||{}).inputwidgets||r(e(i.target))})}()}}()});