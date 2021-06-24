const mongoose = require('mongoose');

const customerServiceSchema = mongoose.Schema({
    transactionnumber: String,
    transactiondate: String,
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    zipcode: String,
    servicesinterestedin: String,
    bestcontacttime: String,
    message: String,
    source: String,
    mailinglist: String,
});

module.exports = mongoose.model("customerService", customerServiceSchema);