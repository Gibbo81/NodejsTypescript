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

//set a get route 'http://localhost:3000/products'
app.get('/products', (req, res) => {
    
    res.send({
        product : []
    })
})

//set a get route 'http://localhost:3000/weather?search=game&stars=5'
app.get('/weather', (req, res) => {
    console.log(req.query)
    if (!req.query.search){
        res.statusCode= 400
        return res.send({
            reason:"Missing search 2"
        })        
    }
    res.send('about about about about about')
})

//start listening on port 3000
app.listen(3000, () =>{
    console.log('server started')
})