const nodemailer = require('nodemailer');

async function sendMail( authEmail, authPass, senderEmail, receiverEmail, subject, htmlData ){
     console.log(senderEmail, receiverEmail, subject, htmlData);
    try{

        // configuring email
        let transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: authEmail,
                pass: authPass,
            },
        });
          
        var mailOptions = {
            from: authEmail,
            to: receiverEmail,
            subject: subject,
            html: htmlData
        };
        
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            return { error: true }
        } else {
            console.log(info);
            return { error: false }
        }
        });

    }
    catch(err){
        console.log(err);
        return { error: true }
    }
}

module.exports = {
    sendMail
}