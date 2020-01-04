const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const path='https://api.darksky.net/forecast/f8cd8b9703084df0093c6b6b8b77433f/'+latitude+','+longitude+''
    request({url:path,json:true},(error,response)=>
    {
        if(error)
        {
            callback('the connection is poor',undefined)
        }
        else if(response.body.error) 
        {
            callback('the location cannot be found. please enter the another location',undefined)
        }
        else{
            console.log(response.body.daily.data[0])
            callback(undefined,response.body.daily.data[0].summary + 'It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain. Max-temp is '+response.body.daily.data[0].temperatureHigh+' Min-temp is '+response.body.daily.data[0].temperatureLow)
        }        
    })
}
module.exports=forecast