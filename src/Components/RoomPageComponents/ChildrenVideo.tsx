import { useRef, useEffect } from "react";

const ChildrenVideo = ({ onClick, userVideoSrc}: any) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
  
    useEffect(() => {
      const handleVideoRef = () => {
        if (videoRef.current && userVideoSrc instanceof MediaStream) {
          videoRef.current.srcObject = userVideoSrc;
        }
      };
      handleVideoRef();
    }, [userVideoSrc]);
  
  
    return (
      <div onClick={onClick} className='ml-5 w-5/6 h-1/4 bg-violet-400 my-5'>
        <video className='shadow-3xl rounded-3xl' ref={videoRef} autoPlay playsInline muted width="324" height="200" />
      </div>
    );
  };
  
  export default ChildrenVideo;