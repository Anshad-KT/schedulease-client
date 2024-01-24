import React from "react";

import  JoinPageMainSection  from "../../Components/JoinPageComponents/JoinPageMainSection";
import NavbarComponent from "../../Components/Signup/Navbar/NavbarComponent";
import { JoinProvider } from "../../Context/JoinContext";

const Join = () => {
  return (
    // <div className="flex w-full h-3/4 flex-col bg-black">
    <>
    <JoinProvider>
    <NavbarComponent />
      <JoinPageMainSection/>
      </JoinProvider>
    </>
    //</div> 
  )
};

export default Join;
