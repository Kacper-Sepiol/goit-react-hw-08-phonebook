import { useDispatch } from 'react-redux';
import {
  addFilter,
  deleteAllContactsForFilter,
  addFilterContact,
} from '../../redux/actions';
import { selectContact, selectAllContacts } from '../../redux/auth/selectors';

export const HandleChangeFilterField = evt => {
  const dispatch = useDispatch();

  const filterValue = evt.currentTarget.value.toLowerCase();
  dispatch(addFilter(filterValue));

  const filteredContacts = selectContact.filter(contact =>
    contact.name.toLowerCase().includes(filterValue)
  );

  dispatch(deleteAllContactsForFilter());

  dispatch(addFilterContact(filteredContacts));

  if (evt.currentTarget.value === '') {
    dispatch(addFilterContact(selectAllContacts));
  }
};
