import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createProject } from '../../store/projects';

function CreateProjectModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector(state => state.session.user)
  const [name, setName] = useState('');
  const [stage, setStage] = useState('');
  const [contactId, setContactId] = useState('');
  const [value, setValue] = useState(0);
  const [closeDate, setCloseDate] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});

    const newProject = {
      name,
      stage,
      ownerId: sessionUser.id,
      contactId,
      value,
      closeDate,
    };

    return dispatch(createProject(newProject)).then(() => {
      closeModal();
    });
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
        <label>
          Stage
          <input
            type="text"
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            required
          />
        </label>
        {errors.stage && <p>{errors.stage}</p>}
        <label>
          Contact
          <input
            type="text"
            value={contactId}
            onChange={(e) => setContactId(e.target.value)}
            required
          />
        </label>
        {errors.contactId && <p>{errors.contactId}</p>}
        <label>
          Value
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </label>
        {errors.value && <p>{errors.value}</p>}
        <label>
          Close Date
          <input
            type="text"
            value={closeDate}
            onChange={(e) => setCloseDate(e.target.value)}
            required
          />
        </label>
        {errors.closeDate && <p>{errors.closeDate}</p>}
        <button type="submit">Create Project</button>
      </form>
    </>
  )
}

export default CreateProjectModal;
