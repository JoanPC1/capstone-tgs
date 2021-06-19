const mongoose = require('mongoose');

const userAccountSchema = new mongoose.Schema({
    accountnumber: String,
    accountcreationdate: Date,
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    zipcode: String,
    username: String,
    password: String,   
    secretquestion: String,
    secretanswer: String
});

module.exports = mongoose.model('userAccounts', userAccountSchema);