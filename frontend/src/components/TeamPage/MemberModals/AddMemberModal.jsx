import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { createTeamMember } from "../../../store/teams";

function AddMemberModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [newMember, setNewMember] = useState('');
  const [role, setRole] = useState('Member');
  const [errors, setErrors] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});

    const newMemberInfo = { newMember, role };

    return dispatch(createTeamMember(newMemberInfo))
      .then(closeModal)
      .catch(async res => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div className="form-cont">
      <h1>Add New Team Member</h1>
      <form onSubmit={handleSubmit}>
        <label>Please enter a User&apos;s credentials
          <input
            type="text"
            placeholder="Username or Email"
            value={newMember}
            onChange={e => setNewMember(e.target.value)}
            required
        /></label>
        {errors.newMember && <p>{errors.newMember}</p>}

        <label htmlFor="new-member-role">Select role for new member</label>
        <select
          id="new-member-role"
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          <option value="Member">Member</option>
          <option value="Manager">Manager</option>
        </select>

        <button type="submit">Add Team Member</button>
      </form>
    </div>
  )
}

export default AddMemberModal
