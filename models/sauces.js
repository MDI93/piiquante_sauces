const mongoose = require("mongoose");

const saucesSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name:{ type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    mainPepper: { type: String, required: true },
    heat: { type: String, required: true },
    /*likes:{ type: number, required: true},
    dislikes: { type: number, required: true},
    userLiked:  [ "String <userId>" ],
    userDisliked:  [ "String <userId>" ],*/
});

module.exports = mongoose.model('sauces', saucesSchema);
