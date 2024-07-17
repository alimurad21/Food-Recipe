const express = require('express');
const Recipe = require('../models/Recipe.js');
const { verifyToken } = require('../Middleware/authMiddleware.js');

const recipeRouters = express.Router();

recipeRouters.post('/add', verifyToken, async (req, res) => {
    try {
        const { title, ingredient, instruction, prep_time, cuisine, image } = req.body;

        if (!title || !ingredient || !instruction || !prep_time || !cuisine || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        // console.log(req.user)
        let recipe = new Recipe({
            user: req.user.user.id,
            title,
            ingredient,
            instruction,
            prep_time,
            cuisine,
            image
        });
        // console.log(recipe)
        const savedRecipe = await recipe.save();
        // console.log(savedRecipe);
        res.status(200).json(savedRecipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
        // console.log(err)
    }
});

// Get all recipes for the logged-in user
recipeRouters.get('/', verifyToken, async (req, res) => {
    try {
        // console.log('1.')
        const recipes = await Recipe.find({});//{ user: req.user.id }
        if(!recipes){
            res.status(400).json({message:"Recipes not found"})
        }
        // console.log('2. ',recipes)
        res.status(200).json(recipes);
    } catch (err) {
        // console.log(err.message)
        res.status(500).json({ error: err.message });
    }
});

//Get recipe by id for the loggen in user
recipeRouters.get('/:id', verifyToken, async (req, res) => {
    try {
        // console.log('1.')
        const recipe = await Recipe.findById(req.params.id);//{ user: req.user.id }
        // console.log("2. recipe:", recipe)
        if(!recipe){
            res.status(400).json({message:"Recipes not found"})
        }
        // console.log('2. ',recipe)
        res.status(200).json(recipe);
    } catch (err) {
        // console.log(err.message)
        res.status(500).json({ error: err.message });
    }
});

// Update a recipe
recipeRouters.put('/update/:id', verifyToken, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        if (recipe.user.toString() !== req.user.user.id) {
            return res.status(403).json({ error: 'You are not authorized to update this recipe' });
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedRecipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a recipe
recipeRouters.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = recipeRouters;
