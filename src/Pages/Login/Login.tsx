import React, { useEffect } from 'react'
import NavbarComponent from '../../Components/Login/Navbar/NavbarComponent'
import ContentComponent from '../../Components/Login/Content/ContentComponent'
import { useNavigate } from 'react-router-dom'
import { observeAuthStateLoggedInSignup } from '../../Firebase/FireBase'

const Signup = () => {
 
  return (
    <>
    <NavbarComponent />
    <ContentComponent />
    </>
  )
}

export default Signup