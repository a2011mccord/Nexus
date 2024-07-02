import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { createTeam } from "../../../store/teams";

function CreateTeamModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});

    const newTeamInfo = { name };

    return dispatch(createTeam(newTeamInfo))
      .then(closeModal)
      .catch(async res => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      })
  }

  return (
    <div className="form-cont">
      <h1>Create New Team</h1>
      <form onSubmit={handleSubmit}>
        <label>Please enter the name of your team
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
        /></label>
        {errors.name && <p>{errors.name}</p>}

        <button type="submit">Create Team</button>
      </form>
    </div>
  )
}

export default CreateTeamModal;
