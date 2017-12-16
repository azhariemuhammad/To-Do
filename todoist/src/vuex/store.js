import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import jwtDecode from 'jwt_decode'

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)
const state = {
  todos: []
}

const getters = {}

const mutations = {
  setTodos (state, payload) {
    state.todos = payload
  },
  decode (state, token) {
    console.log(token)
  }
}
const actions = {
  // getAllTodos ({ commit }, dataUser) {
  //   http.get('/api/')
  // }
  login ({ commit }, username) {
    http.post('/api/signin', {
      username: username
    })
    .then(({ res }) => {
      commit('decode', res)
    })
    .catch(err => console.log(err))
  }
}

const store = new Vuex.Store({
  getters,
  state,
  mutations,
  actions
})

export default store
