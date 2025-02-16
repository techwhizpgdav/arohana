import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

// Footer2 component defined before use
// const Footer2 = () => {
//   return (
//     <footer className="relative overflow-hidden bg-neutral-900 text-white">
       

//       <svg
//         className="absolute -bottom-20 start-1/2 w-[1900px] transform -translate-x-1/2"
//         width="2745"
//         height="488"
//         viewBox="0 0 2745 488"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         {[...Array(10)].map((_, i) => (
//           <path
//             key={i}
//             d={`M0.5 ${330.864 - i * 21.991}C232.505 ${
//               403.801 - i * 21.991
//             } 853.749 ${527.683 - i * 21.991} 1482.69 ${
//               439.719 - i * 21.991
//             }C2111.63 ${351.756 - i * 21.991} 2585.54 ${
//               434.588 - i * 21.991
//             } 2743.87 ${487 - i * 21.991}`}
//             className="stroke-neutral-700/50"
//             stroke="currentColor"
//           />
//         ))}
//       </svg>

//       <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
//         <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// };

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isOnDashboard, setIsOnDashboard] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    setIsOnDashboard(location.pathname.includes('/dashboard'));
  }, [location]);

  const handleTeamClick = (tab) => {
    navigate(`/teams`, { state: { tab } });
  };

  // Determine Footer background color based on login/dashboard status
//   const footerClass = isOnDashboard
//     ? 'bg-gradient-to-r to-linear-lightBlue from-linear-darkBlue'
//     : isLoggedIn
//     ? 'bg-gradient-to-r from-haldi-orange to-haldi-red'
//     : 'bg-gradient-to-r from-haldi-yellow to-haldi';

  return (
    <div className="bottom-0">
      <footer >
      <hr className="mt-10 -mb-72 w-5/6 mx-auto border-gray-400" />
      
        <div className="relative  mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="bg-base-200 text-base-content p-10">
            {/* -------------------------------------------------------------------------------------------- */}
            <div className='absolute mt-72'>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-[2.5fr_1fr_1fr_1fr] gap-10 items-start">
                {/* Logo and Company Info */}
                <div className="flex items-start space-x-4">
                <p>
                    <div className="mb-6 md:mb-0">
                    <Link to="/" className="flex items-center">
                        <span className="flip self-center text-5xl font-bold whitespace-nowrap text-black">
                        Arohana
                        </span>
                    </Link>
                    </div>
                    <br />
                    Annual Cultural Festival of PGDAV(M) College
                </p>
                </div>

                {/* Navigation Links */}
                <div>
                <h6 className="text-lg font-semibold">HYPERION</h6>
                <div className="flex flex-col mt-2 space-y-1">
                    <a 
                    href="https://pgdavhyperion.in/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:underline"
                    >
                    Official Website
                    </a>
                    
                    <a 
                    href="https://www.instagram.com/hyperion_pgdav/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:underline"
                    >
                    Instagram <FaInstagram className="inline-block" />
                    </a>
                    <a 
                    href="https://m.facebook.com/PGDAVhyperion?_rdr" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:underline"
                    >
                    Facebook <FaFacebook className="inline-block" />
                    </a>
                </div>
                </div>

                <div>
                <h6 className="text-lg font-semibold">PGDAV COLLEGE</h6>
                <div className="flex flex-col mt-2 space-y-1">
                    <a 
                    href="https://www.pgdavcollege.in/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:underline"
                    >
                    Official Website
                    </a>
                    <a 
                    href="https://instagram.com/pgdav_official" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:underline"
                    >
                    Instagram <FaInstagram className="inline-block" />
                    </a>
                    <a 
                    href="https://www.facebook.com/profile.php?id=61552210954443" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:underline"
                    >
                    Facebook <FaFacebook className="inline-block" />
                    </a>
                    <a 
                    href="https://twitter.com/pgdav_du" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:underline"
                    >
                    Twitter <FaTwitter className="inline-block" />
                    </a>
                </div>
                </div>

                <div>
                <h6 className="text-lg font-semibold">TEAM</h6>
                <div className="flex flex-col mt-2 space-y-1">
                    <p 
                    onClick={() => handleTeamClick('core_team')} 
                    className="cursor-pointer hover:underline"
                    >
                    Hyperion - PGDAV
                    </p>
                    <p 
                    onClick={() => handleTeamClick('web_developer')} 
                    className="cursor-pointer hover:underline"
                    >
                    Techwhiz-Web Dev Team
                    </p>
                </div>
                </div>
            </div>

            {/* Footer */}
            <div className="sm:flex sm:items-center sm:justify-between mt-6">
                <span className="text-sm text-black sm:text-center">
                © 2024 <a href="https://pgdavhyperion.in/" className="hover:underline">Hyperion™</a>
                </span>
            </div>
            </div>
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
</div>


{/* ------------------------------------------------------------------------------------------------------------------------- */}
          {/* <div className="md:flex md:justify-between relative z-10">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center">
                <span className="flip self-center text-5xl font-bold whitespace-nowrap text-black">
                  Arohana
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6">
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase text-black">Hyperion</h2>
                <ul className="text-black font-medium">
                  <li className="mb-4">
                    <a
                      href="https://pgdavhyperion.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Official Website
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/hyperion_pgdav/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Instagram <FaInstagram className="inline-block" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://m.facebook.com/PGDAVhyperion?_rdr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Facebook <FaFacebook className="inline-block" />
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase text-black">PGDAV College</h2>
                <ul className="text-black font-medium">
                  <li className="mb-4">
                    <a
                      href="https://www.pgdavcollege.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Official Website
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com/pgdav_official"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Instagram <FaInstagram className="inline-block" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/profile.php?id=61552210954443"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Facebook <FaFacebook className="inline-block" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/pgdav_du"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Twitter <FaTwitter className="inline-block" />
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase text-black">Team</h2>
                <ul className="text-black font-medium">
                  <li className="mb-4">
                    <p onClick={() => handleTeamClick('core_team')} className="cursor-pointer hover:underline">
                      Hyperion - PGDAV
                    </p>
                  </li>
                  <li>
                    <p onClick={() => handleTeamClick('web_developer')} className="cursor-pointer hover:underline">
                      Website Development Team <br />
                      Techwhiz - IT Society
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}

          {/* <hr className="my-6 border-gray-500 sm:mx-auto" /> */}

          {/* <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-black sm:text-center">
              © 2024 <a href="https://pgdavhyperion.in/" className="hover:underline">Hyperion™</a>
            </span>
          </div> */}
        </div>
      </footer>

      {/* <Footer2 /> */}
    </div>
  );
};

export default Footer;
