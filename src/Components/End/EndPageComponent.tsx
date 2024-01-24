

const EndPageMainSection = () => {

    
  return (
    
    <div className="flex w-screen h-screen  ">
      <div className="flex w-full h-full flex-col items-center justify-center gap-y-8">
        <div className="flex text-4xl font-medium px-10">
          Easy Scheduling for the buissness needs
        </div>
        <div className="flex text-[14px] font-medium px-10 text-gray-500">
          Schedule is your go to app to automate your appointments, built with simplicity and efficiency.
        </div>
        {/* <div className="flex gap-x-3 w-fit h-fit mt-2 px-2 sm:px-0">
          Interview for MERN stack developement
        </div> */}
      </div>
      <div className="h-full w-0.5 py-10 hidden md:flex">
        <div className="h-full w-full bg-gray-300"></div>
      </div>
      
    </div>
  );
}

export default EndPageMainSection