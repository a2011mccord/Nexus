import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { editContact } from '../../store/contacts';

function EditContactModal({ contact }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [firstName, setFirstName] = useState(contact.firstName);
  const [lastName, setLastName] = useState(contact.lastName);
  const [email, setEmail] = useState(contact.email);
  const [phoneNumber, setPhoneNumber] = useState(contact.phoneNumber);
  const [type, setType] = useState(contact.type);
  const [errors, setErrors] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});

    const editedContact = {
      firstName,
      lastName,
      email,
      phoneNumber,
      type
    };

    return dispatch(editContact(contact.id, editedContact)).then(() => {
      closeModal();
    });
  };

  return (
    <>
      <h1>Edit Contact</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}

        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}

        <label>
          Phone Number
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>
        {errors.phoneNumber && <p>{errors.lastName}</p>}

        <select
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option value="" disabled>
            Please select contact type
          </option>
          <option value="Lead">Lead</option>
          <option value="Customer">Customer</option>
          <option value="Partner">Partner</option>
          <option value="Vendor">Vendor</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default EditContactModal;
