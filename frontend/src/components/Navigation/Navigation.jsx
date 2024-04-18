import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';

//Temporary icon imports
import { FaHome, FaWrench } from 'react-icons/fa';
import { IoPersonSharp } from "react-icons/io5";
import { BsRocketTakeoff } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";

function Navigation({ isLoaded }) {
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>{!sessionUser ? <></> :
      <div className='nav-cont'>
        <div className='top-nav'>
          <div><NavLink to="/home">Nexus</NavLink></div>
          <div>{"[Company Name]"}</div>
          <div><ProfileButton user={sessionUser} /></div>
        </div>
        <div className='bottom-nav'>
          <div className='nav-icons'>
            <div onClick={() => navigate('/home')}>
              <FaHome size={'2em'} />
            </div>
            <div onClick={() => navigate('/contacts')}>
              <IoPersonSharp size={'2em'} />
            </div>
            <div onClick={() => navigate('/projects')}>
              <BsRocketTakeoff size={'2em'} />
            </div>
            <div onClick={() => alert('Feature coming soon...')}>
              <SlCalender size={'2em'} />
            </div>
            <div onClick={() => alert('Feature coming soon...')}>
              <FaWrench size={'2em'} />
            </div>
          </div>
          <div>
            <div>Menu</div>
            <div>Search</div>
          </div>
        </div>
      </div>
    }</>
  );
}

export default Navigation;
