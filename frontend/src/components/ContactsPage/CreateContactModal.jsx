import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createContact } from '../../store/contacts';

function CreateContactModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [type, setType] = useState('');
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

    const newContact = {
      firstName,
      lastName,
      email,
      phoneNumber,
      type
    };

    return dispatch(createContact(newContact))
      .then(closeModal)
      .catch(async res => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
  };

  const testContact = () => {
    setFirstName('Test');
    setLastName('Test');
    setEmail('test@test.com');
    setPhoneNumber('888-888-8888');
    setType('Lead');
  };

  return (
    <>
      <h1>Create New Contact</h1>
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

        <button type="submit">Create Contact</button>
        <button onClick={testContact}>Test Contact</button>
      </form>
    </>
  );
}

export default CreateContactModal;
