import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import * as sessionActions from '../../store/session';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = e => {
    e.preventDefault();

    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async res => {
          const data = await res.json();
          if (data?.errors) setErrors(data.errors);
        }
      );
  };

  const demoUser = () => {
    setCredential('Demo-lition');
    setPassword('password');
  };

  return (
    <>
      <h1>Log In</h1>
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
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button type="submit">Log In</button>
        <button onClick={demoUser}>Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;
