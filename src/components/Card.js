import React from 'react';

class Card extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.onCardClick(this.props.card);
      } 

    render() {
        return (
            <li className="card__item">
                <img src={this.props.card.link} alt={this.props.card.name} className="card__image" onClick={this.handleClick}/>
                <button className="card__delete-btn"></button>
                <div className="card__description">
                    <h2 className="card__title">{this.props.card.name}</h2>
                    <div className="card__container">
                        <button type="button" className="card__like-btn"></button>
                        <span className="card__counter">{this.props.card.likes.length}</span>
                    </div>
                </div>
            </li>
        );
    }
}

export default Card;