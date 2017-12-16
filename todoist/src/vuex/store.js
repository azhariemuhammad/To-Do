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
  username: '',
  userId: ''
}

const getters = {}

const mutations = {
  setNewTodo (state, payload) {
    console.log(payload)
    state.todos.push(payload.todo)
  },
  setTodos (state, payload) {
    console.log('payload set Todos: ', payload)
    state.todos = payload
  },
  removeTodo (state, payload) {
    state.todos.forEach((element, index) => {
      if (element._id === payload._id) {
        state.todos.splice(index, 1)
      }
    })
  },
  decode (state, token) {
    const decoded = jwtDecode(token.data)
    localStorage.setItem('username', decoded.username)
    localStorage.setItem('email', decoded.email)
    localStorage.setItem('userId', decoded.userId)
    state.username = decoded.username
    state.userId = decoded.userId
    console.log(decoded)
  }
}
const actions = {
  getAllTodos ({ commit }, dataUser) {
    console.log('hello', this.userId)
    http.get(`/api/todo/${dataUser}`)
    .then(({ data }) => {
      console.log('data: ', data)
      commit('setTodos', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  createTodo ({ commit }, formTodo) {
    http.post(`/api/todo`, {
      userId: formTodo.userId,
      task: formTodo.task,
      tag: formTodo.tag,
      isComplete: false
    })
    .then(({ data }) => {
      console.log('newTodo: ', data.todo)
      commit('setNewTodo', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  removeTodo ({ commit }, itemId) {
    http.delete(`/api/todo/${itemId}`)
    .then(({ data }) => {
      console.log(data)
      commit('removeTodo', data.todo)
    })
    .catch(err => {
      console.log(err)
    })
  },
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
