var mongoose=require("mongoose")
//SCHEMA SETUP
var memeSchema = new mongoose.Schema({
	image:String,
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username:String
	}
})

module.exports=mongoose.model("Meme",memeSchema);
