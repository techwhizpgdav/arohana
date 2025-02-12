const TitleSection = ({ title, tagLine }) => (
  <div className="flex-grow">
    <h3 className="text-lg font-semibold text-[#a62639] line-clamp-2">
      {title}
    </h3>
    <p className="text-sm text-gray-600 line-clamp-2">{tagLine}</p>
  </div>
);
export default TitleSection