import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, editContact, selectContactForEdit, clearSelectedContact } from '../features/contactsSlice';
import { v4 as uuidv4 } from 'uuid';

const ContactForm: React.FC = () => {
  const dispatch = useDispatch();
  const contactForEdit = useSelector(selectContactForEdit);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    if (contactForEdit) {
      setFirstName(contactForEdit.firstName);
      setLastName(contactForEdit.lastName);
      setStatus(contactForEdit.status);
    } else {
      setFirstName('');
      setLastName('');
      setStatus('Active');
    }
  }, [contactForEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForEdit) {
      dispatch(editContact({ id: contactForEdit.id, firstName, lastName, status }));
    } else {
      dispatch(addContact({ id: uuidv4(), firstName, lastName, status }));
    }
    dispatch(clearSelectedContact());
    setFirstName('');
    setLastName('');
    setStatus('Active');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center bg-white p-4 rounded shadow-md w-full max-w-lg mx-auto mt-8">
      <div className="mb-4 w-full">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>
      <div className="mb-4 w-full">
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>
     <div className="mb-4 w-full">
  <label className="block mb-2">Status</label>
  <div>
    <label className="inline-block mr-4">
      <input
        type="radio"
        value="Active"
        checked={status === "Active"}
        onChange={() => setStatus("Active")}
        className="mr-1"
      />
      Active
    </label>
    <label className="inline-block">
      <input
        type="radio"
        value="Inactive"
        checked={status === "Inactive"}
        onChange={() => setStatus("Inactive")}
        className="mr-1"
      />
      Inactive
    </label>
  </div>
</div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        {contactForEdit ? 'Update Contact' : 'Save Contact'}
      </button>
    </form>
  );
};

export default ContactForm;
