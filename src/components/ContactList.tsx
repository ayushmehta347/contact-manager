import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, selectContacts, selectContact, setContactForEdit } from '../features/contactsSlice';

const ContactList: React.FC = () => {
  const contacts = useSelector(selectContacts);
 

  const dispatch = useDispatch();

  return (
    <div className="mt-8 w-full">
      {contacts.length === 0 && (
        <p className="text-center">No contacts saved</p>
      )}
      {contacts.length > 0 && contacts.map((contact) => (
        <div key={contact.id} className="flex justify-between items-center p-4 border-b bg-white rounded shadow-md">
          <div>
            {contact.firstName} {contact.lastName}
          </div>
          <div className="flex space-x-4">
            <button
              className="bg-green-500 text-white p-2 rounded w-full ml-2"
              onClick={() => dispatch(selectContact(contact.id))}
            >
              Details
            </button>
            <button
              className="bg-yellow-500 text-white p-2 rounded w-full"
              onClick={() => dispatch(setContactForEdit(contact.id))}
            >
              Edit
            </button>
            <button
              className="bg-black text-white p-2 rounded w-full"
              onClick={() => dispatch(deleteContact(contact.id))}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
