<template>
  <div>
    <nav class="todo">
      <ul class="logo">
        <li>
          <h1>Todo</h1>
        </li>
        <li class="img-logo">
          
          <img src="https://cdn3.iconfinder.com/data/icons/iconic-1/32/check_alt-128.png" alt="todo" style="height:2rem;">
        </li>
        <li>
          <button @click="logoutBtn">Logout</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TheNavbBar',
  data () {
    return {
    }
  },
  methods: {
    logoutBtn: function () {
      localStorage.removeItem('userId')
    }
  }
}
</script>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

ul {
  padding: 0;
  list-style: none;
}
.logo {
  display: flex;
  height: 46px;
  align-items: center;
  padding: 0 40px;
  border: 1px solid rgba(238,238,238 ,1);
  border-radius: 5px;
  color: rgba(117,117,117 ,1);
  box-shadow: 5px 10px 20px -20px rgba(85,172,238 ,1);
}

.logo {
  cursor: pointer;
}

.logo li:hover{
  color: rgba(85,172,238 ,1);
}
.img-logo {
  color: rgba(85,172,238 ,1);
  font-size: 1.3em;
}
.logo li:not(:last-child):not(.img-logo) {
  margin-right: 10px;
}

.logo li > button {
  font-size: 0.8em;
  border: 0;
  background: rgba(85,172,238 ,1);
  color: #fff;
  border-radius: 100px;
}

.img-logo {
  margin-left: auto;
  margin-right: auto
}

</style>
