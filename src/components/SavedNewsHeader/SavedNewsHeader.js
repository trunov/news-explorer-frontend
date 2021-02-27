import React from "react";
import "./SavedNewsHeader.css";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedNewsHeader({ savedCards }) {
  const currentUser = React.useContext(CurrentUserContext);

  const keywords = savedCards.reduce((sum, item) => {
    if (!sum[item.keyword]) {
      sum[item.keyword] = 1;
      return sum;
    }
    sum[item.keyword] = sum[item.keyword] + 1;
    return sum;
  }, {});

  // сортируем объкта по убыванию
  const keysSorted = Object.keys(keywords).sort(function (a, b) {
    return keywords[b] - keywords[a];
  });

  let commaSpace;

  if (keysSorted.length === 1) {
    commaSpace = '';
  } else if (keysSorted.length > 1 && keysSorted.length < 3) {
    commaSpace = ' и ';
  } else if (keysSorted.length >= 3) {
    commaSpace = ", ";
  }

  return (
    <section className="savedNews-header">
      <p className="savedNews-header__heading">Сохранённые статьи</p>
      <h2 className="savedNews-header__info">
        {currentUser.name}, у вас {savedCards.length} сохранённых статей
      </h2>
      {keysSorted.length > 0 && (
        <p className="savedNews-header__tags">
          {keysSorted.length > 1
            ? "По ключевым словам:"
            : "По ключевому слову:"}{" "}
          <span className="savedNews-header__tag">{keysSorted[0]}</span>
          {commaSpace}
          {keysSorted.length > 1 && (
            <span className="savedNews-header__tag">{keysSorted[1]}</span>
          )}
          {keysSorted.length > 2 && " и "}
          {keysSorted.length === 3 && (
            <span className="savedNews-header__tag">{keysSorted[2]}</span>
          )}
          {keysSorted.length > 3 && (
            <span className="savedNews-header__tag">
              {keysSorted.length - 2}-м другим
            </span>
          )}
        </p>
      )}
    </section>
  );
}

export default SavedNewsHeader;
