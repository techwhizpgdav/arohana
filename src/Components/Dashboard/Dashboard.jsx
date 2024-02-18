import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Api from '../../Functions/api';
import { TypeAnimation } from 'react-type-animation';
import UserProfile from './UserProfile';
import UserEventDetails from './UserEventDetails';
import UserTeams from './UserTeams';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Welcome from './Welcome';
import '../../Button.css';
import { FaUser, FaCalendar, FaUsers } from 'react-icons/fa';
import Spinner2 from '../ShimmerAndSpinner/Spinner2';


const Dashboard = () => {
  const { authUser } = Api();
  const [user, setUser] = useState('');

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeComponent, setActiveComponent] = useState('userProfile');
  const [hamOpen, setHamOpen] = useState(false);

  useEffect(() => {
    const checkAndNavigate = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
      if (token) {
        authUser().then((data) => {
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

  useEffect(() => {
    AOS.init({duration: 1000});
    AOS.refresh(); // This line will refresh AOS and cause animations to trigger again
  }, []);

  if (user?.length === 0) {
    return <div className='dashboard-hero h-screen flex justify-center items-center text-white'>
      <Spinner2 />
    </div>;
  }

  return (
    <>    
      <div className=' absolute top-5'>
      <div className={`hamburger ${hamOpen? 'is-active' :''} `} onClick={() => setHamOpen(!hamOpen)}>
          <div className="hamburger__container">
            <div className="hamburger__inner"></div>
            <div className="hamburger__hidden"></div>
          </div>
        </div>   
      </div>

      <div className="flex  " data-aos="fade-up">
        <div className={`${!hamOpen? 'w-0 mdmax:w-0' :'w-1/5 mdmax:w-screen'} dashboard-left-body` } >
            {
              !hamOpen? <div></div>:
              <div className='h-screen dashboard-left flex items-center justify-center' >
              <div className='button-list'>
                  <div className=''>
                  <FaUser className=' absolute scale-125 text-white left-52 translate-y-4'/>

                    <button
                      onClick={() => setActiveComponent('userProfile')}
                      className={`button  ${activeComponent === 'userProfile' ? 'open' : 'close'}`}
                    >
                      <p>Profile</p>
                    </button>
                  </div>
                  <div>
                  <FaCalendar className=' absolute scale-125 text-white left-52 translate-y-4'/>
                    <button 
                      onClick={() => setActiveComponent('userEventDetails')}
                      className={` button reverse ${activeComponent === 'userEventDetails' ? 'open' : 'close'}`} 
                    >
                      <p>Participations</p>
                    </button>
                  </div>
                  <div>
                    <FaUsers className=' absolute scale-125 text-white left-52 translate-y-4'/>
                    <button
                      onClick={() => setActiveComponent('userTeams')}
                      className={`button ${activeComponent === 'userTeams' ? 'open' : 'close'}`}
                    >
                      <p>Teams</p>
                    </button>
                  </div>
                </div>
      
              <div className='flex gap-1 absolute top-10 '>
                <TypeAnimation
                  sequence={[
                    `Namaste ${user?.name.split(' ')[0]} 🙏`,
                    4000, 
                    `Hola ${user?.name.split(' ')[0]} 👋`,
                    4000,
                    `Hello ${user?.name.split(' ')[0]} 👐`,
                    4000,
                    `Bonjour ${user?.name.split(' ')[0]} 👋`,
                    4000
                  ]}
                  wrapper="span"
                  speed={10}
                  
                  style={{ fontSize: '20px', display: 'inline-block', width: '300px' , padding: '10px' , color: 'black',
                  textAlign: 'center', fontWeight: 'bold',  borderRadius: '10px'  

                }}
                  repeat={3}
                />
                
              </div>
              </div>
            }
        </div>
        {
          hamOpen? null:
          <div className='menu ' onClick={() => setHamOpen(!hamOpen)}>
          </div>
        
        }
        <div 
          className={`dashboard-body ${hamOpen ? 'w-4/5 mdmax:w-0' : 'w-full mdmax:w-full'} ${hamOpen ? 'pl-10 mdmax:pl-0 maxHieght' : 'pl-10'} `} 
          onClick={() => setHamOpen(false)}
        >
          <Welcome user={user} />
            {activeComponent === 'userProfile' && <UserProfile user={user} />}
            {activeComponent === 'userEventDetails' && <UserEventDetails user={user} />}
            {activeComponent === 'userTeams' && <UserTeams user={user} />}
        </div>
      </div>
    </>
  )
}

export default Dashboard