const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const path = require("path");

dotenv.config();
const verifyAdmin =  (req, res, next) => {
  const token = req.cookies.token || '';
  console.log(token);
  try {
    if (!token) {
      return res.sendFile(path.join(__dirname, "../html/login.html"));
    }
    const decrypt = jwt.verify(token, process.env.JWT_SECRET);
    var data = decrypt.combo.split(',');
    
    req.username = data[0];
    req.id = data[1];
   
    next();
  
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

module.exports = verifyAdmin;
