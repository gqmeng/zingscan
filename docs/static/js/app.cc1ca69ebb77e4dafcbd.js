webpackJsonp([1],{131:function(e,t,s){"use strict";var r=s(2),i=new r.a;t.a=i},132:function(e,t,s){"use strict";var r=s(12),i=s.n(r),o=s(2),n=s(6),a=s(192),c=s.n(a);o.a.use(n.a);var u=(new c.a({key:"first",storage:window.localStorage}),new n.a.Store({strict:!1,state:{init:{},debugEnabled:!0,filterEnabled:!0,serverurl:"",deviceid:"",currentdaterange:{starttime:0,endtime:0,days:7},today:0,currentuser:"",mockserver:!1},mutations:{settoday:function(e,t){e.today=t},setcurrentuser:function(e,t){e.currentuser=t},init:function(e,t){e.init=JSON.parse(i()(t)),e.serverurl=e.init.serverurl,e.deviceid=e.init.deviceid,e.debugEnabled=e.init.debugEnabled,e.tagprefix=e.init.tagprefix,e.mockserver=e.init.mockServer,window.dispatchEvent(new Event("reload"))}},getters:{getdeviceid:function(e){return e.deviceid},getcurrentuser:function(e){return e.currentuser},gettoday:function(e){return e.today},gettagprefix:function(e){return e.tagprefix},getmockserver:function(e){return e.mockserver},getserverurl:function(e){return e.serverurl},isDebugging:function(e){return e.debugEnabled},getcurrentdaterange:function(e){return e.currentdaterange}},actions:{initStore:function(e){(0,e.commit)("init")}}}));t.a=u;JSON.parse(i()(u.state))},139:function(e,t,s){function r(e){s(179)}var i=s(4)(s(161),s(187),r,null,null);e.exports=i.exports},140:function(e,t,s){function r(e){s(180)}var i=s(4)(s(162),s(188),r,"data-v-774b15ac",null);e.exports=i.exports},161:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"app1",data:function(){return{}},created:function(){var e=this.$moment().unix();this.$store.commit("settoday",e)},computed:{deviceid:function(){return this.$store.getters.getdeviceid}},mounted:function(){var e=this;this.$http.get("./static/json/config.json").then(function(t){console.log(t.data),e.$store.commit("init",t.data)}).catch(function(e){console.log(e)})},methods:{}}},162:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(12),i=s.n(r),o=s(186),n=s.n(o);Object.defineProperty(Array.prototype,"chunk",{value:function(e){for(var t=[],s=0;s<this.length;s+=e)t.push(this.slice(s,s+e));return t}}),t.default={name:"frontpage",data:function(){return{currentstep:5,filebase:{login:"/m/mjsonlogin.php",custlist:"/m/customerlist.php",upload:"/m/scanlogupload.php"},user:{username:"UserA1",password:"AAAA",userid:"A1"},requestbody:"request",responsebody:"response",operation:"",masterCustList:{cust:[],route:[]},routelist:[{id:"a",label:"A"},{id:"b",label:"B"},{id:"c",label:"C"},{id:"d",label:"D"}],selectedroute:"",customerlist:["1","2","3","4","5"],selectedcustomer:"",taglist:[],routetype:"",deliveryrun:"",scantimestamp:0,scantime:""}},created:function(){this.scantimestamp=this.$moment().unix(),this.scantime=this.$moment().format("YYYY-MM-DD HH:MM:SS"),console.log("Start at: "+this.scantimestamp+" "+this.scantime)},mounted:function(){},updated:function(){},watch:{selectedroute:function(){""!=this.selectedroute&&this.currentstep++},selectedcustomer:function(){""!=this.selectedcustomer&&this.currentstep++}},computed:{tagiddisplist:function(){},mockserver:function(){return this.$store.getters.getmockserver},selectedroutename:function(){var e=this.filteredroutelist.map(function(e){return e.routeid}).indexOf(this.selectedroute);console.log(e);var t="";return-1!=e&&(t=this.filteredroutelist.map(function(e){return e.runname})[e]),t},selectedcustname:function(){var e=this.filteredcustlist.map(function(e){return e.custid}).indexOf(this.selectedcustomer);console.log(e);var t="";return-1!=e&&(t=this.filteredcustlist.map(function(e){return e.name})[e]),t},debugEnabled:function(){return this.$store.getters.isDebugging},deviceid:function(){return this.$store.getters.getdeviceid},serverurl:function(){return this.$store.getters.getserverurl},tagprefix:function(){return this.$store.getters.gettagprefix},transactionid:function(){var e=this.user.userid;return e+=this.deviceid,e+=this.scantimestamp+""},reqbody:function(){var e={TransID:"",Scantype:"",custid:"",routeid:"",Scantime:"",Tags:[]};return e.TransID=this.transactionid,this.isCheckIn?e.Scantype="CK_IN":e.Scantype="CKOUT",e.routeid=this.selectedroute,e.custid=this.selectedcustomer,e.Scantime=this.scantime,e.Tags=JSON.parse(i()(this.taglist)),e},cUser:function(){return this.$store.getters.getcurrentuser},isLoggedIn:function(){return""!=this.cUser},validuser:function(){return""!=this.user.username&&""!=this.user.password},opchecked:function(){return""!=this.operation},isCheckIn:function(){return"Check IN"==this.operation},routetypeselected:function(){return""!=this.routetype},routeselected:function(){return""!=this.selectedroute},customerselected:function(){return""!=this.selectedcustomer},filteredroutelist:function(){var e=[],t=this;return this.debugEnabled?this.routelist.forEach(function(t){e.push(t)}):this.masterCustList.route.forEach(function(s){s.route==t.routetype&&e.push(s)}),e},filteredcustlist:function(){var e=[],t=this;return this.debugEnabled?this.customerlist.forEach(function(t){e.push(t)}):this.masterCustList.cust.forEach(function(s){s.routeid==t.selectedroute&&e.push(s)}),e},readyforupload:function(){return this.taglist.length>0}},methods:{beep:function(){new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=").play()},startover:function(){this.selectedcustomer="",this.selectedroute="",this.routetype="",this.operation="",this.currentstep=1,this.$toasted.show("Tag list Reset. Starting a new scan..."),this.taglist=[],this.scantimestamp=this.$moment().unix(),console.log("Start at: "+this.scantimestamp)},uploadtaglist:function(){var e=this;console.log(i()(this.reqbody));var t=this.serverurl+this.filebase.upload;this.debugEnabled||this.$http({method:"POST",url:t,headers:{"Content-type":"application/json",Accept:"application/json"},data:this.reqbody}).then(function(t){e.responsebody=i()(t);var s=t.data.Success;console.log(t),1==s?(console.log("Success"),e.$toasted.success("Upload Successful.."),setTimeout(function(){e.currentstep=1,e.startover()},2e3)):(console.log("Error"),e.$toasted.error("Upload Error, PLease try again.."))}).catch(function(t){e.responsebody=i()(t),console.log(t),e.$toasted.error("Upload Error, PLease try again..")})},enterPressed:function(e){e.preventDefault()},loginclick:function(){var e=this,t={};t.username=this.user.username,t.password=this.user.password,t.device=this.deviceid,t.syncflag="1";var s=new URLSearchParams;for(var r in t)s.append(r,t[r]);var o=this.serverurl+this.filebase.login;this.mockserver?(e.currentstep++,e.$store.commit("setcurrentuser",e.user.username)):this.$http({method:"POST",url:o,headers:{"Content-type":"application/x-www-form-urlencoded",Accept:"application/json"},data:s}).then(function(t){e.responsebody=i()(t),e.$store.commit("setcurrentuser",e.user.username),console.log(t),e.currentstep++}).catch(function(t){e.responsebody=i()(t),console.log(t),e.$toasted.error("Cannot Login. Please try again.")}),this.operation=""},logout:function(){this.currentstep=0,this.user.username="",this.user.password="",this.user.userid="",this.taglist=[],this.$store.commit("setcurrentuser",this.user.username),this.selectedcustomer="",this.selectedroute="",this.routetype="",this.operation=""},retrieveCustomerList:function(){var e=this;e.masterCustList.cust=[],e.masterCustList.route=[];var t={};t.device="A";var s=new URLSearchParams;for(var r in t)s.append(r,t[r]);var o=this.serverurl+this.filebase.custlist;this.$http({method:"POST",url:o,headers:{"Content-type":"application/x-www-form-urlencoded",Accept:"application/json"},data:s}).then(function(t){var s=t.data;console.log(s),s.Cust.forEach(function(t){e.masterCustList.cust.push(t)}),s.ROUTE.forEach(function(t){e.masterCustList.route.push(t)})}).catch(function(t){e.responsebody=i()(t),console.log(t)})},setcheck:function(e){0==e&&(this.operation="Check OUT",this.retrieveCustomerList(),this.selectedcustomer="",this.selectedroute="",this.currentstep++),1==e&&(this.operation="Check IN",this.retrieveCustomerList(),this.routetype="HOME",this.selectedcustomer="ZBH1",this.selectedroute="ZHOME",this.currentstep=4)},setrun:function(e){0==e&&(this.routetype="DAY"),1==e&&(this.routetype="NIGHT"),this.currentstep=3},readtag:function(e){var t={};t.tagid=e.codeResult.code,this.validatetag(t.tagid)&&(this.taglist.push(t),this.beep())},validatetag:function(e){var t=!0;t=t&&7==e.length;var s=!1;this.tagprefix.length>0&&this.tagprefix.forEach(function(t){s|=e.substring(0,1)==t}),t=t&&s;var r=-1==this.taglist.map(function(e){return e.tagid}).indexOf(e);return t=t&&r}},components:{scanner:n.a}}},163:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(184),i=s.n(r);t.default={data:function(){return{data:null}},mounted:function(){var e=this;this.$nextTick(function(){i.a.init({inputStream:{name:"Live",type:"LiveStream",target:e.$refs.quagga},decoder:{readers:["code_128_reader"],debug:{drawBoundingBox:!0,showFrequency:!1,drawScanline:!0,showPattern:!1}}},function(){return e.start()})})},methods:{start:function(){i.a.onDetected(this.onDetected),i.a.onProcessed(this.onProcessed),i.a.start(),console.log("Quagga started!")},onDetected:function(e){this.$emit("barcoderead",e),this.data=e,console.log(e.codeResult.code+" "+e.codeResult.startInfo.error)},onProcessed:function(e){var t=i.a.canvas.ctx.overlay,s=i.a.canvas.dom.overlay;e&&(e.boxes&&(t.clearRect(0,0,parseInt(s.getAttribute("width")),parseInt(s.getAttribute("height"))),e.boxes.filter(function(t){return t!==e.box}).forEach(function(e){i.a.ImageDebug.drawPath(e,{x:0,y:1},t,{color:"green",lineWidth:2})})),e.box&&i.a.ImageDebug.drawPath(e.box,{x:0,y:1},t,{color:"#00F",lineWidth:2}),e.codeResult&&e.codeResult.code&&i.a.ImageDebug.drawPath(e.line,{x:"x",y:"y"},t,{color:"red",lineWidth:3}))},stop:function(){i.a.offDetected(this.onDetected),i.a.stop(),this.$refs.quagga.querySelector("video").remove(),this.$refs.quagga.querySelector("canvas").remove()}}}},164:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(2),i=s(141),o=s(6),n=s(143),a=(s.n(n),s(138)),c=(s.n(a),s(139)),u=s.n(c),l=s(132),d=s(131),v=s(130),A=s.n(v),m=s(0),p=s.n(m),h=s(142),f=s.n(h);r.a.use(f.a,{position:"bottom-center",theme:"outline",duration:1500,className:"toastclass"}),s(134).polyfill(),s(135),s(137),s(133),s(136),r.a.config.debug=!1,r.a.prototype.$http=A.a,r.a.prototype.$moment=p.a,r.a.prototype.$eventBus=d.a,r.a.use(i.a),r.a.use(o.a);var g=[{path:"/",component:s(140)}],j=new i.a({routes:g,history:!0,hashbang:!1});new r.a({router:j,el:"#app",store:l.a,data:{},components:{App:u.a},created:function(){this.$eventBus.$on("return",function(){j.push({path:"/"})})}}).$mount("#app")},179:function(e,t){},180:function(e,t){},181:function(e,t){},183:function(e,t,s){function r(e){return s(i(e))}function i(e){var t=o[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}var o={"./af":13,"./af.js":13,"./ar":20,"./ar-dz":14,"./ar-dz.js":14,"./ar-kw":15,"./ar-kw.js":15,"./ar-ly":16,"./ar-ly.js":16,"./ar-ma":17,"./ar-ma.js":17,"./ar-sa":18,"./ar-sa.js":18,"./ar-tn":19,"./ar-tn.js":19,"./ar.js":20,"./az":21,"./az.js":21,"./be":22,"./be.js":22,"./bg":23,"./bg.js":23,"./bn":24,"./bn.js":24,"./bo":25,"./bo.js":25,"./br":26,"./br.js":26,"./bs":27,"./bs.js":27,"./ca":28,"./ca.js":28,"./cs":29,"./cs.js":29,"./cv":30,"./cv.js":30,"./cy":31,"./cy.js":31,"./da":32,"./da.js":32,"./de":35,"./de-at":33,"./de-at.js":33,"./de-ch":34,"./de-ch.js":34,"./de.js":35,"./dv":36,"./dv.js":36,"./el":37,"./el.js":37,"./en-au":38,"./en-au.js":38,"./en-ca":39,"./en-ca.js":39,"./en-gb":40,"./en-gb.js":40,"./en-ie":41,"./en-ie.js":41,"./en-nz":42,"./en-nz.js":42,"./eo":43,"./eo.js":43,"./es":45,"./es-do":44,"./es-do.js":44,"./es.js":45,"./et":46,"./et.js":46,"./eu":47,"./eu.js":47,"./fa":48,"./fa.js":48,"./fi":49,"./fi.js":49,"./fo":50,"./fo.js":50,"./fr":53,"./fr-ca":51,"./fr-ca.js":51,"./fr-ch":52,"./fr-ch.js":52,"./fr.js":53,"./fy":54,"./fy.js":54,"./gd":55,"./gd.js":55,"./gl":56,"./gl.js":56,"./gom-latn":57,"./gom-latn.js":57,"./he":58,"./he.js":58,"./hi":59,"./hi.js":59,"./hr":60,"./hr.js":60,"./hu":61,"./hu.js":61,"./hy-am":62,"./hy-am.js":62,"./id":63,"./id.js":63,"./is":64,"./is.js":64,"./it":65,"./it.js":65,"./ja":66,"./ja.js":66,"./jv":67,"./jv.js":67,"./ka":68,"./ka.js":68,"./kk":69,"./kk.js":69,"./km":70,"./km.js":70,"./kn":71,"./kn.js":71,"./ko":72,"./ko.js":72,"./ky":73,"./ky.js":73,"./lb":74,"./lb.js":74,"./lo":75,"./lo.js":75,"./lt":76,"./lt.js":76,"./lv":77,"./lv.js":77,"./me":78,"./me.js":78,"./mi":79,"./mi.js":79,"./mk":80,"./mk.js":80,"./ml":81,"./ml.js":81,"./mr":82,"./mr.js":82,"./ms":84,"./ms-my":83,"./ms-my.js":83,"./ms.js":84,"./my":85,"./my.js":85,"./nb":86,"./nb.js":86,"./ne":87,"./ne.js":87,"./nl":89,"./nl-be":88,"./nl-be.js":88,"./nl.js":89,"./nn":90,"./nn.js":90,"./pa-in":91,"./pa-in.js":91,"./pl":92,"./pl.js":92,"./pt":94,"./pt-br":93,"./pt-br.js":93,"./pt.js":94,"./ro":95,"./ro.js":95,"./ru":96,"./ru.js":96,"./sd":97,"./sd.js":97,"./se":98,"./se.js":98,"./si":99,"./si.js":99,"./sk":100,"./sk.js":100,"./sl":101,"./sl.js":101,"./sq":102,"./sq.js":102,"./sr":104,"./sr-cyrl":103,"./sr-cyrl.js":103,"./sr.js":104,"./ss":105,"./ss.js":105,"./sv":106,"./sv.js":106,"./sw":107,"./sw.js":107,"./ta":108,"./ta.js":108,"./te":109,"./te.js":109,"./tet":110,"./tet.js":110,"./th":111,"./th.js":111,"./tl-ph":112,"./tl-ph.js":112,"./tlh":113,"./tlh.js":113,"./tr":114,"./tr.js":114,"./tzl":115,"./tzl.js":115,"./tzm":117,"./tzm-latn":116,"./tzm-latn.js":116,"./tzm.js":117,"./uk":118,"./uk.js":118,"./ur":119,"./ur.js":119,"./uz":121,"./uz-latn":120,"./uz-latn.js":120,"./uz.js":121,"./vi":122,"./vi.js":122,"./x-pseudo":123,"./x-pseudo.js":123,"./yo":124,"./yo.js":124,"./zh-cn":125,"./zh-cn.js":125,"./zh-hk":126,"./zh-hk.js":126,"./zh-tw":127,"./zh-tw.js":127};r.keys=function(){return Object.keys(o)},r.resolve=i,e.exports=r,r.id=183},186:function(e,t,s){function r(e){s(181)}var i=s(4)(s(163),s(189),r,null,null);e.exports=i.exports},187:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("router-view")],1)},staticRenderFns:[]}},188:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"content"},[s("div",{staticClass:"row"},[s("div",{staticClass:"row rowtitle"},[s("div",{staticClass:"col-xs-4 "},[e.isLoggedIn?s("div",{staticClass:"inlinebtn float-l",on:{click:e.logout}},[e._v("LOG OUT")]):s("span",[e._v("Login")])]),e._v(" "),s("div",{staticClass:"col-xs-4 txtcenter"},[e.isLoggedIn?s("span",[e._v(" "+e._s(e.user.username)+" ")]):e._e()]),e._v(" "),s("div",{staticClass:"col-xs-4 "},[e.isLoggedIn?s("div",{staticClass:"inlinebtn float-r",on:{click:e.startover}},[e._v("New Scan")]):e._e()])]),e._v(" "),0==e.currentstep?s("div",{staticClass:"loginpanel"},[s("div",{directives:[{name:"show",rawName:"v-show",value:e.debugEnabled,expression:"debugEnabled"}],staticClass:"row"},[e._m(0),e._v(" "),s("div",{staticClass:"col-md-8 col-sm-8 col-xs-8"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.serverurl,expression:"serverurl"}],attrs:{type:"text",placeholder:"Please Enter server url"},domProps:{value:e.serverurl},on:{input:function(t){t.target.composing||(e.serverurl=t.target.value)}}})])]),e._v(" "),s("div",{staticClass:"row"},[e._m(1),e._v(" "),s("div",{staticClass:"col-md-8 col-sm-8 col-xs-8"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.username,expression:"user.username"}],attrs:{type:"text",placeholder:"Please Enter Username"},domProps:{value:e.user.username},on:{input:function(t){t.target.composing||(e.user.username=t.target.value)}}})])]),e._v(" "),s("div",{staticClass:"row"},[e._m(2),e._v(" "),s("div",{staticClass:"col-md-8 col-sm-8 col-xs-8"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password,expression:"user.password"}],attrs:{type:"password",placeholder:"Password"},domProps:{value:e.user.password},on:{input:function(t){t.target.composing||(e.user.password=t.target.value)}}})])]),e._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-4 col-sm-4 col-xs-4"}),e._v(" "),s("div",{staticClass:"col-md-8 col-sm-8 col-xs-8"},[s("button",{staticClass:"primarybtn",attrs:{disabled:!e.validuser},on:{click:e.loginclick}},[e._v("LOG IN")])])]),e._v(" "),e.debugEnabled?s("div",{staticClass:"row"},[e._m(3),e._v(" "),s("div",{staticClass:"col-md-8 col-sm-8 col-xs-8"},[s("p",[e._v(e._s(e.responsebody))])])]):e._e()]):e._e()]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.currentstep>=1,expression:"currentstep>=1"}],staticClass:"row"},[s("div",{staticClass:"col-xs-2 txtcenter optab"},[s("div",{staticClass:"stepind",class:{active:""!=e.routetype,out:"Check OUT"==e.operation,in:"Check IN"==e.operation}},[""!=e.routetype?s("span",[e._v(e._s(e.routetype))]):s("span",{staticClass:"preselect"},[e._v("Run")])])]),e._v(" "),s("div",{staticClass:"col-xs-5 txtcenter optab"},[s("div",{staticClass:"stepind",class:{active:""!=e.selectedroute,out:"Check OUT"==e.operation,in:"Check IN"==e.operation}},[""!=e.selectedroute?s("span",[e._v(e._s(e.selectedroutename))]):s("span",{staticClass:"preselect"},[e._v("Route")])])]),e._v(" "),s("div",{staticClass:"col-xs-5 txtcenter optab"},[s("div",{staticClass:"stepind",class:{active:""!=e.selectedcustomer,out:"Check OUT"==e.operation,in:"Check IN"==e.operation}},[""!=e.selectedcustomer?s("span",[e._v(e._s(e.selectedcustname))]):s("span",{staticClass:"preselect"},[e._v("Customer")])])])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:1==e.currentstep,expression:"currentstep==1"}],staticClass:"row"},[s("div",{staticClass:"rowtitle"},[1==e.currentstep?s("span",[e._v("Operation Selector")]):s("span",[e._v(e._s(e.operation))])]),e._v(" "),e.opchecked?e._e():s("div",{staticClass:"opselectpanel"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-1 col-sm-1 col-xs-1"}),e._v(" "),s("div",{staticClass:"col-md-5 col-sm-5 col-xs-5 io-l mediumfont",on:{click:function(t){e.setcheck(0)}}},[s("div",{staticClass:"m-btn out"},[e._v("Check OUT")])]),e._v(" "),s("div",{staticClass:"col-md-5 col-sm-5 col-xs-5 io-r mediumfont",on:{click:function(t){e.setcheck(1)}}},[s("div",{staticClass:"m-btn in"},[e._v("Check IN")])]),e._v(" "),s("div",{staticClass:"col-md-1 col-sm-1 col-xs-1"})])])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:2==e.currentstep,expression:"currentstep==2"}],staticClass:"row"},[s("div",{staticClass:"rowtitle"},[2==e.currentstep?s("span",[e._v("Run Selector")]):s("span",[e._v("Run: "+e._s(e.routetype))])]),e._v(" "),e.routeselected?e._e():s("div",{staticClass:"opselectpanel"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-1 col-sm-1 col-xs-1"}),e._v(" "),e.isCheckIn?s("div",{staticClass:"col-md-10 col-sm-10 col-xs-10 io mediumfont"},[e._v("HOME")]):e._e(),e._v(" "),e.isCheckIn?e._e():s("div",{staticClass:"col-md-5 col-sm-5 col-xs-5 io-l mediumfont",on:{click:function(t){e.setrun(0)}}},[s("div",{staticClass:"m-btn day"},[e._v("DAY")])]),e._v(" "),e.isCheckIn?e._e():s("div",{staticClass:"col-md-5 col-sm-5 col-xs-5 io-r mediumfont",on:{click:function(t){e.setrun(1)}}},[s("div",{staticClass:"m-btn night"},[e._v("NIGHT")])]),e._v(" "),s("div",{staticClass:"col-md-1 col-sm-1 col-xs-1"})])])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:3==e.currentstep,expression:"currentstep==3"}],staticClass:"row"},[s("div",{staticClass:"rowtitle"},[3==e.currentstep?s("span",[e._v("Route Selector")]):s("span",[e._v("Customer: "+e._s(e.selectedcustomer))])]),e._v(" "),e.routetypeselected&&!e.routeselected?s("div",{staticClass:"opselectpanel"},[s("div",{staticClass:"row mediumfont"},[s("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedroute,expression:"selectedroute"}],staticStyle:{width:"100%"},on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.selectedroute=t.target.multiple?s:s[0]}}},[s("option",{attrs:{disabled:"",value:""}},[e._v("Please select the route")]),e._v(" "),e._l(e.filteredroutelist,function(t){return s("option",{domProps:{value:t.routeid}},[e._v(e._s(t.runname))])})],2)])]):e._e()]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:4==e.currentstep,expression:"currentstep==4 "}],staticClass:"row"},[s("div",{staticClass:"rowtitle"},[3==e.currentstep?s("span",[e._v("Customer Selector")]):s("span",[e._v("Customer: "+e._s(e.selectedcustomer))])]),e._v(" "),e.customerselected?e._e():s("div",{staticClass:"opselectpanel"},[s("div",{staticClass:"row mediumfont"},[s("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedcustomer,expression:"selectedcustomer"}],staticStyle:{width:"100%"},on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.selectedcustomer=t.target.multiple?s:s[0]}}},[s("option",{attrs:{disabled:"",value:""}},[e._v("Please select the customer")]),e._v(" "),e._l(e.filteredcustlist,function(t){return s("option",{domProps:{value:t.custid}},[e._v(e._s(t.name))])})],2)])])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.currentstep>=5,expression:"currentstep>=5"}],staticClass:"row"},[s("div",{staticClass:"rowtitle"},[e._v("Scanner\t")]),e._v(" "),s("div",{staticClass:"row",staticStyle:{height:"540px"}},[s("div",{staticClass:"col-sm-9 col-xs-9"},[s("scanner",{on:{barcoderead:e.readtag}})],1),e._v(" "),s("div",{staticClass:"col-sm-3 col-xs-3",staticStyle:{height:"100%","font-size":"120pt","text-align":"center"}},[s("span",[e._v(" "+e._s(e.taglist.length)+" ")])])]),e._v(" "),s("div",{staticClass:"barcodelist txtcenter"},[e._v(" Tag List\r\n\t\t\t"),s("ul",e._l(e.taglist,function(t){return s("li",[e._v(e._s(t.tagid))])}))]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.readyforupload,expression:"readyforupload"}],staticClass:"m-btn upload",on:{click:e.uploadtaglist}},[e._v("Upload Barcode List")])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],staticClass:"settingoverlay"},[s("div",{staticClass:"rowtitle"},[e._v("Config")])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col-md-4 col-sm-4 col-xs-4"},[s("label",[e._v("Server URL")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col-md-4 col-sm-4 col-xs-4"},[s("label",[e._v("USERNAME")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col-md-4 col-sm-4 col-xs-4"},[s("label",[e._v("PASSCODE")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col-md-4 col-sm-4 col-xs-4"},[s("label",[e._v("RESPONSE")])])}]}},189:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"scanner_wrapper"},[s("div",{ref:"quagga",staticClass:"camera"})])},staticRenderFns:[]}},193:function(e,t){}},[164]);
//# sourceMappingURL=app.cc1ca69ebb77e4dafcbd.js.map