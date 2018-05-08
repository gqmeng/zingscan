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
				<div class='inlinebtn float-r' v-if='isLoggedIn' @click='startover'>New Scan</div>
			</div>
		</div>
		<div class='loginpanel' v-if='currentstep==0'>
			<div class='row' v-show='debugEnabled'>
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
		<!-- <div class='row' v-if='debugEnabled'>
			<div class='col-md-4 col-sm-4 col-xs-4'>
					<label>REQUEST</label>
			</div>
			<div class='col-md-8 col-sm-8 col-xs-8'>
				<p>{{requestbody}}</p>
			</div>
		</div> -->
		<div class='row' v-if='debugEnabled'>
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
		<!-- <div class='col-xs-2 txtcenter optab' >
			<div class='stepind' :class='{active:operation!=""}'>
				<span v-if='operation!=""'>{{operation}}</span>
				<span v-else class='preselect'>Operation</span>
			</div>
		</div> -->
		<div class='col-xs-2 txtcenter optab' >
			<div class='stepind' :class='{active:routetype!="",out:operation=="Check OUT", in:operation=="Check IN"}'>
			<span v-if='routetype!=""'>{{routetype}}</span>
			<span v-else class='preselect'>Run</span>
		</div>
		</div>
		<div class='col-xs-5 txtcenter optab' >
			<div class='stepind' :class='{active:selectedroute!="",out:operation=="Check OUT", in:operation=="Check IN"}'>
			<span v-if='selectedroute!=""'>{{selectedroutename}}</span>
			<span v-else class='preselect'>Route</span>
		</div>
		</div>
		<div class='col-xs-5 txtcenter optab' >
			<div class='stepind' :class='{active:selectedcustomer!="",out:operation=="Check OUT", in:operation=="Check IN"}'>
			<span v-if='selectedcustomer!=""'>{{selectedcustname}}</span>
			<span v-else class='preselect'>Customer</span>
		</div>
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
				<div class='col-md-5 col-sm-5 col-xs-5 io-l mediumfont' @click='setcheck(0)'><div class='m-btn out'>Check OUT</div>	</div>
				<div class='col-md-5 col-sm-5 col-xs-5 io-r mediumfont' @click='setcheck(1)'><div class='m-btn in'>Check IN</div>	</div>
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
				<div class='col-md-5 col-sm-5 col-xs-5 io-l mediumfont' v-if='!isCheckIn' @click='setrun(0)'><div class='m-btn day'>DAY</div></div>
				<div class='col-md-5 col-sm-5 col-xs-5 io-r mediumfont' v-if='!isCheckIn' @click='setrun(1)'><div class='m-btn night'>NIGHT</div></div>
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
					<option disabled value="">Please select the route</option>
					<option v-for='opt in filteredroutelist'v-bind:value="opt.routeid">{{opt.runname}}</option>
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
						<option disabled value="">Please select the customer</option>
					<option v-for='opt in filteredcustlist'v-bind:value="opt.custid">{{ opt.name}}</option>
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
			<div class='col-sm-3 col-xs-3' style='height:100%; font-size:120pt;text-align:center;'>
				<span > {{taglist.length}} </span>

			</div>
		</div>
		<div class='barcodelist txtcenter'> Tag List
			<ul>
				<li v-for='tag in taglist'>{{tag.tagid}}</li>
			</ul>
		</div>
		<div class='m-btn upload' v-show='readyforupload' @click='uploadtaglist'>Upload Barcode List</div>
	</div>
	<div class='settingoverlay'  v-show='false'><div class='rowtitle'>Config</div></div>
</div>
</template>
<script>

 import scanner from "./scanner.vue";


 Object.defineProperty(Array.prototype, 'chunk', {
    value: function(chunkSize){
        var temporal = [];

        for (var i = 0; i < this.length; i+= chunkSize){
            temporal.push(this.slice(i,i+chunkSize));
        }

        return temporal;
    }
});

