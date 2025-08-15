import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../reducers/user.reducer';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setAlert(true);
      return;
    }
    setAlert(false);
    const resultAction = await dispatch(loginUser({ email, password, rememberMe }));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/user');
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              if (alert) setAlert(false)
              }}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              if (alert) setAlert(false)
              }}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button" disabled={loading}>
            {loading ? 'Connexion en cours...' : 'Sign In'}
          </button>
          {alert && <p className="sign-in-alert">Veuillez remplir tous les champs</p>}
          {error && <p className="sign-in-alert-false">{error}</p>}
        </form>
      </section>
    </main>
  );
};

export default SignIn;
