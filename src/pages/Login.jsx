import { useDispatch } from 'react-redux';
import { logIn } from '../redux/auth/operations';

const temporeryDate = {};

const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.target;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    temporeryDate.email = email;
    temporeryDate.password = password;

    dispatch(logIn(temporeryDate));

    delete temporeryDate.email;
    delete temporeryDate.password;

    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>

        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
