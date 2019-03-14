const express = require('express')
const bodyParser = require('body-parser')
const orderRouter = require('./order')
const powerballRouter = require('./powerball')


const app = express()
//when use post function
app.use(bodyParser.json())

app.use('/order', orderRouter)
app.use('/powerball', powerballRouter)

app.listen(9093, function(){
    console.log('Node app start at port 9093')
})

