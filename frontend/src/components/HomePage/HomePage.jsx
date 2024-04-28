import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchProjects, selectProjects } from '../../store/projects';
import StageChart from './StageChart';
import './HomePage.css';
import lIcon from '../../images/l-icon.png';
import pIcon from '../../images/p-icon.png';
import aIcon from '../../images/a-icon.png';
import cIcon from '../../images/c-icon.png';
import iIcon from '../../images/i-icon.png';

function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const projects = useSelector(selectProjects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  return (
    <div className='home-cont'>
      <div className='home-left-panel'>
        <div className='home-projects'>
          <h3>Projects</h3>
          <div className='stage-icons'>
            <div>
              <img src={lIcon} alt="L" />
              <span>
                {projects && projects.filter(project => {
                  return project.stage === 'Lead'
                }).length}
              </span>
            </div>
            <div>
              <img src={pIcon} alt="P" />
              <span>
                {projects && projects.filter(project => {
                  return project.stage === 'Prospect'
                }).length}
              </span>
            </div>
            <div>
              <img src={aIcon} alt="A" />
              <span>
                {projects && projects.filter(project => {
                  return project.stage === 'Approved'
                }).length}
              </span>
            </div>
            <div>
              <img src={cIcon} alt="C" />
              <span>
                {projects && projects.filter(project => {
                  return project.stage === 'Completed'
                }).length}
              </span>
            </div>
            <div>
              <img src={iIcon} alt="I" />
              <span>
                {projects && projects.filter(project => {
                  return project.stage === 'Invoiced'
                }).length}
              </span>
            </div>
          </div>
        </div>
        <div className='home-charts'>
          <div className='stage-chart'>
            <StageChart projects={projects} />
          </div>
        </div>
      </div>

      <div className='home-right-panel'>
        <div className='home-activity'>
          <h3>Activity Feed</h3>
          <div className='activity-feed'>
            Coming soon...
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;
