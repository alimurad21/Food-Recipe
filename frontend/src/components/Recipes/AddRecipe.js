import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../../constant/Constants.js";

const AddRecipe = () => {
  const [state, setState] = useState({
    title: "",
    ingredient: "",
    instruction: "",
    prep_time: "",
    cuisine: "",
    image: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const sendDetailToServer = async () => {
    if (
      state.title ||
      state.ingredient ||
      state.instruction ||
      state.prep_time ||
      state.cuisine ||
      state.image
    ) {
      setError(null);

      const payload = {
        title: state.title,
        ingredient: state.ingredient,
        instruction: state.instruction,
        prep_time: state.prep_time,
        cuisine: state.cuisine,
        image: state.image,
      };

      // console.log("Payload:", payload);
      const token = localStorage.getItem(ACCESS_TOKEN_NAME);

      // console.log("userLoggedIn", token);

      await axios
        .post(`${API_BASE_URL}/api/recipe/add`, payload, {headers: {[ACCESS_TOKEN_NAME]: token }})
        .then((response) => {
          if (response.status === 200) {
            setState((prevState) => ({
              ...prevState,
              successMessage: "Recipe Added Successfully.",
            }));
            redirectToHome();
          } else {
            setError("Failed to add recipe");
          }
        })
        .catch((err) => {
          // console.log("err.response.data.message", err.response.data.message);
          // console.log("err.message", err.message);
          setError(err.response.data.message || err.message);
        });
    } else {
      // console.log('All field required.')
      setError("All fields are required");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendDetailToServer();
  };

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const redirectToHome = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center text-gray-800">
        Add Recipe
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          <input
            name="title"
            placeholder="Enter title of recipe"
            value={state.title}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          <textarea
            name="ingredient"
            placeholder="Enter ingredients"
            value={state.ingredient}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          <textarea
            name="instruction"
            placeholder="Enter instruction"
            value={state.instruction}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          <input
            name="prep_time"
            placeholder="Prepare in time"
            value={state.prep_time}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          <textarea
            name="cuisine"
            placeholder="Cuisine"
            value={state.cuisine}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          <input
            name="image"
            placeholder="Upload Image"
            value={state.image}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </label>
        <input
          type="submit"
          value="Submit"
          className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </form>
      {error && (
        <div
          className="px-4 py-2 mt-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  </div>
  );
};

export default AddRecipe;
