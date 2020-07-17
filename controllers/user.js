const User = require("../models/user"),
      userHelper = require("../helpers/user"),
      passport                = require("passport");

exports.register = async (req, res) => {
  
    var Users=new User({email: req.body.email, username: await userHelper.generateUniqueUserName(req.body.email)}); 
    
    User.register(Users, req.body.password, function(err, user) { 
        if (err) {
          res.send({success:false, message: err.message});
        } else{ 
          res.send({success:true, message: 'You have successfully registered, Please login!'});
        } 
    });

};

exports.login = async (req, res) => {

    if(!req.body.email){ 
      res.send({success: false, message: "Email was not given"}) 
    } else { 
      if(!req.body.password){ 
        res.send({success: false, message: "Password was not given"}) 
      }else{ 
        passport.authenticate(
          'local',
          function (err, user, info) {
             if(err){
               res.send({success: false, message: err}) 
             } else{ 
              if (!user) { 
                res.send({success: false, message: 'Email or Password incorrect'}) 
              } else{ 
                req.login(user, function(err){ 
                  if(err){ 
                    res.send({success: false, message: err}) 
                  }else{
                    res.send({success: true, message: 'Logged In'});
                  } 
                }) 
              } 
             } 
          })(req, res); 
      }
  }

};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  
  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });
    
    console.log(userMap);
    res.send(userMap);  
  });
};

exports.profile = (req, res) => {
  res.render("user/profile", {currentUser: req.user});
};