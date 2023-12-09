import { Helmet } from 'react-helmet';
import { RegisterUser } from 'components/registerUser/RegisterUser';

const Register = () => {
  return (
    <div>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <RegisterUser />
    </div>
  );
};

export default Register;
