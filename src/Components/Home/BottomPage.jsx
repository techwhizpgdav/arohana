import React from 'react'
import './Bottom.css'
import { useState } from 'react';
import background1 from '../../assets/Bg-bottom1.jpg'
import { MobilePara } from '../../Functions/Constants';
import Faq from './Faq';
import { useNavigate } from 'react-router-dom';
const BottomPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [changeColor, setChangeColor] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    setChangeColor(event.target.checked);
  };
  return (
    <>
    
    <div className="bottomPage">
    <input type="checkbox" onChange={handleCheckboxChange} />

     <div className="video">
      
      <img className='source opacity-100' src={background1}>
      </img>

     </div>
     <div className="text">
          <span data-text="Curious about Arohana?"></span>
     </div>
      
        <p className={` absolute text-white m-28 p-10 rounded-lg ${ !isChecked ? 'opacity-0' :''} duration-500  transition-all`}  style={{backgroundColor: 'rgba(0,0,0,0.7)'}}>
          {MobilePara}
        </p>
      
     </div>   

    <div>
    <Faq color = {changeColor} />

    </div>

    </>
  )
}

export default BottomPage