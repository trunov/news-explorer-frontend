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
  const [loggedIn, setLoggedIn] = React.useState(null);

  const [notFound, setNotFound] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [savedCards, setSavedCards] = React.useState([]);

  const [urlIdObj, setUrlIdObj] = React.useState({});

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

  React.useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      getArticles();
    }
    const search = localStorage.getItem("Search");
    if (search) {
      setCards(JSON.parse(search));
    }
  }, []);

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((data) => {
          if (data) {
            setLoggedIn(true);
            setCurrentUser(data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setLoggedIn(false);
    }
  }

  function getArticles() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getArticles(token)
        .then((data) => {
          if (data) {
            setSavedCards(data);
            const total = data.reduce(
              (map, item) => ({
                ...map,
                [item.link]: item._id,
              }),
              {}
            );
            setUrlIdObj(total);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  function removeArticle(id) {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .deleteArticle(token, id)
        .then(() => {
          const newCards = savedCards.filter((c) => c._id !== id);
          setSavedCards(newCards);
          // убираю ключ значение из объекта
          const newObj = urlIdObj
          const value = getKeyByValue(newObj,id);
          delete newObj[value]; 
          setUrlIdObj(newObj);

          const articles = cards.map((card) => {
            if (card._id === id) {
              card._id = undefined;
            }
            return card;
          });
          setCards(articles);
          localStorage.setItem("Search", JSON.stringify(articles));
        })
        .catch((err) => console.log(err));
    }
  }

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

  function handleLogOut() {
    localStorage.clear();
    setCards([]);
    setNotFound(false);
    setLoggedIn(false);
    history.push("/");
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

  function handleSaveArticle(
    keyword,
    title,
    description,
    publishedAt,
    name,
    url,
    urlToImage,
    id
  ) {
    auth
      .postArticle(
        keyword,
        title,
        description,
        publishedAt,
        name,
        url,
        urlToImage,
        localStorage.getItem("token")
      )
      .then((newCard) => {
        if (newCard) {
          setSavedCards([...savedCards, newCard]);

          // добавляю ключ значение к объекту из урлов и айди
          const newObj = urlIdObj;
          newObj[newCard.link] = newCard._id;
          setUrlIdObj(newObj);

          const newCards = cards.map((card) => {
            if (card.urlToImage === newCard.image) {
              card._id = newCard._id;
            }
            return card;
          });

          setCards(newCards);
          localStorage.setItem("Search", JSON.stringify(newCards));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    if (isRegistrationPopupOpen === true || isLoginPopupOpen === true) {
      document.addEventListener("keydown", escFunction);
    } else {
      document.removeEventListener("keydown", escFunction);
    }
  }, [isRegistrationPopupOpen, isLoginPopupOpen]);

  React.useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem("token");
      auth
        .getContent(token)
        .then((data) => {
          if (data) {
            setCurrentUser(data);
          }
        })
        .catch((err) => console.log(err));
      getArticles();
    } else {
      checkIfRedirectHappend();
    }
  }, [loggedIn]);

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
          spanState("Такой пользователь уже есть");
        } else if (err.includes("400")) {
          spanState("Запрос сформирован неверно");
        }
      });
  }

  function handleLogin(email, password, spanState) {
    auth
      .authorize(email, password)
      .then((data) => {
        closeAllPopups();
        setCards([]);
        setLoggedIn(true);
        localStorage.removeItem("Search");
        localStorage.setItem("token", data.token);
      })
      .catch((err) => {
        if (err.includes("401")) {
          spanState("Неправильные почта или пароль");
        } else {
          spanState(err.message);
        }
      });
  }

  function handleSearch(searchText) {
    setNotFound(false);
    setIsPreloaderOpen(true);
    api
      .search(searchText)
      .then((data) => {
        if (data.totalResults > 0) {
          const articles = data.articles.map((article) => ({
            name: article.source.name,
            url: article.url,
            urlToImage: article.urlToImage,
            title: article.title,
            description: article.description,
            publishedAt: article.publishedAt,
            keyword: searchText,
          }));
  
          const articlesUpdated = articles.map((item) => {
            if (urlIdObj[item.url]) {
              item._id = urlIdObj[item.url];
            }
            return item;
          });
          setCards(articlesUpdated);
          
          localStorage.setItem("Search", JSON.stringify(articlesUpdated));
          setIsPreloaderOpen(false);
        } else {
          setNotFound(true);
          setIsPreloaderOpen(false);
        }
        
      })
      .catch((err) => {
        console.log(`message: ${err.message}`);
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
              handleSaveArticle={handleSaveArticle}
              removeArticle={removeArticle}
              notFound={notFound}
            />
          </Route>
          {loggedIn === null ? null : (
            <ProtectedRoute
              path="/saved-news"
              component={SavedNews}
              location={location}
              loggedIn={loggedIn}
              handleLogOut={handleLogOut}
              width={width}
              isButtonAuthrorizePressed={isButtonAuthrorizePressed}
              handleStateAuthorizeClick={handleStateAuthorizeClick}
              savedCards={savedCards}
              removeArticle={removeArticle}
            />
          )}
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
          handleLogin={handleLogin}
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
