import React, { useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function RegistrationPopup({ isOpen, onClose, changePopup, handleRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const [fillSpan, setFillSpan] = React.useState(false);
  const [inputsFilled, setInputsFilled] = React.useState(false);

  function checkInputs() {
    if (email !== "" && password !== "" && name !== "") {
      setInputsFilled(true);
    } else {
      setInputsFilled(false);
    }
  }

  let arr = [email, password, name];

  useEffect(() => {
    checkInputs();
  }, arr);

  function handleChange(evt) {
    if (evt.target.name === "email") {
      setEmail(evt.target.value);
    } else if (evt.target.name === "password") {
      setPassword(evt.target.value);
    } else if (evt.target.name === "name") {
      setName(evt.target.value);
    }
  }

  function resetForm() {
    setEmail("");
    setPassword("");
    setName("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(name, email, password, setFillSpan);
    resetForm();
  }

  return (
    <PopupWithForm
      inputsFilled={inputsFilled}
      name={"registration"}
      title={"Регистрация"}
      buttonTitle={"Зарегистрироваться"}
      textLink={"Войти"}
      changePopup={changePopup}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      noValidate
    >
      <p className="popup__label">E-mail</p>
      <input
        onChange={handleChange}
        required
        name="email"
        value={email || ""}
        type="email"
        placeholder="Введите почту"
        className="popup__input popup__input_email"
        id="email-input"
      />
      <span className="popup__email-error" id="email-error">
        Неправильный формат email
      </span>

      <p className="popup__label">Пароль</p>
      <input
        onChange={handleChange}
        value={password || ""}
        required
        name="password"
        type="password"
        placeholder="Введите пароль"
        className="popup__input popup__input_password"
        id="password-input"
      />
      <p className="popup__label">Имя</p>
      <input
        onChange={handleChange}
        value={name || ""}
        required
        type="text"
        placeholder="Введите своё имя"
        name="name"
        className="popup__input"
      />
      {fillSpan && (
        <span id="password-error" className="popup__error popup__error_shown">
          Такой пользователь уже есть
        </span>
      )}
    </PopupWithForm>
  );
}

export default RegistrationPopup;
