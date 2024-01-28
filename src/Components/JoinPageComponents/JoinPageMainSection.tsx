import React, { useCallback, useContext, useEffect, useState } from 'react';

import LoadingComponent from '../Loading/LoadingComponent';
import { useNavigate, useParams } from 'react-router-dom';
import { getMeetingHostById } from '../../Services/meetings/meetingsApi';
import { JoinContext } from '../../Context/JoinContext';

const JoinPageMainSection = () => {
  const { roomId, username } = useParams()
  const [loading, setLoading] = useState(true)
  const [{ host, request, userAccess, decline }, setStatus] = useState({ host: false, request: false, userAccess: false, decline: false })
  const [result, setResult] = useState('')
  const [getMeetingData, setMeetingData] = useState<any>()
  const {
    socket
  } = useContext(JoinContext)
  const fetchData = useCallback(async () => {
    const data = await getMeetingHostById(roomId!)
    console.log(setMeetingData(data));
    console.log(data);


  }, [roomId])
  useEffect(() => {
    socket?.on('hostresponse', (data: any) => {
      if (getMeetingData?.host !== username) {
        console.log("host responswe");
        
        if (data.result === false) {
          setStatus((prevState) => ({
            ...prevState,
            decline: true,
          }));
        } else {
          setStatus((prevState) => ({
            ...prevState,
            userAccess: true,
          }));
          setLoading(false)
        }
      }
    })
    socket?.on('nohost', (data: any) => {
      console.log("sdsd",data.userId,username);
      
      if (getMeetingData?.host !== username) {
        console.log("nohost",{ host, request, userAccess, decline });
        
        setStatus((prevState) => ({
          ...prevState,
          host: false,
        }));
      }
    })
    socket?.on('hostjoined', (data: any) => {
      console.log("hoooosstt");
      
      if (getMeetingData?.host !== username) {
        console.log("host joine");
        
      setStatus((prevState) => ({
        ...prevState,
        host: true,
      }));
      setTimeout(()=>{
        socket.emit('reqhost', { roomId, userId: username })
        console.log("reqhost emitted");
        
       },3000)
    }
    })
    socket?.on('pending', (data: any) => {
      if (getMeetingData?.host !== username) {
      setStatus((prevState) => ({
        ...prevState,
        host: true,
      }));
      console.log("pending");
     setTimeout(()=>{
      socket.emit('reqhost', { roomId, userId: username })
      console.log("reqhost emitted");
      
     },3000)
    }
    })
  }, [decline, getMeetingData?.host, host, request, roomId, socket, userAccess, username])
  useEffect(() => {

    fetchData()
    if (getMeetingData?.host !== username) {
      socket?.emit('request', { userId: username, roomId, host: getMeetingData?.host })
      console.log("emitted request");
      
    }

  }, [fetchData, getMeetingData?.host, roomId, socket, username])
  const navigate = useNavigate()
  console.log(host);
  
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
        { !userAccess && !loading && userAccess && <p>Your meeting is ready</p> }
       
 { getMeetingData?.host == username ? <p>Your meeting is ready..</p>    : !userAccess && host ? <p>Requesting host to join...</p> : userAccess ? "" : <p>Host has not yet joined</p>  }
 
 { !userAccess && decline ? <p>Host declined</p> : null}
 {userAccess && <p>Your meeting is ready..</p> }
        <div>
          {getMeetingData?.host == username ? (
            <button onClick={() => navigate(`/video/${roomId}/${username}`)} className="bg-danger_color bg-primary text-white px-4 py-3 text-[12px] rounded-full">
              Join Meeting
            </button>
          ) : !userAccess ? <LoadingComponent /> : <button onClick={() => navigate(`/video/${roomId}/${username}`)} className="bg-danger_color  bg-primary text-white px-4 py-3 text-[12px] rounded-full">
            Join Meeting
          </button>}

        </div>
      </div>
    </div>
  );
}

export default JoinPageMainSection