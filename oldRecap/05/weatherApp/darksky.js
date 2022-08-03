const request = require('request')


const fun = function(long, lat, callbacK){
    var urlDarkSky ='https://api.darksky.net/forecast/51c13b1fe2e91b6e6e9b9fff61480e8a/'  + lat + ',' + long + '?units=si&lang=en'
    request({ url: urlDarkSky, json: true }, (error, response) => {
        if (error){
            console.log(error);
        }
        else if ( response.statusCode!==200){
            console.log("Error status code: " + response.statusCode)                
        }
        else{
            callbacK(response.body.currently.temperature, response.body.currently.precipProbability)   
        }
    }) 
}

module.exports = fun