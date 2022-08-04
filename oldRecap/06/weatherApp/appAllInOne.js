const request = require('request')

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

const address = process.argv[2]
const urlMapox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZ2liYm8yMDAxIiwiYSI6ImNrN3ZwZHB4bTBiN2czb3FxcjlvNmcxeWYifQ.rbh4A_0f-7spr9v6kSI1Xw&limit=1'


request({ url: urlMapox, json: true }, (error, response) => {  
    if (error){
        console.log(error);
    }            
    else if ( response.statusCode!==200){
        console.log("Error status code: " + response2.statusCode)                
    }
    else{
        var long = response.body.features[0].center[0]
        var lat = response.body.features[0].center[1]
        var urlDarkSky ='https://api.darksky.net/forecast/51c13b1fe2e91b6e6e9b9fff61480e8a/'  + lat + ',' + long + '?units=si&lang=en'
        request({ url: urlDarkSky, json: true }, (error2, response2) => {
            if (error2){
                console.log(error2);
            }
            else if ( response2.statusCode!==200){
                console.log("Error status code: " + response2.statusCode)                
            }
            else{
                console.log("It's currently " + response2.body.currently.temperature + ' there is ' + response2.body.currently.precipProbability + '% chance of rain')                
            }
        })        
    }
} )



