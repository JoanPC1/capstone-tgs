require("dotenv").config();
const express = require("express");
const admin = require("./public/js/admin");
const client = require("./public/js/client");
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const session = require('express-session');
const captchaUrl = '/captcha.jpg';
const captchaSessionId = 'captcha';
const captcha = require('express-captcha-continued').create({
	cookie: captchaSessionId
});
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(
	cors({
	  origin: [
		
		'http://localhost:3000',
		
	  ],
	  credentials: true
	})
  );
  
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
	session({
		secret: 'your secret',
		resave: false,
		saveUninitialized: true
	})
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get(captchaUrl, captcha.image());

app.use("/admin", admin);
app.use("/", client);
app.use(express.static(__dirname + "/public"));

app.listen(8000);

//no DB yet

