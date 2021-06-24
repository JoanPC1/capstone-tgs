var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'joanscapstoneproject@gmail.com',
      pass: 'Pushkinwushkin'
    }
  }));

//var transporter = nodemailer.createTransport({
  //service: 'gmail',
  //auth: {
    //user: 'joanscapstoneproject@gmail.com',
    //pass: 'Pushkinwushkin'
  //}
//});



module.exports = function(message, email) {

var mailOptions = {
  from: 'joanscapstoneproject@gmail.com',
  to: email,
  subject: 'Sending Email using Node.js',
  text: message
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  };
});


};