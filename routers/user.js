const express = require("express")
const router = new express.Router()
const passport = require("passport")
const User = require("../models/user");

router.get("/login", (req, res) => {
    res.render("login")
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/memes",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: 'Logged in successfully'
}), (req, res) => {
    //res.send("iochrichrilo")
});

router.get("/signup", (req, res) => {
    res.render("signup")
});

//handling user sign up
router.post("/signup", (req, res) => {
    const newuser = new User({ username: req.body.username })
    User.register(newuser, req.body.password, (err, user) => {
        if (err) {
            console.log(err.message)
            req.flash('error', err.message);
            res.redirect("back")
        }
        passport.authenticate("local")(req, res, function() {
            req.flash('success', "Welcome " + user.username);
            res.redirect("/")
        });
    });
});

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged out successfully")
    res.redirect("/memes");
});

module.exports = router;