const express = require('express')
const app = express()
const geo = require('./utils/geocode')
const darksky = require('./utils/darksky')

//set a get route 'http://localhost:3000/weather?address=Bologna'
app.get('/weather', (req, res) => {
    console.log(req.query)
    if (!req.query.address){
        res.statusCode= 400
        return res.send({
            reason:"Missing address"
        })        
    }
    const address = req.query.address
    geo(address, (long, lat) => {
        darksky(long, lat, (temperature, precipProbability) => {
            res.send({
                address,
                temperature,
                'precipitation probability' : precipProbability
            })
        })
    })
})


//start listening on port 3000
app.listen(3000, () =>{
    console.log('server started')
})