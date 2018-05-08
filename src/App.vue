<template>
  <div>
 	  <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'app1',
  data: function () {
    return {};
  },
  created: function () {
    var t = this.$moment().unix()
    this.$store.commit("settoday", t)
  },
	computed:{
    deviceid:function(){
      return this.$store.getters.getdeviceid
    }
	},
	mounted:function(){
    var self=this;
    this.$http.get("./static/json/config.json").then( response=> {
      console.log(response.data)
      self.$store.commit('init', response.data)
    }).catch(e=>{
      console.log(e)
    });
	},
  methods:{
	}
};
</script>
<style>
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #777;
  margin-top: 0px;
}
.toasted.outline.toastclass{
	font-size:18px;
}
</style>
