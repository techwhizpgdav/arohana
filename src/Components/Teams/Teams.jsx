import React, { useState, useEffect } from 'react';
import teamData from './teamData.json';
import TeamCard from './TeamCard';
import './Team.css';
import { useLocation } from 'react-router-dom';

const Teams = () => {
    const { state } = useLocation();

    // Set default value for tab based on state
    const { tab } = state || { tab: 'core_team' };

    const [activeTab, setActiveTab] = useState(tab);
    const teams = {
        core_team: teamData.core_team,
        web_developer: teamData.web_developer,
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 772;

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return (
        <>
            {/* <!-- Teachers Section --> */}
        {width > breakpoint ? (
        <div className="py-20 ">
            <div className="container mx-auto px-6 md:px-12 xl:px-32">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-center text-2xl text-gray-900 font-bold md:text-4xl">Meet Our leadership</h2>
                    <p className="text-gray-600 lg:w-8/12 lg:mx-auto">Dedicated professionals guiding our team and inspiring success.</p>
                </div>
                <div className="grid gap-12 items-center md:grid-cols-3">
                    <div className="space-y-4 text-center">
                        <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64" 
                            src="https://i.pinimg.com/736x/a9/28/09/a92809b1860bc5e77faebbb7acebf1a2.jpg" alt="woman" loading="lazy" width="640" height="805"/>
                        <div>
                            <h4 className="text-2xl">Dr. Aparna Datt</h4>
                            <span className="block text-sm text-gray-500">Convenor</span>
                        </div>
                    </div>
                    <div className="space-y-4 text-center">
                        <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-48 md:h-64 lg:w-64 lg:h-80" 
                            src="https://pgdavplacementcell.in/images/Principal1.webp" alt="pricipal" loading="lazy" width="1000" height="667"/>
                        <div>
                            <h4 className="text-2xl">Prof. Krishna Sharma</h4>
                            <span className="block text-sm text-gray-500">Principal</span>
                        </div>
                    </div>
                    <div className="space-y-4 text-center">
                        <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64" 
                            src="https://i.pinimg.com/736x/a9/28/09/a92809b1860bc5e77faebbb7acebf1a2.jpg" alt="woman" loading="lazy" width="1000" height="667"/>
                        <div>
                            <h4 className="text-2xl">Mr. Jagannath Kashyap</h4>
                            <span className="block text-sm text-gray-500">Co-Convenor</span>
                        </div>
                    </div>
                </div>
            </div>
        </div> ):(
        <div className="py-20 ">
        <div className="container mx-auto px-6 md:px-12 xl:px-32">
            <div className="mb-16 text-center">
                <h2 className="mb-4 text-center text-2xl text-gray-900 font-bold md:text-4xl">Meet Our leadership</h2>
                <p className="text-gray-600 lg:w-8/12 lg:mx-auto">Dedicated professionals guiding our team and inspiring success.</p>
            </div>
            <div className="grid gap-12 items-center md:grid-cols-3">
            <div className="space-y-4 text-center">
                    <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-48 md:h-64 lg:w-64 lg:h-80" 
                        src="https://pgdavplacementcell.in/images/Principal1.webp" alt="pricipal" loading="lazy" width="1000" height="667"/>
                    <div>
                        <h4 className="text-2xl">Prof. Krishna Sharma</h4>
                        <span className="block text-sm text-gray-500">Principal</span>
                    </div>
                </div>

                <div className="space-y-4 text-center">
                    <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64" 
                        src="https://i.pinimg.com/736x/a9/28/09/a92809b1860bc5e77faebbb7acebf1a2.jpg" alt="woman" loading="lazy" width="640" height="805"/>
                    <div>
                        <h4 className="text-2xl">Dr. Aparna Datt</h4>
                        <span className="block text-sm text-gray-500">Convenor</span>
                    </div>
                </div>
                
                <div className="space-y-4 text-center">
                    <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64" 
                        src="https://i.pinimg.com/736x/a9/28/09/a92809b1860bc5e77faebbb7acebf1a2.jpg" alt="woman" loading="lazy" width="1000" height="667"/>
                    <div>
                        <h4 className="text-2xl">Mr. Jagannath Kashyap</h4>
                        <span className="block text-sm text-gray-500">Co-Convenor</span>
                    </div>
                </div>
            </div>
        </div>
    </div>)}

            {/* Tab Buttons */}
            <div className="flex justify-center mx-4 flex-col sm:flex-row">
                <button 
                    className={`mr-4 px-6 py-3 mb-4 sm:mb-0 w-full font-bold rounded-lg shadow-lg whitespace-normal ${activeTab === 'core_team' ? 'bg-yellow-500 text-white hover:scale-105' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
                    onClick={() => handleTabClick('core_team')}
                >
                    Core Team
                </button>
                <button 
                    className={`px-6 py-3 w-full font-bold rounded-lg shadow-lg whitespace-normal ${activeTab === 'web_developer' ? 'bg-yellow-500 text-white hover:scale-105' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
                    onClick={() => handleTabClick('web_developer')}
                >
                    Web Development Team
                </button>
            </div>

            {/* Render the correct team data */}
            <div className="rounded-lg p-6 lg:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teams[activeTab].map((member, index) => (
                        <TeamCard key={index} member={member} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Teams;
