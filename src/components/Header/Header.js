import React from "react";
import { Link } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({
  width,
  loggedIn,
  location,
  handleLogOut,
  handleAuthorizeClick,
  isButtonAuthrorizePressed,
  handleStateAuthorizeClick,
}) {
  const [isPressed, setIsPressed] = React.useState(false);

  function handleBurgerButtonClick() {
    setIsPressed(!isPressed);
  }

  function handleAuthorizeButtonClick() {
    setIsPressed(false);
    handleAuthorizeClick();
    handleStateAuthorizeClick();
  }

  return (
    <header
      style={{
        backgroundColor: isPressed ? "#1A1B22" : "",
        backgoundColor: location.pathname === "/saved-news" && "#fff",

        boxShadow:
          location.pathname === "/saved-news" && "inset 0px -1px 0px #D1D2D6",
        boxShadow: isPressed
          ? "inset 0px -1px 0px rgba(255, 255, 255, 0.2)"
          : "inset 0px -1px 0px #D1D2D6",
      }}
      className="header"
    >
      <Link
        style={{
          color: isPressed && "#fff",
        }}
        to="/"
        className={`header__logo ${
          location.pathname === "/saved-news" && "header__logo-savedNews"
        }`}
      >
        {isButtonAuthrorizePressed && width < 424 ? "" : "NewsExplorer"}
      </Link>
      <Navigation
        loggedIn={loggedIn}
        location={location}
        handleBurgerButtonClick={handleBurgerButtonClick}
        isPressed={isPressed}
        handleLogOut={handleLogOut}
        handleAuthorizeButtonClick={handleAuthorizeButtonClick}
        handleStateAuthorizeClick={handleStateAuthorizeClick}
        isButtonAuthrorizePressed={isButtonAuthrorizePressed}
      />
    </header>
  );
}

export default Header;
