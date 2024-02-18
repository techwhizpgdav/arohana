import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobilePara } from '../../Functions/Constants';
import './Home.css'
import LandingPage from './LandingPage';
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
      <div>
      <LandingPage />
      </div>
        <div className='min-h-screen min-w-screen py-10 relative '>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 home-bg">
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="max-w-md mx-auto mb-8 bg-white bg-opacity-70 p-6 rounded-lg shadow-lg">
              <h1 className="text-3xl font-bold mb-4 font-serif">ABOUT US</h1>
              <p className="text-lg font-serif">
                {MobilePara}  
              </p>
            </div>
            <div className="max-w-md mx-auto bg-white bg-opacity-70 p-6 rounded-lg shadow-lg">
              <h1 className="text-3xl font-bold mb-4 font-serif">FAQ</h1>
              <div className="grid grid-cols-1 gap-4">
                <div
                  className={`bg-white bg-opacity-70 p-4 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 ${clickedIndex === 0 ? 'border border-blue-500' : ''}`}
                  onClick={() => toggleAnswer(0)}
                >
                  <h2 className="text-lg font-bold">Q: What is Arohana ?</h2>
                  <p className={`text-base mt-2 overflow-hidden transition-max-height duration-200 ease-in-out ${clickedIndex === 0 ? 'max-h-full' : 'max-h-0'}`}>
                    Arohana, formerly known as Aaghaz, is the Annual Cultural Fest of PGDAV College, University of Delhi.
                  </p>
                </div>
                <div
                  className={`bg-white bg-opacity-70 p-4 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 ${clickedIndex === 1 ? 'border border-blue-500' : ''}`}
                  onClick={() => toggleAnswer(1)}
                >
                  <h2 className="text-lg font-bold">Q: Where can i get link to participate online ?</h2>
                  <p className={`text-base mt-2 overflow-hidden transition-max-height duration-200 ease-in-out ${clickedIndex === 1 ? 'max-h-full' : 'max-h-0'}`}>
                    Browse to the events of your choice in the Event Section.
                  </p>
                </div>
                <div
                  className={`bg-white bg-opacity-70 p-4 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 ${clickedIndex === 2 ? 'border border-blue-500' : ''}`}
                  onClick={() => toggleAnswer(2)}
                >
                  <h2 className="text-lg font-bold">Q: Is there any registration fee for participation ?</h2>
                  <p className={`text-base mt-2 overflow-hidden transition-max-height duration-200 ease-in-out ${clickedIndex === 2 ? 'max-h-full' : 'max-h-0'}`}>
                    It's absolutely FREE!
                  </p>
                </div>
                <div
                  className={`bg-white bg-opacity-70 p-4 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 ${clickedIndex === 3 ? 'border border-blue-500' : ''}`}
                  onClick={() => toggleAnswer(3)}
                >
                  <h2 className="text-lg font-bold">Q: How will I receive my Certificate(s) and Prizes (if any) ?</h2>
                  <p className={`text-base mt-2 overflow-hidden transition-max-height duration-200 ease-in-out ${clickedIndex === 3 ? 'max-h-full' : 'max-h-0'}`}>
                    The respective winners will be asked for their account details for transferring the amount to ensure feasibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </>
  )
}

export default MobileHome