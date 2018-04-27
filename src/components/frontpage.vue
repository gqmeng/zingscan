<template>
<div class='content'>
	<div class='row'>
		<div class='row rowtitle'>
			<div class='col-xs-4 ' >
					<div class='inlinebtn float-l' v-if='isLoggedIn' @click='logout'>LOG OUT</div>
					<span v-else>Login</span>
			</div>
			<div class='col-xs-4 txtcenter'>
				<span v-if='isLoggedIn'> {{user.username}} </span>
			</div>
			<div class='col-xs-4 '>
				<div class='inlinebtn float-r' v-if='isLoggedIn' @click='startover'>Start Over</div>
			</div>
		</div>
		<div class='loginpanel' v-if='currentstep==0'>
			<div class='row'>
			<div class='col-md-4 col-sm-4 col-xs-4'>
				<label>Server URL</label>
			</div>
			<div class='col-md-8 col-sm-8 col-xs-8'>
				<input type='text' v-model='serverurl' placeholder='Please Enter server url'></input>
			</div>
		</div>
			<div class='row'>
			<div class='col-md-4 col-sm-4 col-xs-4'>
				<label>USERNAME</label>
			</div>
			<div class='col-md-8 col-sm-8 col-xs-8'>
				<input type='text' v-model='user.username' placeholder='Please Enter Username'></input>
			</div>
		</div>
		<div class='row'>
		<div class='col-md-4 col-sm-4 col-xs-4'>
			<label>PASSCODE</label>
		</div>
		<div class='col-md-8 col-sm-8 col-xs-8'>
			<input type='password' v-model='user.password' placeholder='Password'></input>
		</div>
		</div>
		<div class='row'>
			<div class='col-md-4 col-sm-4 col-xs-4'>

			</div>
			<div class='col-md-8 col-sm-8 col-xs-8'>
				<button class='primarybtn' :disabled='!validuser' @click='loginclick'>LOG IN</button>
			</div>
		</div>
		<!-- <div class='row' v-if='testmode'>
			<div class='col-md-4 col-sm-4 col-xs-4'>
					<label>REQUEST</label>
			</div>
			<div class='col-md-8 col-sm-8 col-xs-8'>
				<p>{{requestbody}}</p>
			</div>
		</div> -->
		<div class='row' v-if='testmode'>
			<div class='col-md-4 col-sm-4 col-xs-4'>
					<label>RESPONSE</label>
			</div>
			<div class='col-md-8 col-sm-8 col-xs-8'>
				<p>{{responsebody}}</p>
			</div>
		</div>
		</div>
	</div>
	<div class='row' v-show='currentstep>=1'>
		<div class='col-xs-2 txtcenter optab' :class='{activetab:operation!=""}'>
			<span v-if='operation!=""'>{{operation}}</span>
			<span v-else class='preselect'>Operation</span>
		</div>
		<div class='col-xs-2 txtcenter optab' :class='{activetab:routetype!=""}'>
			<span v-if='routetype!=""'>{{routetype}}</span>
			<span v-else class='preselect'>Run</span>
		</div>
		<div class='col-xs-4 txtcenter optab' :class='{activetab:selectedroute!=""}'>
			<span v-if='selectedroute!=""'>{{selectedroute}}</span>
			<span v-else class='preselect'>Route</span>
		</div>
		<div class='col-xs-4 txtcenter optab' :class='{activetab:selectedcustomer!=""}'>
			<span v-if='selectedcustomer!=""'>{{selectedcustomer}}</span>
			<span v-else class='preselect'>Customer</span>
		</div>
	</div>
	<div class='row' v-show='currentstep==1'>
		<div class='rowtitle'>
			<span v-if='currentstep==1'>Operation Selector</span>
			<span v-else>{{operation}}</span>
		</div>
		<div class='opselectpanel' v-if='!opchecked'>
			<div class='row'>
				<div class='col-md-1 col-sm-1 col-xs-1'  ></div>
				<div class='col-md-5 col-sm-5 col-xs-5 io mediumfont' @click='setcheck(0)'><div class='m-btn out'>Check OUT</div>	</div>
				<div class='col-md-5 col-sm-5 col-xs-5 io mediumfont' @click='setcheck(1)'><div class='m-btn in'>Check IN</div>	</div>
				<div class='col-md-1 col-sm-1 col-xs-1'  ></div>
			</div>
		</div>
	</div>
	<div class='row'  v-show='currentstep==2'>
		<div class='rowtitle'>
			<span v-if='currentstep==2'>Run Selector</span>
			<span v-else>Run: {{routetype}}</span>
		</div>
		<div class='opselectpanel' v-if='!routeselected' >
			<div class='row'>
				<div class='col-md-1 col-sm-1 col-xs-1'  ></div>
				<div class='col-md-10 col-sm-10 col-xs-10 io mediumfont' v-if='isCheckIn' >HOME</div>
				<div class='col-md-5 col-sm-5 col-xs-5 io mediumfont' v-if='!isCheckIn' @click='setrun(0)'><div class='m-btn day'>DAY</div></div>
				<div class='col-md-5 col-sm-5 col-xs-5 io mediumfont' v-if='!isCheckIn' @click='setrun(1)'><div class='m-btn night'>NIGHT</div></div>
				<div class='col-md-1 col-sm-1 col-xs-1'  ></div>
			</div>
		</div>
