import { useEffect, useMemo } from 'react'
import { CiVideoOn } from "react-icons/ci";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calender.css'
import { FaRegClock } from "react-icons/fa";
import { Params, useNavigate, useParams } from 'react-router-dom';
import { getMeetingGuestById, updateMeeting } from '../../Services/meetings/meetingsApi';

type ValuePiece = Date | null | any;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const ContentComponent = () => {
  const { id, userId }:Readonly<Params<any>>= useParams()
  const [details, setDetails] = useState<any>({})
  const [date1, setDate] = useState<any>()
  useEffect(() => {
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



  const tileDisabled = useMemo(() => ({ date }: any) => {

    return date1 && date1.formattedDate && date1.formattedDate2 &&
      (date < new Date(date1.formattedDate) || date > new Date(date1.formattedDate2));
  }, [date1]);

  const navigate = useNavigate()
  const [value, onChange] = useState<Value>(date1?.formattedDate ? new Date(date1.formattedDate) : null);

  const [showModal, setShowModal] = useState(false);





  const [selectedTimes, setSelectedTimes] = useState<any>(details?.timeOptions?.[0] || '');



  const submitData = async () => {
    
    const data = { dateOptions: value, timeOptions: selectedTimes, id, userId }
    await updateMeeting({ dateOptions: value, timeOptions: selectedTimes, id, userId })
    navigate('/end')
  }
  const handleTimeClick = (time: string) => {
    
    console.log(time);

    if (selectedTimes === time) {
     
  


    } else {
     
    
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
          
        </div>
      </div>

    </>
  )
}

export default ContentComponent