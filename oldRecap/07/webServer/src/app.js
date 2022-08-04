const express = require('express')
const app = express()

//set a get route 'http://localhost:3000/'
app.get('', (req, res) => {
    res.send('{ "result" : "good"}')
})

//set a get route 'http://localhost:3000/help'
app.get('/help', (req, res) => {
    res.send({
        result: "going well",
        help: 'is coming'
    })
})

//set a get route 'http://localhost:3000/weather'
app.get('/weather', (req, res) => {
    res.send('about about about about about')
})

//start listening on port 3000
app.listen(3000, () =>{
    console.log('server started')
})