import PopupWithImage from "../components/PopupWithImage.js";

class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
  	this._element = document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);

    return this._element;
  }

  

  _handleLikeButton = ()  => {
    this._likeButton.classList.toggle("element__like-button_full");
    
  };
  
  _handleTrashButton = ()  => {
    this._element.remove();
    this._element = null; 
  };

  _setEventListeners() { 
    this._likeButton.addEventListener("click", this._handleLikeButton);
    this._deleteButton.addEventListener("click", this._handleTrashButton);
    this._cardImage.addEventListener("click", this._handleCardClick);
  }

  getView() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".element__like-button");
    this._deleteButton = this._element.querySelector(".element__trash-button");
    this._cardImage = this._element.querySelector(".element__image");
    this._element.querySelector(".element__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
       this._setEventListeners();
    return this._element;
  }
}

export default Card;
