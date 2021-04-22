import React, {useEffect} from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function SuccessPopup({ isOpen, onClose, changePopup }) {
  const [isSuccess, setIsSuccess] = React.useState(true);

  return (
    <PopupWithForm
      name={"success"}
      title={"Пользователь успешно зарегистрирован!"}
      isSuccess={isSuccess}
      isOpen={isOpen}
      onClose={onClose}
      changePopup={changePopup}
      textLink={"Войти"}
    >
    </PopupWithForm>
  );
}

export default SuccessPopup;
