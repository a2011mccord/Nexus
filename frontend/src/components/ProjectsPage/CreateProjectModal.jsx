import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createProject } from '../../store/projects';
import { fetchProjects } from '../../store/projects';

function CreateProjectModal({ contacts }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector(state => state.session.user)
  const [name, setName] = useState('');
  const [stage, setStage] = useState('');
  const [contact, setContact] = useState('');
  const [contactId, setContactId] = useState();
  const [value, setValue] = useState(0);
  const [closeDate, setCloseDate] = useState(new Date().toISOString().split('T')[0]);
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

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors({});

    const newProject = {
      name,
      stage,
      ownerId: sessionUser.id,
      contactId,
      value,
      closeDate: new Date(closeDate).toISOString().split('T')[0]
    };

    await closeModal();
    await dispatch(createProject(newProject));
    await dispatch(fetchProjects());
  };

  const testProject = () => {
    setName('Test');
    setStage('Lead');
    setContactId(1);
    setValue(1000);
    setCloseDate('2024-07-04');
  }

  return (
    <>
      <h1>Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.name && <p>{errors.name}</p>}

        <select
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

        <select
          value={contact}
          onChange={e => {
            setContact(e.target.value);
            setContactId(contacts.find(contact => contact.email === e.target.value.split('-')[1].trim()).id)
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
          Value
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
            min={new Date().toISOString().split('T')[0]}
            value={closeDate}
            onChange={(e) => setCloseDate(e.target.value)}
            required
          />
        </label>
        {errors.closeDate && <p>{errors.closeDate}</p>}

        <button type="submit" disabled={Object.values(errors).length}>Create Project</button>
        <button onClick={testProject}>Test Project</button>
      </form>
    </>
  )
}

export default CreateProjectModal;
