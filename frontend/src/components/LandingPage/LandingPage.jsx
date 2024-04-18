import { useSelector } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import './LandingPage.css';

function LandingPage() {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <div className='landing-cont'>
      <h1>Log In</h1>
      <ProfileButton user={sessionUser} />
    </div>
  )
}

export default LandingPage;
