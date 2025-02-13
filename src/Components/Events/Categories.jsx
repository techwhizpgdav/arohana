import React, { useState, useEffect } from "react";
import Api from "../../Functions/api";
import "aos/dist/aos.css";
import Spinner2 from "../ShimmerAndSpinner/Spinner2";
import CategorySection from "./CategorySection";
import { FaSearch } from "react-icons/fa";

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
      <div className="flex md:flex-row flex-col gap-8 mt-4">
        <div className="relative">
          <label htmlFor="category" className="absolute px-2 -top-[14px] left-2 bg-white mb-1">Category</label>
          <select
            name="category"
            id="category"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="ring-2 ring-[#a62639] outline-none rounded-sm py-2 px-4 min-w-80 bg-white"
          >
            <option value="">All Categories</option>
            {competitions.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {/* <FaSearch className="absolute right-2 top-1/2 -translate-y-1/2 text-[#a62639]" /> */}
        </div>
        <div className="relative">
          <label htmlFor="event" className="absolute px-2 -top-[14px] left-2 bg-white mb-1">Event</label>
          <input
            type="text"
            name="event"
            id="event"
            placeholder="Type to search"
            value={searchEvent}
            onChange={(e) => setSearchEvent(e.target.value)}
            className="ring-2 ring-[#a62639] rounded-sm py-2 px-4 min-w-80"
          />
          <FaSearch className="absolute right-2 top-1/2 -translate-y-1/2 text-[#a62639]" />
        </div>
      </div>
      <div className="w-full max-w-[1300px] mx-auto flex flex-col gap-12 p-4">
        {filteredCompetitions.map((category) => (
          <CategorySection key={category.name} {...category} formatDate={formatDate} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
