const express = require("express");
const router = express.Router();
const path = require("path");

const checkSecurity = (req, res, next) => {
    console.log("Checking security");  
  
    next();
  };

router.get("/", checkSecurity, function(req, res) {
    res.sendFile(path.join(__dirname, "../html/admin.html"));
});

router.get("/login", checkSecurity, function(req, res) {
    res.sendFile(path.join(__dirname, "../html/login.html"));
});

router.get("/cs", checkSecurity, function(req, res) {
    res.sendFile(path.join(__dirname, "../html/csmain.html"));
});

router.get("/cs0", checkSecurity, function(req, res) {
    res.sendFile(path.join(__dirname, "../html/cs0.html"));
});

router.get("/app", checkSecurity, function(req, res) {
    res.sendFile(path.join(__dirname, "../html/applications.html"));
});

router.get("/ap0", checkSecurity, function (req, res) {
    res.sendFile(path.join(__dirname, "../html/ap0.html"));
});

router.get("/createaccount", function (req,res) {
    res.sendFile(path.join(__dirname, "../html/createaccount1.html"));
});

//add new account handler
router.post("/submitaccount", function (req,res) {
    res.sendFile(path.join(__dirname, "../html/createaccount2.html"));
});

//add email confirmation handler
router.post("/confirmemail", function (req,res) {
    res.sendFile(path.join(__dirname, "../html/createaccount3.html"));
});

router.get("/forgotpassword", function (req,res) {
    res.sendFile(path.join(__dirname, "../html/password1.html"));
});

//add password retrieval code
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