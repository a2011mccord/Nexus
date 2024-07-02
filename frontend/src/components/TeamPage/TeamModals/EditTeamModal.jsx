import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { editTeam } from "../../../store/teams";

function EditTeamModal({ team }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState(team && team.name);
  const [errors, setErrors] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});

    const newTeamInfo = { ownerId: team.ownerId, name };

    return dispatch(editTeam(team?.id, newTeamInfo))
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
      <h1>Edit Team Name</h1>
      <form onSubmit={handleSubmit}>
        <label>Please enter the new name of your team
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
        /></label>
        {errors.name && <p>{errors.name}</p>}

        <button type="submit">Edit Team</button>
      </form>
    </div>
  )
}

export default EditTeamModal;
