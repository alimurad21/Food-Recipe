import React from 'react'
import Register from '../auth/Register/Register.js'

const RegisterPage = ({showError, setUserLoggedIn}) => {
  return (
    <>
        <Register showError={showError} setUserLoggedIn={setUserLoggedIn}/>
    </>
  )
}

export default RegisterPage