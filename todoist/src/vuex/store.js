import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import router from '../router'
const http = axios.create({
  baseURL: 'http://localhost:3000'
})
Vue.use(router)
Vue.use(Vuex)
const state = {
  todos: [],
  username: '',
  userId: '',
  user: {
    username: '',
    email: '',
    persistedFaceId: ''
  },
  loader: false
}

const getters = {
  // loadings (state) {
  //   let foo = state.loader = true
  //   return foo
  // }
}

const mutations = {
  setNewTodo (state, payload) {
    console.log(payload)
    state.todos.push(payload.todo)
  },
  setTodos (state, payload) {
    console.log('payload set Todos: ', payload)
    state.todos = payload
  },
  replaceNewTodo (state, payload) {
    console.log(payload)
    let index = state.todos.findIndex(x => {
      return x._id === payload._id
    })
    state.todos[index] = payload
  },
  removeTodo (state, payload) {
    state.todos.forEach((element, index) => {
      if (element._id === payload._id) {
        state.todos.splice(index, 1)
      }
    })
  },
  loads (state) {
    state.loader = state.loader = !state.loader
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
    .then(({data}) => {
      console.log('newTodo: ', data.todo)
      commit('setNewTodo', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  updateTodo ({ commit }, todo) {
    console.log('todo update: ', todo.isComplete)
    http.put(`/api/todo/${todo._id}`, {
      userId: todo.userId,
      task: todo.task,
      tag: todo.tag,
      isComplete: todo.isComplete
    })
    .then(({data}) => {
      console.log('data jadi:', data)
      commit('replaceNewTodo', data)
    })
    .catch(err => console.log(err))
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
  signup ({ state, commit }, payload) {
    console.log('hello singup')
    console.log('state: ', payload)
    http.post(`/api/signup`, {
      username: payload.data.name || state.user.username,
      faceId: state.user.persistedFaceId
    })
    .then(res => {
      commit('loads')
      console.log('res: ', res.data)
      localStorage.setItem('username', res.data.username)
      localStorage.setItem('userId', res.data._id)
      state.username = res.data.username
      state.userId = res.data._id
    })
    .catch(err => {
      console.log(err)
      commit('loads')
      alert('probably the username is already use or wrong input')
    })
  },
  login ({ commit }, payload) {
    console.log('hello login')
    console.log('state: ', payload)
    http.post(`/api/login`, {
      faceId: payload.persistedFaceId
    })
    .then(res => {
      commit('decode', res)
    })
    .catch(err => {
      console.log(err)
      commit('loads')
      router.push({path: '/'})
      alert(err, '=-=-=-=-=-=')
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
