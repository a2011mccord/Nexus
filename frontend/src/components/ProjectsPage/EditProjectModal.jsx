import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { editProject } from '../../store/projects';

function EditProjectModal({ project }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState(project.name);
  const [stage, setStage] = useState(project.stage);
  const [contactId, setContactId] = useState(project.contactId);
  const [value, setValue] = useState(project.value);
  const [closeDate, setCloseDate] = useState(project.closeDate);
  const [errors, setErrors] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});

    const editedProject = {
      name,
      stage,
      ownerId: project.ownerId,
      contactId,
      value,
      closeDate
    };

    return dispatch(editProject(project.id, editedProject)).then(() => {
      closeModal();
    });
  };

  return (
    <>
      <h1>Edit Project</h1>
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
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default EditProjectModal;
