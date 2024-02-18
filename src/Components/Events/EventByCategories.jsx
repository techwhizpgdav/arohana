import React from 'react'
import { useEffect , useState } from 'react';
import EventsCards from './CategoryCards'
import { useNavigate, useParams,Link } from 'react-router-dom';
import Api from '../../Functions/api';
import EventCards from './EventByCatCards';
import Spinner2 from '../ShimmerAndSpinner/Spinner2';

// * event according to categories

const EventByCategories = () => {
  const [events, setEvents] = useState([]);
  const { id , name} = useParams();
  const { fetchApi } = Api();
  useEffect(() => {
    const result = fetchApi('GET', `api/category-competitions/${id}` , 'events');
    result.then(response => {
      if (response?.status === 200) {
        setEvents(response?.data?.data );
      }
    });
  }
  , []);

 if(events.length === 0){
  return (
      <div className=' w-screen h-screen flex justify-center items-center'>
            <Spinner2 />
      </div>
  );
  }

  return (
      <>
      <div className=' w-screen min-h-screen eventCategories mb-20'
      >
      <h1 className="text-4xl font-bold mb-5 text-center" data-aos="fade-up"
      > {name}</h1>
      <div className='flex flex-wrap gap-40 justify-between p-20 m-auto mdmax:p-5 mdmax:justify-center' >
        {
          events.map((category)=>{
            return <EventCards eventname={category} key={category.id} />
          })
        }
     </div>
      </div>
      
      </>
  )
}

export default EventByCategories