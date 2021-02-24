import React from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";

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

import api from "../../utils/NewsApi";
import * as auth from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const history = useHistory();

  const location = useLocation();
  const [isPreloaderOpen, setIsPreloaderOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

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

  function checkIfRedirectHappend() {
    if (history.location.noAuthRedirect) {
      setIsLoginPopupOpen(true);
    }
  }

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

  React.useEffect(() => {
    const search = localStorage.getItem("Search");
    if (search) {
      setCards(JSON.parse(search));
    }
    checkIfRedirectHappend();
  }, []);

  function handleLogOut() {
    localStorage.clear();
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
    setIsSuccessPopupOpen(false);
    setIsRegistrationPopupOpen(false);
    setIsLoginPopupOpen(false);
    setIsButtonAuthrorizePressed(false);
  }

  function handleRegister(name, email, password, spanState) {
    auth
      .register(name, email, password)
      .then(() => {
        closeAllPopups();
        setIsSuccessPopupOpen(true);
      })
      .catch((err) => {
        if (err.includes("409")) {
          spanState(true);
        }
      });
  }

  function handleSearch(searchText) {
    setIsPreloaderOpen(true);
    api
      .search(searchText)
      .then((data) => {
        const articles = data.articles.map((article) => ({
          name: article.author,
          urlToImage: article.urlToImage,
          title: article.title,
          description: article.description,
          publishedAt: article.publishedAt,
        }));
        setIsPreloaderOpen(false);
        setCards(articles);
        localStorage.setItem("Search", JSON.stringify(articles));
      })
      .catch((err) => {
        console.log("Wrong request");
        setIsPreloaderOpen(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
              <AfterHeader handleSearch={handleSearch} />
            </div>
            <Main
              location={location}
              isPreloaderOpen={isPreloaderOpen}
              loggedIn={loggedIn}
              cards={cards}
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
          handleRegister={handleRegister}
        />
        <LoginPopup
          isOpen={isLoginPopupOpen}
          onClose={closeAllPopups}
          changePopup={changePopup}
        />
        <SuccessPopup
          isOpen={isSuccessPopupOpen}
          onClose={closeAllPopups}
          changePopup={changePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
