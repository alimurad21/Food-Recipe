const express = require('express');
require('dotenv').config();
const connectToMongoDB = require('./config.js');
const userRoutes = require('./routes/User.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const recipeRouters = require('./routes/Recipe.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectToMongoDB(process.env.MONGODB_URL);

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};


// Body parser middleware to parse request bodies (if needed)
app.use(express.static('dist'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())


// Define routes
app.use('/api/user', userRoutes);
app.use('/api/recipe', recipeRouters);

app.use('/', (req, res) => {
    res.send('Welcome to Food Hub');
});

// Start server
app.listen(PORT, (error) => {
    if (error) {
        console.error(error.message);
    }
    console.log(`Server is running on http://localhost:${PORT}`);
});
