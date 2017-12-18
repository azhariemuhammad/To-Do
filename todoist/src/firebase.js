/* eslint-disable */
var firebase = require('firebase')
// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCWoVO3yO9bJl4u9V93UwBlQH3sn0-c-Qg',
  authDomain: 'logo-racer.firebaseapp.com',
  databaseURL: 'https://logo-racer.firebaseio.com',
  projectId: 'logo-racer',
  storageBucket: 'logo-racer.appspot.com',
  messagingSenderId: '841398408259'
}

firebase.initializeApp(config)

var db = firebase.storage()

module.exports = db
