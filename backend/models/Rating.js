const mongoose = require('mongoose')

const RatingSchema = mongoose.Schema({
    recipe: {type:mongoose.Schema.Types.ObjectId, ref:'Recipe', required:true},
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    rate: {type:Number, required:true},
    createdAt:{type:Date, default:Date.now}
})

const Rating = mongoose.model('ratings', RatingSchema);

module.exports = Rating;