</div>
<div class='row'  v-show='currentstep==3'>
	<div class='rowtitle'>
		<span v-if='currentstep==3'>Route Selector</span>
		<span v-else>Customer: {{selectedcustomer}}</span>
	</div>
		<div class='opselectpanel' v-if='routetypeselected&&!routeselected'>
			<div class='row mediumfont'>
				<select  v-model='selectedroute' style='width:100%;'>
					<option v-for='opt in filteredroutelist'v-bind:value="opt">{{opt}}</option>
				</select>
			</div>
		</div>
	</div>
	<div class='row'  v-show='currentstep==4 '>
		<div class='rowtitle'>
			<span v-if='currentstep==3'>Customer Selector</span>
			<span v-else>Customer: {{selectedcustomer}}</span>
		</div>
		<div class='opselectpanel' v-if='!customerselected'>
			<div class='row mediumfont'>
				<select  v-model='selectedcustomer' style='width:100%;'>
					<option v-for='opt in filteredcustlist'v-bind:value="opt">{{ opt}}</option>
				</select>
			</div>
		</div>
	</div>
	<div class='row'  v-show='currentstep>=5'>
		<div class='rowtitle'>Scanner	</div>

		<div class='row' style='height:540px;'>
			<div class='col-sm-9 col-xs-9'>
				<scanner v-on:barcoderead='readtag'></scanner>
			</div>
			<div class='col-sm-3 col-xs-3' style='height:100%; font-size:120pt;text-align:center;border:1px solid #e7e7e7;'>
				<span > {{taglist.length}} </span>

			</div>
		</div>
		<div class='barcodelist txtcenter'> Tag List
			<ul>
				<li v-for='tag in taglist'>{{tag}}</li>
			</ul>
		</div>
		<div class='button'>btns</div>
	</div>
	<div class='settingoverlay'  v-show='false'><div class='rowtitle'>Config</div></div>
</div>
</template>
<script>

 import scanner from "./scanner.vue";
