import { Link, NavLink } from 'react-router-dom';
import './header.scss';

function Header() {
   return (
      <header className='header'>
         <div className="container">
            <div className="header__wrapper">
               <h1 className="header__title">
                  <Link to="/">
                     <span>Marvel</span> information portal
                  </Link>
               </h1>
               <div className="header__menu">
                  <NavLink
                     end
                     style={({ isActive }) => ({ 'color': isActive ? '#9f0013' : 'inherit' })}
                     to="/"
                     className="header__btn">
                     Characters
                  </NavLink>
                  <span>/</span>
                  <NavLink
                     end
                     style={({ isActive }) => ({ 'color': isActive ? '#9f0013' : 'inherit' })}
                     to="/comics"
                     className="header__btn">
                     Comics
                  </NavLink>
               </div>
            </div>
         </div >
      </header >
   )
}

export default Header;