import SearchForm from '../SearchForm/SearchForm';
import "./Main.css";

function Main() {
  return (
    <div className="main">
      <h2 className="main__header">
        Что творится в<br></br> мире?
      </h2>
      <p className="main__paragraph">
        Находите самые свежие статьи на любую тему и сохраняйте в <br></br> своём личном
        кабинете.
      </p>
      <SearchForm />
    </div>
  );
}

export default Main;
