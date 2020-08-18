import React, { useState } from "react";

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");
  
  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  const resetInputField = () => {
    setSearchValue("")
  }

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
    props.displayGenre(false);
  }

  return (
    <div className="search-container">
      <form className="search" onSubmit={callSearchFunction}>
        <input
          placeholder="Search Movies..."
          value={searchValue}
          onChange={handleSearchInputChanges}
          type="text"
          required
        />
        <button onClick={props.displayTrue}>Search</button>
      </form>   
    </div>
    );
}

export default Search;