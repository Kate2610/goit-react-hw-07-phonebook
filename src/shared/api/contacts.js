import axios from 'axios';

const instanceContacts = axios.create({
  baseURL: 'https://6448f15eb88a78a8f0f83875.mockapi.io/contacts',
});

export const getContacts = async () => {
  const { data } = await instanceContacts.get('/');
//   console.log('data', data);
  return data;
};

export const addContact = async data => {
  const { data: result } = await instanceContacts.post('/', data);
  return result;
};

export const removeContact = async id => {
  const { data } = await instanceContacts.delete(`/${id}`);
  return data;
};