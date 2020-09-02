const express = require("express")
const router = new express.Router()
const User = require("../models/user")
const Meme = require("../models/meme")
const { isLoggedIn } = require("../middleware/middleware")
    //const sharp = require("sharp")

var multer = require('multer');
const upload = multer({
    limits: {
        fileSize: 1000000 //1 MB size is specified in bytes
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload a image"))
        }
        cb(undefined, true)
    }
})

router.get("/", (req, res) => {
    res.redirect("/memes");
});

router.get("/memes", (req, res) => {
    Meme.find({}, (err, memes) => {
        if (err) {
            console.log(err);
        } else {
            //res.set("Content-Type", "image/png")
            res.render("memes", { memes: memes });
        }
    })
});

router.get("/memes/:id", (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect("back");
        } else {
            Meme.find({}, (err, memes) => {
                if (err) {
                    req.flash('error', err.message);
                    res.redirect("back");
                } else {
                    //res.set("Content-Type", "image/jpg")
                    res.render("memeuser", { user: user, memes: memes });
                }
            });
        }
    });
})


router.post("/memes", isLoggedIn, upload.single('image'), async(req, res) => {
    //const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.body.image = {
            data: req.file.buffer,
            contentType: "image/png"
        }
        // add author to meme
    req.body.author = {
        id: req.user._id,
        username: req.user.username
    }
    var newmeme = new Meme({ image: req.body.image, author: req.body.author })
    await newmeme.save()
    res.redirect("/memes")
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
});

router.delete("/deletememe/:memeid", isLoggedIn, (req, res) => {
    Meme.findByIdAndRemove(req.params.memeid, (err) => {
        if (err) {
            req.flash("error", err.message);
        } else {
            req.flash("success", "Meme deleted")
        };
        res.redirect("back")
    })
});

module.exports = router