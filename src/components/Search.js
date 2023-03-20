import React, { useState } from "react";
import { useHistory } from "react-router";

const Search = (props) => {
  let history = useHistory();
  const initalState = "Search Movies..."
  const [searchValue, setSearchValue] = useState(initalState);

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    if (searchValue.length === 0 || searchValue === initalState) {
      return;
    }
    props.search(searchValue);
    resetInputField();
    history.push("/searchresults");
  };

  return (
    <div className="search-container">
      <form className="search" onSubmit={callSearchFunction}>
        <input
          placeholder={searchValue}
          value={searchValue}
          onFocus={resetInputField}
          onChange={handleSearchInputChanges}
          type="text"
          required
        />
        <button>Search</button>
      </form>
    </div>
  );
};

export default Search;
