const express = require('express')
const bodyParser = require('body-parser')
const agent = require('./routes/agent')
const {mongoose} = require('./db/mongoose.js')


const app = express()
const port = process.env.port || 3000

app.use(bodyParser.json())
app.use('/agent',agent)

app.get('/', (req,res) => {
    res.send('welcome to agent app')
})

app.listen(port,() => {
    console.log('server is connected',port);
    
})