import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
const colors = [
  "#FF4500", // Orange Red
  "#1E90FF", // Dodger Blue
  "#32CD32", // Lime Green
  "#FFD700", // Gold
  "#FF1493", // Deep Pink
  "#8A2BE2", // Blue Violet
  "#00FFFF", // Aqua
  "#FF6347", // Tomato
  "#7FFF00", // Chartreuse
  "#DC143C", // Crimson
];

let colorIndex = 0; // Global counter to track color selection

const TeamCard = ({ member }) => {
  const { name, position, role, photo, instagram, linkedin, github } = member;

  // Select color in sequence and update index
  const borderColor = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length; // Reset if at the end

  return (
    <div className="team-card text-center">
      <div
        style={{ borderColor }}
        className="border-x-4 border-y-4 rounded-full p-1 inline-block"
      >
        <div className="border border-white rounded-full p-1">
          <img
            src={
              photo ||
              "https://i.pinimg.com/736x/a9/28/09/a92809b1860bc5e77faebbb7acebf1a2.jpg"
            }
            alt={name}
            loading="lazy"
            className="rounded-full w-40 h-40 object-cover"
          />
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-2xl font-semibold">{name}</h4>
        <span className="block text-sm text-gray-500">{position}</span>
        {role && <span className="block text-sm text-gray-500">{role}</span>}

        <div className="mt-1 space-x-4 flex justify-center">
          {instagram && (
            <Link to={instagram} target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-xl text-gray-600 hover:text-fuchsia-500" />
            </Link>
          )}
          {linkedin && (
            <Link to={linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-xl text-gray-600 hover:text-linear-darkBlue" />
            </Link>
          )}
          {github && (
            <Link to={github} target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-xl text-gray-600 hover:text-black" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
