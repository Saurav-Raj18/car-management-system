import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../Component/Redux/actions';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the auth token from local storage
    localStorage.removeItem('authToken');
    
    // Dispatch the logout action to clear Redux state
    dispatch(logoutUser());
    
    // Redirect to the login page
    navigate('/');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
