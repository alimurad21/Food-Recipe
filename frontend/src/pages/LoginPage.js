import React from 'react'
import Login from '../auth/Login/Login.js'
const LoginPage = ({showError, setUserLoggedIn }) => {
  return (
    <>
        <Login showError={showError} setUserLoggedIn ={setUserLoggedIn }  />
    </>
  )
}

export default LoginPage