import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <h1 className="header__logo">NewsExplorer</h1>
      <Navigation />
    </div>
  );
}

export default Header;
