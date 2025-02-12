import CompetitionCard from "./CompetitionCard";

const CategorySection = ({ name, competitions, formatDate }) => (
  <div className="relative w-full">
    <h2 className="text-2xl font-bold text-[#a62639] mb-4">{name}</h2>
    {window.innerWidth > 730 && (
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white/70 via-white/30 to-transparent z-10 pointer-events-none" />
    )}
    <div className="flex px-2 gap-6 overflow-x-auto pb-4 select-none scroll-snap-x mandatory custom-scrollbar">
      {competitions.map((competition) => (
        <CompetitionCard
          key={competition.title}
          {...competition}
          formatDate={formatDate}
        />
      ))}
    </div>
  </div>
);
export default CategorySection;
