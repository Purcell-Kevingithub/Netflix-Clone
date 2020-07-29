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
  }

  return (
    <div>
      <form className="search" onSubmit={callSearchFunction}>
        <input
          value={searchValue}
          onChange={handleSearchInputChanges}
          type="text"
        />
        <input value="search" type="submit"/>
      </form>
    </div>
    );
}

export default Search;