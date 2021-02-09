import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import burger from "../../images/menu.svg";
import burgerSavedNews from "../../images/menuSavedNews.svg";
import close from "../../images/close.svg";
import logoutSavedNews from "../../images/logout.svg";
import logoutMain from "../../images/logout_main.svg";

function Navigation({
  handleButtonClick,
  handleLogOut,
  handleAuthorizeClick,
  isPressed,
  loggedIn,
  location,
}) {

  return (
    <nav className="navigation">
      <div
        style={{
          display: isPressed && "flex",
        }}
        className="navigation__wrap"
      >
        <NavLink
          exact
          to="/"
          activeClassName={
            location.pathname === "/saved-news"
              ? "navigation__wrap__saved-news_active"
              : "navigation__wrap__main_active"
          }
          className={`navigation__wrap__main ${
            location.pathname === "/saved-news" &&
            "navigation__wrap__main-saved"
          }`}
        >
          Главная
        </NavLink>
        {loggedIn && (
          <NavLink
            exact
            to="/saved-news"
            activeClassName={
              location.pathname === "/saved-news"
                ? "navigation__wrap__saved-news_active"
                : "navigation__wrap__main_active"
            }
            className={`navigation__wrap__main ${
              location.pathname === "/saved-news" &&
              "navigation__wrap__main-saved"
            }`}
          >
            Сохраненные статьи
          </NavLink>
        )}

        <button
          onClick={loggedIn ? handleLogOut : handleAuthorizeClick}
          className={`navigation__wrap__button ${
            loggedIn && "navigation__wrap__button-loggedIn"
          } ${
            location.pathname === "/saved-news" &&
            "navigation__wrap__button__main-saved"
          }`}
        >
          {loggedIn ? "Кирилл" : "Авторизоваться"}

          {loggedIn && (
            location.pathname === "/saved-news" ? (
              <img
                className="navigation__wrap__button-img"
                alt="logout"
                src={isPressed ? logoutMain : logoutSavedNews}
              ></img>
            ) : (
              <img
                className="navigation__wrap__button-img"
                alt="logout"
                src={logoutMain}
              ></img>
            )
          )}
        </button>
      </div>

      <button onClick={handleButtonClick} className="navigation__burger">
        {location.pathname === "/saved-news" ? (
          <img
            alt="burger menu"
            src={isPressed ? close : burgerSavedNews}
          ></img>
        ) : (
          <img alt="burger menu" src={isPressed ? close : burger}></img>
        )}
      </button>
      <div
        style={{
          display: isPressed && "block",
        }}
        className="navigation__opacity"
      ></div>
    </nav>
  );
}

export default Navigation;
