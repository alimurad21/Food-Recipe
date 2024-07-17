import React, {useEffect, useState} from 'react';
import { API_BASE_URL } from '../../constant/Constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ user, id, title, image }) => { //user, title, ingredient, instruction, prep_time, cuisine, image 
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  useEffect(()=>{
    const fetchUser = async()=>{
      await axios.get(`${API_BASE_URL}/api/user/${user}`)
      .then(response=>{
        // console.log(response.data.name);
        setUsername(response.data.name);
      }).catch(err=>{
        console.log(err)
      })
    }
    fetchUser()
  },[user])

  // console.log(username);

  const redirectToRecipe =()=>{
    navigate(`/recipe/${id}`)
    
  }

  return (
    <div className="max-w-70  bg-white rounded-xl shadow-md overflow-hidden mb-4 cursor-pointer" onClick={redirectToRecipe}>
      <div className="relative h-64">
        <img className="w-full h-full object-cover" src={image} alt="Recipe" />
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-20 p-2">
          <span className="text-white text-lg font-sans">By: {username}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="text-start text-black-500  text-3xl font-semibold">{title}</div>
      </div>
    </div>
  );
};

export default RecipeCard;
