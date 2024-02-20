import React from 'react';

const InchargeCard = ({ member }) => {
  return (
    <div className="relative rounded-2xl p-5 mb-5 hover:scale-102 shadow-xl border-2 border-gray-200 transform hover:rotate-1">
      <div className="mx-auto overflow-hidden rounded-full" style={{ width: '50%', filter: 'drop-shadow(0 0 15px rgba(0, 0, 255, 0.5))', clipPath: 'circle(50%)' }}>
        <img
          // src={member.photo}
          src="https://i.pinimg.com/564x/90/1f/a2/901fa20c5e3c9c7d062cd6cd0346d804.jpg"
          alt={member.name}
          className="object-cover hover:scale-105 transition-transform rounded-full"
          style={{ width: '100%', height: '100%', clipPath: 'circle(50%)' }} />
      </div>
      <div className="flex flex-col mx-auto justify-center items-center mt-8 backdrop-filter backdrop-blur-lg bg-opacity-50 rounded-xl bg-gray-800 p-8">
        <h3 className="text-xl font-semibold text-white text-center">{member.name}</h3>
        <p className="text-black-500 text-center">{member.position}</p>
        </div>
      </div>
    // </div>
  )
}

export default InchargeCard;
