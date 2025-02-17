import React, { useState, useEffect } from 'react';
import './Bottom.css';
import background1 from '../../assets/Bg-bottom1.jpg';
import Faq from './Faq';
import { useNavigate } from 'react-router-dom';
import FAQSection from './Faq';
import { MobilePara } from "../../Functions/Constants";

const BottomPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [changeColor, setChangeColor] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    setChangeColor(event.target.checked);
  };

  useEffect(() => {
    if (window.HSAccordion) {
      window.HSAccordion.init();
    }
  }, []);
  const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 772;
    useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth)
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

  return (
    <>
    <div className="bottomPage">
        <input type="checkbox" onChange={handleCheckboxChange} />

        <div className="video ">
          <img className='source opacity-100' src='https://arohana1.b-cdn.net/Bg-bottom1%20(1).jpg' alt="Background" />
        </div>

        <div class="flex w-2/3 mt-16 mb-16 items-center justify-center text">
            {/* <!-- First Edition: Linear Gradient --> */}
            <span class="absolute mx-auto py-4 flex border w-fit blur-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent text-6xl font-extrabold text-center select-none">
                Curious about Arohana?
            </span>
            <h1 class="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent text-6xl font-extrabold text-center select-auto">
                Curious about Arohana?
            </h1>
        </div>
        {/* <div class="grid md:grid-cols-2 items-center md:gap-4 gap-8 font-[sans-serif] max-w-5xl max-md:max-w-md mx-auto">
          <p className={`absolute text-white m-28 p-10 rounded-lg ${!isChecked ? 'opacity-0' : ''} duration-500 transition-all`} style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
            {MobilePara}
          </p>
         </div> */}

      {/* <div>
        <Faq color={changeColor} />
      </div> */}

    </div>
    <div className="grid mt-12 mb-12 pt-6 pb-6 sm:pt-12 sm:pb-12 md:grid-cols-2 items-center md:gap-6 gap-8 font-[sans-serif] max-w-5xl max-md:max-w-md mx-auto">
  <div className="max-md:order-1 max-md:text-center px-4">
    <h3 className="text-gray-800 font-bold md:text-3xl text-2xl md:leading-10 leading-relaxed">
      <q>Ārohaṇa: A Celebration of Culture</q>
    </h3>
    <div className="mt-4 text-gray-600 text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: MobilePara }}></div>
  </div>
  <div className="md:h-[400px] h-[250px] flex justify-center">
    <img 
      src="https://readymadeui.com/photo.webp" 
      className="w-[80%] sm:w-full h-full object-cover rounded-lg shadow-lg" 
      alt="Arohana Event"
    />
  </div>
</div>

      {/* New FaqSection is right below the export Default Bottom Page... */}
      <div className='mt-4 mb-24'>
        <FAQSection />
      </div>
      
    </>
  );
};

export default BottomPage;
