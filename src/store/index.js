import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectFoods: []
  },
  actions: {
  },
  mutations: {
    changeSelectData (state, data) {
      state.selectFoods = data
      console.log(data)
    }
  },
  getters: {
  }
})
