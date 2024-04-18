import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';

//Temporary icon imports
import { FaHome, FaWrench } from 'react-icons/fa';
import { IoPersonSharp } from "react-icons/io5";
import { BsRocketTakeoff } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";

function Navigation({ isLoaded }) {
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
          <div>
            <div><FaHome size={'2em'} /></div>
            <div><IoPersonSharp size={'2em'} /></div>
            <div><BsRocketTakeoff size={'2em'} /></div>
            <div><SlCalender size={'2em'} /></div>
            <div><FaWrench size={'2em'} /></div>
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
