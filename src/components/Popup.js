export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this.close.bind(this)
    }

    open() {
        this._popup.classList.add('modal_opened');
        document.addEventListener('keyup', this._handleEscClose)

    }

    close() {
        this._popup.classList.remove('modal_opened');
        document.removeEventListener('keyup', this._handleEscClose)

    }

    _handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
        }
    }

    _handleOverlayClose = (event) => {
        if (
          event.target.classList.contains('modal_opened') ||
          event.target.classList.contains('modal__container')
        ) {
          this.close(event.target);
        }
      };

    setEventListeners() {
        //close on button click
        const popupCloseButton = this._popup.querySelector('.modal__close-button');
        popupCloseButton.addEventListener('click', (event) => {
            this.close();
            event.stopImmediatePropagation();
        })

        //close on overlay click
        this._popup.addEventListener('mousedown', (event) => {
            if ([...event.target.classList].includes('popup'))
                this.close();
            event.stopImmediatePropagation();
        })

        
    }
    removeEventListeners() {
        this._popup.classList.remove("modal_opened");
        document.removeEventListener("keydown", this._handleEscClose);
        document.removeEventListener("click", this._handleOverlayClose);
      }
}