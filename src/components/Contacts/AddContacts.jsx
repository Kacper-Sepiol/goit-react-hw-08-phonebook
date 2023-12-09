import { fetchContacts } from 'components/fetchContacts/FetchContacts';
import { selectContact } from '../../redux/auth/selectors';

export const handleSubmit = event => {
  event.preventDefault();

  const data = {};

  const form = event.target;
  const name = form.elements.name.value;
  const number = form.elements.number.value;

  data.name = name;
  data.phone = number;

  fetchContacts(data);

  delete data.name;
  delete data.phone;

  const nameExists = selectContact.some(
    contact => contact.name.toLowerCase() === name.toLowerCase()
  );

  if (nameExists) {
    alert('ERROR');
    return;
  }

  form.reset();
};
