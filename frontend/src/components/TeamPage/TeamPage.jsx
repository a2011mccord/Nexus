import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeam } from '../../store/teams';
import './TeamPage.css';
import { FaEllipsisH } from "react-icons/fa";

function TeamPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const currentTeam = useSelector(state => state.teamState.team);

  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch])

  const toggleActions = user => {
    const ele = document.getElementById(`user-${user.id}`)

    if (ele.classList.contains('hidden')) {
      const dropdowns = document.getElementsByClassName('user-actions-dropdown');
      Array.prototype.forEach.call(dropdowns, dropdown => dropdown.classList.add('hidden'));
      ele.classList.remove('hidden');
    } else {
      ele.classList.add('hidden');
    }
  };

  return (
    <div className='team-cont'>
      <h3>Owner</h3>
      <div>
        <p>Name: {currentTeam.Owner?.firstName} {currentTeam.Owner?.lastName}</p>
        <p>Username: {currentTeam.Owner?.username}</p>
        <p>Email: {currentTeam.Owner?.email}</p>
      </div>

      <h3>Managers</h3>
      {currentTeam && currentTeam.Managers.map(manager => (
        <div key={manager.id}>
          <p>Name: {manager.firstName} {manager.lastName}</p>
          <p>Username: {manager.username}</p>
          <p>Email: {manager.email}</p>
          {currentTeam && currentTeam.Owner.id === sessionUser.id &&
            <div className='user-actions-cont'>
              <div className='user-actions' onClick={() => toggleActions(manager)}>
                <FaEllipsisH size={'1.2em'} /></div>
              <div id={`user-${manager.id}`} className='user-actions-dropdown hidden'>
                <div>Edit</div>
                <div>Delete</div>
              </div>
            </div>
          }
        </div>
      ))}

      <h3>Members</h3>
      {currentTeam && currentTeam.Members.map(member => (
        <div key={member.id}>
          <p>Name: {member.firstName} {member.lastName}</p>
          <p>Username: {member.username}</p>
          <p>Email: {member.email}</p>
          {currentTeam && currentTeam.Owner.id === sessionUser.id &&
            <div className='user-actions-cont'>
              <div className='user-actions' onClick={() => toggleActions(member)}>
                <FaEllipsisH size={'1.2em'} /></div>
              <div id={`user-${member.id}`} className='user-actions-dropdown hidden'>
                <div>Edit</div>
                <div>Delete</div>
              </div>
            </div>
          }
        </div>
      ))}
      <button>Add a Team Member</button>
    </div>
  )
}

export default TeamPage;
