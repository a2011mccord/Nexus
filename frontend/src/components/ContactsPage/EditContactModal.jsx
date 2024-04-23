import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const errs = {};

    if (!firstName) {
      errs.firstName = "First name is required"
    }
    if (!lastName) {
      errs.lastName = "Last name is required"
    }
    if (!email) {
      errs.email = "Email address is required"
    }
    if (!phoneNumber) {
      errs.phoneNumber = "Phone number is required"
    }
    if (!type) {
      errs.type = "Contact type is required"
    }

    setErrors(errs);
  }, [firstName, lastName, email, phoneNumber, type]);

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

    return dispatch(editContact(contact.id, editedContact))
      .then(closeModal)
      .catch(async res => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div className='form-cont'>
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
        {errors.phoneNumber && <p>{errors.phoneNumber}</p>}

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
    </div>
  );
}

export default EditContactModal;
