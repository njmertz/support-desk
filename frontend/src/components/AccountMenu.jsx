import {useState, useEffect} from 'react';
import {FaSignInAlt, FaSignOutAlt, FaUser, FaAngleUp, FaAngleDown, FaTicketAlt} from 'react-icons/fa';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {logout, reset} from '../features/auth/authSlice';

function AccountMenu() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setMenuIsOpen(prevState => !menuIsOpen);
  };

  const onLogout = e => {
    setMenuIsOpen(false);
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  useEffect(() => {
    setMenuIsOpen(false);
  }, [location]);

  if(user){
    return (
      <ul>
        <li className="user-menu"><span>Hello, {user.name} {menuIsOpen ? (<FaAngleUp onClick={toggleMenu} />) : (<FaAngleDown onClick={toggleMenu} />) }</span>
          <ul className={`sub-menu ${menuIsOpen ? 'menu-opened' : 'menu-closed'}`}>
            {user.isAdmin === true && (
              <>
                <li>
                  <Link to='/users'><FaUser /> Users</Link>
                </li>
                <li>
                  <Link to='/tickets/all'><FaTicketAlt /> Tickets</Link>
                </li>
              </>
            )}
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </ul>
        </li>
      </ul>
    );
  }

  return (
    <ul>
      <li>
        <Link to="/login"><FaSignInAlt /> Login</Link>
      </li>
      <li>
        <Link to="/register"><FaUser /> Register</Link>
      </li>
    </ul>        
  );
};

export default AccountMenu;