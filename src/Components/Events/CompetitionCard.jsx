import React from "react";
import { Link } from "react-router-dom";
import DateDisplay from "./DateDisplay";
import DetailsList from "./DetailsList";
import TitleSection from "./TitleSection";

const CompetitionCard = ({
  id,
  image_url,
  society,
  date,
  tag_line,
  title,
  formatDate,
}) => {
  const { month, day } = date ? formatDate(date) : { month: "N/A", day: "--" };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
      <div className="relative w-full lg:pt-[66.67%] pt-[56%]">
        <img
          src={
            !image_url.startsWith("https://arohana")
              ? image_url
              : "https://placehold.co/600x400"
          }
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start gap-3 mb-3">
          <DateDisplay  month={month} day={day} />
          <div>
            <TitleSection title={title} tagLine={tag_line} />
            <div className="mt-2">
              <DetailsList society={society} date={date} />
            </div>
          </div>
        </div>

        <Link
          className="mt-auto px-4 py-2 bg-[#a62639] text-white rounded-lg hover:bg-[#db324d] transition-all text-center"
          to={`/competition/${id}`}
        >
          Register Now
        </Link>
      </div>
    </div>
  );
};

export default CompetitionCard