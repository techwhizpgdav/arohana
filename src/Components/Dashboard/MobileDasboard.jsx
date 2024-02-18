import React from 'react'
import Api from '../../Functions/api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserProfile from './UserProfile'
import UserEventDetails from './UserEventDetails'
import UserTeams from './UserTeams'
import Welcome from './Welcome'
import './Dashboard.css'
import '../../Button.css'
import { TypeAnimation } from 'react-type-animation'
import { useLocation } from 'react-router-dom'
import Spinner2 from '../ShimmerAndSpinner/Spinner2'
const MobileDasboard = () => {
     const { authUser } = Api();
     const [user, setUser] = useState({});
     const navigate = useNavigate();
     const [isLoggedIn, setIsLoggedIn] = useState(false);
     const [isLoading, setIsLoading] = useState(true);
     const [activeComponent, setActiveComponent] = useState('userProfile');
     const [hamOpen, setHamOpen] = useState(false);
     useEffect(() => {
       const checkAndNavigate = async () => {
         const token = localStorage.getItem('token');
         if (token) {
          await authUser().then((data) => {
            console.log(data.name);
             setUser(data);
              setIsLoading(false);
           })
           setIsLoggedIn(true);
         }
       };
       checkAndNavigate();
     }, [navigate]);

     useEffect(() => {
      document.querySelectorAll('button').forEach(button => {
        button.innerHTML = '<div><span>' + button.textContent.trim().split('').join('</span><span>') + '</span></div>';
      });
    }, [navigate, hamOpen, activeComponent, user]);

    if (isLoading) {
      return <div className='dashboard-hero flex justify-center h-screen items-center text-white'>
        <Spinner2 />
        </div>;
    }


  return (
     <>
            <div className="z-30 flex justify-between items-center h-16 bg-gradient-to-r to-linear-lightBlue from-linear-darkBlue text-white dashboard mdmax:pr-2 mdmax:flex-row-reverse" >
           <div className={`hamburger ${hamOpen? 'is-active' :''}`} onClick={() => setHamOpen(!hamOpen)}>
               <div className="hamburger__container">
                 <div className="hamburger__inner"></div>
                 <div className="hamburger__hidden"></div>
               </div>
           </div>
           <h1 className='text-3xl pl-4 select-none  '>
            { activeComponent === 'userProfile' ? 'Profile' : activeComponent === 'userEventDetails' ? 'Participation' : 'Teams'}
           </h1>
            </div>
          <div className={`dashboard-sidebar ${hamOpen ? '  ' : ' hidden'} `} >
           <div className="flex flex-col items-center justify-center h-full
                dashboard-left button-list" >
               <button 
                 className={`button ${activeComponent === 'userProfile' ? 'open' : 'close'}`} 
                 onClick={() =>{
                  setHamOpen(false);
                  setActiveComponent('userProfile')}}
               >
                     Profile
               </button>
               <button 
                 className={` button ${activeComponent === 'userEventDetails' ? 'open' : 'close'}`} 
                 onClick={() => { setHamOpen(false);
                  setActiveComponent('userEventDetails')}}
               >
                     Participation
               </button>
               <button 
                 className={`button  ${activeComponent === 'userTeams' ? 'open' : 'close'}`} 
                 onClick={() => {
                  setHamOpen(false);
                  setActiveComponent('userTeams')}} 
               >
                     Teams
               </button>
                <div className='  mt-20'>
                <TypeAnimation
              sequence={[
                `Namaste ${user?.name ? user.name.split(' ')[0] : ''} 🙏`,
                4000, 
                `Hola ${user?.name ? user.name.split(' ')[0] : ''} 👋`,
                4000,
                `Hello ${user?.name ? user.name.split(' ')[0] : ''} 👐`,
                4000,
                `Bonjour ${user?.name ? user.name.split(' ')[0] : ''} 👋`,
                4000
              ]}
              wrapper="span"
              speed={10}
              style={{ fontSize: '20px', display: 'inline-block', width: '300px' , padding: '10px' , color: 'black',
              textAlign: 'center', fontWeight: 'bold',  borderRadius: '10px'  
            }}
            />
                </div>
          </div>
          </div>
          
     
     <div 
          className={`${hamOpen ? ' hidden':''} 'bg-black`} 
          
        >
            <Welcome user={user} />
            {activeComponent === 'userProfile' && <UserProfile user={user} />}
            {activeComponent === 'userEventDetails' && <UserEventDetails user={user} />}
            {activeComponent === 'userTeams' && <UserTeams user={user} />}
        </div>
     </>


  )
}

export default MobileDasboard