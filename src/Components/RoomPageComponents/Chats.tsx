import { isEqual } from 'lodash';
import React, { useState } from 'react'

const dummyMessages = [
  {
    content: "Hello there!",
    sender: { id: 1, username: "JohnDoe" },
    createdAt: new Date(),
  },
  {
    content: "Hi! How are you?",
    sender: { id: 2, username: "JaneSmith" },
    createdAt: new Date(),
  },
  {
    content: "I'm doing well, thank you!",
    sender: { id: 1, username: "JohnDoe" },
    createdAt: new Date(),
  },
  {
    content: "That's great to hear!",
    sender: { id: 2, username: "JaneSmith" },
    createdAt: new Date(),
  },
  {
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscingasdf asdfasdfsd asdfasdfasdf asdfasdfasdfasdf as asdfasdfasdfelit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    sender: { id: 1, username: "JohnDoe" },
    createdAt: new Date(),
  },
  {
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    sender: { id: 2, username: "JaneSmith" },
    createdAt: new Date(),
  },
];

const user = { id: 2, username: "JaneSmith" };

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
  return (
    <>
      {dummyMessages?.map((message, idx) => {
        const isUserSender = isEqual(message?.sender, user);
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
            className={`flex w-full justify-${isUserSender ? "start" : "end"}`}
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
                {formatTimestamp(message?.createdAt)}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Chats