import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card';
import initialCards from "../utils/initialCards.js";
import toggleModal from '../utils/utils.js';
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import "./index.css"
import logo from '../images/logo.svg';
import avatar from '../images/jc.jpg';

const defaultConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
};

const modalEditProfile = document.querySelector(".modal_type_edit-profile");
const modalAddCard = document.querySelector(".modal_type_add-card");
const formEditProfile = modalEditProfile.querySelector(".form");
const formAddCard = modalAddCard.querySelector(".form");
const formCard = document.querySelector('.form_type_add-card');
const placesElements = document.querySelector("#card-template").content;
const headerLogo = document.querySelector('.header__logo');
const userAvatar = document.querySelector('.profile__avatar');

headerLogo.src = logo;
userAvatar.src = avatar;

const formValidators = {}

const addFormValidator = new FormValidator(defaultConfig, formAddCard);
const userData = new UserInfo({name: '.profile__name', job: '.profile__about'});

//const userInfo = new UserInfo({name: 'profile__name', job: 'profile__about'});

const editFormValidator = new FormValidator(defaultConfig, formAddCard);
// enable validation
const enableValidation = (defaultConfig) => {
  const formList = Array.from(document.querySelectorAll(defaultConfig.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(defaultConfig, formElement)
    //  get the name of the form
    const formName = formElement.getAttribute('name')

    // store a validator by the `name` of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(defaultConfig);


function renderCard(data) {
  const card = new Card(data, elementTemplate, (link, name) =>
    //note! => binds "open" to original this._popup rather than to scope (Class "Card")
    previewImage.open(link, name)
  );
  placesList.prepend(card.render());
}
//add card form:
const addPlacePopup = new PopupWithForm(submitNewPlaceForm, ".modal_type_add-card");
addPlacePopup.setEventListeners();

function submitNewPlaceForm(e) {
  e.preventDefault();
 
    const place = document.querySelector(".form__input_type_card-title");
    const link = document.querySelector(".form__input_type_url");
   
  const insertPlace = renderCard({
    place: place.value,
    link: link.value,
  });
  elementsList.addItem(insertPlace);
  addPlacePopup.close();
}

const cardSection = new Section(
  {
    renderer: element => {
      const card = createCard(element)
      cardSection.addItem(card)
    }
  },
  'elements'
)

//const userInfo = new UserInfo({name: 'profile__name', job: 'profile__about'});

const profileModal = new PopupWithForm(submitProfileForm, ".modal_type_edit-profile");
profileModal.setEventListeners();

function submitProfileForm(evt) {
  evt.preventDefault();
  const name = document.querySelector(".profile__name");
  const job = document.querySelector(".profile__about");
  userData.setUserInfo({
    name: name.value,
    job: job.value,
  });
  profileModal.close();
}

const picturePopupHandler = new PopupWithImage('.modal_type_image');


editFormValidator.enableValidation()
addFormValidator.enableValidation()

//DECLARING VARIABLES

//wrappers
const modalImageWindow = document.querySelector(".modal_type_image");
const modalImageBig = modalImageWindow.querySelector(".modal__image");
const modalImageBigTitle = modalImageWindow.querySelector(".modal__image-title");
const list = document.querySelector(".elements__items");


//openButtons
const editProfileModalButton = document.querySelector(".profile__edit-button");
const openModalAddCardButton = document.querySelector(".profile__add-button");


//profileSection
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

//formInputs
const nameInput = document.querySelector(".form__input_type_name");
const aboutInput = document.querySelector(".form__input_type_about");
const cardImageLinkInput = document.querySelector(".form__input_type_url");
const cardTitleInput = document.querySelector(".form__input_type_card-title");
const elementTemplate = document.querySelector("#card-template").content; ///template content
const placesList = document.querySelector(".elements__items"); //ul of place cards

//cards

function createCard(cardInfo) {
  const newCard = new Card(cardInfo, "#card-template", picturePopupHandler.open);
  return newCard.render()
}


initialCards.forEach((data) => {
  const newCard = createCard(data);
  list.prepend(newCard);
});


//function to open add-new-card modal
openModalAddCardButton.addEventListener('click', () => {

  toggleModal(modalAddCard);
});
editProfileModalButton.addEventListener("click", () => {

  profileName.value = userData.getUserInfo().name;
  profileAbout.value = userData.getUserInfo().job;
  formValidators[formEditProfile.getAttribute('name')].resetValidation()
  profileModal.open();


});
