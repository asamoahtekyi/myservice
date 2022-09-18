const nodemailer = require('nodemailer');
const { json } = require('express');
   require('dotenv').config();

   const mailHost = JSON.parse(process.env.EMAIL);


async  function mailer(req, res, next){

let transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth:{
            user : mailHost.mail,
            pass : mailHost.pass
        }
    }
);


let mailOptions = {
    from: mailHost.mail,
    to:'asamoahtekyi@gmail.com',
    subject: 'man man',
    text: 'hi there am there'   
};

await  transporter.sendMail(mailOptions,(error, info)=>{
    if(error){
            console.log('error as' + error);
    } else{
        console.log('sent  as' + info.response);
        
    };

    req.error = error;
    req.info =  JSON.stringify(info.to);

    console.log(req.info);
      
});

next();
}


module.exports = mailer;