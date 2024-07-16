import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constant/Constants';

const Register = ({showError}) => { //{ showError }
    const [state, setState] = useState({ name: '', email: '', password: '', confirmPassword: '', bio: '',successMessage:null });
    const navigate = useNavigate();

    const sendDataToServer = async () => {
        if (state.name.length && state.email.length && state.password && state.confirmPassword && state.bio) {
            showError(null);
            const payload = {
                name: state.name,
                email: state.email,
                password: state.password,
                bio: state.bio,
            };

            await axios.post(`${API_BASE_URL}/api/user/register`, payload)
                .then(response => {
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            successMessage: 'Successfully registered user and redirected to Home page',
                        }));
                        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                        redirectToHome();
                        showError(null);
                    } else {
                        showError('Failed to Register');
                    }
                }).catch(err => {
                    showError('Failed to Register');
                    console.log(err.message);
                });
        }
    };

    const handleChange = (e) => {
        setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.password === state.confirmPassword) {
            sendDataToServer();
        } else {
            showError('Passwords do not match');
        }
    };

    const redirectToHome = () => {
        navigate('/home');
    };

    const redirectToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center text-gray-800">User Registration</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Input fields */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            <input
                                name="name"
                                placeholder="Enter Username"
                                onChange={handleChange}
                                value={state.name}
                                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            <input
                                name="email"
                                placeholder="Enter Email Address"
                                onChange={handleChange}
                                value={state.email}
                                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            <input
                                name="password"
                                type="password"
                                placeholder="Enter Password"
                                onChange={handleChange}
                                value={state.password}
                                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            <input
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                onChange={handleChange}
                                value={state.confirmPassword}
                                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            <input
                                name="bio"
                                placeholder="Bio"
                                onChange={handleChange}
                                value={state.bio}
                                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </label>
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Submit"
                            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                </form>
                <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                    {state.successMessage}
                </div>

                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-600">Already have an account? </span>
                    <span onClick={redirectToLogin} className="text-sm text-blue-500 cursor-pointer hover:underline">Login</span>
                </div>
            </div>
        </div>
    );
};

export default Register;
