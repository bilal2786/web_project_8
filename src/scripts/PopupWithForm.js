import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(submitForm, popupSelector) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._fieldsArray = [];
        this._popupCloseButton = this._popupElement.querySelector('.popup__close');
        this._formElement = this._popupElement.querySelector('.form');
        this._inputsList = this._popupElement.querySelectorAll(".form__input");
        
    }

    close() {
        this._formElement.reset();
        super.close();
    }

    _getInputValues() {
        this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues ;
    }

    setEventListeners() {
        //submit form
        this._popupElement.addEventListener('submit', (event) => {
            this._getInputValues();
            this._submitForm(event, this._fieldsArray);
            event.stopImmediatePropagation();
        })

        super.setEventListeners();
    }
}