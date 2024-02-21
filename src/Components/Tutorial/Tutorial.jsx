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
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
               <h1 data-aos="fade-up" className="text-4xl font-bold mb-5 ">Registration Tutorial</h1>
               <p data-aos="fade-up" className="text-lg mb-2 p-2 w-4/5">Please follow these instructions, to complete your registration. </p>
               <div className=' p-2'> 
               <p data-aos="fade-up" className="text-lg mb-5">Go to the signup page.</p>
               <p data-aos="fade-up" className="text-lg mb-5">Fill in the details and submit the form.</p>
               <p data-aos="fade-up" className="text-lg mb-5">Make sure you fill valid college id.</p>
               <p data-aos="fade-up" className="text-lg mb-5">After signup, you will receive an email with a verification link.</p>
               </div>


               <div data-aos="fade-up" className="flex flex-col items-start mb-5">
                    <label className="flex ">
                         <input type="checkbox" name="tutorial" className="form-checkbox h-5 w-5 text-haldi" onChange={handleCheckboxChange} />
                         <span className="ml-2 text-gray-700">I have read the tutorial</span>
                    </label>
                    <label className="flex items-center">
                         <input type="checkbox" name="terms" className="form-checkbox h-5 w-5 text-haldi  " onChange={handleCheckboxChange} />
                         <span className="ml-2 text-gray-700">I will not cause any problem in the event.</span>
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