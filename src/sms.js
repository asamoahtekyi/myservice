const axios = require('axios').default;
require('dotenv').config();

const apiKey = process.env.SMS_API_KEY;
const senderId = process.env.SMS_SENDER_ID;
var balv;

async function sendSms( req, res, next ){
   
   
await axios.get( 'http://192.168.3.62:8181/ords/apip/sms/sending',

).then( async (response)=>{

   let receiver =  response.data.items[0].alert_id;
   let message  = response.data.items[0].mess;
   let rowid = response.data.items[0].id;


   await axios.get('https://apps.mnotify.net/smsapi',{
    params:{
        to: receiver,
        key: apiKey,
        sender_id: senderId,
        msg: message

    }
}  
)
.then( async (response)=>{
     
    console.log( parseInt(response.data.code));
   
      if ( parseInt(response.data.code) === 1000 ){
       
        console.log('sam pil' + rowid);
        await axios.put('http://192.168.3.62:8181/ords/apip/sms/sending',
           {     rowidc: rowid    }
         
        ).then((response)=>{

        }).catch((error)=>{
            console.log( '  update error ' + error);
        })   
      
      await  axios.get('  https://apps.mnotify.net/smsapi/balance?key=JK1N9wzgVEPExCIVrnHxvPQO0',      
         
        )
        .then( async (response)=>{
          balv = response.data;
          console.log(response );
          console.log('smsbal' + response.data);
        });
      
  
        await axios.put('http://192.168.3.62:8181/ords/apip/lognbal/bal',
        {     smsbal: balv    }
      
     ).then(async (response)=>{
         console.log('test bal'+balv);

     }).catch((error)=>{
         console.log( '  update error ' + error);
     })   


      }

      req.wResponse = (response);
} )
.catch ( (error) =>{
    console.log( ' sending sms error ' + error);
    req.error = error;
} );



}  ).catch( (error) => {

    console.log( ' reading data from db error ' + error);
    next();
} );

    

next();
}


module.exports = sendSms;