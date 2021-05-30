const express = require("express");
const router = express.Router();
const path = require("path");

const checkSecurity = (req, res, next) => {
    console.log("Checking security");  //Do securitycheck here
  
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

router.get("/ap", checkSecurity, function(req, res) {
    res.sendFile(path.join(__dirname, "../html/applications.html"));
});

router.get("/ap0", checkSecurity, function (req, res) {
    res.sendFile(path.join(__dirname, "../html/ap0.html"));
});

module.exports = router;