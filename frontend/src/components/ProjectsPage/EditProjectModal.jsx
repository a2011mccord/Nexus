import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { editProject, fetchProjects } from '../../store/projects';

function EditProjectModal({ project, contacts }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const currentContact = contacts.find(contact => contact.id === project.contactId)
  const [name, setName] = useState(project.name);
  const [stage, setStage] = useState(project.stage);
  const [contact, setContact] = useState(
    `${currentContact.firstName} ${currentContact.lastName} - ${currentContact.email}`
  );
  const [contactId, setContactId] = useState(project.contactId);
  const [value, setValue] = useState(project.value);
  const [closeDate, setCloseDate] = useState(project.closeDate);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const errs = {};

    if (!name) {
      errs.name = "Project name is required"
    }
    if (!stage) {
      errs.stage = "Project stage is required"
    }
    if (!contact) {
      errs.contact = "Contact is required"
    }

    setErrors(errs)
  }, [name, stage, contact])

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});

    const editedProject = {
      name,
      stage,
      teamId: 1,
      repId: project.repId,
      contactId,
      value,
      closeDate: new Date(closeDate).toISOString().split('T')[0]
    };

    return dispatch(editProject(project.id, editedProject))
      .then(closeModal)
      .then(() => dispatch(fetchProjects()))
      .catch(async res => {
        const data = await res.json();
        if (data) {
          setErrors({ name: data.message });
        }
      });
  };

  return (
    <div className='form-cont'>
      <h1>Edit Project</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Project Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.name && <p>{errors.name}</p>}

        <label htmlFor="project-stage" className='outside-label'>Project Stage</label>
        <select
          id='project-stage'
          value={stage}
          onChange={e => setStage(e.target.value)}
        >
          <option value="" disabled>
            Please select project stage
          </option>
          <option value="Lead">Lead</option>
          <option value="Prospect">Prospect</option>
          <option value="Approved">Approved</option>
          <option value="Completed">Completed</option>
          <option value="Invoiced">Invoiced</option>
        </select>
        {errors.stage && <p>{errors.stage}</p>}

        <label htmlFor="project-contact" className='outside-label'>Contact</label>
        <select
          id='project-contact'
          value={contact}
          onChange={e => {
            setContactId(contacts.find(contact => contact.email === e.target.value.split('-')[1].trim()).id)
            setContact(e.target.value);
          }}
        >
          <option value="" disabled>
            Please select a contact
          </option>
          {contacts && contacts.map(contact => (
            <option key={contact.id}>
              {contact.firstName} {contact.lastName} - {contact.email}
            </option>
          ))}
        </select>
        {errors.contact && <p>{errors.contact}</p>}

        <label>
          Project Value
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </label>
        {errors.value && <p>{errors.value}</p>}

        <label>
          Close Date
          <input
            type="date"
            selected={closeDate}
            min={new Date().toISOString().split('T')[0]}
            value={closeDate}
            onChange={(e) => setCloseDate(e.target.value)}
            required
          />
        </label>
        {errors.closeDate && <p>{errors.closeDate}</p>}

        <button type="submit" disabled={Object.values(errors).length}>Submit</button>
      </form>
    </div>
  )
}

export default EditProjectModal;
