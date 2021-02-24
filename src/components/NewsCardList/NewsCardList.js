import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import News from "../../utils/News.json";

import "./NewsCardList.css";

function NewsCardList({ location, isPreloaderOpen, loggedIn, cards }) {

  let [count, setCount] = React.useState(3);

  let [removeButton, setIsRemoveButton] = React.useState(false);

  const dataToRender = cards.slice(0, count)

  function increaseCount() {
    setCount(count += 3);
    checkShowButton();
  }

  function checkCards() {
    if (cards.length !== 0) {
      return true
    } else {
      return false
    }
  }

  function checkShowButton() {
    if (count >= cards.length) {
      setIsRemoveButton(true);
    }
  }

  return (
    <>
      {checkCards() && (
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
              {cards &&
                dataToRender.map((props) => (
                  <NewsCard
                    key={props.publishedAt}
                    {...props}
                    location={location}
                    loggedIn={loggedIn}
                  />
                ))}
            </ul>
            {location.pathname === "/" && !removeButton && (
              <button className="news__show-btn" onClick={increaseCount}>Показать еще</button>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default NewsCardList;
