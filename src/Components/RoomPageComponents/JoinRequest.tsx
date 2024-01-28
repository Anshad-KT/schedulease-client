import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../Context/SocketContext';

const AnimatedPopup = ({userOne}:{userOne:any}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Simulate a delay to show/hide the popup
  useEffect(() => {
    console.log(userOne);
    
  }, []);
  const { 
    socket,user,roomId
     } = useContext(SocketContext)
    
     const handleClose = (value:boolean) => {

    socket.emit("response",{userId:user,result:value,roomId})
      
    setIsVisible(false);
  };

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow ${isVisible ? 'animate-none' : 'hidden'} border bg-primary`}>
    <p className="text-white">{userOne?.userId} is requesting to join</p>
    <div className="mt-3 flex">
      <button onClick={()=>handleClose(true)} className="bg-white text-primary px-3 py-1.5 rounded-md shadow-md hover:shadow-lg mr-2 transition-all duration-300 ease-in-out">
        Accept
      </button>
      <button onClick={()=>handleClose(false)} className="bg-white text-primary px-3 py-1.5 rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
        Reject
      </button>
    </div>
  </div>
  

  );
};

export default AnimatedPopup;
