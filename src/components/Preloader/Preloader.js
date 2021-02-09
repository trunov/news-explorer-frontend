import "./Preloader.css";

function Preloader() {
  return (
    
      <div className="preloader">
        <div className="preloader__wrap">
          <i className="preloader__wrap__circle"></i>
          <p className="preloader__wrap__paragraph">Идет поиск новостей...</p>
        </div>
      </div>
    
  );
}

export default Preloader;
