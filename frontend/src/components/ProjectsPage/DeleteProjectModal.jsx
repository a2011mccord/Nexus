import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteProject } from '../../store/projects';

function DeleteProjectModal({ projectId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = e => {
    e.preventDefault();

    dispatch(deleteProject(projectId)).then(closeModal);

    // Temporary work around
    window.location.reload();
  };

  return (
    <div className='delete-modal'>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this project from the listings?</p>
      <div className='buttons'>
        <button className='delete-button' onClick={handleDelete}>Delete</button>
        <button className='cancel-button' onClick={closeModal}>Cancel</button>
      </div>
    </div>
  )
}

export default DeleteProjectModal;
