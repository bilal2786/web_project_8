import FormValidator from './FormValidator.js';
import Card from './Card.js';
import initialCards from "./initialCards.js";
import toggleModal from './utils.js';
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import './pages/index.css';

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
const placesElements = document.querySelector(".card-template").content;



const formValidators = {}

// enable validation
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config)
    //  get the name of the form
    const formName = formElement.getAttribute('name')

   // store a validator by the `name` of the form
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(config);
const addFormValidator = new FormValidator(defaultConfig, formAddCard);
const userData = new UserInfo({ name: '.profile__name', job: '.profile__about' });




//add card form:
const addPlacePopup = new PopupWithForm(addNewPlacePopup, submitNewPlaceForm);
addPlacePopup.setEventListeners();

function submitNewPlaceForm(e) {
  e.preventDefault();

  const insertPlace = renderCard({
    name: inputPlace.value,
    link: inputLink.value,
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
    placesElements
  )
  
  init()
  
  async function init () {
    try {
      const [userData, cards] = await Promise.all([
        api.getUserData(),
        api.getInitialCards()
      ])
  
      userInfo.setUserInfo(
        userData.name,
        userData.about,
        userData.avatar,
        userData._id
      )
  
      if (cards) {
        cardSection.render(cards)
        setEventListeners()
        enableValidations()
      }
    } catch (e) {
      console.log('something went wrong..', e)
    }
  }
//submits and closes edit profile window
const userInfo = new UserInfo({ userNameElement, userJobElement });

const profileModal = new PopupWithForm(editProfilePopup, submitProfileForm);
profileModal.setEventListeners();

function submitProfileForm(e) {
  e.preventDefault();

  userInfo.setUserInfo({
    inputName: inputName.value,
    inputJob: inputJob.value,
  });
  profileModal.close();
}


const profileFormPopup = new PopupWithForm(handleEditFormSubmission, '.modal_type_edit-profile');
const cardFormPopup = new PopupWithForm(handleAddCardFormSubmission, '.modal_type_add-card');


  const picturePopupHandler = new PopupWithImage('.modal_type_image', link, text);
  picturePopupHandler.open();


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

//cards

function createCard(cardInfo){
    return new Card(cardInfo, elementTemplate ).generateCard();  }


initialCards.forEach((data) => {
    const newcard = createCard(data);
    list.prepend(newcard);
});


//function to open add-new-card modal
openModalAddCardButton.addEventListener('click', () => {
    
       toggleModal(modalAddCard);
});
editProfileModalButton.addEventListener("click", () => {
  
        profileName.value = userData.getUserInfo().name;
        profileAbout.value  =userData.getUserInfo().job;
        formValidators[ profileForm.getAttribute('name') ].resetValidation()
        profilePopupHandler.open();

    // toggleModal(modalEditProfile);
  
});

profileFormPopup.setEventListeners();
cardFormPopup.setEventListeners();