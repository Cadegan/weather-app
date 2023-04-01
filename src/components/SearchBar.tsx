import React, { useState } from "react";

interface SearchProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>("");

  const handleSearch = () => {
    if (!searchText) {
      console.error("Empty search field");
      return;
    }
    onSearch(searchText);
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <input
        type="text"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        placeholder="Enter a location"
        className="border border-gray-300 px-3 py-2 rounded-md w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 ml-4 rounded-md font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
