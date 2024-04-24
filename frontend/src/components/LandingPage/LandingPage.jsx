import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from "../OpenModalMenuItem";
import SignupFormModal from '../SignupFormModal';
import './LandingPage.css';

function LandingPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/home" replace={true} />;

  const handleSubmit = e => {
    e.preventDefault();

    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .catch(
        async res => {
          const data = await res.json();
          if (data?.errors) setErrors(data.errors);
          console.log(data)
        }
      );
  };

  const demoUser = () => {
    setCredential('Demo-lition');
    setPassword('password');
  };

  return (
    <div className='landing-cont'>
      <h1>Welcome to Nexus</h1>
      <div className='form-cont'>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          {errors.credential && <p>{errors.credential}</p>}

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p>{errors.password}</p>}

          <div className="buttons">
            <button type="submit">Log In</button>
            <button onClick={demoUser}>Demo User</button>
          </div>
        </form>
      </div>
      <div className='signup'>
        Don&apos;t have an account?
        <OpenModalMenuItem
          itemText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </div>
    </div>
  )
}

export default LandingPage;
