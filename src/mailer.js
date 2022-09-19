const nodemailer = require('nodemailer');
const { json } = require('express');
   require('dotenv').config();

   const mailHost = JSON.parse('{"mail":"michale.huel@ethereal.email", "pass":"pncMzuNWZ4qXJPctk2"}');


async  function mailer(req, res, next){

/*let transporter = nodemailer.createTransport( 
    {
        service: 'gmail',
        auth:{
            user : 'gifecmailer@gmail.com',
            pass : 'P@$s1234'
        }
    }
); */

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'michale.huel@ethereal.email',
        pass: 'pncMzuNWZ4qXJPctk2'
    }
});


let mailOptions = {
    from: mailHost.mail,
    to:'samuel.tekyi@gifec.gov.gh',
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
    req.info =  JSON.stringify(mailOptions.to);

    console.log(req.info);
      
});

next();
}


module.exports = mailer;