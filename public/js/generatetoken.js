const jwt = require('jsonwebtoken');
//import jwt from 'jsonwebtoken'; 
const env = require("dotenv").config();
const generateToken = (res, username,id) => {
  const expiration = 1800000;
  const token = jwt.sign( { combo: username + ',' +id } , process.env.JWT_SECRET, {
    expiresIn:  6000000,
  });

  return res.cookie('token', token, {
    expires: new Date(Date.now() + expiration),
    secure: false, // set to true if you're using https
    httpOnly: true,
    path: "/",
  });
};
module.exports = generateToken
