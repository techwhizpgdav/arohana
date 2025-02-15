import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Api from "../../Functions/api";
import { useEffect, useState } from "react";
import Spinner2 from "../ShimmerAndSpinner/Spinner2";
import PopOver from "./Popover";
const UserTeams = ({ user }) => {
  const navigate = useNavigate();
  const { authUser, fetchApi } = Api();
  const [step, setStep] = useState(1);
  const [participatedEvents, setParticipatedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  if (user?.length === 0) {
    return <Spinner2 />;
  }
  // * Uncomment this code after working on this section

  useEffect(() => {
    // Only proceed if user is verified and teams data hasn't been fetched yet
    if (user?.email_verified_at && participatedEvents.length === 0) {
      setIsLoading(true);

      const fetchData = async () => {
        try {
          const data = await fetchApi("get", `api/my-team`);
          setParticipatedEvents(data?.data.data || []);
        } catch (error) {
          console.error("API request failed:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [user?.email_verified_at]); 

  if (isLoading) {
    return (
      <div className="absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner2 />
      </div>
    );
  }

  if (step == 2) {
    return (
      <div className="flex flex-col items-center gap-10 justify-center">
        <p>Please verify your email to continue</p>
        <Link
          to={"/verify"}
          className=" bg-black p-2 rounded-lg text-white hover:bg-teal-600 transition-all duration-500 "
        >
          Verify Email
        </Link>
      </div>
    );
  }

  if (step == 3) {
    return (
      <div className="flex flex-col items-center justify-center pt-20">
        <p>
          Your email has been verified, please wait for the admin to verify your
          account and Sponshirship tasks.
        </p>
      </div>
    );
  }

  if (participatedEvents?.length == 0) {
    return (
      <div className="flex flex-col items-center justify-center pt-20 text-center space-y-4">
        <p className="text-lg text-gray-700 max-w-md">
          You are not in any team yet. Participate in events to join a team!
        </p>
        <Link
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all duration-300 shadow-md"
          to="/categories"
        >
          Participate Now
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className=" flex w-full justify-center text-3xl font-semibold text-gray-700">
        Teams
      </h1>

      <div className="flex flex-wrap items-center gap-44 justify-center pt-20 pb-40">
        {participatedEvents?.map((event, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-10 border-2 border-black rounded-2xl  p-6 smmax:p-4"
          >
            {
              <>
                <div className="flex justify-between w-80 items-center ">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-700 max-w-40 overflow-hidden">
                      {event?.title.split(" ").slice(0, 1).join(" ")}
                    </h2>
                    <h3>{event?.team_name}</h3>
                  </div>
                  <div>
                    <PopOver details={event} />
                  </div>
                  <div></div>
                </div>
              </>
            }
          </div>
        ))}
      </div>
    </>
  );
};

export default UserTeams;
