const mongoose = require('mongoose');

const userAccountSchema = new mongoose.Schema({
    accountnumber: String,
    accountcreationdate: String,
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    zipcode: String,
    username: String,
    password: String,   
    secretquestion: String,
    secretanswer: String,
    approve: String,
    confirm: String,
});

module.exports = mongoose.model('userAccounts', userAccountSchema);