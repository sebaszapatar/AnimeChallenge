import React from "react";

const SearchBar = ({title, setTitle, handleSearch}) => {
    const onChange = (e) =>{
        setTitle(e.target.value);
    };
    
    return (
        <div className="search-bar">
            <input
            type ="text"
            value ={title}
            onChange={onChange}
            placeholder="Search for an anime"
            />
            <button onClick = {handleSearch}>Go!!</button>
        </div>
    );
};

export default SearchBar;