import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Section from './components/Section/Section';
import Form from './components/Form/Form';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? [],
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts!`);
      return;
    }

    const newContact = {
      id: uuidv4(),
      name,
      number,
    };

    setContacts(contacts => [...contacts, newContact]);
  };

  const deleteContact = id => {
    setContacts(contacts => contacts.filter(contact => contact.id !== id));
  };

  const handleFilterChange = evt => {
    const filter = evt.target.value.trim();

    setFilter(filter);
  };

  const getFilteredContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );

  return (
    <>
      <Section>
        <h1>Phonebook</h1>
        <Form onFormSubmit={addContact} />
      </Section>

      <Section>
        <h2>Contacts</h2>

        {contacts.length ? (
          <>
            <Filter onSearch={handleFilterChange} />
            <ContactList
              contacts={getFilteredContacts()}
              onDelete={deleteContact}
            />
          </>
        ) : (
          <p>Phonebook is empty</p>
        )}
      </Section>
    </>
  );
};

export default App;
