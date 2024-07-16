import React from 'react'
import Register from '../auth/Register/Register.js'

const RegisterPage = ({showError, userLoggedIn}) => {
  return (
    <>
        <Register showError={showError} userLoggedIn={userLoggedIn}/>
    </>
  )
}

export default RegisterPage