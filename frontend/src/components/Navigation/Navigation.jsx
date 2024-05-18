import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SettingsDropdown from './SettingsDropdown';
import { useModal } from '../../context/Modal';
import AboutModal from '../AboutModal';
import './Navigation.css';
import logo from '../../images/nexus-logo.png';
import starBackground from '../../images/s3.webp';

//Temporary icon imports
import { FaHome, FaWrench, FaBell } from 'react-icons/fa';
import { IoPersonSharp } from "react-icons/io5";
import { BsRocketTakeoff } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { IoMenu } from "react-icons/io5";

function Navigation() {
  const navigate = useNavigate();
  const { setModalContent } = useModal();
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
        document.getElementById('all-projects')?.classList.add('active');
        document.getElementById('pipeline')?.classList.remove('active');
        document.getElementById('analysis')?.classList.remove('active');
        break;
      case '/projects/pipeline':
        document.getElementById('projects-icon')?.classList.add('active');
        document.getElementById('pipeline')?.classList.add('active');
        break;
      case '/projects/analysis':
        document.getElementById('projects-icon')?.classList.add('active');
        document.getElementById('analysis')?.classList.add('active');
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

  const setActiveTab = eleId => {
    const projNavTabs = document.getElementsByClassName('proj-nav-tab');
    const newActive = document.getElementById(eleId);

    Array.prototype.forEach.call(projNavTabs, tab => tab.classList.remove('active'));
    newActive.classList.add('active');
  };

  const about = () => setModalContent(<AboutModal />);

  return (
    <>{!sessionUser ? <></> : <>
      <div className='nav-cont'>
        <div id='nav-background' style={{ backgroundImage: `url(${starBackground})`}} />
        <div id='easter-egg' />

        <div className='top-nav'>
          <div><img
            src={logo}
            alt="Nexus logo"
            className='nexus-logo'
            onClick={() => {
              navigate('/home');
              setActive('home-icon');
            }}
          /></div>

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
              <div onClick={about} className="about">About</div>
            </div>
          </div>
        </div>

      </div>
      {!(window.location.pathname.split('/')[1] === 'projects') ? <></> :
        <div className='projects-nav'>
          <div id='all-projects' className='proj-nav-tab' onClick={() => {
            navigate('/projects');
            setActiveTab('all-projects');
          }}>
            All Projects
          </div>
          <div id='pipeline' className='proj-nav-tab' onClick={() => {
            navigate('/projects/pipeline');
            setActiveTab('pipeline');
          }}>
            Pipeline
          </div>
          <div id='analysis' className='proj-nav-tab' onClick={() => {
            navigate('/projects/analysis');
            setActiveTab('analysis');
          }}>
            Analysis
          </div>
        </div>
      }
    </>}</>
  );
}

export default Navigation;
