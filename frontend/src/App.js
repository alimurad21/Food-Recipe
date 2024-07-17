import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './pages/Layout';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import { useState } from 'react';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header/Header';
import PrivateRoute from './utils/PrivateRoute.js';
import AlertComponent from './components/AlertComponent/AlertComponent.js';
import { ACCESS_TOKEN_NAME } from './constant/Constants.js';
import NoPage from './pages/NoPage.js';
import AddRecipe from './components/Recipes/AddRecipe.js';
import EditRecipe from './components/Recipes/EditRecipe.js';
import RecipePage from './pages/RecipePage.js';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(localStorage.getItem(ACCESS_TOKEN_NAME));
  const [errorMessage, setErrorMessage] = useState(null)

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
        setErrorMessage(null);
    }, 5000);
};

  return (
    <BrowserRouter>
    <div className="App">
      <Header  userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn}/>
      <div className="">
        <Routes>
          {/* <Route index element={<RegisterPage showError={setErrorMessage}/>} /> */}
          <Route path='/register' element={<RegisterPage showError={showError} setUserLoggedIn={setUserLoggedIn} />} />
          <Route path='/login' element={<LoginPage showError={showError} setUserLoggedIn={setUserLoggedIn} />} />
          
          <Route path='/' element={<Layout/>} >
            <Route  path='home' element={<PrivateRoute element={<Home/>} />} />
            <Route path='recipe/add' element={<PrivateRoute element={<AddRecipe/>}/>}/>
            <Route path='recipe/edit/:id' element={<PrivateRoute element={<EditRecipe />} />} />
            <Route path='recipe/:id' element={<PrivateRoute element={<RecipePage/>} />} />
          </Route>
          <Route path='*' element={<NoPage/>} />
        </Routes>
        <AlertComponent errorMessage={errorMessage} hideError={setErrorMessage} />
        </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
