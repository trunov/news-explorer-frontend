import React from "react";
import About from "../About/About";
import Preloader from "../Preloader/Preloader";
import NewsCardList from "../NewsCardList/NewsCardList";

function Main({ location, isPreloaderOpen, loggedIn, cards }) {
  return (
    <>
      {isPreloaderOpen ? (
        <Preloader isPreloaderOpen={isPreloaderOpen} />
      ) : (
        <NewsCardList
          location={location}
          isPreloaderOpen={isPreloaderOpen}
          loggedIn={loggedIn}
          cards={cards}
        />
      )}
      <About />
    </>
  );
}

export default Main;
