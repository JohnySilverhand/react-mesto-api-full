import React from "react"
import { useHistory, Link } from "react-router-dom";
import Header from "./Header.js";

function Register({onButtonClick}) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  let history =  useHistory();

  function onLogin() {
    history.push('/signin');
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    onButtonClick(email, password)
  }

  return(
  <section>
    <Header
      text='Войти'
      onClick = {onLogin}
    />
      <div className="register">
        <h2 className="register__header">Регистрация</h2>
        <form onSubmit={handleSubmit} className="popup__form register__form">
          <input
            className="popup__input register__input"
            value={email}
            onChange={handleEmail}
            placeholder='Email'
            type='email'
          >
          </input>
          <input
            className="popup__input register__input"
            value={password}
            onChange={handlePassword}
            placeholder='Пароль'
            type='password'
          >
          </input>
          <button
            className="popup__form-submit register__button-submit"
            type="submit"
          >
            Зарегистрироваться
          </button>
          <p className="register__button">Уже зарегистрированы? 
            <Link to='signin' className="register__remove"> Войти</Link>
          </p>
        </form>
      </div>
  </section>
  )
}

export default Register;