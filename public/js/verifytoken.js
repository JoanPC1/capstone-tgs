const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
const verifyToken =  (req, res, next) => {
  const token = req.cookies.token || '';
  console.log(token);
  try {
    if (!token) {
      return res.status(401).json('You need to log in')
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

module.exports = verifyToken;
