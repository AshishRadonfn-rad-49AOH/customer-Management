const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router/route')
const mongoose = require('mongoose')

mongoose.set('strictQuery', true);
const app = express()

app.use(bodyParser.json())


mongoose.connect('mongodb+srv://ashish2132:2vnf5TGDQgRP7ydu@cluster0.czfb8.mongodb.net/P2',{
    useNewurlParser: true
})
.then(() => console.log('mongoose is connected'))
.catch(error => console.log(error.message))

app.use('/', router)

app.listen(process.env.PORT || 5000,function(){
    console.log('server is connected with port:'+ (process.env.PORT || 5000))
})