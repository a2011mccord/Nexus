import { csrfFetch } from "./csrf";
import { createSelector } from 'reselect';

const LOAD_CONTACTS = 'contacts/loadContacts';

const loadContacts = contacts => ({
  type: LOAD_CONTACTS,
  contacts
});

export const fetchContacts = () => async dispatch => {
  const res = await csrfFetch('/api/contacts/current');

  if (res.ok) {
    const contacts = await res.json();
    dispatch(loadContacts(contacts));
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
    default:
      return state;
  }
}

export default contactsReducer;
