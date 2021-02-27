import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import News from "../../utils/News.json";

import "./NewsCardList.css";

function NewsCardList({
  location,
  loggedIn,
  cards,
  handleSaveArticle,
  savedCards,
  removeArticle,
  notFound,
  filledWithCards
}) {
  let [count, setCount] = React.useState(3);

  let [removeButton, setIsRemoveButton] = React.useState(false);

  const dataToRender = cards ? cards.slice(0, count) : null;

  function increaseCount() {
    setCount((count += 3));
    checkShowButton();
  }

  function checker() {
    if (notFound || filledWithCards === 0) {
      return false;
    } else {
      return true;
    }
  }

  function checkShowButton() {
    if (count >= cards.length) {
      setIsRemoveButton(true);
    }
  }

  return (
    <>
      {checker() && (
        <section
          className={`news ${
            location.pathname === "/saved-news" && "news_saved"
          }`}
        >
          <div
            className={`news__container ${
              location.pathname === "/saved-news" && "news__container_saved"
            }`}
          >
            {location.pathname === "/" && (
              <h2 className="news__title">Результаты поиска</h2>
            )}
            <ul
              className={`news__list ${
                location.pathname === "/saved-news" && "news__list_saved"
              }`}
            >
              {location.pathname === "/" &&
                dataToRender.map((props) => (
                  <NewsCard
                    key={props.publishedAt}
                    {...props}
                    id={props._id}
                    location={location}
                    loggedIn={loggedIn}
                    handleSaveArticle={handleSaveArticle}
                    isSaved={props._id ? true : false}
                    removeArticle={removeArticle}
                  />
                ))}
              {location.pathname === "/saved-news" &&
                savedCards
                  .map((props) => (
                    <NewsCard
                      key={props._id}
                      urlToImage={props.image}
                      publishedAt={props.date}
                      description={props.text}
                      name={props.source}
                      url={props.link}
                      id={props._id}
                      {...props}
                      location={location}
                      loggedIn={loggedIn}
                      removeArticle={removeArticle}
                    />
                  ))
                  .reverse()}
            </ul>
            {location.pathname === "/" && !removeButton && (
              <button className="news__show-btn" onClick={increaseCount}>
                Показать еще
              </button>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default NewsCardList;
