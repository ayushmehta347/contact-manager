import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
}

interface ContactsState {
  contacts: Contact[];
  selectedContact?: Contact;
  contactForEdit?: Contact;
}

const initialState: ContactsState = {
  contacts: JSON.parse(localStorage.getItem('contacts') || '[]'),
  selectedContact: undefined,
  contactForEdit: undefined,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
      localStorage.setItem('contacts', JSON.stringify(state.contacts));
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      localStorage.setItem('contacts', JSON.stringify(state.contacts));
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (index >= 0) {
        state.contacts[index] = action.payload;
        localStorage.setItem('contacts', JSON.stringify(state.contacts));
      }
    },
    selectContact: (state, action: PayloadAction<string | undefined>) => {
      state.selectedContact = state.contacts.find(contact => contact.id === action.payload);
    },
    setContactForEdit: (state, action: PayloadAction<string | undefined>) => {
      state.contactForEdit = state.contacts.find(contact => contact.id === action.payload);
    },
    clearSelectedContact: (state) => {
      state.selectedContact = undefined;
      state.contactForEdit = undefined;
    },
  },
});

export const { addContact, deleteContact, editContact, selectContact, setContactForEdit, clearSelectedContact } = contactsSlice.actions;
export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectSelectedContact = (state: RootState) => state.contacts.selectedContact;
export const selectContactForEdit = (state: RootState) => state.contacts.contactForEdit;
export default contactsSlice.reducer;
