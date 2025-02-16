import React from "react";
import Api from "../../Functions/api";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserProfile from "./UserProfile";
import UserEventDetails from "./UserEventDetails";
import UserTeams from "./UserTeams";
import Welcome from "./Welcome";
import "./Dashboard.css";
import "../../Button.css";
import { TypeAnimation } from "react-type-animation";
import { useLocation } from "react-router-dom";
import Spinner2 from "../ShimmerAndSpinner/Spinner2";
import Submission from "./Submission";
const MobileDasboard = () => {
  const { authUser } = Api();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeComponent, setActiveComponent] = useState("");
  const [hamOpen, setHamOpen] = useState(true);

  useEffect(() => {
    document.querySelectorAll("button").forEach((button) => {
      button.innerHTML =
        "<div><span>" +
        button.textContent.trim().split("").join("</span><span>") +
        "</span></div>";
    });
  }, [navigate, hamOpen, activeComponent, user]);

  if (isLoading) {
    return (
      <div className="dashboard-hero flex justify-center h-screen items-center text-white">
        <Spinner2 />
      </div>
    );
  }

  return (
    <>
      <div className="z-30 flex justify-between items-center h-16 bg-gradient-to-r to-linear-lightBlue from-linear-darkBlue text-white dashboard mdmax:pr-2 mdmax:flex-row-reverse">
        <div
          className={`hamburger ${hamOpen ? "is-active" : ""}`}
          onClick={() => setHamOpen(!hamOpen)}
        >
          <div className="hamburger__container">
            <div className="hamburger__inner"></div>
            <div className="hamburger__hidden"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileDasboard;
