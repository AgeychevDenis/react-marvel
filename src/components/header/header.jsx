import React from 'react'
import './header.scss';

function Header() {
   return (
      <header className='header'>
         <div className="container">
            <div className="header__wrapper">
               <h1 className="header__title"><span>Marvel</span> information portal</h1>
               <div className="header__menu">
                  <button className="header__btn active">Characters</button>
                  <span>/</span>
                  <button className="header__btn">Comics</button>
               </div>
            </div>
         </div>
      </header>
   )
}

export default Header