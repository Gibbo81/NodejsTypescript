const request = require('request')

const fun = function(address, callbacK){
    const urlMapox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ2liYm8yMDAxIiwiYSI6ImNrN3ZwZHB4bTBiN2czb3FxcjlvNmcxeWYifQ.rbh4A_0f-7spr9v6kSI1Xw&limit=1'
    request({ url: urlMapox, json: true }, (error, response) => {  
        if (error){
            console.log(error);
        }            
        else if ( response.statusCode!==200){
            console.log("Error status code: " + response.statusCode)                
        }
        else{
            var long = response.body.features[0].center[0]
            var lat = response.body.features[0].center[1]
            callbacK(long, lat)
        }
    } )
}

module.exports = fun

