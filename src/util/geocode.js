const request=require('request')
const geocode=(address,callback)=>{
    const geocodeurl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicHJha2FzaHByZW0iLCJhIjoiY2szdnBhaGsxMG9tdzNrbGs3Y3cyZmc2OSJ9.AsJd12lVq3p3Cc7IwuwaRA&limit=1'
     request({url:geocodeurl,json:true},(error,response)=>{
        if(error)
        {
           callback('poor network',undefined) 
        }
        else if(response.body.features.length===0) 
        {
           callback('unable to find the location plz enter another location',undefined)
        }
        else{
           callback(undefined,{
              'latitude':response.body.features[0].center[0],
              'longitude':response.body.features[0].center[1],
              'location':response.body.features[0].place_name,
             })
        }
     })
 }
 module.exports=geocode