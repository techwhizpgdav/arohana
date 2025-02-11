import React, { useState, useEffect } from "react";
import Api from "../../Functions/api";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import CategoryCards from "./CategoryCards";
import Spinner2 from "../ShimmerAndSpinner/Spinner2";
import { Heart, Share } from "lucide-react";
import { Link } from "react-router-dom";
// /api/categories -> getting heading for events  - id - name // 1 dance
// /api/category-competitions/:id fetch all data to
const Categories = () => {
  const { fetchApi, isLoading } = Api();
  const navigate = useNavigate();
  const [competitions, setCompetitions] = useState([]);
  const [length, setLength] = useState(0);
  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    const day = date.getDate();
    return { month, day };
  };
  useEffect(() => {
    const result = fetchApi("GET", "api/competitions", "events");
    result.then((response) => {
      if (response?.status === 200) {
        setCompetitions(response?.data?.data);
        setLength(response?.data?.data.length);
        console.log(competitions);
      }
    });
  }, []);

  if (length === 0) {
    return (
      <div className=" w-screen h-screen flex justify-center items-center">
        <Spinner2 />
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mt-10 mb-5" data-aos="fade-up">
        Categories
      </h1>
      <div className="w-full max-w-[1300px] mx-auto flex flex-col gap-6 p-4">
        {competitions.map(({ name, competitions: categoryCompetitions }) => (
          <div key={name} className="w-full">
            {/* Category Name */}
            <h2 className="text-2xl font-bold text-[#a62639] mb-4">{name}</h2>
            <div className="flex gap-6 overflow-x-auto pb-4 scroll-snap-x mandatory custom-scrollbar">
              {categoryCompetitions.map(
                ({ id, image_url, society, date, tag_line, title }) => {
                  const { month, day } = date
                    ? formatDate(date)
                    : { month: "N/A", day: "--" };
                  return (
                    <div
                      key={title}
                      className="lg:min-w-[350px] md:min-w-[300px] min-w-[275px] bg-white shadow-lg rounded-3xl overflow-hidden p-4 flex flex-col"
                    >
                      {/* Image Section */}
                      <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={image_url || "https://via.placeholder.com/300"}
                          alt={title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content Section */}
                      <div className="p-4 flex flex-col gap-3 justify-between">
                        {/* Date Section */}
                        <div className="flex flex-col self-start gap-3">
                          <div className="flex items-center gap-3">
                            <div className="text-center bg-[#a62639] text-white px-3 py-2 rounded-lg">
                              <div className="text-xs sm:text-sm font-medium">
                                {month}
                              </div>
                              <div className="text-xl sm:text-lg font-bold">
                                {day}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-lg sm:text-base md:text-lg font-semibold text-[#a62639]">
                                {title}
                              </h3>
                              <p className="text-sm sm:text-xs text-gray-600">
                                {tag_line}
                              </p>
                            </div>
                          </div>
                          <ul className="text-sm sm:text-xs md:text-sm text-gray-700 space-y-1">
                            <li>
                              <strong>Society:</strong> {society.name}
                            </li>
                            <li>
                              <strong>Date:</strong> {date || "TBA"}
                            </li>
                          </ul>
                        </div>
                        <Link
                          className="mt-3 px-4 text-center py-2 sm:px-3 sm:py-2 bg-[#a62639] text-white rounded-lg hover:bg-[#db324d] transition-all w-full"
                          to={`/competition/${id}`}
                        >
                          Register Now
                        </Link>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
