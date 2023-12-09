import { Auth } from '../../hooks/Auth';
import { Navigate } from 'react-router-dom';

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn } = Auth();

  console.log(isLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
