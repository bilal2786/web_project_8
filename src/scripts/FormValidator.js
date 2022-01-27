class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._form = formElement;
        this._inputList= Array.from(this._form.querySelectorAll(this._inputSelector));

        this._button = this._form.querySelector(this._submitButtonSelector);
    }
    
  
    _showErrorMessage(inputList) {
        const error = this._form.querySelector('#' + inputList.id + '-error');
        error.textContent = inputList.validationMessage;
        error.classList.add(this._errorClass);
        inputList.classList.add(this._inputErrorClass);
    }



    _hideErrorMessage(inputList) {
        const error = this._form.querySelector('#' + inputList.id + '-error');
        error.textContent = '';
        error.classList.remove(this._errorClass);
        inputList.classList.remove(this._inputErrorClass);
        

    }

    _checkInputValidity(inputList) {
        if (inputList.validity.valid) {
            this._hideErrorMessage(inputList, this._form)
        } else {
            this._showErrorMessage(inputList, this._form)
        }
    }
    resetValidation() {
        this._disableSubmitButton();
        this._inputList.forEach((inputList) => {
          this._hideErrorMessage(inputList);
        });
      }


    _toggleButtonState() {
    
        const isValid =  Array.from(this._inputList).some((inputList) => !inputList.validity.valid)
        if (isValid) {
            this._disableSubmitButton()

        } else {
            this._button.classList.remove(this._inactiveButtonClass);
            this._button.disabled = false;

        }
    
    }

    _setEventListeners() {


        this._inputList.forEach((inputList) => {
            inputList.addEventListener('input', () => {
                this._checkInputValidity(inputList);
                this._toggleButtonState(this._inputList, this._button);
                
            });
        });
        
    }
    _disableSubmitButton() {

        this._button.classList.add(this._inactiveButtonClass); 
        this._button.disabled = true;

      }

    enableValidation() {
        this._form.addEventListener('submit', (event) => { event.preventDefault() })

        this._setEventListeners();
        
    }
}


export default FormValidator