import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {


    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({
        isOpen: false
      });

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }


    const handleCardClick = (card) => {
        setSelectedCard({
            isOpen: true,
            ...card
          })        
    }

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({isOpen: false});
    };



    return (
        <div className="page">
            <Header />
            <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
            <Footer />
            <PopupWithForm title="Редактировать профиль" name="edit-profile" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                <div className="popup__field">
                    <input name="username" type="text" className="popup__input popup__input_type_name" placeholder="Имя" minLength="2" maxLength="40" required />
                    <span className="username-error popup__error"></span>
                </div>
                <div className="popup__field">
                    <input name="description" type="text" className="popup__input popup__input_type_description" placeholder="Описание" minLength="2" maxLength="200" required />
                    <span className="description-error popup__error"></span>
                </div>
            </PopupWithForm>
            <PopupWithForm title="Новое место" name="add-card" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                <div className="popup__field">
                    <input name="name" type="text" className="popup__input popup__input_type_name" placeholder="Название" minLength="2" maxLength="30" required />
                    <span className="name-error popup__error"></span>
                </div>
                <div className="popup__field">
                    <input name="link" type="url" className="popup__input popup__input_type_link" placeholder="Ссылка на картинку" required />
                    <span className="link-error popup__error"></span>
                </div>
            </PopupWithForm>
            <PopupWithForm title="Обновить аватар" name="refresh-avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                <div className="popup__field">
                    <input name="link" type="url" className="popup__input popup__input_type_link popup__input_refresh-avatar" placeholder="Ссылка на аватар" required />
                    <span className="link-error popup__error"></span>
                </div>
            </PopupWithForm>
            <PopupWithForm title="Вы уверены?" name="confirm" />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        </div>
    );
}

export default App;
