import React from "react";
import Header from "../Header/Header";
import NewsCardList from "../NewsCardList/NewsCardList";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";

import "./SavedNews.css";

function SavedNews({
  location,
  loggedIn,
  handleLogOut,
  width,
  isButtonAuthrorizePressed,
  handleStateAuthorizeClick,
  savedCards,
  removeArticle
}) {
  return (
    <section className="savedNews">
      <Header
        width={width}
        location={location}
        loggedIn={loggedIn}
        handleLogOut={handleLogOut}
        isButtonAuthrorizePressed={isButtonAuthrorizePressed}
        handleStateAuthorizeClick={handleStateAuthorizeClick}
      />
      <SavedNewsHeader savedCards={savedCards} />
      <NewsCardList location={location} savedCards={savedCards} removeArticle={removeArticle} filledWithCards={savedCards.length}/>
    </section>
  );
}

export default SavedNews;
