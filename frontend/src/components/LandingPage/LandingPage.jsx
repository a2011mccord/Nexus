import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ProfileButton from '../Navigation/ProfileButton';
import './LandingPage.css';

function LandingPage() {
  const sessionUser = useSelector(state => state.session.user)

  if (sessionUser) return <Navigate to="/home" replace={true} />;

  return (
    <div className='landing-cont'>
      <h1>Log In</h1>
      <ProfileButton user={sessionUser} />
    </div>
  )
}

export default LandingPage;
