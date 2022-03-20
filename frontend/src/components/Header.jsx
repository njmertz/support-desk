import {Link} from 'react-router-dom';
import AccountMenu from './AccountMenu';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <AccountMenu />
    </header>
  );
}

export default Header;