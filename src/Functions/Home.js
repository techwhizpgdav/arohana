import React from 'react';
import { useState, useEffect } from 'react';

const HomeFunction = () => {
     const countdownDate = new Date('February 25, 2024 00:00:00').getTime();
     const [countdown, setCountdown] = useState(calculateCountdown());

useEffect(() => {
     const interval = setInterval(() => {
       setCountdown(calculateCountdown());
     }, 1000);
 
     return () => clearInterval(interval);
   }, []);

 function calculateCountdown() {
     const now = new Date().getTime();
     const distance = countdownDate - now;
     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
     const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
     const seconds = Math.floor((distance % (1000 * 60)) / 1000);
 
     return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
 const linkStyle = "py-2 px-4 inline-block no-underline text-2xl font-bold text-white bg-pink-200 rounded-lg transition-all duration-500 hover:bg-white hover:text-pink-200 hover:px-2 hover:rounded-lg mddmax:text-lg mddmax:mx-3 font-Calibri";

return ({countdown, linkStyle })
}

export default HomeFunction;