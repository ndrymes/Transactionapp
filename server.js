const express = require('express')
const bodyParser = require('body-parser')
const agent = require('./routes/agent')
const wallet = require('./routes/wallet')

const {mongoose} = require('./db/mongoose.js')
const ae = require('./services/agent')
console.log(ae);



const app = express()
const port = process.env.port || 3000

app.use(bodyParser.json())
app.use('/agent',agent)
app.use('/wallet',wallet)

if (!process.env.ACCESS_KEY) {
    console.error("FATAL ERROR,ACCESS_KEY is not defined")
    process.exit(1)
}

app.get('/', (req,res) => {
    res.send('welcome to agent app')
})

app.listen(port,() => {
    console.log('server is connected',port);
    
})