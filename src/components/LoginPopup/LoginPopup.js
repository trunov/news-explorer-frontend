import React, {useEffect} from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function LoginPopup({ isOpen, onClose, changePopup }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [inputsFilled, setInputsFilled] = React.useState(false);

  function checkInputs() {
    if (email !== "" && password !== "") {
      setInputsFilled(true);
    } else {
      setInputsFilled(false);
    }
  }

  let arr = [email, password];

  useEffect(() => {
    checkInputs();
  }, arr);

  function handleChange(evt) {
    if (evt.target.name === "email") {
      setEmail(evt.target.value);
    } else if (evt.target.name === "password") {
      setPassword(evt.target.value);
    }
  }

  function resetForm() {
    setEmail("");
    setPassword("");
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!email) {
      console.log("Не введен email");
      return;
    }
    if (!password) {
      console.log("Не введен пароль");
      return;
    }
    resetForm();
    setInputsFilled(false);
  }

  return (
    <PopupWithForm
      name={"login"}
      title={"Вход"}
      buttonTitle={"Войти"}
      inputsFilled={inputsFilled}
      textLink={"Зарегистрироваться"}
      changePopup={changePopup}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      noValidate
    >
      <p className="popup__label">E-mail</p>
      <input
        value={email || ""}
        onChange={handleChange}
        required
        name="email"
        type="email"
        placeholder="Введите почту"
        className="popup__input popup__input_email"
        id="login-email-input"
      />
      <span
        className="popup__email-error popup__error_shown"
        id="login-email-error"
      >
        Неправильный формат email
      </span>
      <p className="popup__label">Пароль</p>
      <input
        value={password || ""}
        onChange={handleChange}
        required
        name="password"
        type="password"
        placeholder="Введите пароль"
        className="popup__input popup__input_password"
        id="login-password-input"
      />
    </PopupWithForm>
  );
}

export default LoginPopup;
