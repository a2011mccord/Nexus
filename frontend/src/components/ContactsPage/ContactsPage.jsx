import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchContacts, selectContacts } from '../../store/contacts';
import { fetchProjects, selectProjects } from '../../store/projects';
import { useModal } from '../../context/Modal';
import CreateContactModal from './CreateContactModal';
import EditContactModal from './EditContactModal';
import DeleteContactModal from './DeleteContactModal';
import './ContactsPage.css';
import { FaSquarePlus } from "react-icons/fa6";
import { FaEdit, FaTrash } from "react-icons/fa";

function ContactsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setModalContent, setOnModalClose } = useModal();
  const contacts = useSelector(selectContacts);
  const projects = useSelector(selectProjects);

  useEffect(() => {
    dispatch(fetchContacts());
    dispatch(fetchProjects());
  }, [dispatch]);

  const createContact = () => setModalContent(<CreateContactModal />);
  const editContact = contact => setModalContent(<EditContactModal contact={contact} />);
  const deleteContact = contact => {
    setOnModalClose(() => navigate('/contacts'));
    setModalContent(<DeleteContactModal contactId={contact.id} />);
  }

  return (
    <div className='contacts-cont'>
      <h1>Contacts</h1>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Projects</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts && contacts.map(contact => (
            <tr key={contact.id}>
              <th scope='row'>{contact.firstName} {contact.lastName}</th>
              <td>{contact.type}</td>
              <td>{contact.email}</td>
              <td>{contact.phoneNumber}</td>
              <td>{projects && projects.filter(project => {
                return project.contactId === contact.id
              }).length}</td>
              <td><div>
                <FaEdit size={'1.2em'} className='fa-edit'
                  onClick={() => editContact(contact)} />
                <FaTrash size={'1.2em'} className='fa-trash'
                  onClick={() => deleteContact(contact)} />
              </div></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <FaSquarePlus size={'2.5em'} className='fa-plus' onClick={createContact}/>
        <div></div>
      </div>
    </div>
  );
}

export default ContactsPage;
