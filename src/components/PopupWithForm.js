import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(submitForm, popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._submitForm = submitForm;
    this._fieldsArray = [];
    // this._popupCloseButton = this._popup.querySelector('.popup__close');
    this._formElement = this._popup.querySelector('.form');
    this._inputsList = this._popup.querySelectorAll(".form__input");

  }

  close() {
    this._formElement.reset();
    super.close();
  }

  _getInputValues() {
    this._formValues = {};
    this._inputsList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    //submit form
    this._popup.addEventListener('submit', (event) => {
      this._getInputValues();
      this._submitForm(event, this._fieldsArray[0], this._fieldsArray[1]);
      event.stopImmediatePropagation();
    })

    super.setEventListeners();
  }
}