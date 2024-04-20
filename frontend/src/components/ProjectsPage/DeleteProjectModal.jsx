import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteProject } from '../../store/projects';

function DeleteProjectModal({ projectId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = e => {
    e.preventDefault();

    dispatch(deleteProject(projectId)).then(closeModal);
  };

  return (
    <div className='delete-project-modal'>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this project from the listings?</p>
      <button className='delete-button' onClick={handleDelete}>Delete</button>
      <button className='cancel-button' onClick={closeModal}>Cancel</button>
    </div>
  )
}

export default DeleteProjectModal;
