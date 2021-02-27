import React from "react";
import About from "../About/About";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader";
import NewsCardList from "../NewsCardList/NewsCardList";

function Main({
  location,
  isPreloaderOpen,
  loggedIn,
  cards,
  handleSaveArticle,
  removeArticle,
  notFound,
}) {
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
          handleSaveArticle={handleSaveArticle}
          removeArticle={removeArticle}
          notFound={notFound}
          filledWithCards={cards.length}
        />
      )}
      {notFound && <NotFound />}
      <About />
    </>
  );
}

export default Main;
