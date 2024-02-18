
import React from 'react';
import { useEffect, useState } from 'react';
import Qrcode from '../../assets/qrcode.jpg';
import { Link } from 'react-router-dom';
const UserProfile = ({ user }) => {
  const { name, dob, collegeName, qrCode, email, email_verified_at, is_verified } = user;

  return (
    <div className="border rounded-md shadow-md p-4 h-3/4 ">
      <h2 className="text-3xl font-bold mb-20">Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="flex gap-2 mb-4 " 
          >
          <p className="font-bold">Name:</p>
          <p>{name}</p>
          </div>
          <div className="flex gap-2 mb-4" 
          >
          <p className="font-bold">Email:</p>
          <p>{email}</p>
          </div>
          <div className="flex gap-2 mb-4"
          >
          <p className="font-bold">Email Verification Status :</p>
          <p>{email_verified_at ? 'Verified' : 
                  <Link to = {'/verify'}  className=' bg-black p-1 rounded-lg text-white hover:bg-teal-600 transition-all duration-500 '>Verify Now</Link>
          }</p>
          </div>
          {/* <div className="flex gap-2 mb-4"
          >
          <p className="font-bold">Date of Birth:</p>
          <p>{dob}</p>
          </div> */}
          <div className="flex gap-2 mb-4"
          >
          <p className="font-bold">College:</p>
          <p>{collegeName}</p>
          </div>
          <div className="flex gap-2 mb-4"
          >
          <p className="font-bold">Sponsor Verified:</p>
          <p>{is_verified == 0 ? 'Pending' : 'Verified'
           }</p>
          </div>
        </div>
        <div className='flex gap-8 items-center justify-center flex-col  '>
          <p className="font-bold text-black">Unique QR Code</p>
          {!qrCode ? (
            <div className=' flex items-center justify-center flex-col'>
              <img src={Qrcode} alt="QR Code" className="w-32 h-32 "  />
              <p className="text-sm"> .</p>
            </div>
            
          ) : (
            <p>QR Code not available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
