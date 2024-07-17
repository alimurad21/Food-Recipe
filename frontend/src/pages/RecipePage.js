import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../constant/Constants';
import axios from 'axios';

const RecipePage = () => {
    const [recipe, setRecipe] = useState({});
    const [username, setUsername] = useState('');
    const { id } = useParams(); // Use destructuring to extract id from params

    const token = localStorage.getItem(ACCESS_TOKEN_NAME);

    // console.log('params id ', id);
    // console.log('token ', token)

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/recipe/${id}`, {
                    headers: { [ACCESS_TOKEN_NAME]: token }
                });
                // console.log("response.data", response.data);
                setRecipe(response.data);
            } catch (error) {
                console.log('Error fetching recipe:', error);
            }
        };
        fetchRecipe();
        // console.log('recipe.user :', recipe.user)
        if (recipe.user) { // Check if recipe.user exists before fetching username
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}/api/user/${recipe.user}`, {
                        headers: { [ACCESS_TOKEN_NAME]: token }
                    });
                    setUsername(response.data.name);
                } catch (error) {
                    console.log('Error fetching user:', error);
                }
            };
            fetchUser();
        }

        
    }, [id, token, recipe.user]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-4">Recipe Page</h1>
            <div className="flex flex-col items-center">
                <div className="relative w-full h-64 mb-4">
                    <img className="w-full h-full object-cover rounded-lg" src={recipe.image} alt="Recipe" />
                    <span className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-xl p-2 rounded-tr-lg">By: {username}</span>
                </div>
                <div className="w-full bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold text-center mb-4">{recipe.title}</h2>
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
                        <p className="text-gray-700">{recipe.ingredient}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Instruction</h3>
                        <p className="text-gray-700">{recipe.instruction}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Preparation Time</h3>
                        <p className="text-gray-700">{recipe.prep_time}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Cuisine</h3>
                        <p className="text-gray-700">{recipe.cuisine}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipePage;
