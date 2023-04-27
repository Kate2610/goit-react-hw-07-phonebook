import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/contact-operation';
import {
  InputForm,
  FormField,
  FormFieldInput,
  FieldName,
  ButtonAddContact,
} from './form.styled';

export default function Form() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const [state, setState] = useState({
    name: '',
    number: '',
  });

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = state;
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
    if (existingContact) {
      alert(`Contact with name '${name}' already exists!`);
      return;
    }
    dispatch(addContact({ id: nanoid(), name, number }));
    reset();
  };

  const reset = () => {
    setState({ name: '', number: '' });
  };

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  return (
    <InputForm onSubmit={handleSubmit}>
      <FormField>
        <FieldName htmlFor={nameInputId}>Name</FieldName>
        <FormFieldInput
          id={nameInputId}
          type="text"
          value={state.name}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </FormField>
      <FormField>
        <FieldName htmlFor={numberInputId}>Number</FieldName>
        <FormFieldInput
          id={numberInputId}
          type="tel"
          value={state.number}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </FormField>
      <ButtonAddContact type="submit">Add contact</ButtonAddContact>
    </InputForm>
  );
}
