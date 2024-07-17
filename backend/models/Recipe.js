const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // Assuming your user model is named 'User'
        required: true
    },
    title: String,
    ingredient: String,
    instruction: String,
    prep_time: String,
    cuisine: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
