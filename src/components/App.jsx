import React from 'react';
import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContactsThunk } from './fetchContacts/FetchContacts';
import { Routes, Route, Link } from 'react-router-dom';
import { RestrictedRoute } from './RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from './privateRoute/PrivateRoute';
import css from './AppStyle.module.css';

// import stron
const Register = lazy(() => import('../pages/Register'));
const ContactPage = lazy(() => import('../pages/Contacts'));
const LoginPage = lazy(() => import('../pages/Login'));

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  return (
    <div>
      <nav>
        <Link to="/register" className={css.link}>
          Rejestracja
        </Link>
        <Link to="/login" className={css.link}>
          Logowanie
        </Link>
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
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<LoginPage />}
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
