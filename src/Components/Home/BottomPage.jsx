import React, { useState, useEffect } from 'react';
import './Bottom.css';
import background1 from '../../assets/Bg-bottom1.jpg';
import { MobilePara } from '../../Functions/Constants';
import Faq from './Faq';
import { useNavigate } from 'react-router-dom';
import FAQSection from './Faq';

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

  return (
    <>
      <div className="bottomPage">
        <input type="checkbox" onChange={handleCheckboxChange} />

        <div className="video ">
          <img className='source opacity-100' src='https://arohana1.b-cdn.net/Bg-bottom1%20(1).jpg' alt="Background" />
        </div>

        <div class="flex w-2/3 items-center justify-center text">
            {/* <!-- First Edition: Linear Gradient --> */}
            <span class="absolute mx-auto py-4 flex border w-fit blur-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent text-6xl font-extrabold text-center select-none">
                Curious about Arohana?
            </span>
            <h1 class="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent text-6xl font-extrabold text-center select-auto">
                Curious about Arohana?
            </h1>
        </div>



        <p className={`absolute text-white m-28 p-10 rounded-lg ${!isChecked ? 'opacity-0' : ''} duration-500 transition-all`} style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          {MobilePara}
        </p>
      </div>

      {/* <div>
        <Faq color={changeColor} />
      </div> */}

      {/* New FaqSection is right below the export Default Bottom Page... */}
      <div className='mt-4 mb-24'>
      <FAQSection />
      </div>
    </>
  );
};

export default BottomPage;
