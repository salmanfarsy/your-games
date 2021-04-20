const mongoose = require('mongoose');
const gameSchema = new mongoose.Schema({
    title:String,
    rating:Number,
    released:Number,
    body:String,
    image:String,
    created:{type:Date, default:Date.now}
});
module.exports = mongoose.model('Game', gameSchema);
