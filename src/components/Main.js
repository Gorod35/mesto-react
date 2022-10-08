import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';

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


    componentDidMount() {
        Promise.all([api.getInitialCards(), api.getUserInfo()])
            .then(([cards, userData]) => {
                // console.log(cards);
                this.setState((state) => {
                    return {
                        userName: userData.name,
                        userDescription: userData.about,
                        userAvatar: userData.avatar,
                        cards: cards.map((cards) =>
                            <Card card={cards} key={cards._id} onCardClick={this.props.onCardClick}/>
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
                            <img src={this.state.userAvatar} alt={this.state.userName} className="profile__image" />
                        </div>
                        <div className="profile__description">
                            <div className="profile__name-edit">
                                <h1 className="profile__title">{this.state.userName}</h1>
                                <button type="button" className="profile__edit-btn" onClick={this.props.onEditProfile}></button>
                            </div>

                            <p className="profile__subtitle">{this.state.userDescription}</p>
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