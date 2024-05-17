import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteTeamMember, deleteTeamManager } from "../../../store/teams";

function DeleteMemberModal({ member, role }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = e => {
    e.preventDefault();
    console.log(member);
    if (role === 'member') {
      dispatch(deleteTeamMember(member.id));
    } else if (role === 'manager') {
      dispatch(deleteTeamManager(member.id));
    }

    // Temporary work around
    window.location.reload();
  };

  return (
    <div className='delete-modal'>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this member from your team?</p>
      <div className='buttons'>
        <button className='delete-button' onClick={handleDelete}>Delete</button>
        <button className='cancel-button' onClick={closeModal}>Cancel</button>
      </div>
    </div>
  )
}

export default DeleteMemberModal;
