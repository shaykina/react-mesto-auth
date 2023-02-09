import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from '../auth.js';

function Login({ handleLogin }) {
  const [loginInfo, setLoginInfo] = React.useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!loginInfo.email || !loginInfo.password) {
      return;
    }

    auth.authorize(loginInfo.email, loginInfo.password)
      .then((data) => {
        if (data.token) {
          setLoginInfo({ email: '', password: '' });
          handleLogin();
          navigate('/', { replace: true });
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="auth">
      <h1 className="auth__header">Вход</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__fieldset">
          <label className="auth__field">
            <input className="auth__input auth__input_type_login-username" type="email" name="email" value={loginInfo.email || ''} onChange={handleChange} id="email" placeholder="Email"
              minLength="2" maxLength="40" required />
            <span className="auth__error username-error"></span>
          </label>
          <label className="auth__field">
            <input className="auth__input auth__input_type_login-password" type="text" name="password" value={loginInfo.password || ''} onChange={handleChange} id="password" placeholder="Пароль"
              minLength="2" maxLength="40" required />
            <span className="auth__error password-error"></span>
          </label>
        </fieldset>
        <button className="auth__submit" type="submit">Войти</button>
      </form>
    </div>

  );
}

export default Login;
