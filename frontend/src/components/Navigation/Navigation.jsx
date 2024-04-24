import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import SettingsDropdown from './SettingsDropdown';
import './Navigation.css';

//Temporary icon imports
import { FaHome, FaWrench, FaBell, FaSearch } from 'react-icons/fa';
import { IoPersonSharp } from "react-icons/io5";
import { BsRocketTakeoff } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { IoMenu } from "react-icons/io5";

function Navigation() {
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);

  const setActive = eleId => {
    const navIcons = document.getElementsByClassName('nav-icon');
    const newActive = document.getElementById(eleId);

    Array.prototype.forEach.call(navIcons, icon => icon.classList.remove('active'));
    newActive.classList.add('active');
  }

  return (
    <>{!sessionUser ? <></> :
      <div className='nav-cont'>
        <div className='top-nav'>
          <div><NavLink to="/home" className='home-link'>Nexus</NavLink></div>

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
            <div id='home-icon' className='nav-icon active' onClick={() => {
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
              <FaSearch />
              <input
                type="text"
                placeholder='Search...'
              />
            </div>
          </div>
        </div>
      </div>
    }</>
  );
}

export default Navigation;
