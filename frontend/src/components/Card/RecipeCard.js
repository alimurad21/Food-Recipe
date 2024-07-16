import React, {useEffect, useState} from 'react';

const RecipeCard = ({ user, title, ingredient, instruction, prep_time, cuisine, image }) => {
  const [username, setUsername] = useState('')

  useEffect(()=>{
    try{
      
    }catch(err){
      console.log(err)
    }
  },[])

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:h-full md:w-48" src={image} alt="Recipe" />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{title}</div>
          <div className="mt-2">
            <div className="flex items-center">
              <span className="text-gray-500">{user}</span>
            </div>
            <div className="mt-2">
              <h1 className="text-lg">Ingredients</h1>
              <p className="mt-2 text-gray-600">{ingredient}</p>
            </div>
            <div className="mt-4">
              <h1 className="text-lg">Instructions</h1>
              <p className="mt-2 text-gray-600">{instruction}</p>
            </div>
            <div className="mt-4">
              <h1 className="text-lg">Prep Time</h1>
              <p className="mt-2 text-gray-600">{prep_time}</p>
            </div>
            <div className="mt-4">
              <h1 className="text-lg">Cuisine</h1>
              <p className="mt-2 text-gray-600">{cuisine}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
