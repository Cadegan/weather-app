/**
 * A React component for displaying the SearchBar
 * @file SearchBar component.
 * @module components/SearchBar
 */

import React, { useState } from "react";

interface SearchProps {
  onSearch: (city: string) => void;
}

const SearchBar = ({ onSearch }: SearchProps) => {
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
    <div className="flex justify-center items-center bg-ececec relative">
      <div className="m-4 py-2 px-6">
        <input
          className="bg-transparent border-none outline-none px-4 py-2 rounded-xl shadow-neumorphicBorderActive"
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter a location"
        />
        <button
          onClick={handleSearch}
          className="w-28 text-base text-gray-800 text-center font-bold cursor-pointer ml-4 px-6 py-2 rounded-3xl shadow-neumorphicBorder hover:shadow-neumorphicBorderOver active:shadow-neumorphicBorderActive active:text-orange-500 transition transform duration-200 ease-in-out  hover:scale-[0.98] active:scale-[0.96]"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
