import React, { useState } from "react";
import { useHistory } from "react-router"

const Search = (props) => {
  let history = useHistory();

  function handleClick() {
    history.push("/searchresults")
  }

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
    handleClick();
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
        <button onClick={handleClick}>Search</button>
      </form>   
    </div>
    );
}

export default Search;

  
