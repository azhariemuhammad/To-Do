<template>
<div>


  <main>
    <TheNavBar/>
  </main>

    <div class="container column is-10">
        <div class="section">
          <section class="hero is-info welcome is-small">
            <div class="hero-body">
              <div class="container">
                <h1 class="title">
                  Hello
                </h1>
                <h2 class="subtitle">
                  I hope you are having a great day!
                </h2>
                <div class="level-center">
                  <p class="level-item"><strong>Today's Weather ||</strong></p>
                  <p class="level-item"><a>Fahrenheit</a></p>
                </div>
              </div>
            </div>
          </section>

          <form>
            <div class="control">
              <textarea class="textarea is-info" vplaceholder="What Are You Doing Today?"></textarea>
            </div>
            <div class="field">
              <div class="control">
                <input class="input is-primary" type="text" placeholder="Tag">
              </div>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <input type="submit" class="button is-link" value="Add a To-Do">
              </div>
            </div>
          </form> 
             <!-- <div class="card">
                <todo-lists @user-emit="getTaskId"  :todos="todos"/>
            </div> --> 
        </div>
    </div>
 
</div>
</template>

<script>
import TheNavBar from './TheNavBar'
export default {
  name: 'Hompage',
  components: { TheNavBar }

}
</script>

<style scoped>
body {margin:0;}
#map {
  height: 500px;
  width: 100%;
 }

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    /*background-color: #333;*/
    position: fixed;
    top: 0;
    width: 100%;
}

li {
    float: left;
}

li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

li a:hover:not(.active) {
    background-color: #111;
}

.active {
    background-color: #4CAF50;
}


*,
*:before,
*:after{
  box-sizing: border-box;
}

body{
  font-family: 'Rajdhani', sans-serif;

}


header{
  color: #888;
}

header h1{
  font-size: 30px;

}

h4 {
  font-family: 'PT Sans Caption', sans-serif;
  font-size: 30px;
  margin-top: 4%;
  margin-left: 13%;
}
.satelite {
  background-color: #00b1ff
}
.footer {
  margin-top: 20%;
  background-color: #209cee;
  color: #fff;
}
p {
  padding-right: 20px;
  font-size: 16px;
}

.container_myStyle{
  margin-top: 13px;
  max-width: 777px;
  margin: 10% auto 0 auto;
}

.containerCust{
  max-width: 650px;
  margin: auto;
  width: 460px;
}

.photo {
  margin-top: 7%;
}


#date {
  padding-bottom: 3%;
}
#content{
  border: 2px dotted green;
  padding: 18px;
  margin-left: 215px;
  min-height: 2000px;
  color: darkgrey;
}

#sidebar{
  float: left;
  width: 200px;
  color: #ffbdbd;
  will-change: min-height;
}

#sidebar .sidebar__inner{
  border: 2px dotted red;
  padding: 10px;
  position: relative;
  transform: translate(0, 0);
  transform: translate3d(0, 0, 0);
  will-change: position, transform;
}
/*
footer{
  height: 300px;
  height: 85vh;
  border: 2px dotted black;
  margin-top: 20px;
  text-align: center;
  color: #8e8d8d;
  background: rgba(0, 0, 0, 0.02);
  line-height: 300px;
  line-height: 95vh;
}

footer p{
  margin: 0;
}
*/
/* spinner */
.spinner {
  width: 40px;
  height: 40px;
  margin: 100px auto;
  background-color: #333;

  border-radius: 100%;
  -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
  animation: sk-scaleout 1.0s infinite ease-in-out;
}

@-webkit-keyframes sk-scaleout {
  0% { -webkit-transform: scale(0) }
  100% {
    -webkit-transform: scale(1.0);
    opacity: 0;
  }
}

@keyframes sk-scaleout {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  } 100% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
    opacity: 0;
  }
}



</style>
