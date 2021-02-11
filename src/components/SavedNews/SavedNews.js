import React from "react";
import Header from "../Header/Header";
import NewsCardList from "../NewsCardList/NewsCardList";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";

import "./SavedNews.css";

function SavedNews({
  location,
  loggedIn,
  handleLogInOut,
  width,
  isButtonAuthrorizePressed,
  handleStateAuthorizeClick,
}) {
  return (
    <section className="savedNews">
      <Header
        width={width}
        location={location}
        loggedIn={loggedIn}
        handleLogInOut={handleLogInOut}
        isButtonAuthrorizePressed={isButtonAuthrorizePressed}
        handleStateAuthorizeClick={handleStateAuthorizeClick}
      />
      <SavedNewsHeader />
      <NewsCardList location={location} />
    </section>
  );
}

export default SavedNews;
