import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const vuexLocal = new VuexPersistence ({
    key:"first",
    storage: window.localStorage,
    // reducer: state => ({patientlist: state.patientlist, currentStation: state.currentStation, currentGroup:state.currentGroup}),
})

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [vuexLocal.plugin],
  state:{
      init:{},
      debugEnabled:true,
      filterEnabled:true,
      serverurl:'',
      deviceid:'',
      currentdaterange:{starttime:0,endtime:0,days:7},
      today:0,
      currentuser:''
    },
  mutations: {
    settoday(state,timestamp){
      state.today=timestamp
    },
    setcurrentuser(state,userid){
      state.currentuser = userid
    },
    init(state, obj){
      state.init=JSON.parse(JSON.stringify(obj));
      state.serverurl=state.init.serverurl;
      state.deviceid=state.init.deviceid;
      state.debugEnabled=state.init.debugEnabled;
      window.dispatchEvent(new Event('reload'));
    }
  },
  getters: {
    getdeviceid:state=>{
      return state.deviceid
    },
    getScreenname:state=>{
      return state.screenname
    },
    getcurrentuser:state=>{
      return state.currentuser
    },
    gettoday:state=>{
      return state.today
    },

    getserverurl: state=> {
      return state.serverurl
    },

    isDebugging: state => {
      return state.debugEnabled;
    },
    getcurrentdaterange: state =>{
      return state.currentdaterange
    }
  },
  actions: {
    initStore({commit}){
      commit('init')
    },
  }
  // plugins: debug ? [createLogger()] : []
})

export default store

const initialStateCopy = JSON.parse(JSON.stringify(store.state))

export function resetState () {
  store.replaceState(JSON.parse(JSON.stringify(initialStateCopy)))
}
// export default store
