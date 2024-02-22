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

          <h1 data-aos="fade-up" className="text-3xl font-bold mb-5 ">Important Instructions !!</h1>
          <p data-aos="fade-up" className="text-lg mb-2 p-2 ">Kindly adhere to the following instructions to successfully complete your registration.</p>
          <div className=' mdmax:pl-8'>
          <ul className=' list-disc' > 
               <li data-aos="fade-up" className="text-lg mb-5">Proceed to the signup page.</li>
               <li data-aos="fade-up" className="text-lg mb-5">Enter the required details and submit the form.</li>
               <li data-aos="fade-up" className="text-lg mb-5">Ensure that you provide a valid college ID.</li>
               <li data-aos="fade-up" className="text-lg mb-5">Upon successful signup, you will receive an email containing a verification link.</li>
          </ul>
          </div>

          <div data-aos="fade-up" className="flex flex-col items-start mt-5 gap-4 p-2">
               <label className="">
                    <input type="checkbox" name="tutorial" className="form-checkbox text-haldi w-4 h-4" onChange={handleCheckboxChange} /> I confirm that I have read the tutorial
                    
               </label>
               <label className="">
                    <input type="checkbox" name="terms" className="form-checkbox text-haldi w-4 h-4 " onChange={handleCheckboxChange} /> I agree to abide by the rules and not cause any disruptions during the event
               </label>
          </div>

          {showButton && (
               <button data-aos="fade-up" className="bg-haldi hover:bg-haldi-red text-white font-bold py-2 px-4 mt-20 rounded transition-all duration-500 ease-in-out signup-button  ">
                    <Link to={'/signup'}>
                         Proceed to Signup
                    </Link>
               </button>
          )}
     </div>
     )
}

export default Tutorial