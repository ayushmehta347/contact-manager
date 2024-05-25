import React, { useEffect, useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedContact, clearSelectedContact } from './features/contactsSlice';
import MapPage from './components/MapPage';

const Display: React.FC = () => {
  const dispatch = useDispatch();
  const selectedContact = useSelector(selectSelectedContact);
  
  const [map, setMap] = useState(false);
  const [cont, setCont] = useState(true); 
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    
    const savedContacts = localStorage.getItem('contacts');
    if (!savedContacts) {
      setShowContactForm(true);
    }
  }, []);

  const handleContact = () => {
    setCont(true);
    setMap(false);
  };

  const handleMap = () => {
    setMap(true);
    setCont(false);
  };

  useEffect(() => {
    console.log(cont);
  }, [cont]);

  useEffect(() => {
    console.log(map);
  }, [map]);

  return (
    <div  style={{ position: 'absolute',  top:"-1px" , left:"-1px"}}  className="flex h-screen">
      {/* Sidebar */}
      <div  className="bg-gray-800 ml-0 text-white  flex flex-col justify-between">
        <div className="p-4 ml-0">
          <h2 className="text-lg font-bold mb-4">Menu</h2>
          <button className="text-left w-full border-b border-gray-700 mt-5 px-4 py-4 justify-center" onClick={handleContact}>
            Contacts
          </button>
          <button className="text-left w-full border-b border-gray-700 mt-5 px-4 py-4" onClick={handleMap}>
            Map & Charts
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex">
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
        {map && <MapPage />}
      </div>
    </div>
  );
};

export default Display;
