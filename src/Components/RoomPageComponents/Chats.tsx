import { isEqual } from 'lodash';
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { SocketContext } from '../../Context/SocketContext';



const formatTimestamp = (timestamp:any) => {
  const date = timestamp;
  const options = {
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleTimeString("en-US", options);
};


const Chats = () => {
    const [expandedMessages, setExpandedMessages] = useState<any>([]);
    const { 
      user,chats,setChats
       } = useContext(SocketContext)
     
  return (
    <>
      {chats?.map((message:{from:string,content:string,id:string,createdAt: Date}, idx:number) => {
       const isUserSender = message?.from === user ? true : false;

        const isExpanded = expandedMessages?.includes(idx);
        const toggleExpand = () => {
          if (isExpanded) {
            setExpandedMessages(expandedMessages.filter((i:any) => i !== idx));
          } else {
            setExpandedMessages([...expandedMessages, idx]);
          }
        };

        return (
          <div
            className={`flex w-full justify-${!isUserSender ? "start" : "end"}`}
            key={idx}
          >
            <div
              className={`flex max-w-sm h-fit flex-col
             ${
               isUserSender
                 ? "justify-start items-start rounded-bl-none"
                 : "justify-end items-end rounded-br-none"
             }
             p-1 px-4 border rounded-xl shadow-sm text-[14px]  bg-teal-50`}
            >
              <div className="flex w-fit h-fit">
                <div
                  style={{
                    wordWrap: "break-word",
                    whiteSpace: "pre-wrap",
                    maxHeight: isExpanded ? "none" : "100px",
                    overflow: isExpanded ? "auto" : "hidden",
                  }}
                >
                  {message?.content}
                </div>
              </div>
              {message?.content?.length > 50 && (
                <div
                  className="cursor-pointer text-primary text-[11px] mt-2"
                  onClick={toggleExpand}
                >
                  {isExpanded ? " " : "Read more"}
                </div>
              )}
              <div className="flex w-fit h-full text-[10px] text-gray-400">
               
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Chats