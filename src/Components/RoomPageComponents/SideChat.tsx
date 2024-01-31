import { useContext, useState } from 'react';
import { RiAttachment2 } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";
import Chats from './Chats'
import ChildrenVideo from './ChildrenVideo';

import { SocketContext } from '../../Context/SocketContext';

const SideChat = () => {
  const [state, setSstate] = useState<boolean>(false)
 
  const [message,setMessage] = useState('')
  const { 
    remoteStream,
    handleKeyDown,
    setChats,
    user,
    setStreamKey,
    streamKeys
     } = useContext(SocketContext)
     const handleStreamKeyChange = (newStreamKey: string) => {
      setStreamKey(newStreamKey);
    };
     

  return (
    <>
      <div className="flex w-full h-full rounded-md overflow-y-scroll flex-col py-2 px-2 gap-2 text-gray-500 border">
        {state ? Object.entries(remoteStream.current).map(([streamKey, streamValue], index) => {
       
          
          if (streamKey !== streamKeys) {
          
            

            return (
              <ChildrenVideo onClick={()=>handleStreamKeyChange(streamKey)} key={index} userVideoSrc={streamValue} />
            );
          }
          return null; 
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
             value={message}
             onChange={(e)=>setMessage(e.target.value)}
              className="flex w-full h-fit p-2 border rounded-xl outline-none "
              type="text"
            />
            <button
            onClick={(e)=>{
              handleKeyDown(e,message)
              setChats((prevChat: any) => [...prevChat, { from: user, fileType: "text", content: message, createdAt: new Date() }])
            }}
              type="button"
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