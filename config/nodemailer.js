
const nodemailer= require('nodemailer');
const ejs=require('ejs');
const path=require('path');


let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    service:false,
    auth:{
        user:'divya018mca21@igdtuw.ac.in',
        pass:'Igdtuw@123'
    }
});

let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('error in template');
                return;
            }
            mailHTML=template;
        }
    )
    return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}
