const mongoose = require('mongoose');


const jobApplicationSchema = mongoose.Schema({
    applicationnumber: Number,
    applicationdate: String,
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    streetnumber: String,
    streetname: String,
    city: String,
    state: String,
    zipcode: String,
    workshifts: String,
    workdays: String,
    skills: String,
    workpermit: String,
    bestcontacttime: String,
    resume: String,
    coverletter: String,
    source: String,
    mailinglist: String,
    action: String
});

module.exports = mongoose.model('jobApplications', jobApplicationSchema);
