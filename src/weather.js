const { response } = require('express');

const axios = require('axios').default;
require('dotenv').config();

const apiKey = process.env.WEATHER_API_KEY;

async function getWeather( req, res, next ){
   
    
await axios.get('http://api.openweathermap.org/data/2.5/weather',{
    params:{
        q:'Accra',
        appid: apiKey
    }
}  
)
.then( (response)=>{
      console.log(response);
      req.wResponse = (response);
} )
.catch ( (error) =>{
    console.log(error);
    req.error = error;
} );

next();
}



module.exports = getWeather;