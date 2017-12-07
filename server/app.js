const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())


mongoose.connect(`mongodb://wisnu:123@ds159845.mlab.com:59845/mydb_hacktiv8`)
mongoose.Promise = global.Promise
mongoose.connection.once('open', function(){
  console.log('Connection has been made, build todo');
}).on('error', (error) => {
  console.log("connection error: ==================", error.message);
})


app.get('/', function(req, res){
  res.send('hello fooo');
});

const api  = require('./routes/api')
app.use('/api', api)

app.listen(process.env.PORT||3000, function(err){
  if(!err) console.log('woohooo');
})
