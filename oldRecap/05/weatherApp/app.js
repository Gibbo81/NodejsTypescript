const { url } = require('inspector')
const request = require('request')

const lan = 37
const log = -122
const urlDarkSky ='https://api.darksky.net/forecast/51c13b1fe2e91b6e6e9b9fff61480e8a/'  + lan + ',' + log + '?units=si&lang=it'


request({url: urlDarkSky}, (error, response) => {
    const data = JSON.parse(response.body)
    console.log(data.currently)
} )
