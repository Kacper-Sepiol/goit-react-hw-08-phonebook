import { Helmet } from 'react-helmet';
import { RegisterUser } from 'components/registerUser/RegisterUser';
import css from './style/styleRegister.module.css';

const Register = () => {
  return (
    <div className={css.container}>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <RegisterUser />
    </div>
  );
};

export default Register;
