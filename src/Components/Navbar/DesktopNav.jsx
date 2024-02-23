import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { TypeAnimation } from 'react-type-animation';
import UserProfile from '../../assets/userProfile.png';




const DesktopNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isOnDashboard, setIsOnDashboard] = useState(false);
  const [previousPath , setPreviousPath] = useState(location.pathname);

    const logout = async () => {
      setIsLoggedIn(false);
      localStorage.removeItem('token');
      navigate('/');
    };

    useEffect(() => {
      setIsOnDashboard(location.pathname.includes('/dashboard'));
      if (!location.pathname.includes('/dashboard') && previousPath.includes('/dashboard')) {
        window.scrollTo(0, 84); 
      }
      setPreviousPath(location.pathname);
    }, [navigate, location]);


 useEffect(() => {
    const checkAndNavigate = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkAndNavigate();
  }, [location]);

  useEffect(() => {
    AOS.init({
      duration: 1000
    });
  }, []); 



  const color = 'white';
  const bgcolor = isLoggedIn ? 'bg-gradient-to-r from-haldi-orange to-haldi-red' : 'bg-gradient-to-r from-haldi-yellow to-haldi';

  const navbarStyle = path => `py-4 px-2 border-b-4 border-transparent text-${color} ${location.pathname === path ? 'border-haldi-yellow' : ''} ${isLoggedIn ? `${isOnDashboard ? 'navbar' : 'hover:border-haldi'}` : 'hover:border-haldi-orange'} font-medium rounded`;


  return (
  <nav className={` z-20 shadow-lg pt-2 pb-2 ${isOnDashboard ? 'bg-gradient-to-r to-linear-lightBlue from-linear-darkBlue ' : bgcolor} `} data-aos="fade-down"> 
      <div className=" px-40">
        <div className="flex justify-between items-center">
          <div data-aos="fade-right">
          <Link to="/" className={`logo absolute -top-8 flex items-center py-4 px-2 gap-12 xxlmax:-left-32
            text-${color}`}>
          <TypeAnimation
          sequence={[
            'HYPERION',
            1500, 
            'AROHANA',
            1500,
            'HYPERION',
            1500,
            'AROHANA',
            1500
          ]}
              wrapper="span"
              speed={20}
              style={{ fontSize: '20px', display: 'inline-block' , fontFamily: 'Poppins'}}
              repeat={2}
            />
            </Link>
          </div>
          <div className="flex gap-40 " >
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" data-aos="fade-down" >
              <p className={navbarStyle('/')} >
                  Home
                </p>
              </Link>
              <Link data-aos="fade-up" to="/categories" >
              <p className= {navbarStyle('/categories')}>
              Events
                </p>
              </Link>
              <Link data-aos="fade-down" to="/timeline" >
              <p className= {navbarStyle('/timeline')}>
                  Timeline
                </p>
              </Link>
              <Link data-aos="fade-up" to="/teams" >
                <p className= {navbarStyle('/teams')}>
                  Teams
                </p>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center space-x-3 ">
            {isLoggedIn ? 
              <div className=' flex justify-center items-center gap-10'>
                
                <Link to={'/dashboard/userProfile'} >
                  <div data-aos="fade-left" className={`py-2 px-2 font-medium rounded ${isOnDashboard ? ' text-white hover:text-shade-darkBlue':' text-white hover:text-rose-200'} duration-500 transition-all flex flex-col items-center`}>
                    <img src={UserProfile} alt="UserProfile" className={`h-8 w-8  logoWhite rounded-ful `} />
                    <div className=' text-sm'>
                      Dash Board
                    </div>
                  </div>
                </Link>
              <div className={`btn`}>
                <button data-aos="fade-left" onClick={logout} className={`btn-content-login font-medium ${isOnDashboard ? ' text-white  hover:text-shade-darkBlue ':' text-white hover:text-rose-200'} `}>Logout</button>
              </div>
              </div> : 
            
              <div className='btn'>
                <Link data-aos="fade-left" to="/login" className=" flex items-center justify-center min-w-20 font-medium text-white btn-content-login duration-500 transition-all ">
                Login
              </Link>
              </div>
   
              }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default DesktopNav;