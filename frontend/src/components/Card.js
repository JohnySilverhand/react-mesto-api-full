import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__delete-card ${isOwn ? 'element__delete-card_visible element__delete-card' : 'element__delete-card'}`
  );
  const isLiked = props.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `${isLiked ? 'element__like_active' : 'element__like'}`
  );

  function handleCardClick() {
    props.onCardClick(props);
  }

  function handleCardLike() {
    props.onCardLike(props);
  }

  function handleCardDelete() {
    props.onCardDelete(props);
  }

  return (
    <li className="element">
      <img className="element__image" src={props.link} alt={props.name} onClick={handleCardClick} />
      <button className={cardDeleteButtonClassName} type="button" onClick={handleCardDelete}></button>
      <div className="element__flex-row">
        <h2 className="element__text" name="Card">{props.name}</h2>
        <div className="element__counter-container">
          <button className={cardLikeButtonClassName} type="button"
          onClick={handleCardLike}></button>
          <p className="element__counter">{props.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;