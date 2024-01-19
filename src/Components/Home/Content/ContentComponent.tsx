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

  
  return (
    <>
    <div className='grid grid-cols-12 font-default'>
    <SideBarComponent />
     <div className='lg:w-full lg:h-full  col-span-10 bg-secondary'>
         <div className='w-full h-1/6   text-4xl flex justify-items-start  items-end'>
        
          <h1 className='ml-20'>
                Scheduled Events
            </h1>
         
         </div>
         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 ml-12'>
   {meetings.map((item,index)=>{
    return(
      <CardComponent key={index} data={item} />
    )
   })}
 

</div>

     </div>
    </div>
   
    </>
  )
}

export default ContentComponent