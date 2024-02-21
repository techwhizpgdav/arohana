import React, { useState } from "react";

const Rules = ({ rounds }) => {
  const [selectedRound, setSelectedRound] = useState(rounds[0]?.id);

  const handleTabClick = (roundId) => {
    setSelectedRound(roundId);
  };

  return (
    <div className="mb-20">
      <div className="flex justify-around items-center flex-wrap mt-8">
        {rounds.map((round) => (
          <button
            key={round.id}
            className={`bg-haldi-orange  text-white font-bold py-3 px-5 rounded mx-2 transition duration-300 ease-in-out transform hover:scale-105 ${
              selectedRound === round?.id ? "opacity-100" : " opacity-50"
            }`}
            onClick={() => handleTabClick(round?.id)}
          >
            {round.name}
          </button>
        ))}
      </div>
      <div className="mt-8">
        {rounds.map((round) => (
          <div
            key={round?.id}
            className={selectedRound === round.id ? "block" : "hidden"}
          >
            <h2 className="text-xl mt-4 uppercase"> Mode: {round?.mode}</h2>
            <ul className="mt-2 list-disc mdmax:pl-4">
              {round?.rules.map((rule, index) =>
                rule?.statement?.includes("https") ? (
                  <li className=" max-w-96 font-semibold mt-4 mb-2 overflow-hidden">

                   <a href={rule?.statement}  target="blanc" className=""> {rule?.statement}</a>
                  </li>
                ) : (
                  <li className="mt-2 " key={index}>
                    {rule?.statement}
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rules;
