parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"../../../../moduleWrappers/goosemod/toast.js":[function(require,module,exports) {
module.exports=goosemodScope.showToast;
},{}],"../../../../moduleWrappers/goosemod/patcher.js":[function(require,module,exports) {
module.exports=goosemodScope.patcher;
},{}],"../../../../moduleWrappers/goosemod/plugin.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=n(require("@goosemod/toast")),t=require("@goosemod/patcher");function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach(function(t){s(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var i=function(){function n(){var e=this;c(this,n),s(this,"goosemodHandlers",{onImport:function(){e.onImport()},onRemove:function(){e.patches.forEach(function(e){return e()}),e.stylesheets.forEach(function(e){return e.remove()}),e.commands.forEach(function(e){return t.commands.remove(e)}),e.onRemove()}}),this.patches=[],this.commands=[],this.stylesheets=[]}return u(n,[{key:"command",value:function(){this.commands.push(arguments.length<=0?void 0:arguments[0]),t.commands.add.apply(t.commands,arguments)}},{key:"enqueueUnpatch",value:function(e){this.patches.push(e)}},{key:"addCss",value:function(e){var t=document.createElement("style");t.appendChild(document.createTextNode(e)),document.head.appendChild(t),this.stylesheets.push(t)}},{key:"toast",value:function(t,n){(0,e.default)(t,o({subtext:this.name},n))}}]),n}();exports.default=i;
},{"@goosemod/toast":"../../../../moduleWrappers/goosemod/toast.js","@goosemod/patcher":"../../../../moduleWrappers/goosemod/patcher.js"}],"index.js":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("@goosemod/plugin"));function t(e){return e&&e.__esModule?e:{default:e}}function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=r(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var o=0,a=function(){};return{s:a,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,u=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return u=e.done,e},e:function(e){c=!0,i=e},f:function(){try{u||null==n.return||n.return()}finally{if(c)throw i}}}}function r(e,t){if(e){if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function c(e,t,n){return t&&u(e.prototype,t),n&&u(e,n),e}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(e){var t=m();return function(){var n,o=y(e);if(t){var r=y(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return p(this,n)}}function p(e,t){return!t||"object"!==n(t)&&"function"!=typeof t?d(e):t}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var b,g,v,w=goosemod.webpackModules.common.React,M=goosemod.webpackModules.find(function(e){return e.default&&"useCloseDMItem"==e.default.displayName}),k=goosemod.webpackModules.findByProps("MenuItem"),C=goosemod.webpackModules.find(function(e){return e.default&&"ConnectedPrivateChannelsList"===e.default.displayName}),O=goosemod.webpackModules.findByDisplayName("ListSectionItem"),P=goosemod.webpackModules.find(function(e){return e.default&&"PrivateChannel"==e.default.displayName}),S=goosemod.webpackModules.findByDisplayName("Clickable"),D=goosemod.webpackModules.findByDisplayName("DropdownArrow"),E=goosemod.webpackModules.findByProps("privateChannels","searchBar"),I=goosemod.webpackModules.findByProps("privateChannelsHeaderContainer"),j=goosemod.webpackModules.findByProps("containerDefault","clickable"),_=goosemod.webpackModules.findByProps("getPrivateChannelIds"),B=goosemod.webpackModules.findByProps("getChannel","getDMUserIds"),N=[];function x(){return g||(g=JSON.parse(goosemod.storage.get("pinnedDMs"))||[])}function A(e){goosemod.storage.set("pinnedDMs",JSON.stringify(e)),g=e}function R(e){return x().includes(e)}function U(e){var t=x();t.push(e),A(t)}function q(e){var t=x();t.splice(t.indexOf(e),1),A(t)}function T(){goosemod.reactUtils.getOwnerInstance(document.querySelector(".".concat(E.privateChannels))).forceUpdate();var e=document.querySelector('[class^="privateChannels-"] > [class^="scroller-"]');e&&(e.dispatchEvent(new Event("focusin")),e.dispatchEvent(new Event("focusout")))}function H(){var e,t=x();if(0==t.length)return null;var n,o=_.getPrivateChannelIds().filter(function(e){return t.includes(e)}).map(function(e){return B.getChannel(e)}),r="true"==goosemod.storage.get("pinnedDMs_collapsed");return w.createElement("div",{className:"pinned-dms-container"},w.createElement(S,{className:(e={},h(e,j.wrapper,!0),h(e,j.collapsed,r),h(e,j.clickable,!0),h(e,I.privateChannelsHeaderContainer,!0),n=e,Object.keys(n).filter(function(e){return n[e]}).join(" ")),onClick:function(){r=!r,goosemod.storage.set("pinnedDMs_collapsed",r),T(),goosemod.reactUtils.getOwnerInstance(document.querySelector(".pinned-dms-container")).forceUpdate()},"aria-expanded":!r},w.createElement(O,{},w.createElement("span",{className:I.headerText},"Pinned")),w.createElement("div",{style:{transform:r&&"rotate(90deg)",transition:"transform .2s ease-out,-webkit-transform .2s ease-out"}},w.createElement(D))),!r&&o.map(function(e){return w.createElement(e.isMultiUserDM()?P.GroupDM:P.DirectMessage,{key:e.id,channel:e,selected:e.id==v})}))}var J=function(t){s(r,e.default);var n=f(r);function r(){return i(this,r),n.apply(this,arguments)}return c(r,[{key:"onImport",value:function(){b=M.default,M.default=function(e,t){return[b(e,t),w.createElement(k.MenuItem,{id:"pin-dm",label:R(e)?"Unpin DM":"Pin DM",action:function(){R(e)?q(e):U(e),T()}})]},M.default.displayName="useCloseDMItem",N.push(goosemod.patcher.patch(C,"default",function(e,t){v=t.props.selectedChannelId;var n=t.type;N.push(goosemod.patcher.patch(n.prototype,"render",function(e,t){N.push(goosemod.patcher.patch(t.props,"children",function(e,t){N.push(goosemod.patcher.patch(t.props,"renderRow",function(e,t){return t&&t.props&&t.props.channel&&R(t.props.channel.id)?[null]:t})),N.push(goosemod.patcher.patch(t.props,"renderSection",function(e,t){return null==t||Array.isArray(t)?t:[H(),t]}))}))}))})),T()}},{key:"onRemove",value:function(){b&&(M.default=b);var e,t=o(N);try{for(t.s();!(e=t.n()).done;){(0,e.value)()}}catch(n){t.e(n)}finally{t.f()}N.splice(0,N.length),T()}}]),r}(),L=new J;exports.default=L;
},{"@goosemod/plugin":"../../../../moduleWrappers/goosemod/plugin.js"}]},{},["index.js"], null);parcelRequire('index.js').default