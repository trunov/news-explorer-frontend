import React from "react";

import "./SearchForm.css";

function SearchForm({setPreloaderOpen}) {
  const [newsInput, setNewsInput] = React.useState("");

  function handleNewsInput(evt) {
    setNewsInput(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setPreloaderOpen();
    setNewsInput('');
  }

  return (
    <form className="searchForm">
      <input
        onChange={handleNewsInput}
        className="searchForm__input"
        id="newsInput"
        required=""
        name="newsInput"
        type="text"
        placeholder="Введите тему новости"
        value={newsInput}
      ></input>
      <button onClick={handleSubmit} type="submit" className="searchForm__button">
        Искать
      </button>
    </form>
  );
}

export default SearchForm;
