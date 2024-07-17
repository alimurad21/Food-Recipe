import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constant/Constants.js';
import {jwtDecode} from 'jwt-decode';  // Remove curly braces, since it's a default export
import axios from 'axios';

function Header({ userLoggedIn, setUserLoggedIn }) {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // console.log("userLoggedIn",userLoggedIn)
        if (userLoggedIn) {
            try {
                const decodedToken = jwtDecode(userLoggedIn);
                // console.log('decodedToken',decodedToken)
                // console.log('decodedToken.user', decodedToken.user)
                if (decodedToken.user && decodedToken.user.id) {
                    const id = decodedToken.user.id;
                    // console.log("header id",id)
                    axios.get(`${API_BASE_URL}/api/user/${id}`)
                        .then(response => {
                            setUsername(response.data.name);
                        }).catch(err => {
                            console.error(err.message);
                        });
                } else {
                    throw new Error("Invalid token structure");
                }
            } catch (error) {
                console.error("Invalid token:", error);
                setUserLoggedIn(null);
                setUsername('');
            }
        } else {
            setUsername('');
        }
    }, [userLoggedIn, setUserLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN_NAME);
        setUserLoggedIn(null);
        navigate('/login');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleSubmit =(e)=>{
        e.preventDefault();
    }

    const renderLogout = () => {
        return (
           <>
                {userLoggedIn ? (
                    <div className="ml-auto flex items-center">
                        <span className="text-white mr-4">{username}</span>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-10" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="ml-auto flex items-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                )}
            </>
        );
    };

    return (
        <nav className="bg-gray-800 h-16 flex items-center shadow-md">
            <ul className="flex items-center w-full pl-4 gap-8">
                <li>
                    <Link className="text-white text-3xl font-bold mr-12 md:mr-0" to="/home">Food Hub</Link>
                </li>
                <div className='flex items-center pl-4 gap-6'>
                    <li>
                        <Link className="text-white hover:text-gray-300" to="/home">Home</Link>
                    </li>
                    <li>
                        <Link className="text-white hover:text-gray-300" to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link className="text-white hover:text-gray-300" to="/about">About</Link>
                    </li>
                </div>
                <div className="flex items-center">
                    <form onSubmit={handleSubmit} className="flex items-center">
                        <input 
                            type='text' 
                            placeholder='Search Here ' 
                            className="px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
                        />
                        <input 
                            type='submit' 
                            value='Submit' 
                            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        />
                    </form>
                </div>
                <li className="ml-auto">
                    {renderLogout()}
                </li>
            </ul>
        </nav>
    );
}

export default Header;
