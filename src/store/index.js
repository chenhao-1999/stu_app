import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
let userInfo=localStorage.getItem("userInfo")||"{}"
userInfo=JSON.parse(userInfo)
export default new Vuex.Store({
  state: {
    userInfo,
  },
  mutations: {
    //改变 userInfo
    GET_USERINFO(state,payload){
      // console.log(payload);
      state.userInfo=payload
    }

  },
  actions: {},
  modules: {}
});
