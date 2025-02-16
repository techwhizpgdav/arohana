import React from 'react';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

const TeamCard = ({ member }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden hover:shadow-xl transform hover:scale-105 transition-transform bg-white w-[280px]">
      <div className='p-16 bg-gradient-to-b from-haldi-red/70 to-haldi-red rounded-3xl'></div>
      <div className="mx-auto overflow-hidden -translate-y-16 rounded-full p-1 bg-white" style={{ width: '100px', height: '100px'}}>
          <img
              src={member.photo}
              alt={member.name}
              className="object-cover hover:scale-105 transition-transform rounded-full border-4 border-haldi-red"
              style={{ width: '100%', height: '100%', clipPath: 'circle(50%)' }}
          />
      </div>
      <div className='-mt-8 p-8 pt-0'>
          <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold text-center">{member.name}</h3>
              <p className="font-medium">{member.position}</p>
              <span className='w-full h-1 bg-haldi-red mt-2 rounded-full'></span>
              <div className="flex justify-center items center gap-2 mt-4 text-2xl">
                {member.instagram && <a href={member.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>}
                {member.github && <a href={member.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>}
                {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>}
              </div>
          </div>
      </div>
    </div>
  );
}

export default TeamCard;

// {
//   "name": "Yesshasvi Pandita",
//   "position": "Technical Head",
//   "mobile": "8209857354",
//   "photo": "https://arohana1.b-cdn.net/Hyperion%20Core%20Team/WhatsApp%20Image%202023-08-15%20at%2012.50.30%20PM.jpeg.jpg",
//   "instagram": "https://www.instagram.com/yeshassavi_pandita/",
//   "linkedin": "https://www.linkedin.com/in/yeshassavi-pandita-b632741b3/"
// },