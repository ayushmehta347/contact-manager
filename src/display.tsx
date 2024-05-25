import React, {  useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedContact, clearSelectedContact } from './features/contactsSlice';


const Display: React.FC = () => {
  const dispatch = useDispatch();
  const selectedContact = useSelector(selectSelectedContact);
  
 
  const [cont, setCont] = useState(true); 
  

  return (
  
      <div >
        {cont && (
          <div className="container mx-auto p-4 ml-80">
            <h1 className="text-center text-4xl mb-10 font-bold">Contact Manager</h1>
            {!selectedContact && <ContactForm />}
            {selectedContact && (
              <div className="mt-4 p-4 border rounded bg-white shadow-md">
                <h2 className="text-xl mb-2 font-bold">Contact Details</h2>
                <p className="font-bold">First Name: {selectedContact.firstName}</p>
                <p className="font-bold">Last Name: {selectedContact.lastName}</p>
                <p className="font-bold">Status: {selectedContact.status}</p>
                <button
                  className="mt-4 bg-blue-500 ml-5 text-white p-2 rounded"
                  onClick={() => dispatch(clearSelectedContact())}
                >
                  Hide Details
                </button>
              </div>
            )}
            {!selectedContact && <ContactList />}
          </div>
        )}
      </div>

  );
};

export default Display;
