import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isOnDashboard, setIsOnDashboard] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 772;
  useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth)
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

  useEffect(() => { const token = localStorage.getItem('token'); setIsLoggedIn(!!token); }, []);
  useEffect(() => { setIsOnDashboard(location.pathname.includes('/dashboard')); }, [location]);

  return (
    <div className="bottom-0">
      <footer>
        <hr className="mt-10 -mb-80 w-5/6 mx-auto border-gray-400" />
        <div className="relative mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="bg-base-200 text-base-content p-10">
            <div className='absolute mt-72'>
              <div className="container mx-auto grid grid-cols-1 md:grid-cols-[5fr_1fr_1fr] gap-10 items-start">
                <div className="flex items-start space-x-4">
                  <p>
                    <div className="md:-mb-4">
                      <Link to="/" className="flex items-center">
                        <span className="flip self-center text-5xl font-bold whitespace-nowrap text-black"> Arohana </span>
                      </Link>
                    </div><br />
                    Annual Cultural Festival of <a href="https://pgdavhyperion.in/" target="_blank" rel="noopener noreferrer" className="hover:underline"> PGDAV(M) College </a><br />
                    <a href="https://instagram.com/pgdav_official" target="_blank" rel="noopener noreferrer" className="hover:underline pr-4"><FaInstagram className="inline-block" /></a>
                    <a href="https://www.facebook.com/profile.php?id=61552210954443" target="_blank" rel="noopener noreferrer" className="hover:underline pr-4"><FaFacebook className="inline-block" /></a>
                    <a href="https://twitter.com/pgdav_du" target="_blank" rel="noopener noreferrer" className="hover:underline"><FaTwitter className="inline-block" /></a>
                  </p>
                </div>
                <div>
                  <a href="https://pgdavhyperion.in/" target="_blank" rel="noopener noreferrer" className="hover:underline text-lg font-semibold"> HYPERION </a>
                  <div className="flex flex-col mt-2 space-y-1">
                    <a href="https://www.instagram.com/hyperion_pgdav/" target="_blank" rel="noopener noreferrer" className="hover:underline"> Instagram <FaInstagram className="inline-block" /> </a>
                    <a href="https://m.facebook.com/PGDAVhyperion?_rdr" target="_blank" rel="noopener noreferrer" className="hover:underline"> Facebook <FaFacebook className="inline-block" /> </a>
                  </div>
                </div>
                <div>
                  <h6 className="text-lg font-semibold">PGDAV COLLEGE</h6>
                  <div className="flex flex-col mt-2 space-y-1">
                    <a href="https://www.pgdavcollege.in/" target="_blank" rel="noopener noreferrer" className="hover:underline"> Official Website </a>
                    <a href="https://instagram.com/pgdav_official" target="_blank" rel="noopener noreferrer" className="hover:underline"> Instagram <FaInstagram className="inline-block" /> </a>
                    <a href="https://www.facebook.com/profile.php?id=61552210954443" target="_blank" rel="noopener noreferrer" className="hover:underline"> Facebook <FaFacebook className="inline-block" /> </a>
                    <a href="https://twitter.com/pgdav_du" target="_blank" rel="noopener noreferrer" className="hover:underline"> Twitter <FaTwitter className="inline-block" /> </a>
                  </div>
                </div>
              </div>
              <div className="sm:flex sm:items-center sm:justify-between mt-4">
                <span className="text-sm text-black sm:text-center"> © 2024 <a href="https://pgdavhyperion.in/" className="hover:underline">Hyperion™</a> | Crafted with 💖 by <a href="https://www.pgdavhyperion.in/society/techwhiz" target='__blank' className="hover:underline"> Techwhiz </a> </span>
              </div>
            </div>

            {width < breakpoint ? <></> :
              // Display svg for desktop
              <svg
              className="absolute  start-1/2 w-[1900px] transform -translate-x-1/2 -z-10"
              width="2745"
              height="488"
              viewBox="0 -100 2745 488"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              >
              {/* Define Gradient & Gaussian Blur */}
              <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFEF00" />  {/* Light Yellow */}
                  <stop offset="100%" stopColor="#FF7700" /> {/* Dark Orange */}
                  </linearGradient>

                  <filter id="gaussianBlur" x="0" y="0" width="100%" height="100%">
                  <feGaussianBlur stdDeviation="5" />
                  </filter>
              </defs>

              {[...Array(5)].map((_, i) => (
                  <path
                  key={i}
                  d={`M0.5 ${330.864 - i * 50}C232.505 ${403.801 - i * 50} 
                      853.749 ${527.683 - i * 50} 1482.69 ${439.719 - i * 50} 
                      C2111.63 ${351.756 - i * 50} 2585.54 ${434.588 - i * 50} 2743.87 ${487 - i * 50}`}
                  stroke="url(#gradient)" // Apply Gradient Stroke
                  strokeWidth="1.5" // Adjust thickness
                  filter="url(#gaussianBlur)" // Apply Blur
                  />
              ))}
              </svg>
            }
</div>


{/* ------------------------------------------------------------------------------------------------------------------------- */}

        </div>
      </footer>

      {/* <Footer2 /> */}
    </div>
  );
};

export default Footer;
