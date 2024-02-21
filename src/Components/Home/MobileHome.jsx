import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobilePara } from '../../Functions/Constants';
import './Home.css'
import Faq from './Faq';
const MobileHome = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){

    }
    setIsLoggedIn(true);
  }, [navigate])

    const toggleAnswer = (index) => {
      if (index === clickedIndex) {
        setClickedIndex(null);
      } else {
        setClickedIndex(index);
      }
    };

  return (
    <>
    <div className='flex items-center h-20 justify-around bg-haldi-red  text-white' onClick={() => navigate('/categories')}>
      <p>
      Registration is Live, Participate Now !!!
      </p>
    </div>
       <div className=' h-screen flex justify-center items-center mobileHome'>
       </div>

        <div className='min-h-screen min-w-screen py-10 relative '>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 home-bg">
        </div>
        <div className="container mx-auto px-4 relative top-40 z-10">
          <div className="text-center">
            <div className="max-w-md mx-auto mb-8 bg-white bg-opacity-70 p-6 rounded-lg shadow-lg">
              <h1 className="text-3xl font-bold mb-4 font-serif">ABOUT US</h1>
              <p className="text-lg font-serif">
                {MobilePara}  
              </p>
            </div>
          </div>
        </div>
        </div>
        <Faq color = {false} />

    </>
  )
}

export default MobileHome