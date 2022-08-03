const request = require('request')
const geo = require('./geocode')
const darksky = require('./darksky')

//call examples:
//node app.js "New York"
//node app.js Bologna

/*
old not configurable example
const lan = 88
const log = -122
const urlDarkSky ='https://api.darksky.net/forecast/51c13b1fe2e91b6e6e9b9fff61480e8a/'  + lan + ',' + log + '?units=si&lang=en'
//json: true -->automatically parse the response
request({ url: urlDarkSky, json: true }, (error, response) => {    
    console.log("It's currently " + response.body.currently.temperature + ' there is ' + response.body.currently.precipProbability + '% chance of rain')
} )
*/


geo(process.argv[2], (long, lat) => {
    darksky(long, lat, (temperature, precipProbability) => {
        console.log("It's currently " + temperature + ' there is ' + precipProbability + '% chance of rain')})
    })



