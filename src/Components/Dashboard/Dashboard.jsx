import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import Api from "../../Functions/api";
import {
  FaUser,
  FaCalendar,
  FaUsers,
  FaRegFilePdf,
  FaBars,
  FaTimes,
} from "react-icons/fa";
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
  const { authUser, fetchApi } = Api();
  const [user, setUser] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [activeComponent, setActiveComponent] = useState("userProfile"); // Default value
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      id: "userProfile",
      label: "Profile",
      icon: <FaUser />,
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: "userEventDetails",
      label: "Participations",
      icon: <FaCalendar />,
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: "userTeams",
      label: "Teams",
      icon: <FaUsers />,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "userSubmission",
      label: "Submission",
      icon: <FaRegFilePdf />,
      color: "from-orange-500 to-rose-600",
    },
  ];

  // Handle initial component state and URL params
  useEffect(() => {
    if (id) {
      setActiveComponent(id);
    } else if (!location.pathname.includes("/dashboard/")) {
      // Set default active component if no ID in URL
      setActiveComponent("userProfile");
    }
  }, [id, location]);

  // Auth check and user data fetch
  useEffect(() => {
    const checkAndNavigate = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const userData = await authUser();
        // Deep compare to avoid unnecessary state updates
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

  if (isLoading) {
    return (
      <div className="min-h-screen  flex justify-center items-center bg-gray-50">
        <Spinner2 />
      </div>
    );
  }

  const handleMenuClick = (componentId) => {
    setActiveComponent(componentId);
    navigate(`/dashboard/${componentId}`);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
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
        className="text-xl font-bold text-gray-800 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg"
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
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow-md">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <div className="text-lg font-semibold text-gray-900">
          {menuItems.find((item) => item.id === activeComponent)?.label ||
            "Dashboard"}
        </div>
        <div className="w-8" />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transform lg:translate-x-0 fixed lg:relative z-30 w-80 min-h-screen bg-white shadow-lg transition-transform duration-300 ease-in-out`}
        >
          <div className="flex flex-col h-full">
            <div className="p-6">{renderGreeting()}</div>

            <nav className="flex-1 px-4 pb-4">
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeComponent === item.id
                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-105`
                        : "text-gray-600 hover:bg-gray-100"
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

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Welcome
              user={user}
              message={
                "Ready to make memories? Explore events and get involved!"
              }
            />
            {renderActiveComponent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
