import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import shortid from 'shortid';

import ContactForm from './ContactForm/ContactForm.jsx';
import ContactsList from './ContactsList/ContactsList.jsx';
import Filter from './Filter/filter.jsx';

export default function App(){

  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  const addContact = data => {
    const newContact = { ...data, id: shortid.generate() };
    if (
      contacts
        .map(contact => contact.name.toLowerCase())
        .includes(data.name.toLowerCase())
    ) {
      alert(`${data.name} is already in contacts`);
    } else {
      setContacts([newContact, ...contacts]);
    }
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const onChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFiltredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(cont =>
      cont.name.toLowerCase().includes(normalizedFilter)
    );
  };
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  });

    return (
    
  <div>
    <h1>Phonebook</h1>
    <ContactForm onSubmit={addContact} />
    <h2>Contacts</h2>
    <Filter value={filter} onChange={onChangeFilter} />
    <ContactsList
      contacts={getFiltredContacts()}
      remoteContact={deleteContact}
    />
  </div> 
    
    );
  }

App.propTypes = {
  contacts: PropTypes.array,
};
