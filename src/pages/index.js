import "./index.css";

import logo from '../images/logo.svg';
import avatar from '../images/profile pic.jpg';

//import all classes
import {initialCards, validationSettings} from "../utils/constants.js";
import Section from "../components/Section";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
//const cardSelector = document.querySelector("#card-template");
//const cardListSelector = document.querySelector(".elements");
const nameInputEl = document.getElementById("#edit-card-name");
const descriptionInputEl = document.getElementById("#edit-card-description");
const headerLogo = document.querySelector('.header__logo');
const userAvatar = document.querySelector('.profile__image');

headerLogo.src = logo;
userAvatar.src = avatar;

const nameInput = document.querySelector("#name-input");
 const jobInput = document.querySelector("#description-input");
/*create instances of the classes */

//PopupWithImage instance
const cardPreview = new PopupWithImage("#popup-preview");

//Card instance
const createNewCard = (data) => {
      const card = new Card(
    {
      data: { name: data.name || data.title, link: data.link },
      handleCardClick: () => {
        cardPreview.open({data});
      },
    },
    "#card-template"
  );
  return card.getView();
}

//Section instance
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardSection.addItem(createNewCard(data));
    },
  },
  ".elements"
);

//*UserInfo instance
const userInfo = new UserInfo({
  userNameSelector: "#edit-card-name",
  userDescriptionSelector: "#edit-card-description",
});

//PopupWithForm instance for edit profile popup
const userInfoPopup = new PopupWithForm({
  popupSelector: "#edit-profile-popup",
  handleFormSubmit: (data) => {   
    userInfo.setUserInfo(data);
  },
});

//PopupWithForm instance new card popup
const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-popup",
  handleFormSubmit: (data) => {
    cardSection.addItem(createNewCard(data)); 
  }, 
}); 

///FormValidator instance
const editFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#edit-profile-form")
);

const cardFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#new-card-form")
);


/*event listeners for page*/

//edit profile open popup 
editProfileButton.addEventListener("click", (evt) => {
  const userInfoData = userInfo.getUserInfo();
  nameInput.value = userInfoData.Name;
  jobInput.value = userInfoData.Description;
    userInfoPopup.open();
  editFormValidator.resetValidation();
});

//new card open popup 
addCardButton.addEventListener("click", (evt) => {
  newCardPopup.open();
  cardFormValidator.resetValidation();
});


//initialize all my instances
cardSection.renderItems();
cardPreview.setEventListeners();
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();
editFormValidator.enableValidation();
cardFormValidator.enableValidation();
