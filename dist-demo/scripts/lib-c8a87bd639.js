!function(){"use strict";angular.module("angular-jsonapi-rest",["angular-jsonapi"])}(),function(){"use strict";function e(e,n,t,r,a,o){function i(e,n){return new s(e,n)}function s(r,i){function s(e){return o({method:"GET",headers:m,url:i,params:c(e.params)}).then(y,g.bind(null,"all"))}function u(e){return o({method:"GET",headers:m,url:i+"/"+e.object.data.id,params:c(e.params)}).then(y,g.bind(null,"get"))}function l(e){return o({method:"DELETE",headers:m,url:i+"/"+e.object.data.id}).then(y,g.bind(null,"remove"))}function d(n){var t=a.defer(),r=n.object.schema.relationships[n.key];return n.object.removed===!0?t.reject(e.create("Object has been removed",v,0,"unlink")):void 0!==n.target&&void 0===n.target.data.id?t.reject(e.create("Can't unlink object without id through rest call",v,0,"unlink")):"hasOne"===r.type?o({method:"DELETE",headers:m,url:i+"/"+n.object.data.id+"/relationships/"+n.key}).then(y,g.bind(null,"get")).then(t.resolve,t.reject):"hasMany"===r.type&&(void 0===n.target?o({method:"PUT",headers:m,data:{data:[]},url:i+"/"+n.object.data.id+"/relationships/"+n.key}).then(y,g.bind(null,"unlink")).then(t.resolve,t.reject):o({method:"DELETE",headers:m,url:i+"/"+n.object.data.id+"/relationships/"+n.key+"/"+n.target.data.id}).then(y,g.bind(null,"unlink")).then(t.resolve,t.reject)),t.promise}function h(e){var n=a.defer(),r=e.object.schema.relationships[e.key];return e.object.removed===!0?n.reject({errors:[{status:0,statusText:"Object has been removed"}]}):void 0===e.target||void 0===e.target.data.id?n.reject({errors:[{status:0,statusText:"Can't link object without id through rest call"}]}):"hasOne"===r.type?o({method:"PUT",headers:m,data:{data:t.toLinkData(e.target)},url:i+"/"+e.object.data.id+"/relationships/"+e.key}).then(y,g.bind(null,"link")).then(n.resolve,n.reject):"hasMany"===r.type&&o({method:"POST",headers:m,data:{data:[t.toLinkData(e.target)]},url:i+"/"+e.object.data.id+"/relationships/"+e.key}).then(y,g.bind(null,"link")).then(n.resolve,n.reject),n.promise}function p(e){return o({method:"PUT",headers:m,url:i+"/"+e.object.data.id,data:e.object.form.toJson()}).then(y,g.bind(null,"update"))}function f(e){return o({method:"POST",headers:m,url:i,data:e.object.form.toJson()}).then(y,g.bind(null,"add"))}function y(e){return a.resolve(e.data)}function g(n,t){function r(t){s.reject(e.create("Server is offline",v,t.status,n))}function i(){s.reject(e.create("No internet connection",v,t.status,n))}var s=a.defer();return 0===t.status?o({method:"GET",url:"https://status.cloud.google.com/incidents.schema.json"}).then(r,i):s.reject(e.create(t.statusText,v,t.status,n)),s.promise}var v=this,m={Accept:"application/vnd.api+json","Content-Type":"application/vnd.api+json"};n.apply(v,arguments),v.synchronization("remove",l),v.synchronization("unlink",d),v.synchronization("link",h),v.synchronization("update",p),v.synchronization("add",f),v.synchronization("all",s),v.synchronization("get",u),v.synchronization("refresh",u)}function c(e){function n(e){return angular.isArray(e)?e.join(","):e}var t={};return void 0===e?{}:(angular.forEach(e,function(e,r){angular.isArray(e)?t[r]=n(e):angular.isObject(e)?angular.forEach(e,function(e,a){t[r+"["+a+"]"]=n(e)}):t[r]=e}),t)}function u(e){var n={};return angular.forEach(e,function(e,t){var r=t.indexOf("[");if(e=e.split(","),e=1===e.length?e[0]:e,r>-1){var a=t.substr(0,r),o=t.substr(r+1,t.indexOf("]")-r-1);n[a]={},n[a][o]=e}else n[t]=e}),n}return s.prototype=Object.create(n.prototype),s.prototype.constructor=s,{create:i,encodeParams:c,decodeParams:u}}angular.module("angular-jsonapi-rest").factory("AngularJsonAPISourceRest",e),e.$inject=["AngularJsonAPIModelSourceError","AngularJsonAPISourcePrototype","AngularJsonAPIModelLinkerService","toKebabCase","$q","$http"]}(),function(){"use strict";function e(e){e.decorator("$jsonapi",n)}function n(e,n){var t=e;return t.sourceRest=n,t}angular.module("angular-jsonapi-rest").config(e),e.$inject=["$provide"],n.$inject=["$delegate","AngularJsonAPISourceRest"]}(),function(){"use strict";angular.module("angular-jsonapi-local",["angular-jsonapi"])}(),function(){"use strict";function e(e,n,t){function r(e,n){return new a(e,n)}function a(r,a){function i(){var e=l.synchronizer.resource.schema.type;return t.resolve(n.localStorage.getItem(a+"."+e))}function s(){var e=l.synchronizer.resource.schema.type,t=a+"."+e;o.all-=o.list[t],delete o.list[t],o.max=u(o.list),o.fraction=o.list[o.max]/o.limit*100,n.localStorage.removeItem(t)}function c(){var e=l.synchronizer.resource.schema.type,t=l.synchronizer.resource.cache,r=t.toJson(),i=a+"."+e;o.list[i]=void 0===o.list[i]?0:o.list[i],o.all+=r.length-o.list[i],o.list[i]=r.length,o.max=u(o.list),o.fraction=o.list[o.max]/o.limit*100,n.localStorage.setItem(i,r)}function u(e){return Object.keys(e).reduce(function(n,t){return e[t]>e[n]?t:n},Object.keys(e)[0])}var l=this;a=a||"AngularJsonAPI",l.__updateStorage=c,e.apply(l,arguments),l.synchronization("init",i),l.begin("clearCache",s),l.finish("init",c),l.finish("clearCache",c),l.finish("remove",c),l.finish("refresh",c),l.finish("unlink",c),l.finish("unlinkReflection",c),l.finish("link",c),l.finish("linkReflection",c),l.finish("update",c),l.finish("add",c),l.finish("get",c),l.finish("all",c),l.finish("include",c)}var o={max:0,all:0,limit:52e5,list:{}};return a.prototype=Object.create(e.prototype),a.prototype.constructor=a,{create:r,size:o}}angular.module("angular-jsonapi-local").factory("AngularJsonAPISourceLocal",e),e.$inject=["AngularJsonAPISourcePrototype","$window","$q"]}(),function(){"use strict";function e(e){e.decorator("$jsonapi",n)}function n(e,n){var t=e;return t.sourceLocal=n,t}angular.module("angular-jsonapi-local").config(e),e.$inject=["$provide"],n.$inject=["$delegate","AngularJsonAPISourceLocal"]}(),function(){"use strict";angular.module("angular-jsonapi",["uuid4"]).constant("pluralize",pluralize).constant("validateJS",validate)}(),function(){"use strict";function e(e){function n(e){return null===e?null:{type:e.data.type,id:e.data.id}}function t(n,t,r,i,u){var l;return u=void 0===u?!1:u,void 0===n?(e.error("Can't add link to non existing object",n,t,r),e.error("Object:",n.data.type,n),e.error("Target:",r.data.type,r),e.error("Key:",t),[]):(l=n.schema.relationships[t],void 0===r?(e.error("Can't link non existing object",n,t,r,l),e.error("Object:",n.data.type,n),e.error("Target:",r.data.type,r),e.error("Key:",t),e.error("Schema:",l),[]):void 0===l?(e.error("Can't add link not present in schema:",n,t,r,l),e.error("Object:",n.data.type,n),e.error("Target:",r.data.type,r),e.error("Key:",t),e.error("Schema:",l),[]):null!==r&&l.polymorphic===!1&&l.model!==r.data.type?(e.error("This relation is not polymorphic, expected: "+l.model+" instead of "+r.data.type),e.error("Object:",n.data.type,n),e.error("Target:",r.data.type,r),e.error("Key:",t),e.error("Schema:",l),[]):"hasMany"===l.type?i===!0?(c(n,t,r,u),[]):a(n,t,r,u):"hasOne"===l.type?i===!0?(s(n,t,r,u),[]):o(n,t,r,u):void 0)}function r(n,t,r,a,o){var s;return o=void 0===o?!1:o,void 0===n?(e.error("Can't remove link from non existing object",n,t,r),e.error("Object:",n.data.type,n),e.error("Target:",r.data.type,r),e.error("Key:",t),[]):(s=n.schema.relationships[t],void 0===s?(e.error("Can't remove link not present in schema:",n,t,r,s),e.error("Object:",n.data.type,n),e.error("Target:",r.data.type,r),e.error("Key:",t),e.error("Schema:",s),[]):a===!0?(l(n,t,r,o),[]):i(n,t,r,o))}function a(e,n,t,r){var a,i=e.schema.relationships[n].reflection;return i===!1?(c(e,n,t,r),[]):(a=t.schema.relationships[i],"hasOne"===a.type?h(d(e,n,t),d(t,i,e),o(t,i,e,r)):"hasMany"===a.type?(c(e,n,t,r),c(t,i,e,r),[d(t,i,e)]):void 0)}function o(e,n,t,r){var a,o,i=e.schema.relationships[n].reflection,h=e.relationships[n],p=[];return s(e,n,t,r),void 0!==h&&null!==h&&(o=h.schema.relationships[i],"hasOne"===o.type?u(h,i,e,r):"hasMany"===o.type&&l(h,i,e,r),p.push(d(h,i,e))),void 0!==t&&null!==t&&i!==!1&&(a=t.schema.relationships[i],"hasOne"===a.type?s(t,i,e,r):"hasMany"===a.type&&c(t,i,e,r),p.push(d(t,i,e))),p}function i(e,n,t,r){var a,o=e.schema.relationships[n],i=o.reflection;return"hasMany"===o.type?l(e,n,t,r):"hasOne"===o.type&&u(e,n,t,r),i===!1?[]:(a=t.schema.relationships[i],"hasOne"===a.type?u(t,i,e,r):"hasMany"===a.type&&l(t,i,e,r),[d(t,i,e)])}function s(t,r,a,o){return e.debug("addHasOne",t,r,a),o===!0&&(t=t.form),t.relationships[r]=a,t.data.relationships[r].data=n(a),o===!1&&t.reset(!0),!0}function c(t,r,a,o){e.debug("addHasMany",t,r,a);var i=n(a);return o===!0&&(t=t.form),angular.isArray(t.relationships[r])&&t.relationships[r].indexOf(a)>-1?!1:(t.relationships[r]=t.relationships[r]||[],t.data.relationships[r].data=t.data.relationships[r].data||[],t.relationships[r].push(a),t.data.relationships[r].data.push(i),o===!1&&t.reset(!0),!0)}function u(n,t,r,a){return e.debug("removeHasOne",n,t,r),a===!0&&(n=n.form),void 0!==r&&n.relationships[t]!==r?!1:(n.relationships[t]=null,n.data.relationships[t].data=void 0,a===!1&&n.reset(!0),!0)}function l(n,t,r,a){if(e.debug("removeHasMany",n,t,r),a===!0&&(n=n.form),void 0!==n.relationships[t]){if(void 0===r)return n.relationships[t]=[],n.data.relationships[t].data=[],a===!1&&n.reset(!0),!0;var o=n.relationships[t].indexOf(r);return-1===o?!1:(n.relationships[t].splice(o,1),n.data.relationships[t].data.splice(o,1),a===!1&&n.reset(!0),!0)}}function d(e,n,t){return{object:e,key:n,target:t}}function h(e,n,t){var r=-1;return angular.forEach(t,function(n,t){n.object===e.object&&n.key===e.key&&n.target===e.target&&(r=t)}),r>-1?t[r]=n:t.push(n),t}var p=this;return p.toLinkData=n,p.link=t,p.unlink=r,this}angular.module("angular-jsonapi").service("AngularJsonAPIModelLinkerService",e),e.$inject=["$log"]}(),function(){"use strict";function e(e,n,t,r){function a(e){return new o(e)}function o(e){var n=this;n.data={id:e.data.id,type:e.data.type,attributes:{},relationships:{}},n.relationships={},n.parent=e,n.schema=e.schema,n.reset()}function i(){var e=this,n=angular.copy(e.data),t={};return angular.forEach(n.relationships,function(e,n){void 0!==e.data&&(t[n]=e)}),n.relationships=t,{data:n}}function s(){var e=this;return e.parent.save()}function c(e){var n=this;angular.forEach(n.schema.relationships,function(e,t){n.data.relationships[t]=angular.copy(n.parent.data.relationships[t])||{},angular.isArray(n.relationships[t])?n.relationships[t]=n.parent.relationships[t].slice():n.relationships[t]=n.parent.relationships[t]}),(e!==!0||n.parent["synchronized"]!==!0)&&(angular.forEach(n.schema.attributes,function(e,t){n.data.attributes[t]=angular.copy(n.parent.data.attributes[t])}),n.parent.errors.validation.clear())}function u(n){function a(){void 0===n?c.parent.errors.validation.clear():c.parent.errors.validation.clear(n),u.resolve()}function o(t){c.parent.error=!0,void 0===n?c.parent.errors.validation.clear():c.parent.errors.validation.clear(n),angular.forEach(t,function(n,t){angular.forEach(n,function(n){c.parent.errors.validation.add(t,e.create(n,t))})}),u.reject(c.parent.errors.validation)}var i,s,c=this,u=r.defer();return void 0===n?(i=c.data.attributes,s=c.schema.attributes):(i={},s={},i[n]=c.data.attributes[n],s[n]=c.schema.attributes[n]),t.async(i,s).then(a,o),u.promise}function l(e,t,a){var o=this;return a=void 0===a?!1:!0,r.resolve(n.link(o.parent,e,t,a,!0))}function d(e,t,a){var o=this;return a=void 0===a?!1:!0,r.resolve(n.unlink(o.parent,e,t,a,!0))}return o.prototype.save=s,o.prototype.reset=c,o.prototype.validate=u,o.prototype.link=l,o.prototype.unlink=d,o.prototype.toJson=i,{create:a}}angular.module("angular-jsonapi").factory("AngularJsonAPIModelForm",e),e.$inject=["AngularJsonAPIModelValidationError","AngularJsonAPIModelLinkerService","validateJS","$q"]}(),function(){"use strict";function e(e,o,i,s,c,u,l,d,h){function p(n,t,r){var a=this;n.relationships=n.relationships||{},a["new"]=void 0===t["new"]?!1:t["new"],a.stable=void 0===t.stable?!0:t.stable,a["synchronized"]=void 0===t["synchronized"]?!0:t["synchronized"],a.pristine=void 0===t.pristine?!0:t.pristine,a.removed=!1,a.loading=!1,a.saving=!1,a.updatedAt=a["synchronized"]===!0?Date.now():r,a.loadingCount=0,a.savingCount=0,a.data={relationships:{},attributes:{}},a.relationships={},angular.forEach(a.schema.relationships,function(e,n){a.relationships[n]=void 0}),a.errors={validation:i.create("Validation","Errors of attributes validation",o),synchronization:i.create("Source","Errors of synchronizations",e)},a.promise=h.resolve(a),I(a,n),a.form=c.create(a)}function f(){function e(){i.synchronize(c).then(n,t,o)}function n(e){u.$emit("angularJsonAPI:"+i.data.type+":object:"+c.action,"resolved",i,e),i.update(e.data.data),i["new"]===!0&&(i.resource.cache.indexIds=i.resource.cache.indexIds||[],i.resource.cache.indexIds.push(i.data.id)),i["synchronized"]=!0,i["new"]=!1,i.pristine=!1,i.stable=!0,e.finish(),i.errors.synchronization.concat(e.errors),s.resolve(e.data.meta)}function t(e){u.$emit("angularJsonAPI:"+i.data.type+":object:save","rejected",i,e),e.finish(),i.errors.synchronization.concat(e.errors),s.reject(i)}function o(e){u.$emit("angularJsonAPI:"+i.data.type+":object:save","notify",i,e),s.notify(e)}var i=this,s=h.defer(),c={action:i["new"]===!0?"add":"update",object:i};return i.form.validate().then(e,s.reject)["finally"](a.bind(i,void 0)),r(i),s.promise}function y(){var e=this;void 0!==e.form&&e.form.reset()}function g(r){function a(e){function r(e){return n(e),e.synchronize({action:"include",object:e})["finally"](t.bind(e,void 0))}function a(n){angular.forEach(n,function(e,n){e.success===!0&&(u.$emit("angularJsonAPI:"+o.included[n].data.type+":object:include","resolved",o.included[n],e),e.value.finish())}),c.resolve(e.data.meta)}var o=s.__proccesResults(e.data);u.$emit("angularJsonAPI:"+d.data.type+":object:refresh","resolved",d,e),h.allSettled(o.included.map(r)).then(a,c.reject),d["synchronized"]=!0,d.stable=!0,d.pristine=!1,e.finish(),d.errors.synchronization.concat(e.errors)}function o(e){u.$emit("angularJsonAPI:"+d.data.type+":object:refresh","rejected",d,e),e.finish(),d.errors.synchronization.concat(e.errors),c.reject(d)}function i(e){u.$emit("angularJsonAPI:"+d.data.type+":object:refresh","notify",d,e),c.notify(e)}var s=l.get("$jsonapi"),c=h.defer(),d=this;r=void 0===r?d.schema.params.get:r;var p={action:"refresh",object:d,params:r};if(d["new"]===!0){var f=e.create("Can't refresh new object",null,0,"refresh");d.errors.synchronization.add("refresh",f),c.reject(f)}else n(d),d.synchronize(p).then(a,o,i)["finally"](t.bind(d,void 0));return c.promise}function v(){var e=this,n=e.data,t={};return angular.forEach(n.relationships,function(e,n){void 0!==e.data&&(t[n]=e)}),n.relationships=t,{data:n,updatedAt:e.updatedAt}}function m(){function e(e){u.$emit("angularJsonAPI:"+o.data.type+":object:remove","resolved",o,e),o.removed=!0,o.unlinkAll(),o.resource.cache.clearRemoved(o.data.id),e.finish(),o.errors.synchronization.concat(e.errors),i.resolve()}function n(e){u.$emit("angularJsonAPI:"+o.data.type+":object:remove","rejected",o,e),o.resource.cache.revertRemove(o.data.id),e.finish(),o.errors.synchronization.concat(e.errors),i.reject(o)}function t(e){u.$emit("angularJsonAPI:"+o.data.type+":object:remove","notify",o,e),i.notify(e)}var o=this,i=h.defer(),s={action:"remove",object:o};return o.resource.cache.remove(o.data.id),o["new"]===!0?i.resolve():(r(o),o.synchronize(s).then(e,n,t)["finally"](a.bind(o,void 0))),i.promise}function j(e){function r(e,n){var t=o.schema.relationships[n],r=t.reflection;angular.isArray(e)?angular.forEach(e,a.bind(void 0,r)):angular.isObject(e)&&a(r,e),"hasOne"===t.type?o.relationships[n]=null:"hasMany"===t.type&&(o.relationships[n]=[])}function a(e,r){function a(e){u.$emit("angularJsonAPI:"+o.data.type+":object:unlinkReflection","resolve",o,e),e.finish(),o.errors.synchronization.concat(e.errors),i.resolve()}function c(e){u.$emit("angularJsonAPI:"+o.data.type+":object:unlinkReflection","rejected",o,e),e.finish(),o.errors.synchronization.concat(e.errors),i.reject(o)}function l(e){u.$emit("angularJsonAPI:"+o.data.type+":object:unlinkReflection","notify",o,e),e.finish(),i.notify(e)}var d=r.schema.relationships[e],h={action:"unlinkReflection",object:r,target:o,key:e};n(r),s.unlink(r,e,o,d),r.synchronize(h).then(a,c,l)["finally"](t.bind(r,void 0))}var o=this,i=h.defer();return n(o),void 0===e?angular.forEach(o.relationships,r):r(o.relationships[e],e),t(o),i.promise}function b(o,i){function c(e){function r(e){return n(i),i.synchronize({action:"linkReflection",object:e.object,target:e.target,key:e.key})["finally"](t.bind(i,void 0))}function a(e){angular.forEach(e,function(e,n){e.success===!0&&(u.$emit("angularJsonAPI:"+c[n].object.data.type+":object:linkReflection","resolved",c[n],e),e.value.finish())}),f.resolve(e.data.meta)}u.$emit("angularJsonAPI:"+y.data.type+":object:link","resolved",y,e);var c=s.link(y,o,i);y.stable=!0,y.pristine=!1,e.finish(),y.errors.synchronization.concat(e.errors),h.allSettled(c.map(r)).then(a,f.reject)}function l(e){u.$emit("angularJsonAPI:"+y.data.type+":object:link","rejected",y,e),f.reject(e.errors),e.finish(),y.errors.synchronization.concat(e.errors),f.reject(y)}function d(e){u.$emit("angularJsonAPI:"+y.data.type+":object:link","notify",y,e),f.notify(e)}var p,f=h.defer(),y=this,g={action:"link",object:y,target:i,key:o};return void 0===i?(p=e.create("Can't link undefined",null,0,"link"),y.errors.synchronization.add("link",p),f.reject(p)):y["new"]===!0?(p=e.create("Can't link new object",null,0,"link"),y.errors.synchronization.add("link",p),f.reject(p)):(r(y),y.synchronize(g).then(c,l,d)["finally"](a.bind(y,void 0))),f.promise}function A(o,i){function c(e){function r(e){return n(i),i.synchronize({action:"unlinkReflection",object:e.object,target:e.target,key:e.key})["finally"](t.bind(i,void 0))}function a(e){angular.forEach(e,function(n){n.success===!0&&(u.$emit("angularJsonAPI:"+c[o].data.type+":object:unlinkReflection","resolved",c[o],n),e.value.finish())}),f.resolve()}u.$emit("angularJsonAPI:"+y.data.type+":object:unlink","resolved",y,e);var c=s.link(y,o,i);y.stable=!0,y.pristine=!1,e.finish(),y.errors.synchronization.concat(e.errors),h.allSettled(c.map(r)).then(a,f.reject)}function l(e){u.$emit("angularJsonAPI:"+y.data.type+":object:unlink","rejected",y,e),f.reject(e.errors),e.finish(),y.errors.synchronization.concat(e.errors),f.reject(y)}function d(e){u.$emit("angularJsonAPI:"+y.data.type+":object:unlink","notify",y,e),f.notify(e)}var p,f=h.defer(),y=this,g={action:"unlink",object:y,target:i,key:o};return void 0===i?(p=e.create("Can't unlink undefined",null,0,"unlink"),y.errors.synchronization.add("unlink",p),f.reject(y)):y["new"]===!0?(p=e.create("Can't unlink new object",null,0,"unlink"),y.errors.synchronization.add("unlink",p),f.reject(y)):(r(y),y.synchronize(g).then(c,l,d)["finally"](a.bind(y,void 0))),f.promise}function k(e,r,a){var o=this;n(o),I(o,e),o.reset(r),o["synchronized"]=a===!0?!1:!0,o.stable=a===!0?!1:!0,o.updatedAt=Date.now(),t(o)}function z(){var e=this,n=!1;return angular.forEach(e.errors,function(e){n=e.hasErrors()||n}),n}function I(e,n){function t(t,r){e.data.attributes[r]=n.attributes[r]}function r(t,r){var i=n.relationships[r];return void 0===i?void(void 0===e.data.relationships[r]&&(e.data.relationships[r]={data:void 0})):(e.data.relationships[r]=e.data.relationships[r]||{},e.data.relationships[r].links=i.links,void("hasOne"===t.type?a(e,r,i.data):"hasMany"===t.type&&angular.isArray(i.data)&&(0===i.data.length?(e.data.relationships[r].data=[],e.unlinkAll(r)):(angular.forEach(e.relationships[r],o.bind(void 0,e,r,i.data)),angular.forEach(i.data,a.bind(void 0,e,r))))))}function a(e,n,t){var r;if(null===t)return void s.link(e,n,null);if(void 0!==t){if(r=i.getResource(t.type),void 0===r)return void d.error("Factory not found",t.type,t);var a=r.cache.get(t.id);s.link(e,n,a)}}function o(e,n,t,r){t.indexOf(r.data.id)>-1||s.unlink(e,n,r)}var i=l.get("$jsonapi"),c=e.schema;return e.data.id=n.id,e.data.type=n.type,e.resource.schema.type!==n.type?(d.error("Different type then resource",e.resource.schema.type,n),!1):e.schema.id.validate(e.data.id)?(e.data.links=n.links,n.attributes=n.attributes||{},n.relationships=n.relationships||{},angular.forEach(c.attributes,t),angular.forEach(c.relationships,r),!0):(d.error("Invalid id"),!1)}return p.prototype.refresh=g,p.prototype.remove=m,p.prototype.reset=y,p.prototype.save=f,p.prototype.update=k,p.prototype.link=b,p.prototype.unlink=A,p.prototype.unlinkAll=j,p.prototype.toJson=v,p.prototype.hasErrors=z,p}function n(e){e=void 0===e?this:e,e.loadingCount+=1,e.loading=!0}function t(e){e=void 0===e?this:e,e.loadingCount-=1,e.loading=e.loadingCount>0}function r(e){e=void 0===e?this:e,e.savingCount+=1,e.saving=!0}function a(e){e=void 0===e?this:e,e.savingCount-=1,e.saving=e.savingCount>0}angular.module("angular-jsonapi").factory("AngularJsonAPIAbstractModel",e),e.$inject=["AngularJsonAPIModelSourceError","AngularJsonAPIModelValidationError","AngularJsonAPIModelErrorsManager","AngularJsonAPIModelLinkerService","AngularJsonAPIModelForm","$rootScope","$injector","$log","$q"]}(),function(){"use strict";function e(e,n){function t(e){return new r(e)}function r(e){var n=this;n.resource=e,n.data={},n.removed={},n.size=0,n.indexIds=void 0}function a(e,t,r){var a=this,o=e.id;return void 0===o?void n.error("Can't add data without id!",e):(void 0===a.data[o]?(a.data[o]=a.resource.modelFactory(e,t,r),a.size+=1):a.data[o].update(e,!t["new"],t.initialization),a.data[o])}function o(e){var n=this,t=angular.fromJson(e),r={"new":!1,"synchronized":!1,stable:!1,pristine:!1,initialization:!0};angular.isObject(t)&&void 0!==t.data&&(n.updatedAt=t.updatedAt,n.indexIds=t.indexIds,angular.forEach(t.data,function(e){var t=e.data;n.addOrUpdate(t,r,e.updatedAt)}))}function i(){var e=this,n={data:[],updatedAt:e.updatedAt,indexIds:e.indexIds};return angular.forEach(e.data,function(e){e.hasErrors()===!1&&n.data.push(e.toJson())}),angular.toJson(n)}function s(){var e=this;e.indexIds=void 0,e.data={},e.removed={}}function c(e){var n=this,t={id:e,type:n.resource.schema.type},r={"new":!1,"synchronized":!1,stable:!1,pristine:!0};return void 0===n.data[e]&&(n.data[e]=n.resource.modelFactory(t,r)),n.data[e]}function u(e){function n(n){var t=e.filter,r=!0;return angular.forEach(t,function(e){r=r&&n.data.attributes[e.key]===e.value}),r}var t=this;return e=e||{},void 0===t.indexIds?t.indexIds:t.indexIds.map(t.get.bind(t)).filter(n)}function l(e){var n=this;n.indexIds=[],angular.forEach(e,function(e){angular.isString(e)&&n.resource.schema.id.validate(e)?n.indexIds.push(e):angular.isObject(e)&&n.resource.schema.id.validate(e.data.id)&&n.indexIds.push(e.data.id)})}function d(e){var n=this;return void 0!==n.data[e]&&(n.removed[e]=n.data[e],delete n.data[e],n.size-=1),n.removed[e]}function h(e){var n=this;return void 0!==n.removed[e]&&(n.data[e]=n.removed[e],delete n.removed[e],n.size+=1),n.data[e]}function p(e){var n=this;delete n.removed[e]}return r.prototype.get=c,r.prototype.index=u,r.prototype.setIndexIds=l,r.prototype.addOrUpdate=a,r.prototype.fromJson=o,r.prototype.toJson=i,r.prototype.clear=s,r.prototype.remove=d,r.prototype.revertRemove=h,r.prototype.clearRemoved=p,{create:t}}angular.module("angular-jsonapi").factory("AngularJsonAPIResourceCache",e),e.$inject=["uuid4","$log"]}(),function(){"use strict";function e(){function e(e,t){return new n(e,t)}function n(e,n){var t=this;Error.captureStackTrace(t,t.constructor),t.message=e,t.context={attribute:n}}return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n.prototype.name="ValidationError",{create:e}}angular.module("angular-jsonapi").factory("AngularJsonAPIModelValidationError",e)}(),function(){"use strict";function e(){function e(e,t,r,a){return new n(e,t,r,a)}function n(e,n,t,r){var a=this;Error.captureStackTrace(a,a.constructor),a.message=e,a.context={source:n,code:t,action:r}}return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n.prototype.name="SourceError",{create:e}}angular.module("angular-jsonapi").factory("AngularJsonAPIModelSourceError",e)}(),function(){"use strict";function e(){function e(e,t,r,a){return new n(e,t,r,a)}function n(e,n,t,r){var a=this;a.name=e,a.description=n,a.ErrorConstructor=t,a.errors={},a.defaultFilter=r||function(){return!0}}function t(e){var n=this;void 0===e?angular.forEach(n.errors,function(e,t){n.errors[t]=[]}):n.errors[e]=[]}function r(e,n){var t=this;t.errors[e]=t.errors[e]||[],t.errors[e].push(n)}function a(e){var n=this;angular.forEach(e,function(e){n.errors[e.key]=[]}),angular.forEach(e,function(e){n.errors[e.key].push(e.object)})}function o(e){var n=this;if(void 0===e){var t=!1;return angular.forEach(n.errors,function(e){t=t||e.length>0}),t}return void 0!==n.errors[e]&&n.errors[e].length>0}return n.prototype.constructor=n,n.prototype.concat=a,n.prototype.clear=t,n.prototype.add=r,n.prototype.hasErrors=o,{create:e}}angular.module("angular-jsonapi").factory("AngularJsonAPIModelErrorsManager",e)}(),function(){"use strict";function e(e,n,t){function r(e){return new a(e)}function a(n){var t=this;t.state={},e.call(t,n),angular.forEach(n,function(e){e.synchronizer=t})}function o(r){function a(e){d.notify({step:"synchronization",data:e})}function o(e){d.notify({step:"synchronization",errors:e})}function i(e){u.state[h]=u.state[h]||{},u.state[h].success=!0,angular.forEach(e,function(e){e.success===!1&&(u.state[h].success=!1)}),angular.forEach(u.sources,function(n){angular.forEach(n.afterHooks[h],function(n){d.notify({step:"after",errors:n.call(u,r,e)})})});var n,t=[];angular.forEach(e,function(e){e.success===!0?n=e.value:t.push({key:h,object:e.reason})}),t.length>0?d.reject({data:n||{},finish:s,errors:t}):d.resolve({data:n||{},finish:s,errors:t})}function s(){angular.forEach(u.sources,function(e){angular.forEach(e.finishHooks[h],function(e){d.notify({step:"finish",errors:e.call(u,r)})})})}function c(e){t.error("All settled rejected! Something went wrong"),d.reject({finish:angular.noop,errors:e})}var u=this,l=[],d=n.defer(),h=r.action;return e.prototype.synchronize.call(u,r),angular.forEach(u.sources,function(e){angular.forEach(e.beginHooks[h],function(e){d.notify({step:"begin",data:e.call(u,r)})})}),angular.forEach(u.sources,function(e){angular.forEach(e.beforeHooks[h],function(e){d.notify({step:"before",data:e.call(u,r)})})}),angular.forEach(u.sources,function(e){angular.forEach(e.synchronizationHooks[h],function(e){l.push(e.call(u,r))})}),n.allSettled(l,a,o).then(i,c),d.promise}return a.prototype=Object.create(e.prototype),a.prototype.constructor=a,a.prototype.synchronize=o,{create:r}}angular.module("angular-jsonapi").factory("AngularJsonAPISynchronizerSimple",e),e.$inject=["AngularJsonAPISynchronizerPrototype","$q","$log"]}(),function(){"use strict";function e(e){function n(e){var n=this;n.sources=e}function t(n){var t=this;e.debug("Synchro Collection",t.resource.schema.type,n),void 0===n.action&&e.error("Can't synchronize undefined action",n)}return n.prototype.synchronize=t,n}angular.module("angular-jsonapi").factory("AngularJsonAPISynchronizerPrototype",e),e.$inject=["$log"]}(),function(){"use strict";function e(e,n){return new Function("fn","return function "+e+"(){ return fn.apply(this,arguments)}")(n)}angular.module("angular-jsonapi").constant("namedFunction",e)}(),function(){"use strict";angular.module("angular-jsonapi").constant("lazyProperty",function(e,n,t){var r,a;Object.defineProperty(e,n,{get:function(){return a||(a=!0,r=t.call(e)),r},enumerable:!0,configurable:!0})})}(),function(){"use strict";angular.module("angular-jsonapi").constant("toKebabCase",function(e){return e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()})}(),function(){"use strict";function e(e){e.decorator("$q",n)}function n(e){function n(e,n,r){function a(e){return t.resolve(e).then(function(e){return angular.isFunction(n)&&n(e),{success:!0,value:e}},function(e){return angular.isFunction(r)&&r(e),{success:!1,reason:e}})}var o=angular.isArray(e)?[]:{};return angular.forEach(e,function(e,n){o.hasOwnProperty(n)||(o[n]=a(e))}),t.all(o)}var t=e;return t.allSettled=t.allSettled||n,t}angular.module("angular-jsonapi").config(e),e.$inject=["$provide"],n.$inject=["$delegate"]}(),function(){"use strict";function e(e,n,t,r){function a(e){return new o(e)}function o(e){var n=this,a=e.include||{};e.include=a,a.get=e.include.get||[],a.all=e.include.all||[],n.params={get:{},all:{}},"uuid4"===e.id?e.id=t:"int"===e.id?e.id={generate:angular.noop,validate:angular.isNumber}:angular.isObject(e.id)?angular.isFunction(e.id.generate)||(e.id.generate=angular.noop):e.id={generate:angular.noop,validate:angular.identity.bind(null,!0)},angular.forEach(e.relationships,function(n,t){var o=r.create(n,t,e.type);e.relationships[t]=o,o.included===!0&&(a.get.push(t),"hasOne"===o.type&&a.all.push(t))}),angular.extend(n,e),a.get.length>0&&(n.params.get.include=a.get),a.all.length>0&&(n.params.all.include=a.all)}return{create:a}}angular.module("angular-jsonapi").factory("AngularJsonAPISchema",e),e.$inject=["$log","pluralize","uuid4","AngularJsonAPISchemaLink"]}(),function(){"use strict";function e(e,n){function t(e,n,t){return new r(e,n,t)}function r(t,r,a){var o=this;angular.isString(t)?(o.model=n.plural(r),o.type=t,o.polymorphic=!1,o.reflection=a):(void 0===t.type&&e.error("Schema of link without a type: ",t,r),"hasMany"!==t.type&&"hasOne"!==t.type&&e.error("Schema of link with wrong type: ",t.type,"available: hasOne, hasMany"),o.model=t.model||n.plural(r),o.type=t.type,o.polymorphic=t.polymorphic||!1,void 0===t.reflection?o.reflection="hasMany"===o.type?n.singular(a):a:o.reflection=t.reflection,o.included=t.included||!1)}return{create:t}}angular.module("angular-jsonapi").factory("AngularJsonAPISchemaLink",e),e.$inject=["$log","pluralize"]}(),function(){"use strict";function e(){function e(e){var n=this,t=["add","init","get","all","clearCache","remove","unlink","unlinkReflection","link","linkReflection","update","refresh","include"];n.name=e,n.state={},n.beginHooks={},n.beforeHooks={},n.synchronizationHooks={},n.afterHooks={},n.finishHooks={},n.options={},angular.forEach(t,function(e){n.beginHooks[e]=[],n.beforeHooks[e]=[],n.synchronizationHooks[e]=[],n.afterHooks[e]=[],n.finishHooks[e]=[],n.state[e]={loading:!1,success:!0}})}function n(e,n){var t=this;t.beginHooks[e].push(n)}function t(e,n){var t=this;t.finishHooks[e].push(n)}function r(e,n){var t=this;t.beforeHooks[e].push(n)}function a(e,n){var t=this;t.afterHooks[e].push(n)}function o(e,n){var t=this;t.synchronizationHooks[e].push(n)}return e.prototype.before=r,e.prototype.after=a,e.prototype.begin=n,e.prototype.finish=t,e.prototype.synchronization=o,e}angular.module("angular-jsonapi").factory("AngularJsonAPISourcePrototype",e)}(),function(){"use strict";function e(e,n,t,r,a){function o(n,o){function i(e,n,t){return new c(e,n,t)}var s=r.plural(n.type,1),c=t(s,function(n,t,r){var o=this;n.type!==o.schema.type&&a.error("Data type other then declared in schema: ",n.type," instead of ",o.schema.type),e.call(o,n,t,r),o.form.parent=o});return c.prototype=Object.create(e.prototype),c.prototype.constructor=c,c.prototype.schema=n,c.prototype.resource=o,c.prototype.synchronize=o.synchronizer.synchronize.bind(o.synchronizer),angular.forEach(n.functions,function(e,n){c.prototype[n]=function(){return e.apply(this,arguments)}}),i}return{modelFactory:o}}angular.module("angular-jsonapi").factory("AngularJsonAPIModel",e),e.$inject=["AngularJsonAPIAbstractModel","AngularJsonAPISchema","namedFunction","pluralize","$log"]}(),function(){"use strict";function e(e,n,t,r,a,o,i){function s(e,n){return new c(e,n)}function c(r,o){function i(e){a.$emit("angularJsonAPI:"+u.type+":resource:init","resolved",e),u.cache.fromJson(e.data),u.initialized=!0,e.finish()}function s(e){a.$emit("angularJsonAPI:"+u.type+":resource:init","rejected",e),e.finish(),u.initialized=!0}function c(e){a.$emit("angularJsonAPI:"+u.type+":resource:init","notify",e)}var u=this,l={action:"init"};u.schema=n.create(r),u.cache=t.create(u),u.synchronizer=o,u.synchronizer.resource=u,u.modelFactory=e.modelFactory(u.schema,u),
u.initialized=!1,u.type=u.schema.type,o.resource=u,u.synchronizer.synchronize(l).then(i,s,c)}function u(e,n){var t=this;if(!t.schema.id.validate(e))return i.reject({errors:[{status:0,statusText:"Invalid id"}]});var r=t.cache.get(e);return r.promise=r.refresh(n),r}function l(e){var n=this;e=angular.extend({},n.schema.params.all,e);var t=r.create(n,e);return t.promise=t.fetch(),t}function d(e){var n=this,t=n.cache.remove(e);return t.remove()}function h(){var e=this,n={};angular.forEach(e.schema.relationships,function(e,t){"hasOne"===e.type?n[t]={data:null}:"hasMany"===e.type&&(n[t]={data:[]})});var t={type:e.type,id:e.schema.id.generate(),attributes:{},relationships:n},r={"new":!0,"synchronized":!1,stable:!1,pristine:!1,initialization:!1},o=e.modelFactory(t,r);return a.$emit("angularJsonAPI:"+e.type+":resource:initialize","resolved",o),o}function p(){function e(e){a.$emit("angularJsonAPI:"+r.type+":resource:clearCache","resolved",e),e.finish(),o.resolve(e)}function n(e){a.$emit("angularJsonAPI:"+r.type+":resource:clearCache","resolved",e),e.finish(),o.reject(e)}function t(e){a.$emit("angularJsonAPI:"+r.type+":resource:clearCache","notify",e),o.notify(e)}var r=this,o=i.defer(),s={action:"clearCache"};return r.cache.clear(),r.synchronizer.synchronize(s).then(e,n,t),o}return c.prototype.get=u,c.prototype.all=l,c.prototype.remove=d,c.prototype.initialize=h,c.prototype.clearCache=p,{create:s}}angular.module("angular-jsonapi").factory("AngularJsonAPIResource",e),e.$inject=["AngularJsonAPIModel","AngularJsonAPISchema","AngularJsonAPIResourceCache","AngularJsonAPICollection","$rootScope","$log","$q"]}(),function(){"use strict";function e(e,r,a,o,i){function s(e,n){return new c(e,n)}function c(n,t){function o(e,n,t){var r;"resolved"===n&&void 0!==l.data&&(r=l.data.indexOf(t),r>-1&&(l.data.splice(r,1),l.resource.cache.setIndexIds(l.data)))}function s(){l.data=void 0,l.pristine=!0}function c(e,n,t){"resolved"===n&&(l.data=l.data||[],l.data.push(t))}function u(){d(),h(),p()}var l=this;l.resource=n,l.type=n.schema.type,l.params=t||{},l.errors={synchronization:r.create("Source","Errors of synchronizations",e)},l.data=l.resource.cache.index(l.params),l.loading=!1,l.loadingCount=0,l["synchronized"]=!1,l.pristine=void 0===l.data,l.promise=i.resolve(l);var d=a.$on("angularJsonAPI:"+l.type+":object:remove",o),h=a.$on("angularJsonAPI:"+l.type+":resource:clearCache",s),p=a.$on("angularJsonAPI:"+l.type+":object:add",c);a.$on("$destroy",u)}function u(){var e=this,n=!1;return angular.forEach(e.errors,function(e){n=e.hasErrors()||n}),n}function l(e,n){var t=this;return t.resource.get(e,n)}function d(){function e(e){function r(e){return n(e),e.synchronize({action:"include",object:e})["finally"](t.bind(e,void 0))}function o(n){angular.forEach(n,function(e,n){e.success===!0&&(a.$emit("angularJsonAPI:"+s.included[n].data.type+":object:include","resolved",s.included[n],e),e.value.finish())}),u.resolve(e.data.meta)}var s=l.__proccesResults(e.data);a.$emit("angularJsonAPI:"+c.type+":collection:fetch","resolved",c,e),i.allSettled(s.included.map(r)).then(o,u.reject),angular.forEach(c.data,t),c.data=s.data,c.links=e.data.links,c.updatedAt=Date.now(),c["synchronized"]=!0,c.resource.cache.setIndexIds(c.data),e.finish(),c.errors.synchronization.concat(e.errors)}function r(e){a.$emit("angularJsonAPI:"+c.type+":collection:fetch","rejected",c,e),angular.forEach(c.data,t),e.finish(),c.errors.synchronization.concat(e.errors),u.reject(c)}function s(e){a.$emit("angularJsonAPI:"+c.type+":collection:fetch","notify",c,e),u.notify(e)}var c=this,u=i.defer(),l=o.get("$jsonapi"),d={action:"all",params:c.params};return n(c),angular.forEach(c.data,n),c.resource.synchronizer.synchronize(d).then(e,r,s)["finally"](t.bind(c,void 0)),u.promise}return c.prototype.fetch=d,c.prototype.refresh=d,c.prototype.get=l,c.prototype.hasErrors=u,{create:s}}function n(e){e=void 0===e?this:e,e.loadingCount+=1,e.loading=!0}function t(e){e=void 0===e?this:e,e.loadingCount-=1,e.loading=e.loadingCount>0}angular.module("angular-jsonapi").factory("AngularJsonAPICollection",e),e.$inject=["AngularJsonAPIModelSourceError","AngularJsonAPIModelErrorsManager","$rootScope","$injector","$q"]}(),function(){"use strict";function e(e){function n(n,a,o){function i(e,n){var o=a.create(e,n);t[e.type]=o,r.push(e.type)}function s(e){return t[e]}function c(){return t}function u(){return r}function l(){angular.forEach(t,function(e){e.clearCache()})}function d(t,r){return angular.isString(t)?(void 0===e.validators[t]&&n.warn("Redeclaring validator",t),void(e.validators[t]=r)):void n.error("Validator name is not a string",t)}function h(e){var t={data:[],included:[]};if(void 0===e)return void n.error("Can't proccess results:",e);var r={"new":!1,"synchronized":!0,stable:!0,pristine:!1,initialization:!1};return angular.forEach(e.included,function(e){t.included.push(s(e.type).cache.addOrUpdate(e,r))}),angular.isArray(e.data)?angular.forEach(e.data,function(e){t.data.push(s(e.type).cache.addOrUpdate(e,r))}):void 0!==e.data&&t.data.push(s(e.data.type).cache.addOrUpdate(e.data,r)),t}return{addResource:i,getResource:s,clearCache:l,allResources:c,listResources:u,addValidator:d,synchronizerSimple:o,__proccesResults:h}}var t={},r=[];this.$get=n,n.$inject=["$log","AngularJsonAPIResource","AngularJsonAPISynchronizerSimple"]}angular.module("angular-jsonapi").provider("$jsonapi",e),e.$inject=["validateJS"]}(),function(){"use strict";angular.module("angular-jsonapi").config(["$logProvider",function(e){e.debugEnabled(!1)}]).run(["validateJS","$q",function(e,n){e.Promise=n}])}();
//# sourceMappingURL=../maps/scripts/lib-c8a87bd639.js.map