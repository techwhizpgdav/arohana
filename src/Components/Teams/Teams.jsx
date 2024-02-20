// Teams.js
import React, { useState } from 'react';
import teamData from './teamData.json';
import TeamCard from './TeamCard';
import './Team.css';

const Teams = () => {
    const [activeTab, setActiveTab] = useState('core_team');
    const teams = {
        core_team: teamData.core_team,
        web_developer: teamData.web_developer,
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="w-full flex flex-col items-center team-wrapper">
            <div className="py-5">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold mt-4 mb-8 text-white underline font-serif" data-aos="fade-up">Team</h1>
            </div>

            {/* Principal Card */}
            <div className="flex flex-col items-center mb-8">
                <h2 className="text-3xl font-bold">Principal</h2>
                <div className="mx-auto overflow-hidden rounded-full shadow-lg border-4 border-orange-600" style={{ width: '60%' }}>
                    <img
                        src="https://www.pgdavcollege.in/assets/front/images/principaldesk.jpg"
                        className="object-cover transition-transform rounded-full hover:scale-105"
                        style={{ width: '100%', height: '100%', clipPath: 'circle(50%)' }} />
                </div>
                <p className="mt-4 text-xl font-bold text-center">Prof. Krishna Sharma</p>
            </div>

            {/* Faculty Mentors */}
            <div className="flex flex-col items-center mb-8">
                <h2 className="text-3xl font-bold">Faculty Mentors</h2>
                <div className="flex justify-between gap-8">
                    <div className="mx-auto overflow-hidden rounded-full shadow-lg border-4 border-orange-600" style={{ width: '40%' }}>
                        <img
                            src="https://www.pgdavcollege.in/assets/front/images/principaldesk.jpg"
                            className="object-cover transition-transform rounded-full hover:scale-105"
                            style={{ width: '100%', height: '100%', clipPath: 'circle(50%)' }} />
                        <p className="mt-4 text-xl font-bold text-center">Prof. Krishna Sharma</p>
                    </div>
                    <div className="mx-auto overflow-hidden rounded-full shadow-lg border-4 border-orange-600" style={{ width: '40%' }}>
                        <img
                            src="https://www.pgdavcollege.in/assets/front/images/principaldesk.jpg"
                            className="object-cover transition-transform rounded-full hover:scale-105"
                            style={{ width: '100%', height: '100%', clipPath: 'circle(50%)' }} />
                        <p className="mt-4 text-xl font-bold text-center">Prof. Krishna Sharma</p>
                    </div>
                </div>
            </div>

            {/* Tab Buttons */}
            <div className="flex justify-center mb-4">
                <button className={`mr-4 px-4 py-2 rounded-full ${activeTab === 'core_team' ? 'bg-orange-600 text-white' : 'bg-gray-300 '}`} onClick={() => handleTabClick('core_team')}>Core Team</button>
                <button className={`px-4 py-2 rounded-full ${activeTab === 'web_developer' ? 'bg-orange-600 text-white' : 'bg-gray-300 '}`} onClick={() => handleTabClick('web_developer')}>Web Development Team</button>
            </div>

            {/* Team Cards */}
            <div className="w-full md:w-2/3 lg:w-3/4 mx-auto rounded-lg p-4 md:p-8 lg:p-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
                    {teams[activeTab].map((member, index) => (
                        <TeamCard key={index} member={member} />
                    ))}
                </div>
            </div>
        </div>

    );
};


export default Teams;
