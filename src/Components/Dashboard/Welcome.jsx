import React from "react";
import { useEffect, useState } from "react";
function WelcomeBanner({ user, message }) {
  const currentHour = new Date().getHours();
  const [greeting, setGreeting] = useState("");
  const [background, setBackground] = useState("from-blue-500 to-indigo-600");

  useEffect(() => {
    if (currentHour >= 0 && currentHour < 6) {
      setGreeting("Good Night");
      setBackground("from-gray-900 to-black"); // Late Night colors
    } else if (currentHour >= 6 && currentHour < 12) {
      setGreeting("Good Morning");
      setBackground("from-yellow-400 to-orange-500"); // Morning colors
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good Afternoon");
      setBackground("from-blue-400 to-violet-600"); // Afternoon colors
    } else {
      setGreeting("Good Evening");
      setBackground("from-indigo-600 to-violet-600"); // Evening colors
    }
  }, [currentHour]);

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-r  ${background} p-6 sm:p-8 rounded-lg mb-8 shadow-lg text-white backdrop-blur-sm`}
    >
      {/* Background Decoration */}
      <div className="absolute right-0 top-0 -mt-6 mr-12 opacity-30 pointer-events-none hidden xl:block">
        <svg width="280" height="180" xmlnsXlink="http://www.w3.org/1999/xlink">
          <defs>
            <linearGradient id="welcome-b" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop stopColor="#A5B4FC" offset="0%" />
              <stop stopColor="#818CF8" offset="100%" />
            </linearGradient>
          </defs>
          <circle cx="80" cy="80" r="70" fill="url(#welcome-b)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-wide">
          {greeting}, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="mt-2 text-gray-100 text-sm sm:text-base opacity-90">
          {message}
        </p>
      </div>
    </div>
  );
}

export default WelcomeBanner;
