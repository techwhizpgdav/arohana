import React , {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
const EventByCatCards = ( {eventname } ) => {
     const { title , id , image_url , tag_line } = eventname;
     const [hover, setHover] = useState(false);
     useEffect(() => {
          Aos.init({duration: 500});
     }
     , []);
     return (
          <div data-aos="fade-up">
               <div
               onMouseOver={() => setHover(true)}
               onMouseOut={() => setHover(false)} 
               className=" max-w-[18rem] rounded-lg bg-white shadow-lg shadow-gray-400 dark:bg-gradient-to-tr from-pink to-orange-400 ">
               <div className="relative overflow-hidden bg-cover bg-no-repeat">
                    <img
                         className={`rounded-t-lg h-60 w-80 object-cover transition-all duration-300 ease-in-out mdmax:h-40 ${hover? 'h-72  mdmax:h-72':''}`}
                         src={image_url} 
                         loading='lazy'
                          alt=""  />
                          
                    </div>
                    <div className={`pr-6 pl-6 pt-4 `}  >
                    <h5
                         className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                         {title}
                    </h5>
                    <p className=" font-light text-sm text-neutral-600 dark:text-neutral-200 overflow-hidden h-10 max-h-10">
                         {tag_line}
                    </p>
               </div>
               <div className='p-6 mt-4 mb-4 text-center '>
               <Link className=" bg-white p-2 rounded-lg 
                " to={`/competition/${id}`}>
                    Register
               </Link>
               </div>
               </div>       
          </div>
        );
};

export default EventByCatCards;