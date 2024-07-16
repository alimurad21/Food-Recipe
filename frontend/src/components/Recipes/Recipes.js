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
            console.log(response.data);
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
    <div className="ml-auto flex items-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
        onClick={handleAddRecipe}
      >
        Add Recipe
      </button>
      {Array.isArray(recipes) && recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            user={recipe.user}
            title={recipe.title}
            ingredient={recipe.ingredient}
            instruction={recipe.instruction}
            prep_time={recipe.prep_time}
            cuisine={recipe.cuisine}
            image={recipe.image}
          />
        ))
      ) : (
        <p>No recipes found</p>
      )}
    </div>
  );
};

export default Recipes;
