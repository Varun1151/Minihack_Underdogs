var express = require("express"),
	app=express(),
	bodyparser=require("body-parser"),
	flash=require("connect-flash"),
	passport=require("passport"),
	LocalStratergy=require("passport-local"),
	passportLocalMongoose=require("passport-local-mongoose"),
    mongoose=require("mongoose"),
	User=require("./models/user"),
	Meme=require("./models/meme");
require('dotenv').config();

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
mongoose.connect("mongodb+srv://varun51:gotilla@123@cluster0-ovdbs.mongodb.net/Entertainment",{useNewUrlParser:true});
app.use(flash())


var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dzkqk6y2p', 
  api_key: process.env.CLOUDINARY_API_KEY||818758744624256, 
  api_secret: process.env.CLOUDINARY_API_SECRET||"ionm18OMZfQFvMamGrDsKIWZbJ4"
});
// CLOUDINARY_URL=cloudinary://818758744624256:ionm18OMZfQFvMamGrDsKIWZbJ4@dzkqk6y2p
app.use(require("express-session")({
	secret:"underdogs",
	resave:false,
	saveUninitialized:false	
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error")
	res.locals.success = req.flash("success") 
	res.locals.info = req.flash("info") 
	next();
});


app.get("/",(req,res)=>{
	res.redirect("/memes");
});

app.get("/memes",(req,res)=>{
	Meme.find({},(err,memes)=>{
		if(err){
			console.log(err);
		}
		else{
			res.render("memes",{memes:memes});
		}
	})
});

app.get("/memes/new",isLoggedIn,(req,res)=>{
	res.render("newmeme")
})

app.get("/memes/:id",(req,res)=>{
	User.findById(req.params.id,(err,user)=>{
		if(err){
			req.flash('error', err.message);
			res.redirect("back");
		}
		else{
			Meme.find({},(err,memes)=>{
				if(err){
					req.flash('error', err.message);
					res.redirect("back");
				}
				else{
					res.render("memeuser",{user:user,memes:memes});
				}	
			});
		}
	});
})



app.post("/memes",isLoggedIn,upload.single('image'), function(req, res) {
	cloudinary.uploader.upload(req.file.path, function(result) {
  // add cloudinary url for the image to the campground object under image property
  req.body.image = result.secure_url;
  // add author to meme
  req.body.author = {
    id: req.user._id,
    username: req.user.username
  }
  var newmeme = new Meme({image:req.body.image,author:req.body.author})
  Meme.create(newmeme, function(err, meme) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('back');
    }
	req.flash('success',"Meme added Successfully");
    res.redirect('/memes');
  });
});
});

app.get("/findme",(req,res)=>{
	res.render("findme")
});

app.get("/ggeretsae",(req,res)=>{
	res.render("easteregg")
})
app.get("/quiz",(req,res)=>{
	res.render("quiz")
});


app.get("/login",(req,res)=>{
	res.render("login")
});

app.post("/login",passport.authenticate("local",{
	successRedirect : "/memes",
	failureRedirect : "/login",
	failureFlash: true,
    successFlash: 'Logged in successfully'
}),(req,res)=>{
	//res.send("iochrichrilo")
});

app.get("/signup",(req,res)=>{
	res.render("signup")
});

//handling user sign up
app.post("/signup",(req,res)=>{
	User.register(new User({username:req.body.username}),req.body.password,(err,user)=>{
		if(err){
			req.flash('error', err.message);
			res.redirect("back")
		}
		passport.authenticate("local")(req,res,function(){
			req.flash('success',"Welcome "+user.username);
			res.redirect("/")
		});
	});
});

app.get("/logout",(req,res)=>{
	req.logout();
	req.flash("success","Logged out successfully")
	res.redirect("/memes");
});

app.get("*",(req,res)=>{
	res.redirect("/memes")
})

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next()
	}
	req.flash("info","You need to be logged in to perform the action");
	res.redirect("/login")
}

// app.use((err,req,res,next)=>{
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get("env") === "development" ? err:();
// 	res.status(err.status || 00);
// 	res.send("Error")
// })
app.listen(process.env.PORT||3004,()=>{
	console.log("Entertainment app started");
});
