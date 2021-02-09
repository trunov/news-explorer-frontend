import React from "react";

import "./PopupWithForm.css";

function PopupWithForm({
  name,
  title,
  buttonTitle,
  changePopup,
  inputsFilled,
  textLink,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {

  return (
    <div className={`popup popup-${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          aria-label="Закрыть"
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          action="#"
          name="popup-form"
          className={`popup__form popup-${name}__form`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button type="submit" className={`popup__button ${!inputsFilled && "popup__button_disabled"}`}>
            {buttonTitle}
          </button>
          <p className="popup__paragraph-link">
            или{" "}
            <span onClick={changePopup} className="popup__link">
              {textLink}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
