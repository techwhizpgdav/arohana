import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import FAQSection from "./Faq";
import { Link } from "react-router-dom";
import { MobilePara } from "../../Functions/Constants";

const MobileHome = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const toggleAnswer = (index) => {
    if (index === clickedIndex) {
      setClickedIndex(null);
    } else {
      setClickedIndex(index);
    }
  };

  return (
    <>
      <div className="flex items-center h-20 justify-around bg-haldi-red text-white">
        <p>
          Registration is Live,{" "}
          <Link to={"/competitions"} className="font-bold">
            Participate Now
          </Link>{" "}
          !!!
        </p>
      </div>

      <div className="h-screen flex justify-center items-center mobileHome"></div>

      <div className="min-h-screen min-w-screen py-10 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 home-bg"></div>
        <div className="container mx-auto px-4 relative top-40 z-10">
          <div className="text-center">
            <div className="max-w-md mx-auto mb-8  bg-opacity-70 p-6 rounded-lg ">
              {/* <h1 className="text-3xl font-bold mb-4 font-serif">ABOUT US</h1>
              <p className="text-lg mb-10">{MobilePara}</p> */}
                {/* <div className="flex w-2/3 items-center justify-center text"> */}
                  {/* <!-- First Edition: Linear Gradient --> */}
                  <span className="absolute uppercase mx-auto py-4 flex border w-fit blur-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent text-6xl font-extrabold text-center select-none">
                    Curious about Arohana?
                  </span>
                  <h1 className="relative uppercase top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent text-6xl font-extrabold text-center select-auto">
                    Curious about Arohana?
                  </h1>
              </div>
            </div>
          </div>
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

        

      <div className="mt-20">
        {/* <Faq color={false} /> */}
        <FAQSection />
      </div>
    </>
  );
};

export default MobileHome;
