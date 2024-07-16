import React ,{useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constant/Constants.js';
import {jwtDecode} from "jwt-decode";
import axios from 'axios';

function Header({ userLoggedIn, setUserLoggedIn }) {
    const [username, setUsername] = useState('')
    // console.log("1.",username)

    const navigate = useNavigate();

    useEffect(() => {
        if (userLoggedIn) {
            try {
                const decodedToken = jwtDecode(userLoggedIn);
                const id = decodedToken.user.id;
                axios.get(`${API_BASE_URL}/api/user/${id}`)
                .then(response=>{
                    setUsername(response.data.user.name)
                }).catch(err=>{
                    console.log(err.message)
                })
            } catch (error) {
                console.error("Invalid token:", error);
                setUserLoggedIn(null);
            }
        } else {
            setUsername('');
        }
    }, [userLoggedIn, setUserLoggedIn]);

    const renderLogout = () => {
        
            return (
              <>
              {userLoggedIn ? <div className="ml-auto flex items-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={handleLogout}>
                Logout
                </button>
                <span className="text-white">{username}</span>
                </div>:
                <div className="ml-auto flex items-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={handleLogin}>
                Login
                </button>
                <span className="text-white">{userLoggedIn}</span>
                </div>}

              </>
            );
        
    };

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN_NAME);
        setUserLoggedIn(null);
        navigate('/login');
    };

    const handleLogin =()=>{
        navigate('/login')
    }

    return (
        <nav className="bg-slate-500 h-16 flex items-center">
            <ul className="flex items-center w-full pl-4 gap-6">
                <li>
                    <Link className="text-white text-lg font-bold mr-12 md:mr-40" to="/home">Food Hub</Link>
                </li>
                <li>
                    <Link className="text-white hover:text-gray-300" to="/home">Home</Link>
                </li>
                <li>
                    <Link className="text-white hover:text-gray-300" to="/contact">Contact</Link>
                </li>
                <li>
                    <Link className="text-white hover:text-gray-300" to="/about">About</Link>
                </li>
                <li className="ml-auto">
                    {renderLogout()}
                </li>
            </ul>
        </nav>
    );
}

export default Header;
