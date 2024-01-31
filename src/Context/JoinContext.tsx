import { add } from "date-fns";
import React, { createContext, useMemo, useContext, useRef, useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
interface SocketProviderProps {
    children: React.ReactNode;
  }

const ENDPOINT=process.env.REACT_APP_BASE_URL ? "https://server.schedulease.cloud" :'http://scheduleease.com';

export const JoinContext = createContext<any>(null);

export const JoinProvider = (props:SocketProviderProps) => {
  const [newUser, setNewUser] = useState<any>([])
  const socket = useMemo(() => io(ENDPOINT), []);
  const roomIds = useParams()
  console.log(roomIds);
  const roomId = roomIds.roomId as string
  const value = roomIds.username
      useEffect(()=>{
        const handleRequest = async (data:any) => {
          console.log("dATA.host",data.host,value);
          
          if (data.host === value) {
            setNewUser((prevUsers:any) => [...prevUsers, data]);
          }
        };
        socket?.on("requestuser",handleRequest)

        return () => {
   
          socket?.off("requestuser",handleRequest)
        };
      }, [socket, value]);

    const data = useMemo(
        () => ({
            socket,

            user:value,
            newUser,
            roomId
        }),
        [socket, value, newUser, roomId]
    );
  
  return (
    <JoinContext.Provider value={data}>
      {props.children}
    </JoinContext.Provider>
  );
};