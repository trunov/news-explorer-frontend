import React from "react";
import Header from "../Header/Header";
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';


import "./SavedNews.css";

function SavedNews({location, loggedIn, handleLogInOut}) {

  return (
    <section className="savedNews">
      <Header location={location} loggedIn={loggedIn} handleLogInOut={handleLogInOut}/>
      <SavedNewsHeader />
      <NewsCardList location={location}/>
    </section>
  );
}

export default SavedNews;
