export default class Card {
       constructor(data, templateSelector, onImageClick,) {
        this._link = data.link;
        this._name = data.name;
        this._templateSelector = templateSelector;
        this._handleCardClick  = handleCardClick ;

    }

    _getNewCardTemplate() {
		const cardTemplate = this._templateSelector.firstElementChild;
        return cardTemplate;
    }

    
    _handlePicPrev() {
        this._handleCardClick ({ link: this._link, name: this._name })
      }

    _handleLike(evt) {
        evt.target.classList.toggle('elements__like-button_active');

    }

    _handleDelete(evt) {
		evt.target.closest(".elements__item").remove();

    }

    _setEventListeners() {
		this._cardImage.addEventListener("click", this._handlePicPrev.bind(this));
        this._cardLikeButton.addEventListener('click', this._handleLike);
        this._cardDeleteButton.addEventListener('click', this._handleDelete);
    };

  
    render() {
        this._card = this._getTemplate();
    
        this._card.querySelector(
          ".elements__title"
        ).textContent = this._name;
    
        this._cardImage.querySelector(
          ".elements__image"
        ).style.backgroundImage = `url(${this._link})`;
    
        this._addEventListeners();
    
        return this._card;
      }
  
}

