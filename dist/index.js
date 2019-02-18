parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"JLF3":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("axios"));function t(e){return e&&e.__esModule?e:{default:e}}class a{constructor(t){e.default.defaults.baseURL="https://coda.io/apis/v1beta1",e.default.defaults.headers.common.Authorization=`Bearer ${t}`}async request(t,a={},r="GET"){try{return await(0,e.default)({method:r,url:t,data:a,params:a})}catch(o){console.error(o)}}}var r=a;exports.default=r;
},{}],"/Ncg":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=i(require("@babel/runtime-corejs2/helpers/objectSpread")),e=i(require("@babel/runtime-corejs2/core-js/object/assign")),s=require("./index");function i(t){return t&&t.__esModule?t:{default:t}}class d{constructor(t,s){this.API=t,(0,e.default)(this,s)}async listSections(e){const{data:i}=await this.API.request(`/docs/${this.id}/sections`,e);return i.items.map(e=>new s.Section((0,t.default)({},e,{docId:this.id})))}async getSection(e){const{data:i}=await this.API.request(`/docs/${this.id}/sections/${e}`);return new s.Section((0,t.default)({},i,{docId:this.id}))}async listFolders(e){const{data:i}=await this.API.request(`/docs/${this.id}/folders`,e);return i.items.map(e=>new s.Folder((0,t.default)({},e,{docId:this.id})))}async getFolder(e){const{data:i}=await this.API.request(`/docs/${this.id}/folders/${e}`);return new s.Folder((0,t.default)({},i,{docId:this.id}))}async listTables(){const{data:e}=await this.API.request(`/docs/${this.id}/tables`);return e.items.map(e=>new s.Table(this.API,(0,t.default)({},e,{docId:this.id})))}async getTable(e){const{data:i}=await this.API.request(`/docs/${this.id}/tables/${e}`);return new s.Table(this.API,(0,t.default)({},i,{docId:this.id}))}}var a=d;exports.default=a;
},{"./index":"GMRJ"}],"u4l+":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("@babel/runtime-corejs2/core-js/object/assign"));function t(e){return e&&e.__esModule?e:{default:e}}class r{constructor(t){(0,e.default)(this,t)}}var s=r;exports.default=s;
},{}],"BI+q":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.formatRows=void 0;var e=o(require("@babel/runtime-corejs2/core-js/object/keys")),r=o(require("@babel/runtime-corejs2/core-js/array/is-array"));function o(e){return e&&e.__esModule?e:{default:e}}const t=o=>{if(!(0,r.default)(o))throw new Error("`rows` must be an array");if(!o.length)throw new Error("Must include at least one row when calling `insertRows`");return o.map(o=>{if((0,r.default)(o)){if(o.some(e=>e.hasOwnProperty("column")&&e.hasOwnProperty("value")))return{cells:o};throw new Error("A row must either be an array of objects for each column, or else one object of column/value pairs..")}const t=[];return(0,e.default)(o).forEach(e=>{t.push({column:e,value:o[e]})}),{cells:t}})};exports.formatRows=t;
},{}],"qdzL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("@babel/runtime-corejs2/core-js/object/keys")),t=r(require("@babel/runtime-corejs2/core-js/object/assign")),s=require("./utilities");function r(e){return e&&e.__esModule?e:{default:e}}class u{constructor(e,s){this.API=e,(0,t.default)(this,s)}listValues(){const t=[];return(0,e.default)(this.values).forEach(e=>{t.push({column:e,value:this.values[e]})}),t}async update(e){const[t]=(0,s.formatRows)([e]),r={row:t},{status:u}=await this.API.request(`/docs/${this.docId}/tables/${this.tableId}/rows/${this.id}`,r,"PUT");return 202===u}async delete(){const{status:e}=await this.API.request(`/docs/${this.docId}/tables/${this.tableId}/rows/${this.id}`,{},"DELETE");return 202===e}}var a=u;exports.default=a;
},{"./utilities":"BI+q"}],"ljpp":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=a(require("@babel/runtime-corejs2/helpers/objectSpread")),s=a(require("@babel/runtime-corejs2/core-js/object/assign")),e=a(require("./Column")),d=a(require("./Row")),i=require("./utilities");function a(t){return t&&t.__esModule?t:{default:t}}class o{constructor(t,e){this.API=t,(0,s.default)(this,e)}async listColumns(s){const{data:d}=await this.API.request(`/docs/${this.docId}/tables/${this.id}/columns`,s);return d.items.map(s=>new e.default((0,t.default)({},s,{docId:this.docId,tableId:this.id})))}async getColumn(s){const{data:d}=await this.API.request(`/docs/${this.docId}/tables/${this.id}/columns/${s}`);return new e.default((0,t.default)({},d,{docId:this.docId,tableId:this.id}))}async listRows(s){const{data:e}=await this.API.request(`/docs/${this.docId}/tables/${this.id}/rows`,s);return e.items.map(s=>new d.default(this.API,(0,t.default)({},s,{docId:this.docId,tableId:this.id})))}async getRow(s,e){const{data:i}=await this.API.request(`/docs/${this.docId}/tables/${this.id}/rows/${s}`,e);return new d.default(this.API,(0,t.default)({},i,{docId:this.docId,tableId:this.id}))}async insertRows(t=[],s=[]){const e={rows:(0,i.formatRows)(t),keyColumns:s},{status:d}=await this.API.request(`/docs/${this.docId}/tables/${this.id}/rows`,e,"POST");return 202===d}async updateRow(t,s){const[e]=(0,i.formatRows)([s]),d={row:e},{status:a}=await this.API.request(`/docs/${this.docId}/tables/${this.id}/rows/${t}`,d,"PUT");return 202===a}async deleteRow(t){const{status:s}=await this.API.request(`/docs/${this.docId}/tables/${this.id}/rows/${t}`,{},"DELETE");return 202===s}}var r=o;exports.default=r;
},{"./Column":"u4l+","./Row":"qdzL","./utilities":"BI+q"}],"GMRJ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"Doc",{enumerable:!0,get:function(){return e.default}}),Object.defineProperty(exports,"Table",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(exports,"Row",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(exports,"Column",{enumerable:!0,get:function(){return u.default}});var e=n(require("./Doc")),r=n(require("./Table")),t=n(require("./Row")),u=n(require("./Column"));function n(e){return e&&e.__esModule?e:{default:e}}
},{"./Doc":"/Ncg","./Table":"ljpp","./Row":"qdzL","./Column":"u4l+"}],"Focm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.printMsg=void 0;var t=o(require("@babel/runtime-corejs2/helpers/objectSpread")),s=o(require("./API")),e=require("./models"),a=require("./models/utilities");function o(t){return t&&t.__esModule?t:{default:t}}class r{constructor(t){this.API=new s.default(t)}async whoAmI(){const{data:t}=await this.API.request("/whoami");return t}async listDocs(t={}){const{data:s}=await this.API.request("/docs",t);return s.items.map(t=>new e.Doc(this.API,t))}async getDoc(t){const{data:s}=await this.API.request(`/docs/${t}`);return new e.Doc(this.API,s)}async listSections(s,a){const{data:o}=await this.API.request(`/docs/${s}/sections`,a);return o.items.map(a=>new e.Section((0,t.default)({},a,{docId:s})))}async getSection(s,a){const{data:o}=await this.API.request(`/docs/${s}/sections/${a}`);return new e.Section((0,t.default)({},o,{docId:s}))}async listFolders(s,a){const{data:o}=await this.API.request(`/docs/${s}/folders`,a);return o.items.map(a=>new e.Folder((0,t.default)({},a,{docId:s})))}async getFolder(s,a){const{data:o}=await this.API.request(`/docs/${s}/folders/${a}`);return new e.Folder((0,t.default)({},o,{docId:s}))}async listTables(s){const{data:a}=await this.API.request(`/docs/${s}/tables`);return a.items.map(a=>new e.Table(this.API,(0,t.default)({},a,{docId:s})))}async getTable(s,a){const{data:o}=await this.API.request(`/docs/${s}/tables/${a}`);return new e.Table(this.API,(0,t.default)({},o,{docId:s}))}async listColumns(s,e,a){const{data:o}=await this.API.request(`/docs/${s}/tables/${e}/columns`,a);return o.items.map(a=>new Column((0,t.default)({},a,{docId:s,tableId:e})))}async getColumn(s,e,a){const{data:o}=await this.API.request(`/docs/${s}/tables/${e}/columns/${a}`);return new Column((0,t.default)({},o,{docId:s,tableId:e}))}async listRows(s,e,a){const{data:o}=await this.API.request(`/docs/${s}/tables/${e}/rows`,a);return o.items.map(a=>new Row(this.API,(0,t.default)({},a,{docId:s,tableId:e})))}async getRow(s,e,a,o){const{data:r}=await this.API.request(`/docs/${s}/tables/${e}/rows/${a}`,o);return new Row(this.API,(0,t.default)({},r,{docId:s,tableId:e}))}async insertRows(t,s,e=[],o=[]){const r={rows:(0,a.formatRows)(e),keyColumns:o},{status:n}=await this.API.request(`/docs/${t}/tables/${s}/rows`,r,"POST");return 202===n}async updateRow(t,s,e,o){const[r]=(0,a.formatRows)([o]),n={row:r},{status:d}=await this.API.request(`/docs/${t}/tables/${s}/rows/${e}`,n,"PUT");return 202===d}async deleteRow(t,s,e){const{status:a}=await this.API.request(`/docs/${t}/tables/${s}/rows/${e}`,{},"DELETE");return 202===a}}const n=()=>{console.log("Thanks for installing CodaJS!")};exports.printMsg=n;var d=r;exports.default=d;
},{"./API":"JLF3","./models":"GMRJ","./models/utilities":"BI+q"}]},{},["Focm"], null)
//# sourceMappingURL=/index.map