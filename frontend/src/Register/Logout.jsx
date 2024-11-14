import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../Component/Redux/actions';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the auth token from local storage
    localStorage.removeItem('authToken');
<<<<<<< HEAD
    
    // Dispatch the logout action to clear Redux state
    dispatch(logoutUser());
    
=======

    // Dispatch the logout action to clear Redux state
    dispatch(logoutUser());

>>>>>>> c92ab21b (modified backend part)
    // Redirect to the login page
    navigate('/');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
