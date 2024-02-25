import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [isOnDashboard, setIsOnDashboard] = useState(false);

    useEffect(() => {
        const checkAndNavigate = async () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };
        checkAndNavigate();
    }, [navigate]);

    useEffect(() => {
        setIsOnDashboard(location.pathname === '/dashboard/userTeams');
    }, [location]);

    const handleTeamClick = (tab) => {
        navigate(`/teams`, { state: { tab } });
    }

    const footerClass = isOnDashboard ? 'bg-gradient-to-r to-linear-lightBlue from-linear-darkBlue' : (isLoggedIn ? 'bg-gradient-to-r from-haldi-orange to-haldi-red' : 'bg-gradient-to-r from-haldi-yellow to-haldi');
    const textColor = 'white';

    return ( 
        <div className="bottom-0">
            <footer className={footerClass}>
                <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                    <div className="md:flex md:justify-between">
                        <div className="mb-6 md:mb-0">
                            <Link to="/" className="flex items-center">
                                <span className={`flip self-center text-5xl font-bold whitespace-nowrap text-${textColor}`}>Arohana</span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6">
                            <div>
                                <h2 className={`mb-6 text-sm font-semibold text-${textColor} uppercase dark:text-${textColor}`}>Hyperion</h2>
                                <ul className={`text-${textColor} dark:text-${textColor} font-medium`}>
                                    <li className="mb-4">
                                        <a href="https://pgdavhyperion.in/" target="_blank" rel="noopener noreferrer" className="hover:underline">Official Website</a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/hyperion_pgdav/" target="_blank" rel="noopener noreferrer" className="hover:underline ">Instagram <FaInstagram style={{ display: 'inline-block' }} /></a>
                                    </li>
                                    <li>
                                        <a href="https://m.facebook.com/PGDAVhyperion?_rdr" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook <FaFacebook style={{ display: 'inline-block' }} /></a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className={`mb-6 text-sm font-semibold text-${textColor} uppercase dark:text-${textColor}`}>PGDAV College</h2>
                                <ul className={`text-${textColor} dark:text-${textColor} font-medium`}>
                                    <li className="mb-4">
                                        <a href="https://www.pgdavcollege.in/" target="_blank" rel="noopener noreferrer" className="hover:underline">Official Website</a>
                                    </li>
                                    <li>
                                        <a href="https://instagram.com/pgdav_official?igshid=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer" className="hover:underline ">Instagram <FaInstagram style={{ display: 'inline-block' }} /></a>
                                    </li>
                                    <li>
                                        <a href="https://www.facebook.com/profile.php?id=61552210954443" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook <FaFacebook style={{ display: 'inline-block' }} /></a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/pgdav_du?t=QoxPFIejTy2cu_L10Fxygg&s=08" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter <FaTwitter style={{ display: 'inline-block' }} /></a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className={`mb-6 text-sm font-semibold text-${textColor} uppercase dark:text-${textColor}`}>Team</h2>
                                <ul className={`text-${textColor} dark:text-${textColor} font-medium`}>
                                    <li className="mb-4">
                                        <p onClick={() => handleTeamClick("core_team")} className="cursor-pointer hover:underline">Hyperion - PGDAV</p>
                                    </li>
                                    <li>
                                        <p onClick={() => handleTeamClick("web_developer")} className="cursor-pointer hover:underline">Website Development Team <br />
                                        Techwhiz - IT Society</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr className={`my-6 border-${footerClass}-500 sm:mx-auto dark:border-${textColor}`} />
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <span className={`text-sm text-${textColor}-500 sm:text-center dark:text-${textColor}`}></span>
                        <span className={`text-sm text-${textColor} sm:text-center dark:text-${textColor}`}>© 2024 <a href="https://pgdavhyperion.in/" className="hover:underline">Hyperion™</a></span>
                        <div className="flex mt-4 sm:justify-center sm:mt-0"></div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
