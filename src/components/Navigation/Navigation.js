import "./Navigation.css";
import burger from "../../images/menu.svg";

function Navigation() {
  return (
    <div className="navigation">
      <p className="navigation__main">Главная</p>
      <button className="navigation__button">Авторизоваться</button>
      <button className="navigation__burger"><img alt="burger menu" src={burger}></img></button>
    </div>
  );
}

export default Navigation;
