import React, { useState } from "react";
import { useHistory } from "react-router";

const Search = (props) => {
  let history = useHistory();
  const [searchValue, setSearchValue] = useState("Search Movies...");

  function handleClick() {
    // don't redirect to results if search form is empty.
    if (searchValue.length === 0) {
      return;
    }
    history.push("/searchresults");
  }

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
    handleClick();
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
        <button onClick={handleClick}>Search</button>
      </form>
    </div>
  );
};

export default Search;
