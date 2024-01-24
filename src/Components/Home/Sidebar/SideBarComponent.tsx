import React, { useCallback } from 'react'
import { SlCalender } from "react-icons/sl";
import { FcAbout } from "react-icons/fc";
import { signInWithGoogle } from '../../../Firebase/FireBase';
import { updateUser } from '../../../Redux/user/userSlice';
import { userSignup } from '../../../Services/user/userLogin';
import { Link } from 'react-router-dom';

const SideBarComponent = () => {
   
  return (
    <div className='lg:w-full lg:h-full col-span-2 mb-10'>
        <div className='lg:h-screen bg-white flex-row'>
            <div className='flex-row justify-center items-center'>
            {/* <div>
                <img width={250}  src="/logo/logo.png" alt="logo"  />
            </div> */}
            <div className='w-100 flex justify-center items-center mt-5 '>
                    <button className='bg-primary h-12 w-48 rounded-3xl text-white'><Link to='/create'>Create</Link></button>
            </div>
        
            </div>
            <div className='w-100 flex-row lg:mt-20 mt-5'>
            <div className='flex justify-center items-center'>
            <div className='w-10/12 h-11 flex justify-center items-center shadow-md mt-5 cursor-pointer'>
               <section className='mr-3'>
                  <SlCalender />
               </section>
               <section>Scheduled events</section>
            </div>
                
                
            </div>
               
                
               <div className='flex justify-center items-center'>
               <div className='w-10/12 h-11 flex justify-center items-center shadow-md mt-5 cursor-pointer'>
                    <section className='mr-3'><FcAbout /></section>
<section>About Us</section>
                </div>
               </div>
            </div>
        </div>
        
     </div>
  )
}

export default SideBarComponent