import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { editTeamMember } from "../../../store/teams";

function EditMemberModal({ member, currentRole }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [role, setRole] = useState(currentRole);

  const handleSubmit = e => {
    e.preventDefault();

    const editedRole = { role }

    return dispatch(editTeamMember(member.id, editedRole))
      .then(closeModal)
  };

  return (
    <div className="form-cont">
      <h1>Change Team Member&apos;s Role</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="edit-member-role">Select role for {member.username}</label>
        <select
          id="edit-member-role"
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          <option value="Member">Member</option>
          <option value="Manager">Manager</option>
        </select>

        <button type="submit">Confirm</button>
      </form>
    </div>
  )
}

export default EditMemberModal