export default {
    name: 'frontpage',
	data : function() {
		return {

			currentstep:5,
			filebase:{'login':'/m/mjsonlogin.php', 'custlist':'/m/customerlist.php','upload':'/m/scanlogupload.php'},
			user:{username:'UserA1',password:'AAAA',userid:'A1'},
			requestbody:'request',
			responsebody:'response',
			operation:'',
			masterCustList:{'cust':[],'route':[]},
			routelist:[{id:'a',label:"A"},{id:'b',label:"B"},{id:'c',label:"C"},{id:'d',label:"D"}],
			selectedroute:'',
			customerlist:['1','2','3','4','5'],
			selectedcustomer:'',
			taglist:[],
			routetype:'',
			deliveryrun:'',
			scantimestamp:0,
			scantime:''
		}
	},
	created : function() {
		var self=this;
		this.scantimestamp = this.$moment().unix();
		this.scantime = this.$moment().format('YYYY-MM-DD HH:MM:SS')
		console.log("Start at: "+ this.scantimestamp+" "+this.scantime)
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
		tagiddisplist: function(){
			// return this.taglist.map(function(e){return e.tagid}).chunk(3)
		},
		mockserver: function(){
			return this.$store.getters.getmockserver
		},
		selectedroutename: function(){
			var ind = this.filteredroutelist.map(function(e){return e.routeid}).indexOf(this.selectedroute)
			console.log(ind)
			var t =''
			if(ind!=-1){
				t=this.filteredroutelist.map(function(e){return e.runname})[ind]
			}
			return t
		},
		selectedcustname: function(){
			var ind = this.filteredcustlist.map(function(e){return e.custid}).indexOf(this.selectedcustomer)
			console.log(ind)
			var t =''
			if(ind!=-1){
				t=this.filteredcustlist.map(function(e){return e.name})[ind]
			}
			return t
		},
		debugEnabled:function(){
			return this.$store.getters.isDebugging
		},
		deviceid:function(){
      return this.$store.getters.getdeviceid
    },
		serverurl:function(){
				return this.$store.getters.getserverurl
		},
		tagprefix:function(){
			return this.$store.getters.gettagprefix
		},
		transactionid: function(){
			var s = this.user.userid
			s=s+this.deviceid
			var t = this.scantimestamp +""
			s=s+t
			return s
		},
		reqbody: function(){
			var obj={ "TransID":"" , "Scantype" : "" , "custid" : "", "routeid" : "", "Scantime" : "" , "Tags" : [] }
			obj.TransID = this.transactionid
			if(this.isCheckIn) {obj.Scantype = 'CK_IN'}
			else {obj.Scantype = 'CKOUT'}
			obj.routeid = this.selectedroute
			obj.custid=this.selectedcustomer
			obj.Scantime = this.scantime
			obj.Tags = JSON.parse(JSON.stringify(this.taglist))
			return obj
		},
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
			if(this.debugEnabled){
				this.routelist.forEach(function(e){
					l.push(e)
				})
			}else {
			this.masterCustList.route.forEach(function(e){
				if(e.route==self.routetype){
					l.push(e)
				}
			})
		}
			return l
		},
		filteredcustlist:function(){
			var l = []
			var self=this;
			if(this.debugEnabled){
				this.customerlist.forEach(function(e){
					l.push(e)
				})
			}else {
			this.masterCustList.cust.forEach(function(e){
				if(e.routeid==self.selectedroute){
					l.push(e)
				}
			})
		}
			return l
		},
		readyforupload:function(){
			return this.taglist.length>0
		}
	},
	methods : {
		beep:function() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    snd.play();
		},

		startover:function(){
			this.selectedcustomer=''
			this.selectedroute=''
			this.routetype=''
			this.operation=''
			this.currentstep = 1
			this.$toasted.show("Tag list Reset. Starting a new scan...")
			this.taglist=[]
			this.scantimestamp = this.$moment().unix();
			console.log("Start at: "+ this.scantimestamp)
		},
		uploadtaglist: function(){
			var self=this
			console.log(JSON.stringify(this.reqbody))
			var url = this.serverurl+this.filebase.upload
			if(!this.debugEnabled){
			this.$http({
				method: 'POST',
				url: url,
				headers: {'Content-type': 'application/json',
									'Accept':'application/json'
								},
				data:this.reqbody
			}) .then(function(response) {
				self.responsebody=JSON.stringify(response)
				var success = response.data.Success
				console.log(response)
				if(success==1){
					console.log('Success')
					self.$toasted.success("Upload Successful..")
					setTimeout(function(){
						self.currentstep=1
						self.startover()
					},2000)
				}else {
					console.log('Error')
					self.$toasted.error("Upload Error, PLease try again..")
				}
			}) .catch(function(error){
				self.responsebody=JSON.stringify(error)
				console.log(error)
				self.$toasted.error("Upload Error, PLease try again..")
			});
		}
		},

		enterPressed: function(e){
				e.preventDefault();
		},
		loginclick:function(){

			var self=this
			var data ={}
			data.username=this.user.username
			data.password=this.user.password
			data.device =this.deviceid
			data.syncflag='1'
			var params = new URLSearchParams();
			for(var key in data){
				params.append(key, data[key]);
			}
			var url = this.serverurl+this.filebase.login
			if(!this.mockserver){
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
				self.$toasted.error("Cannot Login. Please try again.")
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
			this.user.userid=""
			this.taglist=[]
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
				this.retrieveCustomerList()
				this.routetype='HOME'
				this.selectedcustomer='ZBH1'
				this.selectedroute='ZHOME'
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
			var tag = {}
			tag.tagid= data.codeResult.code
			if(this.validatetag(tag.tagid)){
				this.taglist.push(tag)
				this.beep()
			}
		},
		validatetag:function(id){
			var b = true;
			b = b && (id.length==7)
			var prefixcheck = false
			if(this.tagprefix.length>0){
				this.tagprefix.forEach(function(e){
					prefixcheck = prefixcheck | id.substring(0,1)== e
				})
			}
			b= b && prefixcheck
			var duplicatecheck = (this.taglist.map(function(e){return e.tagid}).indexOf(id)==-1)
			b=b && duplicatecheck
			return b
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
	height:200px;
	line-height: 160px;
	padding:20px 0px;
		color:#fff;
		font-size:40pt;
		text-align:center;
}
.m-btn.in{
	background-color:green;

}
.m-btn.night{
	background-color:#02088e;

}
.m-btn.out{
	background-color:#804c02;
}
.m-btn.day{
	background-color:#686ef5;
}
.m-btn.upload {
		background-color:grey;
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
	font-size: 30px;
	background:#fff;
	padding:0px;
}
.optab.activetab {
	background:#e3e3e3;
}
.primarybtn:disabled {
	color:#999999;
}
.io, .io-l, .io-r {
	height:220px;
	padding:30px;
	text-align:center;
}
.io-l {
	padding:30px 60px 30px 0px;
}
.io-r {
	padding:30px 0px 30px 60px;
}
p {
	padding: 10px 6px;
	width:100%;
}
.barcodelist {
	font-size:40pt;
	height:600px;
	overflow:auto;
	border:1px solid #b3b3b3;
	box-shadow: 2px 2px #e3e3e3;
}
.barcodelist>ul>li {
	background-color:#fff;
}

.barcodelist>ul>:nth-child(odd) { background-color: #eee; }
.stepind {
	transition: all 0.6s ease;
	border-radius:35px;
	background-color: #e5e5e5;
	margin:0px;
	border:1px solid #e5e5e5;
}
.stepind.active.out {
	border-radius:0;
	background-color: #804c02;
}
.stepind.active.in {
	border-radius:0;
	background-color: green;
}
.stepind span {
	color:#b3b3b3;
	transition:color 0.6s ease;
}
.stepind.active span {
	color:#fff;
}

</style>
