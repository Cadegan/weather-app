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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container flex justify-left items-center bg-FAFAF5 relative">
      <div className="search-bar relative flex items-center bg-FAFAF5 rounded-xl m-4 py-2 px-6">
        <input
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter a location"
          className="search-input flex-grow bg-transparent border-none outline-none px-4 py-2"
        />
        <button
          onClick={handleSearch}
          className="search-button bg-gray-200 text-gray-800 font-bold cursor-pointer ml-4 px-6 py-2 rounded-full hover:bg-orange-300 transition duration-300 ease-in-out"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
