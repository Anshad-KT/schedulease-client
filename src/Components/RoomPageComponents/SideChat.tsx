import React, { useContext, useState } from 'react';
import { RiAttachment2 } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";
import Chats from './Chats'
import ChildrenVideo from './ChildrenVideo';
import { useDispatch, useSelector } from 'react-redux';

import { SocketContext } from '../../Context/SocketContext';
import { updateUser } from '../../Redux/user/userSlice';
import { selectedVideo } from '../../Redux/video/selectedVideoSlice';

const SideChat = ({setStreamKey,streamKeys}:any) => {
  const [state, setSstate] = useState<boolean>(false)
  const handleStreamKeyChange = (newStreamKey: string) => {
    console.log('Updating streamKey to:', newStreamKey);
    setStreamKey(newStreamKey);
  };
  const { 
    remoteStream,
    
     } = useContext(SocketContext)
     console.log(remoteStream);
     console.log(setStreamKey);
     
     console.log('streamKeys in SideChat:', streamKeys);
  const dispatch = useDispatch()
  return (
    <>{streamKeys+"loooooooooooo"}
      <div className="flex w-full h-full rounded-md overflow-y-scroll flex-col py-2 px-2 gap-2 text-gray-500 border">
        {state ? Object.entries(remoteStream.current).map(([streamKey, streamValue], index) => {
          console.log(streamKeys,streamKeys,"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
          
          if (streamKey !== streamKeys) {
            // Assuming streamValue is an object with username and email properties
            console.log("koduos",streamKey,streamKeys);
            

            return (
              <ChildrenVideo onClick={()=>handleStreamKeyChange(streamKey)} key={index} userVideoSrc={streamValue} />
            );
          }
          return null; // Return null for the selected component to exclude it
        }) : <Chats /> }
        
      </div>
      <div className="w-full h-fit">
        <div className="w-full h-[70px]">
          <form className="flex w-full h-full justify-center items-center gap-1">
            <button
              type="button"
              className="flex p-2 h-fit w-fit items-center "
            >
              <RiAttachment2 onClick={() => setSstate(!state)} fontSize={"23"} color="gray" />
            </button>
            <input
              className="flex w-full h-fit p-2 border rounded-xl outline-none "
              type="text"
            />
            <button
              type="submit"
              className=" h-fit w-fit p-2 flex items-center rounded-xl bg-primary text-white"
            >
              <IoIosSend fontSize={"23"} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SideChat