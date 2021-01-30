import "./Footer.css";
import fb from "../../images/fb.svg";
import github from "../../images/github.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__copyright">
        &#169; 2020 SWEN. Powered by News Api
      </div>
      <div className="footer__links">
        <a className="footer__link" href="#">
          Главная
        </a>
        <a className="footer__link" href="https://praktikum.yandex.ru">
          Яндекс.Практикум
        </a>

        <a href="https://github.com/trunov" className="footer__logo">
          <img src={github} alt="github"></img>
        </a>

        <a
          href="https://www.facebook.com/trunov.kirill"
          className="footer__logo"
        >
          <img src={fb} alt="fb"></img>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
