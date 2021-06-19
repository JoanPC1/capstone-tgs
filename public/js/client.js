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
    var application = new customerServiceSchema;
    application.firstname = req.body.firstname;
    application.lastname = req.body.lastname;
    application.email = req.body.email;
    application.phone = req.body.phone;
    application.zipcode = req.body.zipcode;
    application.servicesinterestedin = req.body.servicesinterestedin;
    application.bestcontactime = req.body.bestcontactime;
    application.message = req.body.message;
    application.source = req.body.source;
    application.mailinglist = req.body.mailinglist;
    application.save().then(savedDoc => {
        res.sendFile(path.join(__dirname, "../html/contact2.html")); // true
      });

});

router.post("/processapplication", function(req, res) {
    var application = new jobApplicationSchema;
    application.firstname = req.body.firstname;
    application.lastname = req.body.lastname;
    application.email = req.body.email;
    application.phone = req.body.phone;
    application.streetnumber = req.body.streetnumber;
    application.streetname = req.body.streetname;
    application.city = req.body.city;
    application.state = req.body.state;
    application.zipcode = req.body.zipcode;
    application.workshifts = req.body.workshifts;
    application.workdays = req.body.workdays;
    application.skills = req.body.skills;
    application.workpermit = req.body.workpermit;
    application.bestcontactime = req.body.bestcontactime;
    application.resumes = req.body.resumes;
    application.coverletter = req.body.coverletter;
    application.source = req.body.source;
    application.mailinglist = req.body.mailinglist;
    application.save().then(savedDoc => {
        res.sendFile(path.join(__dirname, "../html/careers2.html")); // true
      });
});
 
module.exports = router;