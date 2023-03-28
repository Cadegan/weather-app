import React, { useState } from "react";

interface SearchProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>("");

  const handleSearch = () => {
    if (searchText === "") {
      console.error("Empty search field");
      return;
    }
    onSearch(searchText);
  };

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        placeholder="Enter a location"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
