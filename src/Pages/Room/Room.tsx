
import SideChat from '../../Components/RoomPageComponents/SideChat'
import VideoCall from '../../Components/RoomPageComponents/VideoCall'
import { SocketProvider } from '../../Context/SocketContext'
const Room = () => {


  return (
    <SocketProvider>
    <div className="w-full h-full px-2 py-2 sm:px-5 mt-10">
      <div className="w-full h-full grid grid-cols-1 gap-x-2 lg:grid-cols-4 ">
        <div className="w-full h-full col-span-1 lg:col-span-3 overflow-hidden">
          <VideoCall   />
        </div>
        <div className="hidden lg:flex col-span-1 w-full h-full flex-col rounded-md overflow-hidden">
          <SideChat />
        </div>
      </div>
      <div className="flex lg:hidden w-full h-full flex-col mt-5 rounded-md overflow-hidden">
        <SideChat  />
      </div>
    </div>
    </SocketProvider>
  );
};

export default Room;
