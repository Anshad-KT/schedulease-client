import { add } from "date-fns";
import React, { createContext, useMemo, useContext, useRef, useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
interface SocketProviderProps {
  children: React.ReactNode;
}



//const ENDPOINT = process.env.REACT_APP_BASE_URL as string
const ENDPOINT = 'http://scheduleease.com'

export const SocketContext = createContext<any>(null);

export const useSocket = () => {
  const socket = io(ENDPOINT)


  return socket;
};

export const SocketProvider = (props: SocketProviderProps) => {
  const [newUser, setNewUser] = useState<any>([])
  const socket = useMemo(() => io(ENDPOINT), []);
  const navigate = useNavigate()
  console.log("hissl", socket);
  const [displayChat, setDisplayChat] = useState<any>([]);

  const [streams, setStreams] = useState<any>([])
  const [selected, setSelected] = useState<any>([])
  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideoSrc = useRef<HTMLVideoElement | null>(null);
  const userVideoSrc2 = useRef<HTMLVideoElement | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  const remoteStream = useRef<MediaStream | null | any>({});
  const peerConnection = useRef<RTCPeerConnection | null | any>({});
  const videoRef = useRef(null);
  const [slash, setSlash] = useState({ audio: false, video: false });
  const [callEnd, setCallEnd] = useState(false);
  const roomIds = useParams()
  console.log(roomIds);

  const roomId = roomIds.roomId as string
  const value = roomIds.username
  const Servers = useMemo(() => {
    return {
      iceServers: [
        {
          urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
      ],
    };
  }, []);


  ////////////////////////////////////////////////////CREATE PEER CONNECTION//////////////////////////////////////////

  const createPeerConnection = useCallback(async (user_id: string) => {
    peerConnection.current[user_id] = new RTCPeerConnection(Servers);

    remoteStream.current[user_id] = new MediaStream();

    // if (userVideoSrc.current && remoteStream.current) {
    //   userVideoSrc.current.srcObject = remoteStream.current;
    // }
    if (userVideoSrc.current && remoteStream.current[user_id] && userVideoSrc2.current) {
      if (userVideoSrc.current.srcObject) {
        console.log("doneee", remoteStream.current[user_id], remoteStream.current, peerConnection.current);

        userVideoSrc2.current.srcObject = remoteStream.current[user_id]
      } else {
        console.log("doneee", remoteStream.current[user_id], remoteStream.current, peerConnection.current);

        userVideoSrc.current.srcObject = remoteStream.current[user_id]
      }

    }

    if (localStream.current && peerConnection.current[user_id]) {
      console.log("track checking", localStream.current);

      localStream.current.getTracks().forEach(async (track) => {
        const sender = peerConnection.current[user_id]!.addTrack(track, localStream.current!);
        if (sender) {
          console.log("Track added to sender: ${sender.track.kind");
        } else {
          console.error("Failed to add track to sender");
        }
      });
    }
    ;

    if (peerConnection.current[user_id]) {
      peerConnection.current[user_id].ontrack = async (event: any) => {
        if (remoteStream.current[user_id]) {
          event.streams[0].getTracks().forEach(async (track: any) => {
            await remoteStream.current![user_id].addTrack(track, remoteStream.current[user_id]);

          });


          setStreams((prev: any) => ({
            ...prev,
            [user_id]: remoteStream.current[user_id],
          }))

          // if (userVideoSrc.current && remoteStream.current) {
          //   userVideoSrc.current.srcObject = remoteStream.current;
          // }
          ///////////check here//////////


        }
      };
    }


    if (peerConnection.current[user_id]) {
      peerConnection.current[user_id].onicecandidate = async (event: any) => {
        if (event.candidate && socket) {
          socket.emit('sendMessageToPeer', {
            type: 'candidate',
            candidate: event.candidate,
            roomId,
            user_id: value,
            remoteUser_id: user_id
          });
        }
      };
    }
  }, [Servers, roomId, socket, value]);


  ////////////////////////////////////////////////////CREATE OFFER//////////////////////////////////////////

  const createOffer = useCallback(async (user_id: string) => {
    if (!peerConnection.current[user_id]) {
      await createPeerConnection(user_id);
    }

    if (peerConnection.current[user_id]) {
      try {
        const offer = await peerConnection.current[user_id].createOffer();
        await peerConnection.current[user_id].setLocalDescription(offer);
        socket?.emit("sendMessageToPeer", { type: "offer", offer, roomId, user_id: value, remoteUser_id: user_id });
      } catch (error) {
        console.error('Error creating offer:', error);
      }
    }
  }, [createPeerConnection, roomId, socket, value]);


  ////////////////////////////////////////////////////HANDLE USER JOINED//////////////////////////////////////////

  const handleUserJoined = useCallback(async (user_id: string) => {
    await createOffer(user_id);
  }, [createOffer]);



  ////////////////////////////////////////////////////GET VIDEO STREAM//////////////////////////////////////////


  useEffect(() => {
    const userVideo = async () => {



      try {
        localStream.current = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

        if (myVideo.current && localStream.current) {
          myVideo.current.srcObject = localStream.current;
        }










        await socket?.emit("join-video-chat", { roomId, user_id: value });


      } catch (error) {
        console.error('Error accessing user media:', error);
      }
    };

    userVideo();
  }, [value, roomId, socket]);


  ////////////////////////////////////////////////////CREATE ANSWER//////////////////////////////////////////

  const createAnswer = useCallback(async (user_id: string, offer: RTCSessionDescriptionInit) => {


    if (!peerConnection.current[user_id]) {
      await createPeerConnection(user_id);
    }

    if (peerConnection.current) {
      try {
        await peerConnection.current[user_id].setRemoteDescription(offer);
        const answer = await peerConnection.current[user_id].createAnswer();
        await peerConnection.current[user_id].setLocalDescription(answer);
        socket?.emit("sendMessageToPeer", { type: "answer", answer, roomId, user_id: value, remoteUser_id: user_id });
      } catch (error) {
        console.error('Error creating answer:', error);
      }
    }
  }, [createPeerConnection, roomId, socket, value]);

  ////////////////////////////////////////////////////ADD ANSWER//////////////////////////////////////////

  const addAnswer = async (answer: RTCSessionDescriptionInit, user_id: string) => {
    if (peerConnection.current[user_id] && !peerConnection.current[user_id].currentRemoteDescription) {
      try {
        await peerConnection.current[user_id].setRemoteDescription(answer);
      } catch (error) {
        console.error('Error setting remote description:', error);
      }
    }

    if (userVideoSrc.current && remoteStream.current[user_id] && userVideoSrc2.current) {
      if (userVideoSrc.current.srcObject) {


        userVideoSrc2.current.srcObject = remoteStream.current[user_id]
      } else {


        userVideoSrc.current.srcObject = remoteStream.current[user_id]
      }


    }
  };

  ////////////////////////////////////////////////////SOCKET EVENT LISTENERS//////////////////////////////////////////

  useEffect(() => {
    const handleCallEnd = (userData: any) => {
      const { remoteUser_id } = userData;
      peerConnection.current[remoteUser_id] = null;

      // Stop remote stream tracks if they exist
      if (remoteStream.current[remoteUser_id]) {
        remoteStream.current[remoteUser_id].getTracks().forEach((track: MediaStreamTrack) => track.stop());
      }
      remoteStream.current[remoteUser_id] = null;
      console.log('${remoteUser_id} logged out');
    };

    const handleNewUser = async (user_id: string) => {


      await handleUserJoined(user_id);
    };

    const handleReceivedPeerToPeer = async (data: any) => {
      console.log("remoteUser_id ", data.remoteUser_id, " value ", value);

      if (data.remoteUser_id == value) {
        if (data.type === "offer") {
          console.log("offered");
          await createAnswer(data.user_id, data.offer);
        }
        if (data.type === "answer") {
          console.log("answered");
          await addAnswer(data.answer, data.user_id);
        }
        if (data.type === "candidate") {
          if (peerConnection.current[data.user_id]) {
            console.log("ince candiadding");
            await peerConnection.current[data.user_id].addIceCandidate(data.candidate, data.user_id);
          }
        }
      }
    };
    const handleRequest = async (data: any) => {
      console.log("dATA.host", data.host, value);

      if (data.host === value) {
        setNewUser((prevUsers: any) => [...prevUsers, data]);
      }
    };



    // Attach socket event listeners
    socket?.on("call-end", handleCallEnd);
    socket?.on("newUser", handleNewUser);
    socket?.on("receivedPeerToPeer", handleReceivedPeerToPeer);
    socket?.on("requestuser", handleRequest)
    // Clean up event listeners when the component unmounts
    return () => {
      socket?.off("call-end", handleCallEnd);
      socket?.off("newUser", handleNewUser);
      socket?.off("receivedPeerToPeer", handleReceivedPeerToPeer);
      socket?.off("requestuser", handleRequest)
    };
  }, [createAnswer, handleUserJoined, socket, value]);

  ////////////////////////////////////////////////////SELECTED STREAM LOGIC//////////////////////////////////////////
  // useEffect(() => {
  //     const updateVideoRef = (selectedStream: any) => {
  //       if (selectedStream && videoRef.current) {
  //         // Assign the video element to the ref
  //         videoRef.current.srcObject = selectedStream; // Use srcObject to set the stream
  //       }
  //     };

  //     // Update the video ref when selectedStream changes
  //     updateVideoRef(remoteStream.current[selected]);
  //   }, [remoteStream, selected, setSelected]);
  //////////////////////////////////////////////////////CAMERA LOGIC//////////////////////////////////////////
  const toggleCamera = useCallback(() => {
    const videoTrack = localStream.current?.getVideoTracks()[0];
    console.log(localStream.current?.getVideoTracks()[0]);

    if (videoTrack?.enabled) {
      videoTrack.enabled = false;

      setSlash((prevSlash) => ({ ...prevSlash, video: true }));
    } else {
      if (videoTrack) {
        videoTrack.enabled = true;
        setSlash((prevSlash) => ({ ...prevSlash, video: false }));
      }
    }
  }, [localStream, setSlash]);
  ////////////////////////////////////////////////////MIC LOGIC//////////////////////////////////////////

  const toggleMic = useCallback(() => {
    const audioTrack = localStream.current?.getAudioTracks()[0];
    console.log("audiotrack", audioTrack);

    if (audioTrack?.enabled) {
      audioTrack.enabled = false;
      setSlash((prevSlash) => ({ ...prevSlash, audio: true }));
    } else {
      if (audioTrack) {
        audioTrack.enabled = true;
        setSlash((prevSlash) => ({ ...prevSlash, audio: false }));
      }
    }
  }, [localStream, setSlash]);


  ////////////////////////////////////////////////////END CALL AND GO TO PAGE//////////////////////////////////////////

  const endCall = useCallback(async () => {
    if (localStream.current) {
      localStream.current.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      if (remoteStream.current) {
        Object.entries(remoteStream.current).map(([streamKey, streamValue], index) => {
          if (remoteStream.current[streamKey]) {
            remoteStream.current[streamKey].getTracks().forEach((track: MediaStreamTrack) => track.stop());
          }

        });
      }
      socket?.emit("call-end", { remoteUser_id: value, roomId });
      navigate('/end')
      // router?.push(/thread/${returnValue.value[0].id});
    }
  }, [socket, value, roomId, navigate]);


  ////////////////////////////////////////////////////CREATE ANSWER//////////////////////////////////////////
  useEffect(() => {
    socket.on("message received", (newMessageRecieved) => {

      console.log("message recieved", newMessageRecieved);
      console.log(displayChat);

      const lastMessage = displayChat[displayChat.length - 1];
      console.log(lastMessage);

      if (!lastMessage || lastMessage.content !== newMessageRecieved.content) {
        setDisplayChat((prevChat: any) => [...prevChat, newMessageRecieved]);
      }

    })

    return () => {
      socket.off("message received", (newMessageRecieved) => {

        console.log("message recieved", newMessageRecieved);
        const lastMessage = displayChat[displayChat.length - 1];
        console.log(lastMessage);

        if (!lastMessage || lastMessage?.content !== newMessageRecieved.content) {
          setDisplayChat((prevChat: any) => [...prevChat, newMessageRecieved]);
        }

      });
    };
  }, [displayChat, socket])
  const handleKeyDown = useCallback(async (e: any, message: any) => {
    e.preventDefault()
    if (message) {
      try {
        const msgData = { from: value, fileType: "text", content: message, createdAt: new Date() }
        console.log(msgData)

        // setMessage('')


        // if (chatContainerRef.current) {
        //     chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        // }


        setTimeout(() => {
          socket.emit("new message", { ...msgData, id: roomId })
        }, 500)
      } catch (error) {
        console.log(error);
      }
    }
  }, [value, socket, roomId]);

  const data = useMemo(
    () => ({
      socket,
      localStream,
      "videoConnections": peerConnection,
      remoteStream,
      toggleMic,
      toggleCamera,
      endCall,
      myVideo,
      selected,
      setSelected,
      handleKeyDown,
      user: value,
      chats: displayChat,
      setChats: setDisplayChat,
      newUser,
      roomId
    }),
    [socket, toggleMic, toggleCamera, endCall, selected, handleKeyDown, value, displayChat, newUser, roomId]
  );

  return (
    <SocketContext.Provider value={data}>
      {props.children}
    </SocketContext.Provider>
  );
};