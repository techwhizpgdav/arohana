import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useNavigate } from 'react-router-dom';


const Tutorial = () => {
     const [isChecked, setIsChecked] = useState({
          tutorial: false,
          terms: false
     });
     const navigate = useNavigate();
     useEffect(() => {
          AOS.init({
               duration : 1000
          });
     }, []);

     useEffect(() => {
          const checkAndNavigate = async () => {
               const token = localStorage.getItem('token');
               if (token) {
                    // call the token verification api
                    navigate('/');
               }
          };
          checkAndNavigate();
     }, [navigate]);

     const handleCheckboxChange = (event) => {
          setIsChecked({ ...isChecked, [event.target.name]: event.target.checked });
     };

     const showButton = isChecked.tutorial && isChecked.terms;

     return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
               <h1 data-aos="fade-up" className="text-4xl font-bold mb-5">Registration Tutorial</h1>
               <p data-aos="fade-up" className="text-lg mb-2">Here is a step by step tutorial on how to register for the event</p>
               <p data-aos="fade-up" className="text-lg mb-2">Step 1: Go to the registration page</p>
               <p data-aos="fade-up" className="text-lg mb-2">Step 2: Enter your details</p>
               <p data-aos="fade-up" className="text-lg mb-2">Step 3: Click on the submit button</p>

               <div data-aos="fade-up" className="flex flex-col items-start justify-center mb-5">
                    <label className="flex items-center">
                         <input type="checkbox" name="tutorial" className="form-checkbox h-5 w-5 text-haldi" onChange={handleCheckboxChange} />
                         <span className="ml-2 text-gray-700">I have read the tutorial</span>
                    </label>
                    <label className="flex items-center">
                         <input type="checkbox" name="terms" className="form-checkbox h-5 w-5 text-haldi  " onChange={handleCheckboxChange} />
                         <span className="ml-2 text-gray-700">I agree to the terms and conditions</span>
                    </label>
               </div>

               {showButton && (
                    <button data-aos="fade-up" className="bg-haldi hover:bg-haldi-red text-white font-bold py-2 px-4 rounded transition-all duration-500 ease-in-out signup-button  ">
                         <Link to={'/signup'}>
                              Signup
                         </Link>
                    </button>
               )}
          </div>
     )
}

export default Tutorial