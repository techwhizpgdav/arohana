import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../Functions/api";
import Spinner2 from "../ShimmerAndSpinner/Spinner2";
import {
  FaCheckCircle,
  FaClock,
  FaUser,
  FaUsers,
  FaExternalLinkAlt,
} from "react-icons/fa";

const UserEventDetails = ({ user }) => {
  const { fetchApi } = Api();
  const [step, setStep] = useState(1);
  const [participatedEvents, setParticipatedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user?.email_verified_at) {
      setStep(2);
    } else {
      setIsLoading(true);
      setStep(4);
      fetchApi("get", "api/participations")
        .then((data) => {
          setParticipatedEvents(data?.data?.data[0]?.competitions || []);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  if (user?.length === 0 || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner2 />
      </div>
    );
  }

  // Email not verified state
  if (step === 2) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 p-4">
        <div className="text-center space-y-4">
          <FaCheckCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">
            Email Verification Required
          </h2>
          <p className="text-gray-600 max-w-md">
            Please verify your email address to access your event details
          </p>
        </div>
        <Link
          to="/verify"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-gray-600 px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 
                     transition-all duration-300 shadow-lg"
        >
          Verify Email Now
        </Link>
      </div>
    );
  }

  // Waiting for admin verification
  if (step === 3) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <FaClock className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">
            Verification in Progress
          </h2>
          <p className="text-gray-600">
            Your email has been verified. Please wait while admin verifies your
            account and sponsorship tasks.
          </p>
        </div>
      </div>
    );
  }

  // No events state
  if (participatedEvents.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 p-4">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUser className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">No Events Yet</h2>
          <p className="text-gray-600 max-w-md">
            You haven't participated in any events. Start your journey now!
          </p>
        </div>
        <Link
          to="/competitions"
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-gray-600 px-6 py-3 rounded-lg hover:from-blue-500 hover:to-cyan-600 hover:text-white transition-all duration-300 shadow-lg"
        >
          Explore Events
        </Link>
      </div>
    );
  }

  // Main events display
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Your Event Participations
        </h1>
        <p className="mt-3 text-gray-500">
          Track and manage your event participation details
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {participatedEvents.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                  #{index + 1}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    event?.pivot?.allowed
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {event?.pivot?.allowed ? "Approved" : "Pending"}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-4 line-clamp-2">
                {event?.title}
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  {event?.pivot?.team_name ? (
                    <FaUsers className="mr-2" />
                  ) : (
                    <FaUser className="mr-2" />
                  )}
                  <span>
                    {event?.pivot?.team_name
                      ? `Team Size: ${event?.pivot?.team_size}`
                      : "Solo Participation"}
                  </span>
                </div>
              </div>

              <Link
                to={`/competition/${event?.id}`}
                className="flex items-center justify-center w-full bg-gradient-to-r from-indigo-500 to-indigo-600 
                         text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-indigo-700 
                         transition-all duration-300 group"
              >
                View Details
                <FaExternalLinkAlt className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserEventDetails;
