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
            <div className="text-center">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold mt-4 mb-8 text-white underline font-serif" data-aos="fade-up">Team</h1>
            </div>
            <div className="flex justify-center mb-4">
                <button className={`mr-4 px-4 py-2 rounded-lg ${activeTab === 'core_team' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} onClick={() => handleTabClick('core_team')}>Core Team</button>
                <button className={`px-4 py-2 rounded-lg ${activeTab === 'web_developer' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} onClick={() => handleTabClick('web_developer')}>Web Development Team</button>
            </div>
            <div className="w-full md:w-2/3 lg:w-3/4 mx-auto rounded-lg p-4 md:p-8 lg:p-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teams[activeTab].map((member, index) => (
                        <TeamCard key={index} member={member} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Teams;
