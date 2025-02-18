import React, { useState, useEffect } from "react";
import Api from "../../Functions/api";
import "aos/dist/aos.css";
import Spinner2 from "../ShimmerAndSpinner/Spinner2";
import CategorySection from "./CategorySection";
import { FaChevronDown, FaSearch } from "react-icons/fa";

const Categories = () => {
  const { fetchApi } = Api();
  const [competitions, setCompetitions] = useState([]);
  const [length, setLength] = useState(0);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchEvent, setSearchEvent] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    const day = date.getDate();
    return { month, day };
  };

  useEffect(() => {
    const fetchCompetitions = async () => {
      const result = await fetchApi("GET", "api/competitions", "events");
      if (result?.status === 200) {
        setCompetitions(result?.data?.data);
        setLength(result?.data?.data.length);
      }
    };

    fetchCompetitions();
  }, []);

  if (length === 0) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner2 />
      </div>
    );
  }

  const filteredCompetitions = competitions
    .filter((category) =>
      category.name.toLowerCase().includes(searchCategory.toLowerCase())
    )
    .map((category) => ({
      ...category,
      competitions: category.competitions.filter((competition) =>
        competition.title.toLowerCase().includes(searchEvent.toLowerCase())
      ),
    }))
    .filter((category) => category.competitions.length > 0);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-4xl font-bold mt-10 mb-5" data-aos="fade-up">
        Competitions
      </h1>
      <div className="flex flex-col md:flex-row gap-6 mt-4">
        {/* Category Dropdown */}
        <div className="relative flex-1">
          <label
            htmlFor="category"
            className="absolute px-2 -top-3 left-4 bg-white text-sm text-gray-600 font-medium transition-all duration-200"
          >
            Category
          </label>
          <select
            name="category"
            id="category"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="w-full ring-2 ring-[#a62639] outline-none rounded-lg py-3 px-4 bg-white text-gray-700 
               hover:ring-[#8a1c2b] focus:ring-2 focus:ring-[#8a1c2b] focus:border-transparent 
               transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="">All Categories</option>
            {competitions.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {/* Custom dropdown arrow */}
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <FaChevronDown className="text-[#a62639] text-lg" />
          </div>
        </div>

        {/* Event Search Input */}
        <div className="relative flex-1">
          <label
            htmlFor="event"
            className="absolute px-2 z-[1] -top-3 left-4 bg-white text-sm text-gray-600 font-medium transition-all duration-200"
          >
            Event
          </label>
          <div className="relative">
            <input
              type="text"
              name="event"
              id="event"
              placeholder="Type to search"
              value={searchEvent}
              onChange={(e) => setSearchEvent(e.target.value)}
              className="w-full ring-2 ring-[#a62639] outline-none rounded-lg py-3 px-4 bg-white text-gray-700 
                 placeholder-gray-400 hover:ring-[#8a1c2b] focus:ring-2 focus:ring-[#8a1c2b] 
                 focus:border-transparent transition-all duration-200 pr-10"
            />
            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a62639] text-lg" />
          </div>
        </div>
      </div>
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-12 p-4">
        {filteredCompetitions.map((category) => (
          <CategorySection
            key={category.name}
            {...category}
            formatDate={formatDate}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
