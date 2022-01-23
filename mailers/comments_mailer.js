const nodeMailer= require('../config/nodemailer');

exports.newComment=(comment)=>{
    let htmlString=nodeMailer.renderTemplate({
        comment:comment
    },'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from:'divyasinghshah@gmail.com',
        to:comment.user.email,
        subject:"New Comment Published",
        html:"<h1>Hello</h1>"
    },(err,info)=>{
        if(err){
            console.log('Error in sending main',err);
            return;
        }
        console.log("Message Sent",info);
        return;
    });
}