
import React,  { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import style from 'components/ContactForm/contactForm.module.css'

export default function ContactForm({onSubmit}){

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
 
 const nameInputId = shortid.generate();
 const numberInputId = shortid.generate();

  const handleNameChange = e => {
    setName(e.currentTarget.value);
  }
    const handleNumberChange = e => {
      setNumber(e.currentTarget.value);
    };

 const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number}); 
    setName('');
    setNumber('');
  };

  
    return (
      <div className={style.border}>
        <form className={style.form} onSubmit={handleSubmit}>
          <label htmlFor={nameInputId} className={style.label}>Name</label>
          <input
              id={nameInputId}
              className={style.input}
              type="text"
              name="name"
              value={name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={handleNameChange}
            />
          <label htmlFor={numberInputId} className={style.label}>Number</label>
          <input
              id={numberInputId}
              className={style.input}
              type="tel"
              name="number"
              value={number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={handleNumberChange}
            />
          <button className={style.button} type="submit">Add contact</button>
        </form>
      </div>
    );
  }


  ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  

