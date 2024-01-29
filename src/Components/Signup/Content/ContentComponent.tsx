import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { signInWithGoogle } from '../../../Firebase/FireBase';
import { userLogin, userSignup } from '../../../Services/user/userLogin';
import { updateUser } from '../../../Redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const ContentComponent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [err,setErr] = useState<string>('')
  const handleSignIn = useCallback(async () => {
    const response :any = await signInWithGoogle();
    console.log(response);
console.log({email:response?.email, username:response?.displayName});

   try {
    const data = await userSignup({email:response?.email, username:response?.displayName})
    console.log(data);
    if(data.msg){
      setErr("Email already registered")
    }else{
      dispatch(updateUser(data.addedUser))
      localStorage.setItem("user",JSON.stringify(data.addedUser))
      navigate('/')
    }
  } catch (error) {
    console.log("error while fetching userSignup");
    
    console.log(error);
    
   }
  
    
    // updateUser(data)
 },[])
  return (
    <>
   <div className='w-full h-screen flex flex-col justify-center items-center font-default text-primary'>

<div className='w-full flex justify-center items-center text-3xl sm:text-4xl md:text-6xl'>
    <h1 className='mt-4 sm:mt-8 font-bold mb-10'>
        Easy Scheduling
    </h1>
</div>

<div className='w-full flex flex-col justify-center items-center text-center mt-2 sm:mt-4'>

    <div className='w-full flex justify-center'>
        <p>
            ScheduleEase your partner for Scheduling automation platform, built with simplicity and efficiency
        </p>
    </div>

    <div className='flex justify-center items-center mt-2 sm:mt-4'>
        <div onClick={handleSignIn} className='inline-flex shadow cursor-pointer p-2 md:p-3 rounded-md bg-primary text-white w-full'>
            <div className='w-8 h-8 sm:w-10 sm:h-10 bg-white flex justify-center items-center rounded-md'>
                <img className='' width={20} height={20} alt="Author's Picture" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEkUlEQVR4nO2Zb0wbZRzHn3taesUtRpOJYbo/DoQM5c/GMgryzxkYxbGBiQsbNBCEFGaIY8zCCuaUMSiQAQMGQWAgcSY2GeuNuzpc8NqNvRoCItE3841Dthj3ToNzbX+mVRBI197Zo2VJv8n3XZ+nn89dn6dPrwj5448/HgcoJIWqgGIoxywU4HuQTfwJSsIKBxBAKgJIQzbIJhZBhX+BE/g6VAUU2ccgXwc0UgWU4tvwNmGBJASCqiQsoMa3QRsQ433wOlk4qPEsvCkQ2llTEUAxnoEaFOIdeA3RCumEzWPwtT2IrHCK0K0f+HkUCMX4B9HBk9b0PTwNFJKJC9+NngcVfrDu8En/toJoFw9+EMnhOPGr1+DLCE40eIeAGn/vPXgsMvyHRIfgrbEMT0IlroUmaQpQaAtQKAjOSN6C05hy7Db21zgbW4pN4sI3kyGQQVh5g5+W9PJZfEChZ+ADydAqkVKR4R1vVIHv8IIvwPNwDr0oeP4aFAJ5+P76wJvl22CcfAQaCUCyC/gSPAV6JEEbLWAmdWAmwdHeAIB0wvmV35DweiQBs2x+WcDeURmACv8Hn0lYoAK9hDZiwCSPXwW/VI4E0En/ObuclPSjjRowybROBZY6FPAAyhGJNmrATF5xKWCSdQiZL1gzC2I0XDthO9rUd9e9gImccynAkRm+EAjWzMIbddcW+Qg8dCMQ6iuB3TW3rHwEHrkWQJt9JbCjehKeaoHtVd+C5x+hm7IwXwns1t60Pd2L+JNRHovYTI642UY7fSVwRDc8z0NAduZJ8A+5Z6Geif/jvF4RiEROy3D+puiPvrG4Eii/0DjqXoALVDiDnx0PBhWthENXs6HDGHtJbIGTnfX97u6Arq/iuHsBQBjMsntL4DYzCfRYOGQbDjvg7c2jlZaL11/bJhZ8W496Z2SNyeoK/vVas4XiKH5P88BENtrhfzdthrNMwjL4ylaPJi9wXIrHjwcpjpIeafxswd3VL2lrm+A9KXCBL98df+GvEjrdKfxSP2YTZjyRoDhKmt/SM+d2/6+egsbuylhBkzcwihlX8CvvRP/X4VuFwvfeiNhe1lX3E5/d51hz75zQ+RE9FvZKPq208pHIp5WWzq/2DlCDKXJ38w6PRW1qZ/b15RmU1pyRHDja2uH2FEp9ekrQl+dyutmY1iweAitFGljFdJdxL6VnIw5cGdsVdJkL2zJgjEq8aNxTV8ckTNpfs3JM1kgOFPZQsLXqO6cC77c3dSNPomPjpvkKeNKiwXLYWX1nFfy7TQM/Ik+j10fINHTqfW9IFH5RCJG1Jgd8ev2Xv53o6hJ0cHxiOG7HczVM4oI3JI7pc0HVemGeGq4MEgV+hYT8LBM/K2RN/J+eYxXTRmPo+v3m7jNGNecaMq2iX3lDprWXjWlG3sgwvSe0gY2beseQ5TF4ztXDjqt++caru5C3MzQWGdvM7L9VZDj4WCh4AZ3xuJGJm/icifb+n3xrowck6WeiC1uN+0a1TOLPajptUWVQWu13yH4IzDVk2tSGtMWqa8nzLex+ts8YU2Afg/zxxx/kaf4GzSVnCicBYF0AAAAASUVORK5CYII="} />
            </div>
            <p className='mt-2 ml-2 lg:ml-5'>{window.innerWidth >= 640 ? 'Signup with Google,' : 'Signup'}</p>
        </div>
    </div>
    <p className='mt-5'>Already have account ?<Link className='text-violet-800' to='/login'> Login here</Link></p>
    <div className='flex justify-center items-center mt-2 sm:mt-4'>
        {err}
    </div>

</div>

{/* for google login */}
<div className='w-full flex justify-center items-center mt-2 sm:mt-4'></div>

</div>

    </>
  )
}

export default ContentComponent