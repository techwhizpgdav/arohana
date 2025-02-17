import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import BottomPage from './BottomPage';
const DesktopHome = () => {

  return (
    <div  className='' >        

      <LandingPage />
      <div className=' -z-10'>
      <BottomPage />
      </div>
    </div>
  );
};

export default DesktopHome;
