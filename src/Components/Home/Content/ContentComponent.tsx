import React, { useCallback, useEffect, useState } from 'react'
import SideBarComponent from '../Sidebar/SideBarComponent'
import CardComponent from '../Card/CardComponent'
import { getAllMeetingGuest, getAllMeetingHost } from '../../../Services/meetings/meetingsApi'
import { data } from 'autoprefixer'
import { updateUser } from '../../../Redux/user/userSlice'



const ContentComponent = () => {

  const [meetings,setMeetings] = useState([])
  const handleSignIn = useCallback(async () => {
    console.log("why this kolavery");
    
    const guestResponse:[] = await getAllMeetingGuest()
    const hostResponse:[] = await getAllMeetingHost()
    console.log(guestResponse,hostResponse);
    
    setMeetings([...guestResponse,...hostResponse])
  
 },[])
  useEffect(()=> {
    
    handleSignIn()
    
  },[handleSignIn])

  const [showSidebar, setShowSidebar] = useState(false);
  const handleButtonClick = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
     <div className='w-full h-1/6  flex justify-around items-center shadow-lg font-default'>
       <div >
         <img width={250}  src="/logo/logo.png" alt="logo"  />
       </div>
      <button className='lg:hidden' onClick={handleButtonClick}>
          Toggle
       </button> 
    </div>
    <div className='lg:grid lg:grid-cols-12 font-default'>
      
    {showSidebar ? (
      ""
      ) : (
        <SideBarComponent />
      )}
     <div className='lg:w-full lg:h-full  lg:col-span-10 bg-secondary flex-col justify-center items-center mr-10'>
         <div className='w-full h-1/6 lg:text-4xl text-2xl flex justify-items-start lg:items-end'>
        
        <h1 className='ml-20 mt-5 mb-4'>
                Scheduled Events
            </h1>
         
         </div>
         <div className='lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 lg:gap-4 ml-12 lg:ml-0'>
   "{meetings.map((item:any,index)=>{
    return(
      <CardComponent  data={item} />
      
     )
  })
   }
   
 

</div>

     </div>
    </div>
   
    </>
  )
}

export default ContentComponent