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
    yt:String,
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    author:{
        username:String,
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    }
});
module.exports = mongoose.model('Game', gameSchema);
