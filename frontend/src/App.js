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

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(localStorage.getItem(ACCESS_TOKEN_NAME));
  const [errorMessage, setErrorMessage] = useState(null)

  return (
    <BrowserRouter>
    <div className="App">
      <Header  userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn}/>
      <div className="container d-flex align-items-center flex-column">
        <Routes>
          {/* <Route index element={<RegisterPage showError={setErrorMessage}/>} /> */}
          <Route path='/register' element={<RegisterPage showError={setErrorMessage} setUserLoggedIn={setUserLoggedIn} />} />
          <Route path='/login' element={<LoginPage showError={setErrorMessage} setUserLoggedIn={setUserLoggedIn} />} />
          
          <Route path='/' element={<Layout/>} >
            <Route  path='home' element={<PrivateRoute element={<Home/>} />} />
            <Route path='recipe/add' element={<PrivateRoute element={<AddRecipe/>}/>}/>
            <Route path='recipe/edit/:id' element={<PrivateRoute element={<EditRecipe />} />} />
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
