import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

var state={
  token:''
}

var mutations={
  set_token(state,param){   //state就表示state对象
    state.token = param;
    sessionStorage.setItem('token',param);
  },
}

export default new Vuex.Store({
  state,
  mutations
})
