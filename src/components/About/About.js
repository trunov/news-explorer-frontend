import "./About.css";
import aboutPhoto from "../../images/me.jpg";

function About() {
  return (
    <section className="about">
      <img src={aboutPhoto} alt="about__photo" className="about__photo"></img>
      <div className="about__info">
        <h3 className="about__info__author">Об авторе</h3>
        <p className="about__info__text">
          Всем Привет, я Fullstack Разработчик, технологии с которыми я
          работают: NodeJS/ReactJS.
        </p>
      </div>
    </section>
  );
}

export default About;
