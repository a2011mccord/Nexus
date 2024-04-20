import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteContact } from '../../store/contacts';

function DeleteContactModal({ contactId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = e => {
    e.preventDefault();

    dispatch(deleteContact(contactId)).then(closeModal);
  };

  return (
    <div className='delete-contact-modal'>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this contact from the listings?</p>
      <button className='delete-button' onClick={handleDelete}>Delete</button>
      <button className='cancel-button' onClick={closeModal}>Cancel</button>
    </div>
  )
}

export default DeleteContactModal;
