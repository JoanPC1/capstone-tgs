const express = require("express");
const admin = require("./public/js/admin");
const client = require("./public/js/client");

const app = express();

app.use("/admin", admin);
app.use("/", client);

app.listen(3000);

