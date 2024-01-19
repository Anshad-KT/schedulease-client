import React, { useContext, useEffect, useRef, useState } from "react";
import {
  BiMicrophone,
  BiMicrophoneOff,
  BiVideo,
  BiVideoOff,
} from "react-icons/bi";
import { MdOutlineScreenShare } from "react-icons/md";
import { SocketContext } from "../../Context/SocketContext";
import { useSelector } from "react-redux";

const VideoCall = ({streamKeys}:any) => {
  
  const [muteMic, setMuteMic] = useState(false);
  const [muteCamera, setMuteCamera] = useState(false);
  const [shareScreen, setShareScreen] = useState(false);
  const { 
    remoteStream,
    myVideo,
    selected,
    setSelected } = useContext(SocketContext)

  
  const videoRef = useRef<any>(null);

 useEffect(()=>{
  console.log('streamKey in VideoCall:', streamKeys);
  videoRef.current.srcObject =  remoteStream.current[streamKeys]
  console.log(remoteStream.current[streamKeys],streamKeys);
  
  console.log(videoRef.current);
  
 },[ remoteStream, streamKeys])

  
  return (
    <div className="w-full h-full flex flex-col ">
      <div className="w-full h-full rounded-md overflow-hidden">
        <div className="w-full h-full relative rounded-md ">
          <video
            className="w-full h-full object-cover rounded-md"
           ref={videoRef}
            autoPlay
          />
          <div className="bg-primary bg-opacity-70 flex w-fit h-fit rounded-full py-1 px-2 text-[11px] text-white absolute bottom-3 left-3 ">
            {"Muhd Hanish"}
          </div>
          <div className=" w-[270px] h-[170px] rounded-md overflow-hidden border absolute bottom-3 right-3 text-white ">
            <div className="max-w-full max-h-full rounded-md">
              <video
                ref={myVideo}
                autoPlay
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="bg-primary  bg-opacity-70 flex w-fit h-fit rounded-full py-1 px-2 text-[11px] absolute bottom-3 left-3 ">
              {"You"}
            </div>
            {muteMic && (
              <div
                className={` w-fit h-fit  items-center p-1 absolute bottom-3 left-14 bg-danger_color rounded-full`}
              >
                <BiMicrophoneOff fontSize={"16"} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-fit">
        <div className="w-full h-[70px] flex text-white px-5">
          <div className="flex w-full h-full justify-center items-center gap-x-5">
            <button
              className={`flex items-center p-2.5  ${
                !muteMic ? "bg-primary" : "bg-danger_color"
              } rounded-full`}
              onClick={() => setMuteMic(!muteMic)}
            >
              {!muteMic ? (
                <BiMicrophone fontSize={"21"} />
              ) : (
                <BiMicrophoneOff fontSize={"21"} />
              )}
            </button>
            <button
              className={`flex items-center p-2.5  ${
                !muteCamera ? "bg-primary" : "bg-danger_color"
              } rounded-full`}
              onClick={() => setMuteCamera(!muteCamera)}
            >
              {!muteCamera ? (
                <BiVideo fontSize={"21"} />
              ) : (
                <BiVideoOff fontSize={"21"} />
              )}
            </button>
            <button
              className={`flex items-center p-2.5 bg-primary ${
                shareScreen && "bg-opacity-70"
              } rounded-full`}
              onClick={() => setShareScreen(!shareScreen)}
            >
              <MdOutlineScreenShare fontSize={"21"} />
            </button>
          </div>
          <div className="flex flex-shrink-0  h-full justify-center items-center">
            <button className="bg-danger_color  bg-red-500 text-white px-4 py-3 text-[12px] rounded-full">
              End Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
