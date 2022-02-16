export default class Card {
  constructor(data, templateSelector, onImageClick) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = onImageClick;
  }

  _getNewCardTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardTemplate;
  }


  _handlePicPrev() {
    this._handleCardClick({link: this._link, name: this._name})
  }

  _handleLike(evt) {
    evt.target.classList.toggle('elements__like-button_active');

  }

  _handleDelete(evt) {
    evt.target.closest(".elements__item").remove();

  }

  _setEventListeners() {
    this._cardImage = this._card.querySelector('.elements__image')
    this._cardLikeButton = this._card.querySelector('.elements__like-button')
    this._cardDeleteButton = this._card.querySelector('.elements__delete-button')

    this._cardImage.addEventListener("click", this._handlePicPrev.bind(this));
    this._cardLikeButton.addEventListener('click', this._handleLike);
    this._cardDeleteButton.addEventListener('click', this._handleDelete);
  };


  render() {
    this._card = this._getNewCardTemplate();
    this._card.querySelector(".elements__title").textContent = this._name;

    this._card.querySelector(
      ".elements__image"
    ).style.backgroundImage = `url(${this._link})`;

    this._setEventListeners();

    return this._card;
  }

}

