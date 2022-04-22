//weatherstack
//const url ='http://api.weatherstack.com/current?access_key=8c7e2e305f8d56e5ee519fa3f3456ae7&query=37.8267,-122.1233&units=f'
//error testing url
//const url ='http://api.weatherstack.com/current?access_key=8c7e2e305f8d56e5ee519fa3f3456ae7&query=&units=f'



const request = require('postman-request')

const forescast =(latitude,longtitude,callback)=>{

    const url ='http://api.weatherstack.com/current?access_key=8c7e2e305f8d56e5ee519fa3f3456ae7&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longtitude)+'&units=f'

    request({url, json:true},(error,response)=>{
         if(error){
             callback('Unable to access internet!',undefined)
         }else if(response.body.error)
         {
             callback('Can not found location!',undefined)
        }else 
        {
            callback(undefined,
                response.body.current.weather_descriptions[0]+ '. It is currently '+ response.body.current.temperature +' degress out but it feels like '+response.body.current.feelslike+' degress out.'
            )
         }
    })
}


module.exports=forescast