import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SettingsDropdown from './SettingsDropdown';
import './Navigation.css';
import logo from '../../images/nexus-logo.png';

//Temporary icon imports
import { FaHome, FaWrench, FaBell } from 'react-icons/fa';
import { IoPersonSharp } from "react-icons/io5";
import { BsRocketTakeoff } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { IoMenu } from "react-icons/io5";

function Navigation() {
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    switch (window.location.pathname) {
      case '/home':
        document.getElementById('home-icon')?.classList.add('active');
        break;
      case '/contacts':
        document.getElementById('contacts-icon')?.classList.add('active');
        break;
      case '/projects':
        document.getElementById('projects-icon')?.classList.add('active');
        break;
      default:
        return;
    }
  })

  const setActive = eleId => {
    const navIcons = document.getElementsByClassName('nav-icon');
    const newActive = document.getElementById(eleId);

    Array.prototype.forEach.call(navIcons, icon => icon.classList.remove('active'));
    newActive.classList.add('active');
  };

  return (
    <>{!sessionUser ? <></> :
      <div className='nav-cont'>
        <div className='top-nav'>
          <img
            src={logo}
            crossOrigin='anonymous'
            alt="Nexus logo"
            className='nexus-logo'
            onClick={() => {
              navigate('/home');
              setActive('home-icon');
            }}
          />

          <div className='company-name'>{"[Company Name]"}</div>

          <div className='top-nav-right'>
            <div className='bell-icon' onClick={() => alert('Feature coming soon...')}>
              <FaBell size={'1.5em'} />
            </div>
            <div className='profile-cont'>
              <span>{sessionUser.username}</span>
              <SettingsDropdown user={sessionUser} />
            </div>
          </div>
        </div>

        <div className='bottom-nav'>
          <div className='nav-icons'>
            <div id='home-icon' className='nav-icon' onClick={() => {
              navigate('/home');
              setActive('home-icon');
            }}>
              <FaHome size={'2em'} />
            </div>
            <div id='contacts-icon' className='nav-icon' onClick={() => {
              navigate('/contacts');
              setActive('contacts-icon');
            }}>
              <IoPersonSharp size={'2em'} />
            </div>
            <div id='projects-icon' className='nav-icon' onClick={() => {
              navigate('/projects');
              setActive('projects-icon');
            }}>
              <BsRocketTakeoff size={'2em'} />
            </div>
            <div className='nav-icon' onClick={() => alert('Feature coming soon...')}>
              <SlCalender size={'2em'} />
            </div>
            <div className='nav-icon' onClick={() => alert('Feature coming soon...')}>
              <FaWrench size={'2em'} />
            </div>
          </div>

          <div className='bottom-nav-right'>
            <div className='menu-icon' onClick={() => alert('Feature coming soon...')}>
              <IoMenu size={'2.5em'} />
            </div>
            <div className='search-box'>

            </div>
          </div>
        </div>
      </div>
    }</>
  );
}

export default Navigation;
