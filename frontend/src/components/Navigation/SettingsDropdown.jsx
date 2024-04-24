import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';

// Temporary icon imports
import { PiGearFineBold } from "react-icons/pi";

function SettingsDropdown({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show) return;

    const closeDropdown = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener('click', closeDropdown);

    return () => document.removeEventListener('click', closeDropdown);
  }, [show]);

  const closeDropdown = () => setShow(false);

  const toggleDropdown = e => {
    e.stopPropagation();
    setShow(!show);
  };

  const logout = e => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeDropdown();
    navigate('/');
  };

  const dropdownId = (show ? '' : 'hidden');

  return (
    <>
      <div className='gear-icon' onClick={toggleDropdown}>
        <PiGearFineBold size={'2em'} />
      </div>

      <div id={dropdownId} className='settings-dropdown' ref={dropdownRef}>
        <h4>Hello, {user.firstName} {user.lastName}</h4>
        <p>{user.email}</p>

        <button onClick={logout}>Log Out</button>
      </div>
    </>
  )
}

export default SettingsDropdown;
