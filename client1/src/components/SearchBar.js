// ==================== FRONTEND (src/components/SearchBar.js) ====================
export default function SearchBar({ onSearch }) {
  return (
    <input
      placeholder="Search by name or usn..."
      onChange={(e) => onSearch(e.target.value)}
      className="search-bar"
    />
  );
}
