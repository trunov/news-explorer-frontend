import SearchForm from '../SearchForm/SearchForm';
import "./afterHeader.css";

function afterHeader({handleSearch}) {
  return (
    <section className="afterHeader">
      <h2 className="afterHeader__header">
        Что творится в мире?
      </h2>
      <p className="afterHeader__paragraph">
        Находите самые свежие статьи на любую тему и сохраняйте в <br></br> своём личном
        кабинете.
      </p>
      <SearchForm handleSearch={handleSearch} />
      
    </section>
  );
}

export default afterHeader;
