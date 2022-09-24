import React, {useState} from "react";
import {Route, Switch, useHistory } from 'react-router-dom';
import Register from "./Register.js";
import Login from "./Login.js";
import InfoTooltip from "./InfoTooltip.js";
import no from "../images/no.png";
import yes from "../images/yes.png";
import * as auth from "../utils/auth.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ProtectedRoute from "./ProtectedRoute.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";


function App() {
  const history = useHistory();
  const [editProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [editAvatarProfilePopupOpen, setEditAvatarProfilePopupOpen] = useState(false);
  const [addCardPopupOpen, setAddCardPopupOpen] = useState(false);
  const [isInfoTooltip, setInfoTooltip] = useState(false);
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [card, setCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  React.useEffect(() => {
    handleTokenCheck()
  }, []);

  React.useEffect(() => {
    if(loggedIn){
    api.getProfileInfo()
    .then((userInfo) => {
      setCurrentUser(userInfo)
    })
    .catch((err) => {
      console.log(err);
    })

    api.getCards()
    .then((data) => {
      setCards(
        data.map((card) => ({
          _id: card._id,
          link: card.link,
          name: card.name,
          likes: card.likes,
          owner: card.owner
        })
        )
      )
    })
    .catch((err) => {
      console.log(err);
    })
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id );
  
    if (!isLiked) {
      api.likeCard(card)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch ((err) => {
          console.log (err);
        })
    } else {
        api.dislikeCard (card)
          .then ((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
          })
        .catch ((err) => {
          console.log (err);
      })
  } 
} 

  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(() => {
        setCards(state => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateUser(data) {
    api.addUserInfo(data)
      .then((userData) => {
        setCurrentUser(userData)
        closePopups(setEditProfilePopupOpen);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(data) {
    api.addUserAvatar(data)
      .then((userData) => {
        setCurrentUser(userData)
        closePopups(setEditAvatarProfilePopupOpen)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(data) {
    api.addCards(data)
      .then((card) => {
        setCards([card, ...cards])
        closePopups(setAddCardPopupOpen)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function closePopups() {
    setEditAvatarProfilePopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddCardPopupOpen(false);
    setCard({});
    setInfoTooltip(false);
  }

  function handleTokenCheck() {
      const token = localStorage.getItem('token');
      if (token) {
        auth.getContent(token)
          .then((res) => {
            if(res){
              const email = res.user.email
              setLoggedIn(true)
              setUserEmail(email);
            }
            history.push('/')
          })
          .catch((err) => {
            console.log(err);
          })
      }
  }

  function deleteToken() {
    localStorage.removeItem('token');
    history.push('/signin');
    setLoggedIn(false);
    setUserEmail(null);
  }

  function onRegister(email, password) {
    auth.register(email, password)
      .then((data) => {
        if(data) {
          setInfoTooltip(true)
          setText('Вы успешно зарегестрировались!')
          setImage(yes)
          history.push('./signin');
        }
      })
    .catch((err) => {
      console.log(err);
        setInfoTooltip(true)
        setText('Что-то пошло не так! Попробуйте ещё раз.')
        setImage(no)
    })
}

  function onAuthorize(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        if(data.token) {
        localStorage.setItem('tiken', data.token);
        setLoggedIn(true);
        setUserEmail(email);
        history.push('/')
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltip(true)
        setText('Что-то пошло не так! Попробуйте ещё раз.')
        setImage(no)
      })
  }
  
  return (
  <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact={true} path="/signin">
            <Login
              onAuthorize={onAuthorize}
            />
          </Route>
          <Route exact={true} path="/signup">
            <Register 
              onButtonClick={onRegister}
            />
          </Route>
      
          <ProtectedRoute exact={true} path='/'
            loggedIn = {loggedIn} 
            onEditProfile = {setEditProfilePopupOpen}
            onEditAvatar = {setEditAvatarProfilePopupOpen}
            onAddCard = {setAddCardPopupOpen}
            onCardClick = {setCard}
            component = {Main}
            onDeleteToken = {deleteToken}
            userData = {userEmail}
            onCardLike = {handleCardLike}
            onCardDelete = {handleCardDelete}
            cards = {cards}
          >
          </ProtectedRoute>
        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={editProfilePopupOpen}
          onClose={closePopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
        isOpen={editAvatarProfilePopupOpen}
        onClose={closePopups}
        onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
        isOpen={addCardPopupOpen}
        onClose={closePopups}
        onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup card = {card} close = {closePopups} />  

        <InfoTooltip 
          isOpen={isInfoTooltip}
          onClose={closePopups}
          image={image}
          text={text}
        />

      </div>
  </CurrentUserContext.Provider>  
  );
}

export default App;
