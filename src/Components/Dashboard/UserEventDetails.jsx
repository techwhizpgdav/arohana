import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Api from '../../Functions/api';
import { useEffect, useState } from 'react';
import Spinner2 from '../ShimmerAndSpinner/Spinner2';

const UserEventDetails = ({user}) => {
  const navigate = useNavigate();
  const { authUser, fetchApi } = Api();
  const [step , setStep] = useState(1);
  const [participatedEvents, setParticipatedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  if (user?.length === 0) {
    return < Spinner2 />; 
  }
// * Uncomment this code after working on this section 


 useEffect(() => {
  if(user?.email_verified_at == null){
    setStep(2);
  } 
  else if(user?.email_verified_at != null ){
    setIsLoading(true);
    setStep(4);
      fetchApi('get', `api/participations`).then((data) => {
        setParticipatedEvents(data?.data?.data[0]?.competitions);
        console.log(data?.data?.data[0]?.competitions);
      setIsLoading(false);
    });
  }
  }
  , [user]);


if(isLoading){
  return <div className= 'absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
    <Spinner2 />
  </div>;
}

if(step ==2){
  return (
    <div className='flex flex-col items-center gap-10 justify-center'>
    <p>
      Please verify your email to continue
    </p>
    <Link to = {'/verify'} className=' bg-black p-2 rounded-lg text-white hover:bg-teal-600 transition-all duration-500 '>Verify Email</Link>
  </div>
  )
}

if(step ==3){
  return (
    <div className='flex flex-col items-center justify-center pt-20'>
    <p>
      Your email has been verified, please wait for the admin to verify your account and Sponshirship tasks.
    </p>
  </div>
  )
}


if(participatedEvents?.length == 0){
  return (
    <div className='flex flex-col items-center justify-center pt-20'>
    <p>
      You have not participated in any event yet.
    </p>
    <Link className= 'bg-black p-2 rounded-lg text-white hover:bg-teal-600 transition-all duration-500' to = {'/events'}
    >
        Participate Now 
    </Link>
  </div>
  )
}

if(isLoading){
  return <div className= 'absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
    <Spinner2 />
  </div>;

}


return (
  <div className="container mx-auto py-10 px-4 md:px-0">
  {participatedEvents.length > 0 && (
    <>
      <h1 className="text-center text-xl font-bold pt-10 ">Here are the details of the events you have participated in:</h1>

      <div className="grid gap-20 w-screen mdmax:w-full mt-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {participatedEvents.map((event, index) => (
          <div key={index} className="border p-8 rounded-lg flex-col justify-between items-center flex bg-slate-300  w-full  mdmax:w-96" >
            <div className=' flex mb-5 gap-5 w-full justify-between'>
              <h2 className="text-xl font-bold ">{index + 1}</h2>
              <h1 className="text-lg font-semibold max-w-60">{event?.title}</h1>
            </div>

            <div className='flex flex-col justify-center gap-10 '>
              <p className="text-gray-700">
                Approval: {event?.pivot?.allowed ? 'Allowed' : 'Pending'}
              </p>
              <p className="text-gray-700">
                {event?.pivot?.team_name !=null ? `Team Size: ${event?.pivot?.team_size}` : 'Solo'}
              </p>
              <button>
                <Link to={`/competition/${event?.id}`}  className="bg-haldi p-2 rounded-lg text-white  transition-all duration-500">
                  View Details
                </Link>
              </button>
            </div>

          </div>
        ))}
      </div>
    </>
  )}
</div>
);
}

export default UserEventDetails