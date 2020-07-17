module.exports = app => {
    const users = require('../controllers/user'),
    connectEnsureLogin      = require("connect-ensure-login");

    var router = require("express").Router();

    router.post("/register", users.register);
    router.post("/login", users.login);
    router.get("/list", users.findAll);
    router.get("/profile", connectEnsureLogin.ensureLoggedIn('/'), users.profile);
    router.get("/logout", function(req, res){    
         req.logout();    
         res.redirect("/");
    });
    app.use('/user', router);
}