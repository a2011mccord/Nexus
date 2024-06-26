import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteContact } from '../../store/contacts';

function DeleteContactModal({ contactId, refresh }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = e => {
    e.preventDefault();

    dispatch(deleteContact(contactId)).then(closeModal).then(refresh);

    // Temporary work around
    window.location.reload();
  };

  return (
    <div className='delete-modal'>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this contact from the listings?</p>
      <div className='buttons'>
        <button className='delete-button' onClick={handleDelete}>Delete</button>
        <button className='cancel-button' onClick={closeModal}>Cancel</button>
      </div>
    </div>
  )
}

export default DeleteContactModal;
