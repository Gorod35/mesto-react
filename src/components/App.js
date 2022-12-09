import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Card from './Card';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { Switch, Route } from 'react-router-dom';
import { api } from '../utils/Api';
import { CurrentUserContext, currentUser } from '../contexts/CurrentUserContext'

function App() {

    // const currentUser = React.useContext(CurrentUserContext);


    const [cards, setCards] = React.useState([]);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({
        isOpen: false
    });

    const [currentUser, setCurrentUser] = React.useState({});

    React.useEffect(() => {
        Promise.all([api.getUserInfo()])
            .then((userData) => {
                setCurrentUser(userData[0]);
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            })

        Promise.all([api.getInitialCards()])
            .then(([cards]) => {
                // console.log(cards);
                setCards(cards);
                // cards.forEach(card => {
                //     setCards([card, ...cards]);                    
                // });
                // setCards((cards) => {
                //     < Card card={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />

                // })
                // console.log(cards);
                // this.setState((state) => {
                //     return {
                //         cards: cards.map((cards) =>
                //             <Card card={cards} key={cards._id} onCardClick={this.props.onCardClick} onCardLike={this.handleCardLike} onCardDelete={this.handleCardDelete}/>
                //         )
                //     }
                // });
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            })
    }, []);


    const handleCardLike = (card) => {

        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    const handleCardDelete = (card) => {
        api.deleteCard(card._id).then((res) => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        })
    }




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
        setSelectedCard({ isOpen: false });
    };

    const handleUpdateUser = (data) => {
        api.setUserInfo(data).then((res) => {
            setCurrentUser(res);
        })
        closeAllPopups();
    }

    const handleUpdateAvatar = (link) => {
        api.setAvatar(link).then((res) => {
            setCurrentUser(res);
        })
        closeAllPopups();
    }

    const handleAddPlace = (data) => {
        api.addCard(data).then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
    }



    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <Main cards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
                <Footer />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <PopupWithForm title="Вы уверены?" name="confirm" />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
