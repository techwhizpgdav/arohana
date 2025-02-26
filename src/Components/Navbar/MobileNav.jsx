import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TypeAnimation } from 'react-type-animation';
import UserProfile from '../../assets/userProfile.png';
import './Navbar.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isOnDashboard, setIsOnDashboard] = useState(false);

  const logout = async () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    setIsOpen(false);
    navigate('/');
  };

  useEffect(() => {
    AOS.init({
      duration: 1000
    });
  }, []); 

useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
    document.body.style.maxHeight = '100vh';
  } else {
    document.body.style.overflow = 'auto';
    document.body.style.maxHeight = '100%';
  }
}, [isOpen]);

useEffect(() => {
  setIsOnDashboard(location.pathname.includes('/dashboard'));
}, [navigate, location]);
  
useEffect(() => {

  if (location.pathname.includes('/dashboard')) {
    setIsOnDashboard(true);
  }
  else {
    setIsOnDashboard(false);
  }
}, [location]);

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
  }, [navigate]);

  const color = 'white';
  const bgcolor = isLoggedIn ? 'bg-gradient-to-r from-haldi-orange to-haldi-red' : 'bg-gradient-to-r from-haldi-yellow to-haldi';
  const navbarStyle = `py-4 px-2 border-b-4 border-transparent text-${color}
  ${isLoggedIn? `${isOnDashboard? 'navbar':'hover:border-haldi'}`: 'hover:border-haldi-orange'}  font-medium rounded`;
  return (
    <>
      <div
        className={`flex justify-between items-center h-20 shadow-lg p-4 z-10 pt-2 pb-2 ${`${
          isOnDashboard
            ? "bg-gradient-to-r to-linear-lightBlue from-linear-darkBlue  "
            : bgcolor
        }`}`}
      >
        <Link
          to="/"
          className={`logo flex items-center py-4 px-2 gap-12 font text-white`}
        >
          <TypeAnimation
            sequence={[
              "HYPERION",
              1500,
              "AROHANA",
              1500,
              "HYPERION",
              1500,
              "AROHANA",
              1500,
            ]}
            wrapper="span"
            speed={20}
            style={{
              fontSize: "20px",
              display: "inline-block",
              width: "200px",
            }}
            repeat={2}
          />
        </Link>
        <div onClick={() => setIsOpen(!isOpen)} className=" cursor-pointer">
          <div>
            <div className={`hamburger ${isOpen ? "is-active" : ""}`}>
              <div className="hamburger__container ">
                <div className="hamburger__inner"></div>
                <div className="hamburger__hidden"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } z-[100] w-full h-screen fixed top-23 transition-all duration-500 ease-in-out  ${`${
          isOnDashboard
            ? "bg-gradient-to-r to-linear-lightBlue from-linear-darkBlue "
            : bgcolor
        }`}`}
      >
        <div className="flex flex-col items-center justify-center h-full -mt-10 gap-10 ">
          {/* {isLoggedIn ? (
            <div className=" flex flex-col justify-center items-center gap-10">
              <Link
                to={"/dashboard/userProfile"}
                onClick={() => setIsOpen(false)}
              >
                <div className=" py-2 px-2 font-medium rounded text-white flex flex-col items-center gap-2 duration-500 transition-all">
                  <img
                    src={UserProfile}
                    alt="Dash Board"
                    className={`h-8 w-8 rounded-full ${
                      isOnDashboard ? "logoWhite" : "logoWhite"
                    }`}
                  />
                  <p>Dash Board</p>
                </div>
              </Link>
            </div>
          ) : (
            <div className="btn" onClick={() => setIsOpen(false)}>
              <Link
                to="/login"
                className=" flex items-center justify-center min-w-20 font-medium text-white btn-content-login duration-500 transition-all "
              >
                Login
              </Link>
            </div>
          )} */}

          <Link to="/" className={navbarStyle} onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link
            to="/competitions"
            className={navbarStyle}
            onClick={() => setIsOpen(false)}
          >
            Events
          </Link>
          <Link
            to="/timeline"
            className={navbarStyle}
            onClick={() => setIsOpen(false)}
          >
            Timeline
          </Link>
          <Link
            to="/teams"
            className={navbarStyle}
            onClick={() => setIsOpen(false)}
          >
            Teams
          </Link>
          {/* {isLoggedIn ? (
            <button
              onClick={logout}
              className={` py-2 px-2 font-medium rounded ${
                isOnDashboard ? "text-white" : "text-white"
              } hover:text-rose-200 duration-500 transition-all`}
            >
              Logout
            </button>
          ) : null} */}
        </div>
      </div>
    </>
  );
}

export default MobileNav;