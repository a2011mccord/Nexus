import { csrfFetch } from "./csrf";
import { createSelector } from 'reselect';

const LOAD_CONTACTS = 'contacts/loadContacts';
const ADD_CONTACT = 'contacts/addContact';

const loadContacts = contacts => ({
  type: LOAD_CONTACTS,
  contacts
});

const addContact = contact => ({
  type: ADD_CONTACT,
  contact
});

export const fetchContacts = () => async dispatch => {
  const res = await csrfFetch('/api/contacts/current');

  if (res.ok) {
    const contacts = await res.json();
    dispatch(loadContacts(contacts));
  }
};

export const createContact = contact => async dispatch => {
  const { firstName, lastName, email, phoneNumber, type } = contact;
  const res = await csrfFetch('/api/contacts', {
    method: 'POST',
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      phoneNumber,
      type
    })
  });

  if (res.ok) {
    const newContact = await res.json();
    dispatch(addContact(newContact));
    return newContact;
  }
};

const selectedContacts = state => state.contactState.contacts;
export const selectContacts = createSelector(selectedContacts, contacts => Object.values(contacts));

const initialState = { contacts: {} }

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CONTACTS: {
      const newState = { ...state, contacts: { ...state.contacts } };

      action.contacts.Contacts.forEach(contact => {
        newState.contacts[contact.id] = contact;
      });

      return newState;
    }
    case ADD_CONTACT: {
      const newState = { ...state, contacts: { ...state.contacts } };

      newState.contacts[action.contact.id] = action.contact;

      return newState;
    }
    default:
      return state;
  }
};

export default contactsReducer;
