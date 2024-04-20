import { csrfFetch } from "./csrf";
import { createSelector } from 'reselect';

const LOAD_CONTACTS = 'contacts/loadContacts';
const ADD_CONTACT = 'contacts/addContact';
const UPDATE_CONTACT = 'contacts/updateContact';
const REMOVE_CONTACT = 'contacts/removeContact';

const loadContacts = contacts => ({
  type: LOAD_CONTACTS,
  contacts
});

const addContact = contact => ({
  type: ADD_CONTACT,
  contact
});

const updateContact = contact => ({
  type: UPDATE_CONTACT,
  contact
});

const removeContact = contact => ({
  type: REMOVE_CONTACT,
  contact
})

export const fetchContacts = () => async dispatch => {
  const res = await csrfFetch('/api/contacts/current');

  if (res.ok) {
    const contacts = await res.json();
    dispatch(loadContacts(contacts));
  }
};

export const createContact = contact => async dispatch => {
  const res = await csrfFetch('/api/contacts', {
    method: 'POST',
    body: JSON.stringify(contact)
  });

  if (res.ok) {
    const newContact = await res.json();
    dispatch(addContact(newContact));
    return newContact;
  }
};

export const editContact = (contactId, payload) => async dispatch => {
  console.log(payload)
  const res = await csrfFetch(`/api/contacts/${contactId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const updatedContact = await res.json();
    dispatch(updateContact(updatedContact));
    return updatedContact;
  }
};

export const deleteContact = contactId => async dispatch => {
  const res = await csrfFetch(`/api/contacts/${contactId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    const removedContact = await res.json();
    dispatch(removeContact(removedContact));
    return removedContact;
  }
};

const selectedContacts = state => state.contactState.contacts;
export const selectContacts = createSelector(selectedContacts, contacts => Object.values(contacts));

const initialState = { contacts: {} };

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
    case UPDATE_CONTACT: {
      const newState = { ...state, contacts: { ...state.contacts } };

      newState.contacts[action.contact.id] = action.contact;

      return newState;
    }
    case REMOVE_CONTACT: {
      const newState = { ...state, contacts: { ...state.contacts } };

      delete newState.contacts[action.contact.id];

      return newState;
    }
    default:
      return state;
  }
};

export default contactsReducer;
