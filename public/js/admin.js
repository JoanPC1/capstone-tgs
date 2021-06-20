const express = require("express");
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");



const userAccountSchema = require("../../private/models/useraccounts");
const jobApplicationSchema = require("../../private/models/jobapplication");
const customerServiceSchema = require("../../private/models/customerservice");

const mongoDB = "mongodb://127.0.0.1/my_database";
//const mongoDB  = "mongodb+srv://moshe:WZBdutpa4nM6pLj@cluster0.h6wkr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true });

const checkSecurity = (req, res, next) => {
    console.log("Checking security");  
  
    next();
  };
  
//add filter - do not display approved
router.get("/", checkSecurity, function(req, res) {
    userAccountSchema.find(function (err, ) {
        if (err) return console.error(err);
        // console.log(useraccounts);
        res.render("useraccount", {users: useraccounts});
    });
    //res.sendFile(path.join(__dirname, "../html/admin.html"));
});

///admin/editappl/editapplicant
router.post("/editappl/editapplicant", checkSecurity, function(req,res) {
    var ID = req.body.appID;
    var id = new mongoose.Types.ObjectId(ID);
    var test = jobApplicationSchema.findByIdAndUpdate({id}, { applicantnumber: req.body.applicantnumber }, 
        function(err, result){

            if(err){
                console.log(err);
            }
            else{
               // res.send(result)
            console.log(result);
            };
    
        });
    console.log(req.body.appID);
    console.log(req.body.applicantnumber);
    console.log(req.body);

    res.redirect('/admin/app');
});

router.get("/login", checkSecurity, function(req, res) {
    res.sendFile(path.join(__dirname, "../html/login.html"));
});

router.get("/cs", checkSecurity, function(req, res) {
    customerServiceSchema.find(function (err, transactions) {
        if (err) return console.error(err);
        //console.log(transactions);
        res.render('customerservice', {transactions: transactions});
    });
   //res.sendFile(path.join(__dirname, "../html/csmain.html"));
});

router.get("/cs0", checkSecurity, function(req, res) {
    customerServiceSchema.find(function (err, transactions) {
        if (err) return console.error(err);
        //console.log(transactions);
        res.render('cs0', {transactions: transactions});
    });
    //res.sendFile(path.join(__dirname, "../html/cs0.html"));
});

router.get("/app", checkSecurity, function(req, res) {

    jobApplicationSchema.find(function (err, applications) {
        if (err) return console.error(err);
        //console.log(applications);
        res.render('application',{applicants: applications});
    });
   // res.sendFile(path.join(__dirname, "../html/applications.html"));

});

router.get("/editappl/:id", checkSecurity, function (req, res) {
    jobApplicationSchema.findOne({_id: req.params.id}, function (err, applications) {
        if (err) return console.error(err);
        //console.log(applications);
        res.render('ap0',{applicant: applications});
    });
    //res.sendFile(path.join(__dirname, "../html/ap0.html"));
});

router.get("/createaccount", function (req,res) {
    res.sendFile(path.join(__dirname, "../html/createaccount1.html"));
});

router.post("/submitaccount", function (req,res) {
    var application = new userAccountSchema;
    application.firstname = req.body.firstname;
    application.lastname = req.body.lastname;
    application.email = req.body.email;
    application.phone = req.body.phone;
    application.zipcode = req.body.zipcode;
    application.username = req.body.username;
    application.password = req.body.password;
    application.secretquestion = req.body.secretquestion;
    application.secretanswer = req.body.secretanswer;
    application.save().then(savedDoc => {
        res.sendFile(path.join(__dirname, "../html/createaccount2.html"));
});
});
//add email confirmation handler
router.post("/confirmemail", function (req,res) {
        res.sendFile(path.join(__dirname, "../html/createaccount3.html"));
});

router.get("/forgotpassword", function (req,res) {
    res.sendFile(path.join(__dirname, "../html/password1.html"));
});

//add password reset code
router.post("/submitemail", function (req,res) {
    res.sendFile(path.join(__dirname, "../html/password2.html"));
});

router.get("/enterpassword", function (req,res) {
    res.sendFile(path.join(__dirname, "../html/password3.html"));
});

//add change password handler here
router.post("/passwordconfirm", function (req,res) {
    res.sendFile(path.join(__dirname, "../html/password4.html"));
});


module.exports = router;