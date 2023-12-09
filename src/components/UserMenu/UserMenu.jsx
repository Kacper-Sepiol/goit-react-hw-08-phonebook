import { logOut } from '../../redux/auth/operations';
import { useDispatch } from 'react-redux';
import { Auth } from '../../hooks/Auth';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = Auth();
  console.log(user);

  const handleClick = () => {
    dispatch(logOut());
  };

  return (
    <div>
      <p></p>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};
