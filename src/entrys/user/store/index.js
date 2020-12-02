import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  isShowOriginalAuthor:0,
  nickname:'',
  headPicUrl:'',
  identity:''
}

const mutations = {
  setIsShowOriginalAuthor (state, data) {
    state.isShowOriginalAuthor=data;
  },
  setNickname (state, data) {
    state.nickname=data;
  },
  setHeadPicUrl (state, data) {
    state.headPicUrl=data;
  },
  setIdentity (state, data) {
    state.identity=data;
  }
}

export default new Vuex.Store({
  state,
  mutations,
})
