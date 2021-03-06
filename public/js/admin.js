const express = require("express");
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const email = require("../js/email")
var crypto = require('crypto');
const captchaSessionId = 'captcha';
const generatetoken = require("../js/generatetoken");

const userAccountSchema = require("../../private/models/useraccounts");
const jobApplicationSchema = require("../../private/models/jobapplication");
const customerServiceSchema = require("../../private/models/customerservice");
const verifyToken = require("./verifytoken");
const verifyAdmin = require("./verifyadmin");

const mongoDB = "mongodb://127.0.0.1/my_database";
mongoose.connect(mongoDB, { useNewUrlParser: true });

const captcha = require('express-captcha-continued').create({
	cookie: captchaSessionId
});

const checkCaptcha = (req, res, next) => {
    console.log("Checking captcha");
    console.log("Checking validity");
    var isvalidcaptcha = (captcha.check(req,req.body.captcha));
    console.log(isvalidcaptcha);
    if (isvalidcaptcha) {
        next();

    }
    else {
        res.send("Invalid captcha");
    }
};


const checkSecurity = (req, res, next) => {
    console.log("Checking security");  
  
    verifyToken(req, res);
    next();
  };
const checkLogin = async (req, res, next) => {
    var password = crypto.createHash('sha256').update(req.body.password).digest('hex');
    var isfound = await userAccountSchema.exists({"username": req.body.username, "password": password});
    if (isfound) {
        var isapproved = await userAccountSchema.exists({"username": req.body.username, "approve": "Yes"});
        if (!isapproved) {
            res.send("Account is not yet approved");
        }
        var useraccount = await userAccountSchema.findOne({"username": req.body.username});
        console.log(useraccount._id);
        await generatetoken(res, useraccount.username, useraccount._id);
        console.log(req.cookies);
        next()
    }
    else 
        res.send("Wrong username or password");
    
}  

const validatecreation = async (req, res, next) => {
  var isfoundname = await (findusername(req.body.username));
  var isfoundemail = await (findemail(req.body.email));
  var isfoundphone = await (findphone(req.body.phone));
  
    if (isfoundname) {
       console.log(req.body.username);
       res.send("Username already exists");
   }
   else if (isfoundemail) {
    res.send("Email already exists");
}
else if (isfoundphone) {
    res.send("Phone number already exists");
}
else 

    next();
};

async function findusername(username) {
    var doc = await userAccountSchema.exists({"username": username});
    console.log(doc);
    return doc;
};

async function findemail(email) {
    var doc = await userAccountSchema.exists({"email": email});
    console.log(doc);
    return doc;
}; 

async function findphone(phone) {
    var doc = await userAccountSchema.exists({"phone": phone});
    console.log(doc);
    return doc;
};

//add filter - do not display approved
router.get("/", verifyAdmin, function(req, res) {
    console.log(req.username);
    console.log(req);

    userAccountSchema.find(function (err, users) {
        if (err) return console.error(err);
        //console.log(users)
        res.render("useraccount", {users: users});
    });
    //res.sendFile(path.join(__dirname, "../html/admin.html"));
});

router.get("/logout", function(req, res) {
    console.log(res.cookies);
    res.cookie("token", "", {
        httpOnly: true, 
        secure: false,   
        expires: new Date(1)
    });
    res.redirect('/admin');
});

router.post("/", [checkCaptcha, checkLogin, function(req, res) {
    userAccountSchema.find(function (err, users) {
        if (err) return console.error(err);
        //console.log(users)
        res.render("useraccount", {users: users});
    });
    //res.sendFile(path.join(__dirname, "../html/admin.html"));
}]);

router.post("/edituser/editaccount", verifyToken, function(req,res) {
    var ID = req.body.userID;
    var id = new mongoose.Types.ObjectId(ID);
    var approve = req.body.approve;
    
    var test = userAccountSchema.findByIdAndUpdate(id, { accountnumber: req.body.accountnumber, approve: req.body.approve }, 
        function(err, result){

            if(err){
                console.log(err);
            }
            else {
                console.log(result);
            };
    
        });
        
    console.log(req.body.userID);
    console.log(req.body.accountnumber);
    console.log(req.body);

    res.redirect('/admin');
});

