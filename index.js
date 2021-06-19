const express = require("express");
const admin = require("./public/js/admin");
const client = require("./public/js/client");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/admin", admin);
app.use("/", client);
app.use(express.static(__dirname + "/public"));

app.listen(8000);

//no DB yet

