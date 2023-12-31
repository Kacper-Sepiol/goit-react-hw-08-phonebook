import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import css from './RegisterUserStyle.module.css';

const temporeryData = {};

export const RegisterUser = () => {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.target;
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    temporeryData.name = name;
    temporeryData.email = email;
    temporeryData.password = password;

    dispatch(register(temporeryData));

    delete temporeryData.name;
    delete temporeryData.email;
    delete temporeryData.password;

    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css.loginForm}>
      <label>
        Name
        <input type="text" name="name" required />
      </label>
      <label>
        Email
        <input type="email" name="email" required />
      </label>
      <label>
        Password
        <input type="password" name="password" required />
      </label>

      <button type="submit" className={css.buttonRegister}>
        Register
      </button>
    </form>
  );
};
