/**
 * New node file
 */
var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Hotmail",
    auth: {
        user: "weconnect.cs@outlook.com",
        pass: "jinmoku1"
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "WeConnect:CS <weconnect.cs@outlook.com>", // sender address
    to: "jinmoku1@gmail.com", // list of receivers
    subject: "Hello Seung H. Cha", // Subject line
    text: "hihi", // plaintext body
    html: "<b>Hello world</b>" // html body
};

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if (error) {
        console.log(error);
    } else {
        console.log("Message sent: " + response.message);
    }
    
	// if you don't want to use this transport object anymore, uncomment following line
	smtpTransport.close(); // shut down the connection pool, no more messages
});
