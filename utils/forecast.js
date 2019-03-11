const request = require('request')

const forecast = (lat, long, callback)=>{

    const url = 'https://api.darksky.net/forecast/26158e8507b37c3b9010d617def1ef70/'+lat+','+long
    // request({url:url, json: true},(error, response)=>{
    request({url, json: true},(error, {body})=>{
        if(error){
            callback('unable to connect to forecast services',undefined)
        // }else if(response.body.error){
        }else if(body.error){    
            console.log('unable to find location')
        }else{
            callback(undefined, body.daily.data[0].summary+' it is currently '+body.currently.temperature+'. There is a '+body.currently.precipProbability+'% chances of rain. The current timezone is '+body.timezone+' The wind speed is '+body.currently.windSpeed)
        }
    })
}

module.exports = forecast