export default {
    name: 'frontpage',
	data : function() {
		return {
			testmode:true,
			currentstep:0,
			serverurl:'http://localhost/zing2',
			filebase:{'login':'/m/mjsonlogin.php', 'custlist':'/m/customerlist.php'},
			user:{username:'UserA1',password:'AAAA'},
			requestbody:'request',
			responsebody:'response',
			operation:'',
			masterCustList:{'cust':[],'route':[]},
			routelist:['a','b','c','d'],
			selectedroute:'',
			customerlist:['1','2','3','4','5'],
			selectedcustomer:'',
			taglist:[],
			routetype:'',
			deliveryrun:''
		}
	},
	created : function() {
		var self=this;
		var lastsunday = this.$moment().day(-7);
		var obj={start:0, end:0, days:7};
		obj.end=this.$moment().day(6).endOf('day').unix();   //next Saturday
		obj.start=this.$moment().day(obj.days-7).startOf('day').unix() //last Sunday
		console.log("Start at: "+obj.start+"  End at:"+obj.end)
		console.log("Start at: "+this.$moment.unix(obj.start).format()+"  End at:"+this.$moment.unix(obj.end).format())
		// this.$store.commit("setcurrentdaterange",obj)
	},
	mounted:function(){
	},
	updated: function() {

  },
	watch:{
		selectedroute:function(){
			if(this.selectedroute!=''){
				this.currentstep++;
			}
		},
		selectedcustomer:function(){
			if(this.selectedcustomer!=''){
				this.currentstep++;
			}
		}
	},
	computed : {
		cUser: function(){
			return this.$store.getters.getcurrentuser
		},
		isLoggedIn:function(){

			return this.cUser!=''
		},
		validuser:function(){
			return this.user.username!=''&&this.user.password!=''
		},
		opchecked:function(){
			return this.operation!=''
		},
		isCheckIn:function(){
			return this.operation=='Check IN'
		},
		routetypeselected:function(){
			return this.routetype!=''
		},
		routeselected:function(){
			return this.selectedroute!=''
		},
		customerselected:function(){
			return this.selectedcustomer!=''
		},
		filteredroutelist:function(){
			var l = []
			var self=this;
			if(this.testmode){
				this.routelist.forEach(function(e){
					l.push(e)
				})
			}else {
			this.masterCustList.route.forEach(function(e){
				if(e.route==self.routetype){
					l.push(e.routeid)
				}
			})
		}
			return l
		},
		filteredcustlist:function(){
			var l = []
			var self=this;
			if(this.testmode){
				this.customerlist.forEach(function(e){
					l.push(e)
				})
			}else {
			this.masterCustList.cust.forEach(function(e){
				if(e.routeid==self.selectedroute){
					l.push(e.custid)
				}
			})
		}
			return l
		}
	},
	methods : {
		startover:function(){
			this.selectedcustomer=''
			this.selectedroute=''
			this.routetype=''
			this.operation=''
			this.currentstep = 1
		},
		enterPressed: function(e){
				e.preventDefault();
		},
		loginclick:function(){

			var self=this
			var data ={}
			data.username=this.user.username
			data.password=this.user.password
			data.device ='A'
			data.syncflag='1'
			var params = new URLSearchParams();
			for(var key in data){
				params.append(key, data[key]);
			}
			var url = this.serverurl+this.filebase.login
			if(!this.testmode){
			this.$http({
				method: 'POST',
				url: url,
				headers: {'Content-type': 'application/x-www-form-urlencoded',
									'Accept':'application/json'
								},
				data:params
			}) .then(function(response) {
				self.responsebody=JSON.stringify(response)
				self.$store.commit('setcurrentuser',self.user.username)
				console.log(response)
				self.currentstep++;
			}) .catch(function(error){
				self.responsebody=JSON.stringify(error)
				console.log(error)
			});
		}else {
			self.currentstep++;
			self.$store.commit('setcurrentuser',self.user.username)
		}
			this.operation=''
		},
		logout:function() {
			this.currentstep=0;
			this.user.username=''
			this.user.password=''
			this.$store.commit('setcurrentuser',this.user.username)
			this.selectedcustomer=''
			this.selectedroute=''
			this.routetype=''
			this.operation=''
		},
		retrieveCustomerList:function(){
			var self=this
			self.masterCustList.cust=[]
			self.masterCustList.route=[]
			var data ={}
			data.device ='A'
			var params = new URLSearchParams();
			for(var key in data){
				params.append(key, data[key]);
			}
			var url = this.serverurl+this.filebase.custlist
			this.$http({
				method: 'POST',
				url: url,
				headers: {'Content-type': 'application/x-www-form-urlencoded',
									'Accept':'application/json'
								},
				data:params
			}) .then(function(response) {
				var resp = response.data
				console.log(resp)
				resp.Cust.forEach(function(e){
					self.masterCustList.cust.push(e)
				})
				resp.ROUTE.forEach(function(e){
					self.masterCustList.route.push(e)
				})
				// self.currentstep++;
			}) .catch(function(error){
				self.responsebody=JSON.stringify(error)
				console.log(error)
			});
		},
		setcheck:function(n){
			if(n==0) {
				this.operation='Check OUT'
				this.retrieveCustomerList()
				this.selectedcustomer=''
				this.selectedroute=''
				this.currentstep++
			}
			if(n==1) {
				this.operation='Check IN'
				this.routetype='HOME'
				this.selectedcustomer='HOME'
				this.selectedroute='HOME'
				this.currentstep=4;
			}

		},
		setrun:function(n){
			if(n==0) {
				this.routetype='DAY'
			}
			if(n==1) {
				this.routetype='NIGHT'
			}
			this.currentstep=3
		},

		readtag:function(data){
			var tag = data.codeResult.code
			var index = this.taglist.indexOf(tag)
			if(index==-1&&tag.length==7){
				this.taglist.push(tag)
			}
		}

	},
	components:{
		 scanner
	}
};
</script>
<style scoped>
.row {
	margin: 0px;
	min-height:60px;
	padding: 10px;
}
.rowtitle {
	font-size: 40pt;
	font-weight: 600;
	background-color:#e3e3e3;
	padding:5px 15px;
}
.largefont {
	font-size:50pt;
}
.mediumfont {
	font-size:42pt;
}
.smallfont {
	font-size:36pt;
}
.m-btn {
	border: 1px solid #b7b7b7;
	border-radius: 3px;
}
.m-btn.in{
	background-color:green;
	color:#fff;
}
.m-btn.night{
	background-color:grey;
	color:#fff;
}
.m-btn.out{
	background-color:orange;
}
.m-btn.day{
	background-color:#fff;
}
.inlinebtn {
	display:inline-block;
	font-size:30pt;
	border:1px solid #666666;
	padding:2px 8px;
	margin:0 auto;
	margin-top:6px;
}
input {
	border:1px solid #666666;
	padding: 2px 8px;
	margin:5px;
	width:100%;
	font-size:30pt;
}
.primarybtn {
	background-color:#666666;
	border:1px solid #666666;
	margin:5px;
	color: #fff;
	padding: 5px 8px;
	text-align:center;
	width:100%;
	font-size: 28pt;

}
.optab {
	font-size: 20pt;
	background:#fff;
}
.optab.activetab {
	background:#e3e3e3;
}
.primarybtn:disabled {
	color:#999999;
}
.io {
	height:220px;
	padding:30px;
	text-align:center;
}
p {
	padding: 10px 6px;
	width:100%;
}
.barcodelist {
	font-size:25pt;
	height:600px;
	overflow:scroll;
}
</style>
