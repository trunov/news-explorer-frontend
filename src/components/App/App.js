import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import "./App.css";

import Header from "../Header/Header";
import AfterHeader from "../AfterHeader/AfterHeader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SavedNews from "../SavedNews/SavedNews";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import RegistrationPopup from "../RegistrationPopup/RegistrationPopup";
import LoginPopup from "../LoginPopup/LoginPopup";
import SuccessPopup from "../SuccessPopup/SuccessPopup";

function App() {
  const location = useLocation();
  const [isPreloaderOpen, setIsPreloaderOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(true);

  const [width, setWidth] = React.useState(window.innerWidth);

  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = React.useState(
    false
  );
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);

  const [
    isButtonAuthrorizePressed,
    setIsButtonAuthrorizePressed,
  ] = React.useState(false);

  function checkWidthAndStateButtonAuthorized() {
    if (
      width < 424 &&
      (isRegistrationPopupOpen === true || isLoginPopupOpen === true)
    ) {
      setIsButtonAuthrorizePressed(true);
    } else {
      setIsButtonAuthrorizePressed(false);
    }
  }

  React.useEffect(() => {
    const handleResize = () => {
      checkWidthAndStateButtonAuthorized();
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  function handleLogOut() {
    setLoggedIn(false);
  }

  function escFunction(evt) {
    if (evt.keyCode === 27) {
      closeAllPopups();
    }
  }

  function handleStateAuthorizeClick() {
    if (width < 424) {
      setIsButtonAuthrorizePressed(true);
    } else {
      setIsButtonAuthrorizePressed(false);
    }
  }

  React.useEffect(() => {
    if (isRegistrationPopupOpen === true || isLoginPopupOpen === true) {
      document.addEventListener("keydown", escFunction);
    } else {
      document.removeEventListener("keydown", escFunction);
    }
  }, [isRegistrationPopupOpen, isLoginPopupOpen]);

  function changePopup(event) {
    closeAllPopups();
    checkWidthAndStateButtonAuthorized();
    event.target.textContent === "Войти"
      ? setIsLoginPopupOpen(true)
      : setIsRegistrationPopupOpen(true);
  }

  function handleAuthorizeClick() {
    setIsLoginPopupOpen(true);
  }

  function closeAllPopups() {
    setIsRegistrationPopupOpen(false);
    setIsLoginPopupOpen(false);
    setIsButtonAuthrorizePressed(false);
  }

  function setPreloaderOpen() {
    setIsPreloaderOpen(true);
    setTimeout(function () {
      setIsPreloaderOpen(false);
    }, 1000);
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <div className="App_wrap">
            <Header
              loggedIn={loggedIn}
              location={location}
              handleLogOut={handleLogOut}
              handleAuthorizeClick={handleAuthorizeClick}
              isButtonAuthrorizePressed={isButtonAuthrorizePressed}
              handleStateAuthorizeClick={handleStateAuthorizeClick}
              width={width}
            />
            <AfterHeader setPreloaderOpen={setPreloaderOpen} />
          </div>
          <Main
            location={location}
            isPreloaderOpen={isPreloaderOpen}
            loggedIn={loggedIn}
          />
        </Route>
        <ProtectedRoute
          path="/saved-news"
          component={SavedNews}
          location={location}
          loggedIn={loggedIn}
          handleLogOut={handleLogOut}
          width={width}
          isButtonAuthrorizePressed={isButtonAuthrorizePressed}
          handleStateAuthorizeClick={handleStateAuthorizeClick}
        />
      </Switch>
      <Footer />

      <RegistrationPopup
        isOpen={isRegistrationPopupOpen}
        onClose={closeAllPopups}
        changePopup={changePopup}
      />
      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={closeAllPopups}
        changePopup={changePopup}
      />
      <SuccessPopup isOpen={isSuccessPopupOpen}/>
    </div>
  );
}

export default App;
