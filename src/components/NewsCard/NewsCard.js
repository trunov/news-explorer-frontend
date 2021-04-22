import React from "react";

import "./NewsCard.css";

function NewsCard({
  id,
  name,
  title,
  description,
  url,
  urlToImage,
  publishedAt,
  location,
  loggedIn,
  keyword,
  handleSaveArticle,
  removeArticle,
  isSaved
}) {

  function handleSaved() {
    handleSaveArticle(
      keyword,
      title,
      description,
      publishedAt,
      name,
      url,
      urlToImage
    );
  }

  function handleRemove() {
    removeArticle(id);
  }

  function markerClick() {
    if (loggedIn) {
      if (isSaved) {
        handleRemove();
        isSaved=false;
      } else {
        handleSaved();
      }
    }
  }

  return (
    <li className="news-card">
      <button
        className={`news-card__marker ${
          isSaved && location.pathname === "/" && loggedIn
            ? "news-card__marker_saved"
            : "news-card__marker_unsaved"
        }`}
        type="button"
        onClick={markerClick}
      >
        {location.pathname === "/" ? (
          <svg
            width="14"
            height="19"
            viewBox="0 0 14 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="news-card__save"
              d="M6.38218 12.7137L1 16.9425V1L13 1V16.9425L7.61782 12.7137L7 12.2283L6.38218 12.7137Z"
              stroke="#B6BCBF"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        ) : (
          <svg
            onClick={handleRemove}
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="news-card__delete"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 0H6V2H0V4H18V2H12V0ZM2 6V17C2 18.1046 2.89543 19 4 19H14C15.1046 19 16 18.1046 16 17V6H14V17H4V6H2ZM6 6L6 15H8L8 6H6ZM10 6V15H12V6H10Z"
              fill="#B6BCBF"
            />
          </svg>
        )}
      </button>

      <span
        className={`news-card__tooltip ${
          loggedIn && location.pathname === "/" && "news-card__tooltip_hidden"
        }`}
      >
        {location.pathname === "/"
          ? "Войдите, чтобы сохранять статьи"
          : "Убрать из сохранённых"}
      </span>

      <div className={`news-card__tag`}>{keyword}</div>

      <img className="news-card__img" src={urlToImage} alt="News" />
      <div className="news-card__info">
        <p className="news-card__date">
          {new Date(publishedAt).toLocaleString("ru", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__description">{description}</p>
        <a
          className="news-card__source"
          target="_blank"
          rel="noreferrer noopener"
          href={url}
        >
          {name}
        </a>
      </div>
    </li>
  );
}

export default NewsCard;
