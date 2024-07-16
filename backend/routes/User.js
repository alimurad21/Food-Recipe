const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const userRoutes = express.Router();

const secretKey = process.env.JWT_SECRET;


userRoutes.get('/:id', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user){
            res.status(404).json({message:'User not found'})
        }
        res.status(200).json({user})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})

userRoutes.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Invalid Credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ message: 'Invalid Credentials' });
        }

        // Generating JWT
        const payload = {
            user: { id: user.id }
        };
        jwt.sign(payload, secretKey, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ token });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

userRoutes.post('/register', async (req, res) => {
    try {
        const { name, email, password, bio } = req.body;
        // Validate the request
        if (!name || !email || !password || !bio) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User already exists' });
        }

        user = new User(req.body);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user._id
            }
        };

        jwt.sign(payload, secretKey, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ token });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

userRoutes.put('/update/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ data: user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

userRoutes.delete('/delete/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Successfully deleted.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = userRoutes;
