const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    recipe:{type:mongoose.Schema.Types.ObjectId, ref:"Recipe", required:true},
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    comment:{type:String, required:true},
    createdAt:{type:Date, default:Date.now}
})

const Comment = mongoose.model('comments', CommentSchema);

module.exports = Comment;