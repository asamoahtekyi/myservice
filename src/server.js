const express = require('express');
const mailer = require('./mailer');
const getWeather = require('./weather');
const sendSms = require('./sms');

require('dotenv').config();

const port = process.env.PORT || 1989;

const app = express();

app.get('/',(req,res)=>res.send(`welcome home <a href="/api/mailer">send mail</a> 
<a href="/api/weather"> get weather</a> 
<a href="/api/sms"> send sms </a>
`));


  app.get('/api/mailer', mailer, (req,res)=>{
    
    if (req.error){
         res.send( `mail error  ${req.error} 
         <br>
         <a href='/'>return home</a>
         ` );
      }
      else{

         res.send(`mail sent as ${req.info} <br>
                   <a href='/'>return home</a>   `);
      }

  }  );

  app.get('/api/weather',getWeather, (req, res) =>{
         res.send( `this is the temperature
                 ${req.wResponse.data.main.temp},
                 humidity as is 
                 ${req.wResponse.data.main.humidity} 
                 and wind is as
                 ${  JSON.stringify(req.wResponse.data.wind) }
          
          and ${req.error} 
          <br>
                   <a href='/'>return home</a>` );
  } )

  app.get('/api/sms', sendSms, (req, res) =>{
    
    res.send( console.log('sent') );
       

  } );


app.listen( port, ()=> console.log(`listening on ${port}`) );

