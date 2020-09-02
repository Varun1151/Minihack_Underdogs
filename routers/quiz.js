const express = require("express")
const router = new express.Router()

router.get("/findme", (req, res) => {
    res.render("findme")
});

router.get("/ggeretsae", (req, res) => {
    res.render("easteregg")
})

router.get("/quiz", (req, res) => {
    res.render("quiz")
});

router.get("*", (req, res) => {
    res.redirect("/memes")
})

module.exports = router