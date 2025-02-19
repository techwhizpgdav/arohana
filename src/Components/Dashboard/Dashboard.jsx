import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import Api from "../../Functions/api";
import { FaUser, FaCalendar, FaUsers, FaRegFilePdf } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

// Components
import UserProfile from "./UserProfile";
import UserEventDetails from "./UserEventDetails";
import UserTeams from "./UserTeams";
import Welcome from "./Welcome";
import Submission from "./Submission";
import Spinner2 from "../ShimmerAndSpinner/Spinner2";

const Dashboard = () => {
  const { authUser } = Api();
  const [user, setUser] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [activeComponent, setActiveComponent] = useState("userProfile");

  const menuItems = [
    {
      id: "userProfile",
      label: "Profile",
      icon: <FaUser />,
      inactiveColor: "text-blue-500",
      activeBg: "bg-gradient-to-r from-blue-500 to-cyan-600",
      mobileBg: "bg-blue-500",
    },
    {
      id: "userEventDetails",
      label: "Events",
      icon: <FaCalendar />,
      inactiveColor: "text-cyan-600",
      activeBg: "bg-gradient-to-r from-cyan-500 to-cyan-600",
      mobileBg: "bg-cyan-600",
    },
    {
      id: "userTeams",
      label: "Teams",
      icon: <FaUsers />,
      inactiveColor: "text-green-500",
      activeBg: "bg-gradient-to-r from-green-500 to-emerald-600",
      mobileBg: "bg-green-500",
    },
    {
      id: "userSubmission",
      label: "Submissions",
      icon: <FaRegFilePdf />,
      inactiveColor: "text-orange-500",
      activeBg: "bg-gradient-to-r from-orange-500 to-rose-600",
      mobileBg: "bg-orange-500",
    },
  ];

  useEffect(() => {
    if (id) {
      setActiveComponent(id);
    } else if (!location.pathname.includes("/dashboard/")) {
      setActiveComponent("userProfile");
    } else {
      navigate("/dashboard/userProfile");
    }
  }, [id, location]);

  useEffect(() => {
    const checkAndNavigate = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const userData = await authUser();
        if (JSON.stringify(userData) !== JSON.stringify(user)) {
          setUser(userData);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Auth error:", error);
        navigate("/login");
      }
    };
    checkAndNavigate();
  }, [navigate, authUser]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
  }, []);

  // Scroll to top on component change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeComponent]);
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <Spinner2 />
      </div>
    );
  }

  const handleMenuClick = (componentId) => {
    setActiveComponent(componentId);
    navigate(`/dashboard/${componentId}`);
  };

  const renderGreeting = () => (
    <div className="mb-8">
      <TypeAnimation
        sequence={[
          `Namaste ${user?.name?.split(" ")[0]} 🙏`,
          4000,
          `Hola ${user?.name?.split(" ")[0]} 👋`,
          4000,
          `Hello ${user?.name?.split(" ")[0]} 👐`,
          4000,
          `Bonjour ${user?.name?.split(" ")[0]} 👋`,
          4000,
        ]}
        wrapper="div"
        speed={10}
        className="text-xl font-bold text-gray-800 bg-white/80 backdrop-blur rounded-lg p-4 shadow-lg"
        repeat={3}
      />
    </div>
  );

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "userProfile":
        return <UserProfile user={user} />;
      case "userEventDetails":
        return <UserEventDetails user={user} />;
      case "userTeams":
        return <UserTeams user={user} />;
      case "userSubmission":
        return <Submission user={user} />;
      default:
        return <UserProfile user={user} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="flex h-full">
        {/* Sidebar for desktop */}
        <aside className="hidden lg:block w-80 min-h-screen bg-white shadow-lg">
          <div className="sticky top-0 flex flex-col h-screen overflow-y-auto">
            <div className="p-6">{renderGreeting()}</div>
            <nav className="flex-1 px-4 pb-4">
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeComponent === item.id
                        ? `${item.activeBg} text-white shadow-lg scale-105`
                        : `${item.inactiveColor} hover:bg-gray-100`
                    }`}
                  >
                    <span className="text-lg mr-3">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 pb-20 lg:pb-8 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl  mx-auto">
            <Welcome
              user={user}
              message="Ready to make memories? Explore events and get involved!"
            />
            {renderActiveComponent()}
          </div>
        </main>
      </div>

      {/*Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <nav className="bg-white border-t border-gray-200 shadow-lg">
          <div className="flex items-center justify-around h-16">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className="flex flex-col items-center justify-center py-2 px-4 w-full transition-colors duration-200"
              >
                <div
                  className={`p-1.5 rounded-full transition-all duration-200 ${
                    activeComponent === item.id
                      ? `${item.mobileBg} text-white`
                      : item.inactiveColor
                  }`}
                >
                  {item.icon}
                </div>
                <span
                  className={`text-xs mt-1 ${
                    activeComponent === item.id
                      ? "font-semibold text-gray-900"
                      : "text-gray-600"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
