import React from 'react';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';
import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  fetchContactsThunk,
  fetchContacts,
} from './fetchContacts/FetchContacts';
import {
  addFilter,
  deleteAllContactsForFilter,
  addFilterContact,
} from '../redux/store';
import { Routes, Route, Link, redirect } from 'react-router-dom';
import { RestrictedRoute } from './RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from './privateRoute/PrivateRoute';

// import stron
const Register = lazy(() => import('../pages/Register'));
const ContactPage = lazy(() => import('../pages/Contacts'));

export const App = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const contact = useSelector(state => state.contacts.items);
  const allContacts = useSelector(state => state.contacts.allItems);

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  // const handleChangeFilterField = evt => {
  //   const filterValue = evt.currentTarget.value.toLowerCase();
  //   dispatch(addFilter(filterValue));

  //   const filteredContacts = contact.filter(contact =>
  //     contact.name.toLowerCase().includes(filterValue)
  //   );

  //   dispatch(deleteAllContactsForFilter());

  //   dispatch(addFilterContact(filteredContacts));

  //   if (evt.currentTarget.value === '') {
  //     dispatch(addFilterContact(allContacts));
  //   }
  // };

  // const handleSubmit = event => {
  //   event.preventDefault();

  //   const data = {};

  //   const form = event.target;
  //   const name = form.elements.name.value;
  //   const number = form.elements.number.value;

  //   data.name = name;
  //   data.phone = number;

  //   fetchContacts(data);

  //   delete data.name;
  //   delete data.phone;

  //   const nameExists = contact.some(
  //     contact => contact.name.toLowerCase() === name.toLowerCase()
  //   );

  //   if (nameExists) {
  //     alert('ERROR');
  //     return;
  //   }

  //   form.reset();
  // };

  return (
    <div>
      <nav>
        <Link to="register">Rejestracja</Link>
      </nav>

      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<Register />}
              />
            }
          />

          <Route
            path="/contacts"
            element={
              <PrivateRoute
                redirectTo="/register"
                component={<ContactPage />}
              />
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
};
