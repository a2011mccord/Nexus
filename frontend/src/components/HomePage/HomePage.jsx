import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const sessionUser = useSelector(state => state.session.user);

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  return (
    <div className='home-cont'>
      <div className='home-left-panel'>
        <div className='home-projects'>
          Projects
        </div>
        <div className='home-charts'>
          <div>Bar Chart</div>
          <div>Donut Chart</div>
        </div>
      </div>

      <div className='home-right-panel'>
        <div className='home-activity'>
          Activity Feed
        </div>
      </div>
    </div>
  )
}

export default HomePage;