router.get("/edituser/:id", verifyToken, function (req, res) {
    userAccountSchema.findOne({_id: req.params.id}, function (err, users) {
        if (err) return console.error(err);
        //console.log(users);
        res.render('user0',{user: users});
    });
});

router.post("/editappl/editapplicant", verifyToken, function(req,res) {
    var ID = req.body.appID;
    var id = new mongoose.Types.ObjectId(ID);
    var test = jobApplicationSchema.findByIdAndUpdate(id, { applicantnumber: req.body.applicantnumber }, 
        function(err, result){

            if(err){
                console.log(err);
            }
            else {
                console.log(result);
            };
    
        });
        
    console.log(req.body.appID);
    console.log(req.body.applicantnumber);
    console.log(req.body);

    res.redirect('/admin/app');
});


router.get("/edittr/:id", verifyToken, function (req, res) {
    customerServiceSchema.findOne({_id: req.params.id}, function (err, transactions) {
        if (err) return console.error(err);
        //console.log(transactions);
        res.render('cs0',{transaction: transactions});
    });
});

router.post("/edittr/edittransaction", verifyToken, function(req,res) {

    var ID = req.body.trID;
    var id = new mongoose.Types.ObjectId(ID);
    var test = customerServiceSchema.findByIdAndUpdate(id, { transactionnumber: req.body.transactionnumber }, 
        function(err, result){

            if(err){
                console.log(err);
            }
            else {
               console.log(result);
            };
    
        });
        
    console.log(req.body.trID);
    console.log(req.body.transactionnumber);
    console.log(req.body);

    res.redirect('/admin/cs');
});

router.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../html/login.html"));
});

router.get("/cs", verifyToken, function(req, res) {
    customerServiceSchema.find(function (err, transactions) {
        if (err) return console.error(err);
        //console.log(transactions);
        res.render('customerservice', {transactions: transactions});
    });
   //res.sendFile(path.join(__dirname, "../html/csmain.html"));
});



router.get("/cs0", verifyToken, function(req, res) {
    console.log(req.cookies.token);
    customerServiceSchema.find(function (err, transactions) {
        if (err) return console.error(err);
        console.log(transactions);
        res.render('cs0', {transactions: transactions});
    });
    //res.sendFile(path.join(__dirname, "../html/cs0.html"));
});

//router.get("/user0", checkSecurity, function(req, res) {
   // userAccountSchema.find(function (err, users) {
        //if (err) return console.error(err);
        //console.log(users);
        //res.render('user0', {users: users});
    //});
    
//});

router.get("/app", verifyToken, function(req, res) {
    jobApplicationSchema.find(function (err, applications) {
        if (err) return console.error(err);
        //console.log(applications);
        res.render('application',{applicants: applications});
    });
   // res.sendFile(path.join(__dirname, "../html/applications.html"));

});

router.get("/editappl/:id", verifyToken, function (req, res) {
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


router.post("/submitaccount", [checkCaptcha, validatecreation, function (req,res) {
    var user = new userAccountSchema;
    var today = new Date();
    user.accountcreationdate = 
    (today.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.zipcode = req.body.zipcode;
    user.username = req.body.username;
    user.password = crypto.createHash('sha256').update(req.body.password).digest('hex');
    user.secretquestion = req.body.secretquestion;
    user.secretanswer = req.body.secretanswer;
    user.save().then(savedDoc => {
        console.log(user._id);
        console.log(user.email);
        email(user._id, user.email);
        res.sendFile(path.join(__dirname, "../html/createaccount2.html"));
});
}]);

router.get("/confirm/:id", function (req, res) {
    var id = new mongoose.Types.ObjectId(req.params.id);
    console.log(id);
    userAccountSchema.findByIdAndUpdate(id, { "confirm" : "true" }, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
  );

});

//add email confirmation handler
router.post("/confirmemail", function (req, res) {
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