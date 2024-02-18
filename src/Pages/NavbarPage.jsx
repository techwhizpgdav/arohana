import React from 'react'
import DesktopNav from '../Components/Navbar/DesktopNav'
import MobileNav from '../Components/Navbar/MobileNav'
import { useEffect , useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Modal from 'react-modal'
import { API_URL } from '../Functions/Constants'
import axios from 'axios'
import Api from '../Functions/api'

const NavbarPage = () => {
      const navigate = useNavigate();
      const [alertMessage, setAlertMessage] = useState(null); 
      const [width, setWidth] = useState(window.innerWidth);
      const [user , setUser] = useState([]);

      const {fetchApi} = Api();
     const breakpoint = 764;
    //* Function to switch between mobile and desktop view
      useEffect(() => {
       const handleWindowResize = () => setWidth(window.innerWidth)
       window.addEventListener("resize", handleWindowResize);
       return () => window.removeEventListener("resize", handleWindowResize);
     }, []);

    //! Function to check the validation of the token and get the user data

    const authUser = async () => {
      const token = localStorage.getItem('token');
      if(token){
        const result = fetchApi('GET', 'auth-user' , 'navbar');
        result.then (response => {
            if (response?.status === 200){
            setUser(response?.data?.data?.user);
          }
        })
      }
    }
    //* Function to show congratulation message if the user is login first time after Admin verification
     useEffect(() => {
      const token = localStorage.getItem('token');
      if(token){
      authUser();
      const congratulationsShown = localStorage.getItem('congratulations-shown');
      if(congratulationsShown == 0 && user?.email_verified_at == null && !user?.is_verified == true  ){
            localStorage.setItem('congratulations-shown', 1);
            setAlertMessage('Congratulations! Your account has been verified by the admin. You can now participate in the events.');
       }
      }
     }, [navigate]);     
     
  return (
     <>
     <Modal isOpen={!!alertMessage} onRequestClose={() => setAlertMessage(null)}
       className={`
       absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-haldi-orange text-white p-8 rounded-lg flex flex-col items-center gap-2 mdmax:w-4/5 mdmax:p-3` }
      >
        <p className=''>{alertMessage}</p>
        <p>🎉 You can now participate in the events.🎉 </p>
      <Link to ={'/categories'}>
      <button className='bg-white text-black p-2 rounded-lg mt-4 w-40 '
         onClick={() => {
          setAlertMessage(null)}}>Events</button>
      </Link>
      </Modal>

     {width < breakpoint ? <MobileNav /> : <DesktopNav />}
          
     </>
  )
}

export default NavbarPage