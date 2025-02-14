import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CompetitionCard from "./CompetitionCard";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#a62639",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#a62639",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
};

const CategorySection = ({ name, competitions, formatDate }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-[#a62639] mb-2 ml-6 sm:ml-10">
        {name}
      </h2>
      <div className="px-6">
        <Slider {...settings}>
          {competitions.map((competition) => (
            <div key={competition.title} className="sm:p-4 md:h-[480px] h-auto">
              <CompetitionCard {...competition} formatDate={formatDate} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategorySection;
