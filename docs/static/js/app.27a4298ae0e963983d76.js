webpackJsonp([1],{131:function(t,e,s){"use strict";var n=s(2),r=new n.a;e.a=r},132:function(t,e,s){"use strict";var n=s(12),r=s.n(n),i=s(2),a=s(6),o=s(191),c=s.n(o);i.a.use(a.a);var u=new c.a({key:"first",storage:window.localStorage}),l=new a.a.Store({strict:!1,plugins:[u.plugin],state:{init:{},debugEnabled:!0,filterEnabled:!0,loggerURL:"http://localhost:3003/dashboardlog",currentStation:{id:-1,label:""},currentGroup:{id:0,color:"#0075bc"},currentPatientIndex:-1,currentdaterange:{starttime:0,endtime:0,days:7},patientlist:[],maxgroupinuse:6,patientData:[],today:0,screenname:"Patient List",currentuser:""},mutations:{settoday:function(t,e){t.today=e},setcurrentuser:function(t,e){t.currentuser=e},init:function(t,e){t.init=e,t.filterEnabled=t.init.filterenable,t.filterEnabled&&(t.currentStation.id=0,t.currentStation.label="Breast Cancer"),t.loggerURL=t.init.loggerURL,t.maxgroupinuse=t.init.maxgroupinuse,t.init.patientMasterList.forEach(function(e){var s=e.id,n=e.name,i=e.age,a=e.gender,o=e.type;e.group.forEach(function(e){var c=e.id;if(-1==t.patientlist.findIndex(function(t){return t.id==s&&t.groupid==c})){var u={};u=JSON.parse(r()(t.init.patientstemplate)),u.id=s,u.name=n,u.age=i,u.gender=a,u.groupid=c,u.type=o,t.patientlist.push(u)}})}),window.dispatchEvent(new Event("reload"))},resetState:function(t,e){t.init=JSON.parse(r()(e)),t.patientlist.splice(0,t.patientlist.length),t.init.patientMasterList.forEach(function(e){var s=e.id,n=e.name,i=e.age,a=e.gender,o=e.type;e.group.forEach(function(e){var c=e.id;if(-1==t.patientlist.findIndex(function(t){return t.id==s&&t.groupid==c})){var u={};u=JSON.parse(r()(t.init.patientstemplate)),u.id=s,u.name=n,u.age=i,u.gender=a,u.groupid=c,u.type=o,t.patientlist.push(u)}})})},saveConfig:function(t,e){var s=t.currentPatientIndex;console.log("SAVE=>"+e.id+"   "+s),t.patientlist[s].layout=JSON.parse(r()(e.layout));var n=e.layout.map(function(t){return t.c});t.patientlist[s].wlist.forEach(function(t){var e=n.indexOf(t.id);t.count=-1!=e?0:-1})},updateAlert:function(t,e){var s=t.patientlist.findIndex(function(t){return t.id==e.pid&&t.groupid==e.group});console.log("UPDATE ALERT"+s);var n=t.patientlist[s].wlist.map(function(t){return t.id}).indexOf(e.wid),r=t.patientlist[s].wlist[n].count;""==e.message?r>0&&t.patientlist[s].wlist[n].count--:t.patientlist[s].wlist[n].count++},setAlerts:function(t,e){var s=t.patientlist.findIndex(function(t){return t.id===e.pid&&t.groupid===e.group});console.log("Setting alerts for "+e.widget+", "+s+" to "+e.count);var n=t.patientlist[s].wlist.map(function(t){return t.id}).indexOf(e.wid);t.patientlist[s].wlist[n].count;t.patientlist[s].wlist[n].count=e.count},selstation:function(t,e){-1!=e.value?(t.currentStation.id=t.init.cancertypes[e.value].id,t.currentStation.label=t.init.cancertypes[e.value].label):(t.currentStation.id=-1,t.currentStation.label=""),t.currentGroup.id=0},setgroupid:function(t,e){t.currentGroup.id=e.value},saveWidgetSettings:function(t,e){var s=t.currentPatientIndex,n=t.patientlist[s].widgetSettings.map(function(t){return t.id}).indexOf(e.wid);n>=0?t.patientlist[s].widgetSettings[n].datasettings=JSON.parse(r()(e.datasettings)):t.patientlist[s].widgetSettings.push({id:e.wid,datasettings:JSON.parse(r()(e.datasettings))})},setCurrentPatientIndex:function(t,e){t.currentPatientIndex=t.patientlist.findIndex(function(t){return t.id==e.pid&&t.groupid==e.group})},loadPatientData:function(t,e){t.patientData=e},resetPatientData:function(t){t.patientData=[]},setcurrentdaterange:function(t,e){t.currentdaterange.starttime=e.start,t.currentdaterange.endtime=e.end,t.currentdaterange.days=e.days},setScreenname:function(t,e){t.screenname=e}},getters:{getScreenname:function(t){return t.screenname},getcurrentuser:function(t){return t.currentuser},gettoday:function(t){return t.today},getfilterEnable:function(t){return t.filterEnabled},getmaxgroupinuse:function(t){return t.maxgroupinuse},getLoggerURL:function(t){return t.loggerURL},testResetState:function(t){return t.patientlist[7].wlist[1].count},isDebugging:function(t){return t.debugEnabled},getlayoutbyid:function(t){return-1!=t.currentPatientIndex?t.patientlist[t.currentPatientIndex].layout:[]},getNotificationList:function(t){return[{patient:{name:"Bridget Kearns",age:52,gender:"Female"},timestamp:"2017-10-09",notes:[{type:-1,text:"Pain rating scale has decreased from 7 to 3 in last 24 hours"},{type:0,text:"Anxiety remains at 13 each of the last 13 days"}]},{patient:{name:"Tyler Durden",age:55,gender:"Male"},timestamp:"2017-10-09T03:00:04Z",notes:[{type:1,text:"Pain rating scale has increased from 2 to 8 in last 24 hours"}]}]},getDataSettings:function(t){return function(e){var s=t.patientlist.findIndex(function(t){return t.id==e.id&&t.groupid==e.group}),n=t.patientlist[s].widgetSettings.map(function(t){return t.id}).indexOf(e.wid);return t.patientlist[s].widgetSettings[n]}},getpatientbyid:function(t){return function(e){var s=t.patientlist.findIndex(function(t){return t.id==e.id&&t.groupid==e.group});return t.patientlist[s]}},getCurrentStation:function(t){return t.currentStation},getcurrentGroup:function(t){return t.currentGroup},getPatientList:function(t){var e=[];return e=JSON.parse(r()(t.patientlist)),-1!=t.currentStation.id&&(e=e.filter(function(e){return e.type==t.currentStation.id})),e},getPatientMasterList:function(t){return t.init.patientMasterList},getPatientData:function(t){return function(e){var s=t.patientData.findIndex(function(t){return t.id===e});return t.patientData[s]}},getPatientDataTimestamp:function(t){return function(e){var s=t.patientData.findIndex(function(t){return t.id===e});return t.patientData[s].timestamp}},hasLoadedPatientData:function(t){return t.patientData.length>0},getcurrentdaterange:function(t){return t.currentdaterange}},actions:{initStore:function(t){(0,t.commit)("init")}}});e.a=l;JSON.parse(r()(l.state))},139:function(t,e,s){function n(t){s(178)}var r=s(4)(s(160),s(186),n,null,null);t.exports=r.exports},140:function(t,e,s){function n(t){s(179)}var r=s(4)(s(161),s(187),n,"data-v-774b15ac",null);t.exports=r.exports},160:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app1",data:function(){return{}},created:function(){this.$moment().unix()},computed:{},mounted:function(){this.$http.get("./static/json/default.json").then(function(t){}).catch(function(t){console.log(t)})},methods:{mouseprev:function(t){t.preventDefault()}}}},161:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(12),r=s.n(n),i=s(185),a=s.n(i);e.default={name:"frontpage",data:function(){return{testmode:!0,currentstep:0,serverurl:"http://localhost/zing2",filebase:{login:"/m/mjsonlogin.php",custlist:"/m/customerlist.php"},user:{username:"UserA1",password:"AAAA"},requestbody:"request",responsebody:"response",operation:"",masterCustList:{cust:[],route:[]},routelist:["a","b","c","d"],selectedroute:"",customerlist:["1","2","3","4","5"],selectedcustomer:"",taglist:[],routetype:"",deliveryrun:""}},created:function(){var t=(this.$moment().day(-7),{start:0,end:0,days:7});t.end=this.$moment().day(6).endOf("day").unix(),t.start=this.$moment().day(t.days-7).startOf("day").unix(),console.log("Start at: "+t.start+"  End at:"+t.end),console.log("Start at: "+this.$moment.unix(t.start).format()+"  End at:"+this.$moment.unix(t.end).format())},mounted:function(){},updated:function(){},watch:{selectedroute:function(){""!=this.selectedroute&&this.currentstep++},selectedcustomer:function(){""!=this.selectedcustomer&&this.currentstep++}},computed:{cUser:function(){return this.$store.getters.getcurrentuser},isLoggedIn:function(){return""!=this.cUser},validuser:function(){return""!=this.user.username&&""!=this.user.password},opchecked:function(){return""!=this.operation},isCheckIn:function(){return"Check IN"==this.operation},routetypeselected:function(){return""!=this.routetype},routeselected:function(){return""!=this.selectedroute},customerselected:function(){return""!=this.selectedcustomer},filteredroutelist:function(){var t=[],e=this;return this.testmode?this.routelist.forEach(function(e){t.push(e)}):this.masterCustList.route.forEach(function(s){s.route==e.routetype&&t.push(s.routeid)}),t},filteredcustlist:function(){var t=[],e=this;return this.testmode?this.customerlist.forEach(function(e){t.push(e)}):this.masterCustList.cust.forEach(function(s){s.routeid==e.selectedroute&&t.push(s.custid)}),t}},methods:{startover:function(){this.selectedcustomer="",this.selectedroute="",this.routetype="",this.operation="",this.currentstep=1},enterPressed:function(t){t.preventDefault()},loginclick:function(){var t=this,e={};e.username=this.user.username,e.password=this.user.password,e.device="A",e.syncflag="1";var s=new URLSearchParams;for(var n in e)s.append(n,e[n]);var i=this.serverurl+this.filebase.login;this.testmode?(t.currentstep++,t.$store.commit("setcurrentuser",t.user.username)):this.$http({method:"POST",url:i,headers:{"Content-type":"application/x-www-form-urlencoded",Accept:"application/json"},data:s}).then(function(e){t.responsebody=r()(e),t.$store.commit("setcurrentuser",t.user.username),console.log(e),t.currentstep++}).catch(function(e){t.responsebody=r()(e),console.log(e)}),this.operation=""},logout:function(){this.currentstep=0,this.user.username="",this.user.password="",this.$store.commit("setcurrentuser",this.user.username),this.selectedcustomer="",this.selectedroute="",this.routetype="",this.operation=""},retrieveCustomerList:function(){var t=this;t.masterCustList.cust=[],t.masterCustList.route=[];var e={};e.device="A";var s=new URLSearchParams;for(var n in e)s.append(n,e[n]);var i=this.serverurl+this.filebase.custlist;this.$http({method:"POST",url:i,headers:{"Content-type":"application/x-www-form-urlencoded",Accept:"application/json"},data:s}).then(function(e){var s=e.data;console.log(s),s.Cust.forEach(function(e){t.masterCustList.cust.push(e)}),s.ROUTE.forEach(function(e){t.masterCustList.route.push(e)})}).catch(function(e){t.responsebody=r()(e),console.log(e)})},setcheck:function(t){0==t&&(this.operation="Check OUT",this.retrieveCustomerList(),this.selectedcustomer="",this.selectedroute="",this.currentstep++),1==t&&(this.operation="Check IN",this.routetype="HOME",this.selectedcustomer="HOME",this.selectedroute="HOME",this.currentstep=4)},setrun:function(t){0==t&&(this.routetype="DAY"),1==t&&(this.routetype="NIGHT"),this.currentstep=3},readtag:function(t){var e=t.codeResult.code;-1==this.taglist.indexOf(e)&&7==e.length&&this.taglist.push(e)}},components:{scanner:a.a}}},162:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(183),r=s.n(n);e.default={data:function(){return{data:null}},mounted:function(){var t=this;this.$nextTick(function(){r.a.init({inputStream:{name:"Live",type:"LiveStream",target:t.$refs.quagga},decoder:{readers:["code_128_reader"],debug:{drawBoundingBox:!0,showFrequency:!1,drawScanline:!0,showPattern:!1}}},function(){return t.start()})})},methods:{start:function(){r.a.onDetected(this.onDetected),r.a.start(),console.log("Quagga started!")},onDetected:function(t){this.$emit("barcoderead",t),this.data=t,console.log(t.codeResult.code+" "+t.codeResult.startInfo.error)},stop:function(){r.a.offDetected(this.onDetected),r.a.stop(),this.$refs.quagga.querySelector("video").remove(),this.$refs.quagga.querySelector("canvas").remove()}}}},163:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(2),r=s(141),i=s(6),a=s(142),o=(s.n(a),s(138)),c=(s.n(o),s(139)),u=s.n(c),l=s(132),d=s(131),p=s(130),v=s.n(p),m=s(0),f=s.n(m);s(134).polyfill(),s(135),s(137),s(133),s(136),n.a.config.debug=!1,n.a.prototype.$http=v.a,n.a.prototype.$moment=f.a,n.a.prototype.$eventBus=d.a,n.a.use(r.a),n.a.use(i.a);var h=[{path:"/",component:s(140)}],g=new r.a({routes:h,history:!0,hashbang:!1});new n.a({router:g,el:"#app",store:l.a,data:{},components:{App:u.a},created:function(){this.$eventBus.$on("return",function(){g.push({path:"/"})})}}).$mount("#app")},178:function(t,e){},179:function(t,e){},180:function(t,e){},182:function(t,e,s){function n(t){return s(r(t))}function r(t){var e=i[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}var i={"./af":13,"./af.js":13,"./ar":20,"./ar-dz":14,"./ar-dz.js":14,"./ar-kw":15,"./ar-kw.js":15,"./ar-ly":16,"./ar-ly.js":16,"./ar-ma":17,"./ar-ma.js":17,"./ar-sa":18,"./ar-sa.js":18,"./ar-tn":19,"./ar-tn.js":19,"./ar.js":20,"./az":21,"./az.js":21,"./be":22,"./be.js":22,"./bg":23,"./bg.js":23,"./bn":24,"./bn.js":24,"./bo":25,"./bo.js":25,"./br":26,"./br.js":26,"./bs":27,"./bs.js":27,"./ca":28,"./ca.js":28,"./cs":29,"./cs.js":29,"./cv":30,"./cv.js":30,"./cy":31,"./cy.js":31,"./da":32,"./da.js":32,"./de":35,"./de-at":33,"./de-at.js":33,"./de-ch":34,"./de-ch.js":34,"./de.js":35,"./dv":36,"./dv.js":36,"./el":37,"./el.js":37,"./en-au":38,"./en-au.js":38,"./en-ca":39,"./en-ca.js":39,"./en-gb":40,"./en-gb.js":40,"./en-ie":41,"./en-ie.js":41,"./en-nz":42,"./en-nz.js":42,"./eo":43,"./eo.js":43,"./es":45,"./es-do":44,"./es-do.js":44,"./es.js":45,"./et":46,"./et.js":46,"./eu":47,"./eu.js":47,"./fa":48,"./fa.js":48,"./fi":49,"./fi.js":49,"./fo":50,"./fo.js":50,"./fr":53,"./fr-ca":51,"./fr-ca.js":51,"./fr-ch":52,"./fr-ch.js":52,"./fr.js":53,"./fy":54,"./fy.js":54,"./gd":55,"./gd.js":55,"./gl":56,"./gl.js":56,"./gom-latn":57,"./gom-latn.js":57,"./he":58,"./he.js":58,"./hi":59,"./hi.js":59,"./hr":60,"./hr.js":60,"./hu":61,"./hu.js":61,"./hy-am":62,"./hy-am.js":62,"./id":63,"./id.js":63,"./is":64,"./is.js":64,"./it":65,"./it.js":65,"./ja":66,"./ja.js":66,"./jv":67,"./jv.js":67,"./ka":68,"./ka.js":68,"./kk":69,"./kk.js":69,"./km":70,"./km.js":70,"./kn":71,"./kn.js":71,"./ko":72,"./ko.js":72,"./ky":73,"./ky.js":73,"./lb":74,"./lb.js":74,"./lo":75,"./lo.js":75,"./lt":76,"./lt.js":76,"./lv":77,"./lv.js":77,"./me":78,"./me.js":78,"./mi":79,"./mi.js":79,"./mk":80,"./mk.js":80,"./ml":81,"./ml.js":81,"./mr":82,"./mr.js":82,"./ms":84,"./ms-my":83,"./ms-my.js":83,"./ms.js":84,"./my":85,"./my.js":85,"./nb":86,"./nb.js":86,"./ne":87,"./ne.js":87,"./nl":89,"./nl-be":88,"./nl-be.js":88,"./nl.js":89,"./nn":90,"./nn.js":90,"./pa-in":91,"./pa-in.js":91,"./pl":92,"./pl.js":92,"./pt":94,"./pt-br":93,"./pt-br.js":93,"./pt.js":94,"./ro":95,"./ro.js":95,"./ru":96,"./ru.js":96,"./sd":97,"./sd.js":97,"./se":98,"./se.js":98,"./si":99,"./si.js":99,"./sk":100,"./sk.js":100,"./sl":101,"./sl.js":101,"./sq":102,"./sq.js":102,"./sr":104,"./sr-cyrl":103,"./sr-cyrl.js":103,"./sr.js":104,"./ss":105,"./ss.js":105,"./sv":106,"./sv.js":106,"./sw":107,"./sw.js":107,"./ta":108,"./ta.js":108,"./te":109,"./te.js":109,"./tet":110,"./tet.js":110,"./th":111,"./th.js":111,"./tl-ph":112,"./tl-ph.js":112,"./tlh":113,"./tlh.js":113,"./tr":114,"./tr.js":114,"./tzl":115,"./tzl.js":115,"./tzm":117,"./tzm-latn":116,"./tzm-latn.js":116,"./tzm.js":117,"./uk":118,"./uk.js":118,"./ur":119,"./ur.js":119,"./uz":121,"./uz-latn":120,"./uz-latn.js":120,"./uz.js":121,"./vi":122,"./vi.js":122,"./x-pseudo":123,"./x-pseudo.js":123,"./yo":124,"./yo.js":124,"./zh-cn":125,"./zh-cn.js":125,"./zh-hk":126,"./zh-hk.js":126,"./zh-tw":127,"./zh-tw.js":127};n.keys=function(){return Object.keys(i)},n.resolve=r,t.exports=n,n.id=182},185:function(t,e,s){function n(t){s(180)}var r=s(4)(s(162),s(188),n,null,null);t.exports=r.exports},186:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("router-view")],1)},staticRenderFns:[]}},187:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"content"},[s("div",{staticClass:"row"},[s("div",{staticClass:"row rowtitle"},[s("div",{staticClass:"col-xs-4 "},[t.isLoggedIn?s("div",{staticClass:"inlinebtn float-l",on:{click:t.logout}},[t._v("LOG OUT")]):s("span",[t._v("Login")])]),t._v(" "),s("div",{staticClass:"col-xs-4 txtcenter"},[t.isLoggedIn?s("span",[t._v(" "+t._s(t.user.username)+" ")]):t._e()]),t._v(" "),s("div",{staticClass:"col-xs-4 "},[t.isLoggedIn?s("div",{staticClass:"inlinebtn float-r",on:{click:t.startover}},[t._v("Start Over")]):t._e()])]),t._v(" "),0==t.currentstep?s("div",{staticClass:"loginpanel"},[s("div",{staticClass:"row"},[t._m(0),t._v(" "),s("div",{staticClass:"col-md-8 col-sm-8 col-xs-8"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.serverurl,expression:"serverurl"}],attrs:{type:"text",placeholder:"Please Enter server url"},domProps:{value:t.serverurl},on:{input:function(e){e.target.composing||(t.serverurl=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"row"},[t._m(1),t._v(" "),s("div",{staticClass:"col-md-8 col-sm-8 col-xs-8"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.user.username,expression:"user.username"}],attrs:{type:"text",placeholder:"Please Enter Username"},domProps:{value:t.user.username},on:{input:function(e){e.target.composing||(t.user.username=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"row"},[t._m(2),t._v(" "),s("div",{staticClass:"col-md-8 col-sm-8 col-xs-8"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.user.password,expression:"user.password"}],attrs:{type:"password",placeholder:"Password"},domProps:{value:t.user.password},on:{input:function(e){e.target.composing||(t.user.password=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-4 col-sm-4 col-xs-4"}),t._v(" "),s("div",{staticClass:"col-md-8 col-sm-8 col-xs-8"},[s("button",{staticClass:"primarybtn",attrs:{disabled:!t.validuser},on:{click:t.loginclick}},[t._v("LOG IN")])])]),t._v(" "),t.testmode?s("div",{staticClass:"row"},[t._m(3),t._v(" "),s("div",{staticClass:"col-md-8 col-sm-8 col-xs-8"},[s("p",[t._v(t._s(t.responsebody))])])]):t._e()]):t._e()]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.currentstep>=1,expression:"currentstep>=1"}],staticClass:"row"},[s("div",{staticClass:"col-xs-2 txtcenter optab",class:{activetab:""!=t.operation}},[""!=t.operation?s("span",[t._v(t._s(t.operation))]):s("span",{staticClass:"preselect"},[t._v("Operation")])]),t._v(" "),s("div",{staticClass:"col-xs-2 txtcenter optab",class:{activetab:""!=t.routetype}},[""!=t.routetype?s("span",[t._v(t._s(t.routetype))]):s("span",{staticClass:"preselect"},[t._v("Run")])]),t._v(" "),s("div",{staticClass:"col-xs-4 txtcenter optab",class:{activetab:""!=t.selectedroute}},[""!=t.selectedroute?s("span",[t._v(t._s(t.selectedroute))]):s("span",{staticClass:"preselect"},[t._v("Route")])]),t._v(" "),s("div",{staticClass:"col-xs-4 txtcenter optab",class:{activetab:""!=t.selectedcustomer}},[""!=t.selectedcustomer?s("span",[t._v(t._s(t.selectedcustomer))]):s("span",{staticClass:"preselect"},[t._v("Customer")])])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:1==t.currentstep,expression:"currentstep==1"}],staticClass:"row"},[s("div",{staticClass:"rowtitle"},[1==t.currentstep?s("span",[t._v("Operation Selector")]):s("span",[t._v(t._s(t.operation))])]),t._v(" "),t.opchecked?t._e():s("div",{staticClass:"opselectpanel"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-1 col-sm-1 col-xs-1"}),t._v(" "),s("div",{staticClass:"col-md-5 col-sm-5 col-xs-5 io mediumfont",on:{click:function(e){t.setcheck(0)}}},[s("div",{staticClass:"m-btn out"},[t._v("Check OUT")])]),t._v(" "),s("div",{staticClass:"col-md-5 col-sm-5 col-xs-5 io mediumfont",on:{click:function(e){t.setcheck(1)}}},[s("div",{staticClass:"m-btn in"},[t._v("Check IN")])]),t._v(" "),s("div",{staticClass:"col-md-1 col-sm-1 col-xs-1"})])])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:2==t.currentstep,expression:"currentstep==2"}],staticClass:"row"},[s("div",{staticClass:"rowtitle"},[2==t.currentstep?s("span",[t._v("Run Selector")]):s("span",[t._v("Run: "+t._s(t.routetype))])]),t._v(" "),t.routeselected?t._e():s("div",{staticClass:"opselectpanel"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-1 col-sm-1 col-xs-1"}),t._v(" "),t.isCheckIn?s("div",{staticClass:"col-md-10 col-sm-10 col-xs-10 io mediumfont"},[t._v("HOME")]):t._e(),t._v(" "),t.isCheckIn?t._e():s("div",{staticClass:"col-md-5 col-sm-5 col-xs-5 io mediumfont",on:{click:function(e){t.setrun(0)}}},[s("div",{staticClass:"m-btn day"},[t._v("DAY")])]),t._v(" "),t.isCheckIn?t._e():s("div",{staticClass:"col-md-5 col-sm-5 col-xs-5 io mediumfont",on:{click:function(e){t.setrun(1)}}},[s("div",{staticClass:"m-btn night"},[t._v("NIGHT")])]),t._v(" "),s("div",{staticClass:"col-md-1 col-sm-1 col-xs-1"})])])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:3==t.currentstep,expression:"currentstep==3"}],staticClass:"row"},[s("div",{staticClass:"rowtitle"},[3==t.currentstep?s("span",[t._v("Route Selector")]):s("span",[t._v("Customer: "+t._s(t.selectedcustomer))])]),t._v(" "),t.routetypeselected&&!t.routeselected?s("div",{staticClass:"opselectpanel"},[s("div",{staticClass:"row mediumfont"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedroute,expression:"selectedroute"}],staticStyle:{width:"100%"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.selectedroute=e.target.multiple?s:s[0]}}},t._l(t.filteredroutelist,function(e){return s("option",{domProps:{value:e}},[t._v(t._s(e))])}))])]):t._e()]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:4==t.currentstep,expression:"currentstep==4 "}],staticClass:"row"},[s("div",{staticClass:"rowtitle"},[3==t.currentstep?s("span",[t._v("Customer Selector")]):s("span",[t._v("Customer: "+t._s(t.selectedcustomer))])]),t._v(" "),t.customerselected?t._e():s("div",{staticClass:"opselectpanel"},[s("div",{staticClass:"row mediumfont"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedcustomer,expression:"selectedcustomer"}],staticStyle:{width:"100%"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.selectedcustomer=e.target.multiple?s:s[0]}}},t._l(t.filteredcustlist,function(e){return s("option",{domProps:{value:e}},[t._v(t._s(e))])}))])])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.currentstep>=5,expression:"currentstep>=5"}],staticClass:"row"},[s("div",{staticClass:"rowtitle"},[t._v("Scanner\t")]),t._v(" "),s("div",{staticClass:"row",staticStyle:{height:"540px"}},[s("div",{staticClass:"col-sm-9 col-xs-9"},[s("scanner",{on:{barcoderead:t.readtag}})],1),t._v(" "),s("div",{staticClass:"col-sm-3 col-xs-3",staticStyle:{height:"100%","font-size":"120pt","text-align":"center",border:"1px solid #e7e7e7"}},[s("span",[t._v(" "+t._s(t.taglist.length)+" ")])])]),t._v(" "),s("div",{staticClass:"barcodelist txtcenter"},[t._v(" Tag List\r\n\t\t\t"),s("ul",t._l(t.taglist,function(e){return s("li",[t._v(t._s(e))])}))]),t._v(" "),s("div",{staticClass:"button"},[t._v("btns")])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],staticClass:"settingoverlay"},[s("div",{staticClass:"rowtitle"},[t._v("Config")])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-md-4 col-sm-4 col-xs-4"},[s("label",[t._v("Server URL")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-md-4 col-sm-4 col-xs-4"},[s("label",[t._v("USERNAME")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-md-4 col-sm-4 col-xs-4"},[s("label",[t._v("PASSCODE")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-md-4 col-sm-4 col-xs-4"},[s("label",[t._v("RESPONSE")])])}]}},188:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"scanner_wrapper"},[s("div",{ref:"quagga",staticClass:"camera"})])},staticRenderFns:[]}},192:function(t,e){}},[163]);
//# sourceMappingURL=app.27a4298ae0e963983d76.js.map