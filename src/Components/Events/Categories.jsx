import React, { useState, useEffect } from "react";
import Api from "../../Functions/api";
import "aos/dist/aos.css";
import Spinner2 from "../ShimmerAndSpinner/Spinner2";
import CategorySection from "./CategorySection";

const Categories = () => {
  const { fetchApi } = Api();
  const [competitions, setCompetitions] = useState([]);
  const [length, setLength] = useState(0);

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

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-4xl font-bold mt-10 mb-5" data-aos="fade-up">
        Competitions
      </h1>
      <div className="w-full max-w-[1300px] mx-auto flex flex-col gap-12 p-4">
        {competitions.map((category) => (
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
