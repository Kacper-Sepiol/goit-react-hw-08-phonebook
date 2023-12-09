import { logOut } from '../../redux/auth/operations';
import { useDispatch } from 'react-redux';

export const UserMenu = () => {
  const dispatch = useDispatch();

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
