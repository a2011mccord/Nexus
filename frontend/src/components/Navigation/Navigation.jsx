import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>{!sessionUser ? <></> :
      <div className='nav-cont'>
        <div className='top-nav'>
          <div><NavLink to="/">Home</NavLink></div>
          <div>{"[Company Name]"}</div>
          <div><ProfileButton user={sessionUser} /></div>
        </div>
        <div className='bottom-nav'>
          <div>
            <div>Home</div>
            <div>Contacts</div>
            <div>Projects</div>
            <div>Calender</div>
            <div>Tools</div>
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
