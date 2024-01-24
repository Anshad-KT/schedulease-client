import React, { useEffect, useMemo } from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { CiVideoOn } from "react-icons/ci";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calender.css'
import { FaRegClock } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FcAbout } from "react-icons/fc";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addMeeting, getMeetingGuestById, updateMeeting } from '../../Services/meetings/meetingsApi';

type ValuePiece = Date | null | any;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const ContentComponent = () => {
  const { id, userId } = useParams()
  const [details, setDetails] = useState<any>({})
  const [date1, setDate] = useState<any>()
  useEffect(() => {
    console.log("looo");

    getMeetingGuestById(id as string)
      .then((res) => {
        setDetails(res)
        const { formattedDate, formattedDate2 } = convertToDateObjects(res.dateOptions);
        setDate({ formattedDate, formattedDate2 })
      })
  }, [id])


  const convertToDateObjects = (dateOptions: any): { formattedDate: string, formattedDate2: string } => {
    console.log(dateOptions);

    const [startDate, endDate] = dateOptions;

    const firstDay = new Date(startDate)
    const secondDay = new Date(endDate)
    const options: any = {
      weekday: 'short' as const,
      month: 'short' as const,
      day: 'numeric',
      year: 'numeric' as const,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    };

    const formattedDate = firstDay.toLocaleString('en-US', options);
    const formattedDate2 = secondDay.toLocaleString('en-US', options);
    console.log(formattedDate);

    return { formattedDate, formattedDate2 };
  };







  // const yourFirstDate = new Date(new Date().getFullYear(), 0, 4);
  // const yourSecondDate = new Date(new Date().getFullYear(), 0, 8);


  const tileDisabled = useMemo(() => ({ date }: any) => {



    // Ensure date1 and date1.formattedDate2 are defined before comparing
    return date1 && date1.formattedDate && date1.formattedDate2 &&
      (date < new Date(date1.formattedDate) || date > new Date(date1.formattedDate2));
  }, [date1]);

  const navigate = useNavigate()
  const [value, onChange] = useState<Value>(date1?.formattedDate ? new Date(date1.formattedDate) : null);

  const [showModal, setShowModal] = useState(false);





  const [selectedTimes, setSelectedTimes] = useState<string>(details?.timeOptions?.[0] || '');


  console.log(selectedTimes);
  //title,host,dateOptions,duration,guests, isCompleted,timeOptions
  const submitData = async () => {
    
    const data = { dateOptions: value, timeOptions: selectedTimes, id, userId }
    await updateMeeting({ dateOptions: value, timeOptions: selectedTimes, id, userId })
    navigate('/end')
  }
  const handleTimeClick = (time: string) => {
    // Check if the time is already selected
    console.log(time);

    if (selectedTimes === time) {
      // If selected, remove it
      console.log("includes");


    } else {
      // If not selected, add it
      console.log("not includes");
      setSelectedTimes(time);
    }
  };





  return (
    <>
      <div className='grid grid-cols-12 font-default h-screen'>

        <div className='lg:w-full lg:h-full shadow-2xl col-span-12 bg-secondary'>
          <div className='w-full h-1/6 text-4xl flex justify-items-start items-end'>
            <h1 className='ml-20'>Create New Event</h1>
            {value && selectedTimes ? <button onClick={submitData} className='ml-auto mr-20 bg-primary hover:secondary text-white py-2 px-4 rounded'>
    Submit
  </button> : ""}
          </div>


          <div className='w-full flex justify-center items-center h-5/6  mt-4'>
            <div className='w-3/4 h-5/6  shadow-2xl bg-white relative flex rounded-2xl'>
              <div className='w-1/4 h-full flex-row items-center justify-center shadow-2xl'>
                <div className='flex justify-center items-center w-full h-10  flex-row mt-12 font-semibold'>
                  <div>
                    <h1>Anshad Kt</h1>
                  </div>


                </div>

                <div className='flex justify-center items-center w-full h-10  flex-row font-semibold'>

                  <div>
                    <h1>{details?.title}</h1>
                  </div>
                </div>
                <div className='flex justify-center items-center w-full mt-5 flex-row font-light'>
                  <div className='w-1/4 flex justify-center items-center '>
                    <CiVideoOn />
                  </div>
                  <div className='w-3/4'>
                    : Web conferencing details provided upon confirmation
                  </div>
                </div>
                <div className='flex justify-center items-center w-full mt-5  flex-row font-light'>
                  <div className='w-1/4 flex justify-center items-center '>
                    <FaRegClock />
                  </div>
                  <div className='w-3/4'>
                    : {details?.duration}
                  </div>
                </div>





                <div>

                </div>
              </div>
              <div className='w-2/4 h-full flex flex-col items-center justify-center'>
                <div className='mb-10 '>
                  <h1>Select date and time</h1>
                </div>
                {date1 && <Calendar
                  className='mb-20 rounded-2xl'

                  onChange={onChange}
                  value={value}
                  tileDisabled={tileDisabled}
                />}
              </div>

              <div className='w-1/4 h-full flex-row overflow-y-auto '>
                <div className='h-10 w-full  text-center mt-12 font-semibold'>
                  <h1>
                    {value ? value.toString() : "no date"}
                  </h1>
                </div>

                <div className='flex flex-col items-center justify-start overflow-y-auto h-full w-full text-center'>
                  {details?.timeOptions?.map((item: string, index: number) => {
                    return (
                      <div key={index} className={`h-10 mb-4 w-3/4 rounded-lg ${index === 0 ? 'mt-8' : ""}`}>
                        <button
                          className={`w-full h-full  rounded-lg ${selectedTimes === item ? 'bg-green-500' : 'bg-primary'
                            }`}
                          onClick={() => handleTimeClick(item)}
                        >
                          <h1 className='text-white'>{item}</h1>
                        </button>
                      </div>
                    )
                  })}


                </div>
              </div>

            </div>
          </div>
          {/* {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-3/4 my-6 mx-auto max-w-3xl">
                 
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                   
                    <div className="flex flex-col items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        {eventName}
                      </h3>
                      <div className='flex justify-center items-center mr-5'>
                        <FaRegClock />
                        : {selectedDuration}
                        <div className='ml-10'>
                          ScheduleEase Meet
                        </div>
                      </div>
                      <div className='mt-3'>
                        Add times to email
                      </div>
                    </div>
                    
                    <div className="p-5 flex justify-start items-center bg-slate-300 h-3/4">
                      <div className="flex-col justify-start items-center">
                        <section className='mr-3'>
                          <label htmlFor="exampleInput" className="mb-7 text-sm text-gray-600 font-medium">
                            add guests
                          </label>
                        </section>
                        <section className='flex mt-1'>
                          <input
                            value={newEmail}

                            onChange={(e) => setNewEmail(e.target.value)}
                            type="text"
                            id="exampleInput"
                            className="w-48 h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                            placeholder="Type here..."
                          />
                          <IoIosAddCircle className='ml-3' onClick={handleAddEmail} size={34} />
                        </section>




                      </div>

                    </div>
                    <div className="mt-4">
                      {emails.map((email) => (
                        <div key={email.email} className="border rounded p-2 mt-2 flex items-center bg">
                          <span className="mr-2">{email.email}</span>
                          <button
                            onClick={() => handleRemoveEmail(email.email)}
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button">Remove</button>

                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={submitData}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}  */}

        </div>
      </div>

    </>
  )
}

export default ContentComponent