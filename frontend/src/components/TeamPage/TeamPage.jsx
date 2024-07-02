import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeam } from '../../store/teams';
import { useModal } from '../../context/Modal';
import OpenModalMenuItem from '../OpenModalMenuItem';
import { CreateTeamModal, DeleteTeamModal, EditTeamModal } from './TeamModals';
import { AddMemberModal, DeleteMemberModal, EditMemberModal } from './MemberModals';
import './TeamPage.css';
import { FaEllipsisH, FaEdit } from "react-icons/fa";

function TeamPage() {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
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

  const addMember = () => setModalContent(<AddMemberModal />);
  const editTeam = () => setModalContent(<EditTeamModal team={currentTeam} />);
  const deleteTeam = () => setModalContent(<DeleteTeamModal />);

  return (
    <>{currentTeam && currentTeam.message ?
    <div className='team-cont'>
      <h2>{currentTeam.message}</h2>
      <OpenModalMenuItem
        modalComponent={<CreateTeamModal />}
        itemText='Create team?'
      />
    </div>
    :
    <div className='team-cont'>
      <h3>Team/Company Name</h3>
      <div>
        <p>{currentTeam?.name}</p>
        <FaEdit size={'1.2em'} className='fa-edit' onClick={editTeam} />
      </div>

      <h3>Owner</h3>
      <div>
        <p>Name: {currentTeam.Owner?.firstName} {currentTeam.Owner?.lastName}</p>
        <p>Username: {currentTeam.Owner?.username}</p>
        <p>Email: {currentTeam.Owner?.email}</p>
      </div>

      <h3>Managers</h3>
      {currentTeam.Managers && currentTeam.Managers.length ?
        currentTeam.Managers.map(manager => (
          <div key={manager?.id}>
            <p>Name: {manager?.firstName} {manager?.lastName}</p>
            <p>Username: {manager?.username}</p>
            <p>Email: {manager?.email}</p>
            {currentTeam && currentTeam.Owner.id === sessionUser.id &&
              <div className='user-actions-cont'>
                <div className='user-actions' onClick={() => toggleActions(manager)}>
                  <FaEllipsisH size={'1.2em'} /></div>
                <div id={`user-${manager.id}`} className='user-actions-dropdown hidden'>
                  <OpenModalMenuItem
                    modalComponent={<EditMemberModal member={manager} currentRole='Manager' />}
                    itemText='Edit'
                  />
                  <OpenModalMenuItem
                    modalComponent={<DeleteMemberModal member={manager} role='manager' />}
                    itemText='Delete'
                  />
                </div>
              </div>
            }
          </div>
        ))
        :
        <p>Your team currently has no managers.</p>
      }

      <h3>Members</h3>
      {currentTeam.Members && currentTeam.Members.length ?
        currentTeam.Members.map(member => (
          <div key={member?.id}>
            <p>Name: {member?.firstName} {member?.lastName}</p>
            <p>Username: {member?.username}</p>
            <p>Email: {member?.email}</p>
            {currentTeam && currentTeam.Owner.id === sessionUser.id &&
              <div className='user-actions-cont'>
                <div className='user-actions' onClick={() => toggleActions(member)}>
                  <FaEllipsisH size={'1.2em'} /></div>
                <div id={`user-${member?.id}`} className='user-actions-dropdown hidden'>
                  <OpenModalMenuItem
                    modalComponent={<EditMemberModal member={member} currentRole='Member' />}
                    itemText='Edit'
                  />
                  <OpenModalMenuItem
                    modalComponent={<DeleteMemberModal member={member} role="member" />}
                    itemText='Delete'
                  />
                </div>
              </div>
            }
          </div>
        ))
        :
        <p>Your team currently has no members.</p>
      }
      <button onClick={addMember}>Add a Team Member</button>
      <button onClick={deleteTeam}>Delete Team</button>
    </div>
    }</>
  )
}

export default TeamPage;
