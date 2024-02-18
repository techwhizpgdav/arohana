import React from 'react'
import Dashboard from '../Components/Dashboard/Dashboard'
import MobileDasboard from '../Components/Dashboard/MobileDasboard'
import { useState, useEffect } from 'react'
const DashBoardPage = () => {


     const [isMobile, setIsMobile] = useState(false);
     useEffect(() => {
           if (window.innerWidth < 768) {
           setIsMobile(true);
           }
      }
     , []);
     

  return (
     <>
          {
               isMobile ? <MobileDasboard /> : <Dashboard />
          }

     </>
  )
}

export default DashBoardPage