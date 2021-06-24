const express = require("express");
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");

const jobApplicationSchema = require("../../private/models/jobapplication");
const customerServiceSchema = require("../../private/models/customerservice")

const mongoDB = "mongodb://127.0.0.1/my_database";
mongoose.connect(mongoDB, { useNewUrlParser: true });


router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../html/index.html"));
});

router.get("/about", function(req, res) {
    res.sendFile(path.join(__dirname, "../html/about.html"));
});

router.get("/testimonials", function(req, res) {
    res.sendFile(path.join(__dirname, "../html/testimonials.html"));
});

router.get("/services", function(req, res) {
    res.sendFile(path.join(__dirname, "../html/services.html"));
});

router.get("/faq", function(req, res) {
    res.sendFile(path.join(__dirname, "../html/faq.html"));
});

router.get("/contact", function(req, res) {
    res.sendFile(path.join(__dirname, "../html/contact.html"));
});

router.get("/careers", function(req, res) {
    res.sendFile(path.join(__dirname, "../html/careers.html"));
});

router.post("/processcontact", function(req, res) {
    var transaction = new customerServiceSchema;
    var today = new Date();
    console.log(req.body);

    transaction.transactiondate =
    (today.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
    transaction.firstname = req.body.firstname;
    transaction.lastname = req.body.lastname;
    transaction.email = req.body.email;
    transaction.phone = req.body.phone;
    transaction.zipcode = req.body.zipcode;
    transaction.servicesinterestedin = req.body.servicesinterestedin;
    transaction.bestcontacttime = req.body.specifytime;
    transaction.message = req.body.message;
    transaction.source = req.body.specifysource;
    transaction.mailinglist = req.body.mailinglist;
    transaction.save().then(savedDoc => {
        res.sendFile(path.join(__dirname, "../html/contact2.html")); // true
      });

});

router.post("/processapplication", function(req, res) {
    var applicant = new jobApplicationSchema;
    var today = new Date();
    console.log(req.body);

    applicant.applicationdate = 
    (today.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
    applicant.firstname = req.body.firstname;
    applicant.lastname = req.body.lastname;
    applicant.email = req.body.email;
    applicant.phone = req.body.phone;
    applicant.streetnumber = req.body.streetnumber;
    applicant.streetname = req.body.streetname;
    applicant.city = req.body.city;
    applicant.state = req.body.state;
    applicant.zipcode = req.body.zipcode;
    applicant.workshifts = req.body.workshifts;
    applicant.workdays = req.body.workdays;
    applicant.skills = req.body.skills;
    applicant.workpermit = req.body.workpermit;
    applicant.bestcontacttime = req.body.specifytime;
    applicant.resume = req.body.resume;
    applicant.coverletter = req.body.coverletter;
    applicant.source = req.body.specifysource;
    applicant.mailinglist = req.body.mailinglist;
    applicant.save().then(savedDoc => {
        res.sendFile(path.join(__dirname, "../html/careers2.html")); // true
      });
});
 
module.exports = router;