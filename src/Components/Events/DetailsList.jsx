const DetailsList = ({ society, date }) => (
  <ul className="text-sm text-gray-700 space-y-1 mb-4">
    <li>
      <strong>Society:</strong> {society.name}
    </li>
    <li>
      <strong>Date:</strong> {date || "TBA"}
    </li>
  </ul>
);
export default DetailsList;
