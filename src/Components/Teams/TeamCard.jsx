import React from 'react';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

const TeamCard = ({ member }) => {
  return (
    <div className="relative rounded-2xl p-5 mb-5 hover:scale-102 transition-transform bg-gradient-to-br from-brown to-black shadow-xl border-2 border-gray-200 transform hover:rotate-1">
      <div className="mx-auto overflow-hidden rounded-full border-4 border-gray-200 hover:border-blue-400" style={{ width: '50%', filter: 'drop-shadow(0 0 15px #000)' }}>
        <img
          // src={member.photo}
          src="https://i.pinimg.com/564x/90/1f/a2/901fa20c5e3c9c7d062cd6cd0346d804.jpg"
          alt={member.name}
          className="transform scale-105 object-cover hover:scale-105 transition-transform rounded-full"
          style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="flex flex-col mx-auto justify-center items-center mt-8" style={{ background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)', borderRadius: '8px', padding: '15px' }}>
        <h3 className="text-xl font-semibold text-white text-center">{member.name}</h3>
        <p className="text-orange-500 text-center">{member.position}</p>
        {member.role && <p className="text-orange-500 text-center">{member.role}</p>}
        {member.mobile && <p className="text-black text-center">Mobile: {member.mobile}</p>}
        <div className='flex justify-center gap-2 mt-4'>
          {member.instagram && <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition-colors"><FaInstagram size={24} /></a>}
          {member.github && <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition-colors"><FaGithub size={24} /></a>}
          {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition-colors"><FaLinkedin size={24} /></a>}
        </div>
      </div>
    </div>
  )
}

export default TeamCard;
