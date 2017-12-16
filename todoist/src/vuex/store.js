import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)
const state = {
  todos: [],
  username: ''
}

const getters = {}

const mutations = {
  setTodos (state, payload) {
    state.todos = payload
  },
  decode (state, token) {
    const decoded = jwtDecode(token.data)
    localStorage.setItem('username', decoded.username)
    localStorage.setItem('email', decoded.email)
    localStorage.setItem('userId', decoded.userId)
    state.username = decoded.username
    console.log(decoded)
  }
}
const actions = {
  // getAllTodos ({ commit }, dataUser) {
  //   http.get('/api/')
  // }
  login ({ commit }, username) {
    http.post(`/api/login`, {
      username: username,
      email: 'wisnu2@mail.com'
    })
    .then(res => {
      commit('decode', res)
    })
    .catch(err => {
      console.log(err)
    })
  }
}

const store = new Vuex.Store({
  getters,
  state,
  mutations,
  actions
})

export default store
