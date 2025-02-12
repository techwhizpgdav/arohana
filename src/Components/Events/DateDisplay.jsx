const DateDisplay = ({ month, day }) => (
  <div className="flex-shrink-0 text-center bg-[#a62639] text-white px-3 py-2 rounded-lg">
    <div className="text-xs font-medium">{month}</div>
    <div className="text-xl font-bold">{day}</div>
  </div>
);
export default DateDisplay;
