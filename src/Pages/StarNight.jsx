import React from "react";
import Instagram from "../Components/StarNight/Instagram";

const StarNight = () => {
  return (
    <div className="bg-black flex flex-col items-center justify-center absolute w-[100%]">
      <div className="flex flex-col items-center relative">
        <video autoPlay muted loop className="absolute w-[100%] h-[100%]">
          <source src="https://arohana1.b-cdn.net/main.mp4" type="video/mp4" />
        </video>
        <h1 className="text-[22rem] text-white bebas bg-[#000] tracking-wide leading-[100vh] mix-blend-multiply">
          STAR NIGHT
        </h1>
        <h2 className="text-gray-200 absolute bottom-[22%] text-5xl tracking-wide raleway fancy-cursor">
          ASH KING | RAVATEK
        </h2>
      </div>

      <div className="h-[60rem] bg-[#121212] min-w-full">
        <div className="flex flex-col items-center">
          <div className="mb-8 flex flex-col min-w-full items-center">
            <div className="flex flex-row items-center min-w-full relative top-36 justify-evenly text-[5rem] neonText">
              <div className="uppercase text-center absolute text-[#121212] syncopate tracking-widest">
                arohana '24
              <img
                src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg"
                style={{width: '24px', height: '24px', margin: '2rem auto'}}
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarNight;
