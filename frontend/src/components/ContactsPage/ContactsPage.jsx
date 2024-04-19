import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, selectContacts } from '../../store/contacts';
import { fetchProjects, selectProjects } from '../../store/projects';
import './ContactsPage.css';
import { FaSquarePlus } from "react-icons/fa6";

function ContactsPage() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const projects = useSelector(selectProjects);

  useEffect(() => {
    dispatch(fetchContacts());
    dispatch(fetchProjects());
  }, [dispatch])

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
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <FaSquarePlus size={'2.5em'}/>
        <div></div>
      </div>
    </div>
  );
}

export default ContactsPage;
