const mongoose = require("../db/mongoose")

const memeSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Meme", memeSchema);