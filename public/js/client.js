const express = require("express");
const router = express.Router();
const path = require("path");

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
    //handler for contact2.html
});

router.post("/processapplication", function(req, res) {
    //handler for careers2.html
});

module.exports = router;