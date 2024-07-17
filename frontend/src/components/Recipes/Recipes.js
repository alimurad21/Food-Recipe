import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../../constant/Constants";
import RecipeCard from "../Card/RecipeCard";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [showMessage, setShowMessage] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem(ACCESS_TOKEN_NAME);
  
  useEffect(() => {
    const fetchRecipe = async () => {
      await axios
        .get(`${API_BASE_URL}/api/recipe`, {
          headers: { [ACCESS_TOKEN_NAME]: token },
        })
        .then((response) => {
          if (response.status === 200) {
            setShowMessage("Loading Recipes...");
            // console.log(response.data);
            setRecipes(response.data);
          }
          setShowMessage("Failed to load recipes");
        })
        .catch((err) => {
          setShowMessage(err.message);
          console.log(err);
        });
    };
    fetchRecipe();
  }, [showMessage, token]);

  const handleAddRecipe = () => {
    navigate("/recipe/add");
  };

  return (
    <div className="container p-4  mt-8">
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddRecipe}
        >
          Add Recipe
        </button>
      </div>
      <div className="flex justify-start text-3xl ">
        <h1 className="font-bold">Popular Recipes</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(recipes) && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              id = {recipe._id}
              user={recipe.user}
              title={recipe.title}
              // ingredient={recipe.ingredient}
              // instruction={recipe.instruction}
              // prep_time={recipe.prep_time}
              // cuisine={recipe.cuisine}
              image={recipe.image}
            />
          ))
        ) : (
          <p className="text-center">No recipes found</p>
        )}
      </div>
    </div>
  );
};

export default Recipes;
