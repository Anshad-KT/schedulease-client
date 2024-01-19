import React, { useEffect, useState } from 'react';

import LoadingComponent from '../Loading/LoadingComponent';

const JoinPageMainSection = () => {

    const [loading, setLoading] = useState(true)
     
    useEffect(()=>{
      setTimeout(()=>{
        setLoading(false)
     },4000)
    },[])
  return (
    
    <div className="flex w-screen h-screen  ">
      <div className="flex w-full h-full flex-col items-center justify-center gap-y-8">
        <div className="flex text-4xl font-medium px-10">
          Easy Scheduling for the buissness needs
        </div>
        <div className="flex text-[14px] font-medium px-10 text-gray-500">
          Schedule is your go to app to automate your appointments, built with simplicity and efficiency.
        </div>
        {/* <div className="flex gap-x-3 w-fit h-fit mt-2 px-2 sm:px-0">
          Interview for MERN stack developement
        </div> */}
      </div>
      <div className="h-full w-0.5 py-10 hidden md:flex">
        <div className="h-full w-full bg-gray-300"></div>
      </div>
      <div className="w-full h-full justify-center items-center hidden md:flex flex-col gap-y-5 pb-20">
        <img src="/icons/avatar.jpg" alt="life_plus_logo" className="w-36 h-36 rounded-3xl" />
        <div className="flex text-base text-gray-500 text-[15px]">
         {loading ? "Preparing your meeting..." : "your meeting is ready"}
        
        </div>
        <div>
        {loading ? <LoadingComponent /> : <button className="bg-danger_color  bg-primary text-white px-4 py-3 text-[12px] rounded-full">
              Join Meeting
            </button>}
            
        </div>
      </div>
    </div>
  );
}

export default JoinPageMainSection