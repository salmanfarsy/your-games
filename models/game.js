const mongoose = require('mongoose');
const gameSchema = new mongoose.Schema({
    title:String,
    rating:{type:Number, min:0, max:10},
    review:String,
    image:String,
    genre:String,
    gameplay:{type:Number, min:0, max:10},
    storyline:{type:Number, min:0, max:10},
    graphics:{type:Number, min:0, max:10},
    pgRating :String,
    yt:String
});
module.exports = mongoose.model('Game', gameSchema);
