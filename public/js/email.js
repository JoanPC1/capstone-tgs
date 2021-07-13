var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'joanscapstoneproject@gmail.com',
        pass: 'Pushkinwushkin'
    }
});


module.exports = function(message, email) {

var mailOptions = {
  from: 'joanscapstoneproject@gmail.com',
  to: email,
  subject: 'Confirm your email address at The Good Shepherd Home Care, LLC',
  text: "Please click the following link to confirm your email address. If that doesn't work, copy and paste the link to your browser.  http://localhost:3000/admin/confirm/" + message
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  };
});


};
