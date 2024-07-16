import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constant/Constants.js';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ showError, setUserLoggedIn  }) => {
  const [state, setState] = useState({ email: '', password: ''});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendDataToServer = async () => {
    if (state.email.length && state.password) {
      showError(null);
      const payload = {
        email: state.email,
        password: state.password,
      };

      await axios.post(`${API_BASE_URL}/api/user/login`, payload)
        .then((response) => {
          if (response.status === 200) {
            setState((prevState) => ({
              ...prevState,
              successMessage: 'Login Successfully and redirect to Home page',
            }));
            localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
            redirectToHome();
            setUserLoggedIn (response.data.token)
            showError(null);
          } else {
            showError('Invalid Credential');
            setUserLoggedIn (null)
          }
        }).catch((err) => {
          console.log(err.message);
          showError('Some error occurred');
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendDataToServer();
  };

  const redirectToHome = () => {
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800">Login User</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
            <input
              name="email"
              type="email"
              placeholder="Enter email address"
              value={state.email}
              onChange={handleChange}
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
              value={state.password}
              onChange={handleChange}
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
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <Link to="/register" className="text-sm text-blue-500 hover:underline">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
