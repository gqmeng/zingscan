<template>
<div class='content'>
	<div class='row'>
		<div class='rowtitle'>
			<span v-if='currentstep==0'>Login</span>
			<span v-else>Logged In As: {{user.username}} </span> <div class='inlinebtn' v-if='isLoggedIn' @click='logout'>LOG OUT</div>
		</div>
		<div class='loginpanel' v-if='currentstep==0'>
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
		</div>
	</div>
	<div class='row' v-show='currentstep>=1'>
		<div class='rowtitle'>
			<span v-if='currentstep==1'>Operation Selector</span>
			<span v-else>{{operation}}</span>
		</div>
		<div class='opselectpanel' v-if='!opchecked'>
			<div class='row'>
				<div class='col-md-6 col-sm-6 col-xs-6 io' @click='setcheck(0)'>Check OUT	</div>
				<div class='col-md-6 col-sm-6 col-xs-6 io' @click='setcheck(1)'>Check IN	</div>
			</div>
		</div>
	</div>
	<div class='row'  v-show='currentstep>=2 && !isCheckIn'>
		<div class='rowtitle'>
			<span v-if='currentstep==2'>Route Selector</span>
			<span v-else>ROUTE: {{selectedroute}}</span>
		</div>
		<div class='opselectpanel' v-if='!routeselected'>
			<div class='row'>
				<select  v-model='selectedroute'>
					<option v-for='opt in routelist'v-bind:value="opt">{{ opt}}</option>
				</select>
			</div>
		</div>
	</div>
	<div class='row'  v-show='currentstep>=3 && !isCheckIn'>
		<div class='rowtitle'>
			<span v-if='currentstep==3'>Customer Selector</span>
			<span v-else>Customer: {{selectedcustomer}}</span>
		</div>
		<div class='opselectpanel' v-if='!customerselected'>
			<div class='row'>
				<select  v-model='selectedcustomer'>
					<option v-for='opt in customerlist'v-bind:value="opt">{{ opt}}</option>
				</select>
			</div>
		</div>
	</div>
	<div class='row'  v-show='currentstep>=4'>
		<div class='rowtitle'>Scanner</div>
		<div class='scannerscreen'>Camera Viewport</div>
		<div class='barcodelist'>List</div>
		<div class='button'>btns</div>
	</div>
	<div class='settingoverlay'  v-show='false'><div class='rowtitle'>Config</div></div>
</div>
</template>
<script>

import kogrid from './kogrid.vue';

export default {
    name: 'frontpage',
	data : function() {
		return {
			currentstep:1,
			user:{username:'Albert',password:'wwww'},
			operation:'',
			routelist:['a','b','c','d'],
			selectedroute:'',
			customerlist:['1','2','3','4','5'],
			selectedcustomer:'',
			taglist:[]
		}
	},
	created : function() {
		var self=this;
		// this.loadPatientDataIntoStorage();
		var lastsunday = this.$moment().day(-7);
		var obj={start:0, end:0, days:7};
		obj.end=this.$moment().day(6).endOf('day').unix();   //next Saturday
		obj.start=this.$moment().day(obj.days-7).startOf('day').unix() //last Sunday
		console.log("Start at: "+obj.start+"  End at:"+obj.end)
		console.log("Start at: "+this.$moment.unix(obj.start).format()+"  End at:"+this.$moment.unix(obj.end).format())
		// this.$store.commit("setcurrentdaterange",obj)
	},
	mounted:function(){
		// this.$store.commit('setScreenname','Patient List')
	},
	updated: function() {

  },
	watch:{
		selectedroute:function(){
			this.currentstep++;
		},
		selectedcustomer:function(){
			this.currentstep++;
		}
	},
	computed : {
		isLoggedIn:function(){
			return this.user.username!=''
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
		routeselected:function(){
			return this.selectedroute!=''
		},
		customerselected:function(){
			return this.selectedcustomer!=''
		}
	},
	methods : {
		enterPressed: function(e){
				e.preventDefault();
		},
		loginclick:function(){
			this.currentstep++;
			this.operation=''
		},
		logout:function() {
			this.currentstep=0;
			this.user.username=''
			this.user.password=''
		},
		setcheck:function(n){
			if(n==0) {
				this.operation='Check OUT'
				this.currentstep++
			}
			if(n==1) {
				this.operation='Check IN'
				this.currentstep=4;
			}
			this.selectedcustomer=''
			this.selectedroute=''
		}
	},
	components:{

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
	font-size: 24px;
	font-weight: 600;
	background-color:#e3e3e3;
	padding:5px 15px;
}
.inlinebtn {
	display:inline-block;
	float:right;
	font-size:16px;
	border:1px solid #666666;
	padding:2px 8px;
	margin-top:3px;
}
input {
	border:1px solid #666666;
	padding: 2px 8px;
	margin:5px;
	width:100%;
}
.primarybtn {
	background-color:#666666;
	border:1px sold #666666;
	margin:5px;
	color: #fff;
	padding: 5px 8px;
	text-align:center;
	width:100%;
}
.primarybtn:disabled {
	color:#555555;
}
.io {
	height:120px;
	padding:10px;
	text-align:center;
}
</style>
