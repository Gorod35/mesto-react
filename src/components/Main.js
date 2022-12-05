import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userDescription: '',
            userAvatar: '',
            cards: []
        }
    }

    static contextType = CurrentUserContext;

    handleCardLike = (card) => {
        this.isLiked = card.likes.some(i => i._id === this.context._id);

        api.changeLikeCardStatus(card._id, !this.isLiked).then((newCard) => {
            // this.setState((state) => {
            //     return {
            //         cards: state.cards.map((c) => c._id === card._id ? newCard : c)
            //     }
            // })

            // console.log(this.state.cards);
            // console.log(newCard);
            this.cards = this.state.cards.map((c) => c.props.card._id === card._id ? console.log(c) : c);
            this.setState({cards: this.cards});
            
        });
    }

    componentDidMount = () => {
        Promise.all([api.getInitialCards()])
            .then(([cards]) => {
                this.setState((state) => {
                    return {
                        cards: cards.map((cards) =>
                            <Card card={cards} key={cards._id} onCardClick={this.props.onCardClick} onCardLike={this.handleCardLike}/>
                        )
                    }
                });
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            })
    }

    render() {
        return (
            <main className="content">
                <section className="profile">
                    <div className="profile__info">
                        <div className="profile__avatar" onClick={this.props.onEditAvatar}>
                            <img src={this.context.avatar} alt={this.context.name} className="profile__image" />
                        </div>
                        <div className="profile__description">
                            <div className="profile__name-edit">
                                <h1 className="profile__title">{this.context.name}</h1>
                                <button type="button" className="profile__edit-btn" onClick={this.props.onEditProfile}></button>
                            </div>

                            <p className="profile__subtitle">{this.context.about}</p>
                        </div>
                    </div>
                    <button type="button" className="profile__add-btn" onClick={this.props.onAddPlace}></button>
                </section>

                <section className="card">
                    <ul className="card__items">
                        {this.state.cards}
                    </ul>
                </section>
            </main>
        );
    }
}

export default Main;