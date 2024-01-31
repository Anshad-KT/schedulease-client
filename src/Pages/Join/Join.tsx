import React from "react";

import  JoinPageMainSection  from "../../Components/JoinPageComponents/JoinPageMainSection";
import NavbarComponent from "../../Components/Signup/Navbar/NavbarComponent";
import { JoinProvider } from "../../Context/JoinContext";

const Join = () => {
  return (
    
    <>
    <JoinProvider>
    <NavbarComponent />
      <JoinPageMainSection/>
      </JoinProvider>
    </>
 
  )
};

export default Join;
