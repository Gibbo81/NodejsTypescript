const request = require('request')
const geo = require('./geocode')
const darksky = require('./darksky')

//call examples:
//node app.js "New York"
//node app.js Bologna
const address = process.argv[2]
if(!address)
    return

geo(address, (long, lat) => {
    darksky(long, lat, (temperature, precipProbability) => {
        console.log("In " + address +  " it's currently " + temperature + ' there is ' + precipProbability + '% chance of rain')})
    })



