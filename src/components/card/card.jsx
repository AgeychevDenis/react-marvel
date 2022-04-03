import React from 'react';
import CardImg from '../../assets/img/card/item.jpg';
import './card.scss';

function Card() {
   return (
      <div className='card'>
         <div className="card__img">
            <img src={CardImg} alt="hero" />
         </div>
         <h3 className="card__title">
            ABYSS
         </h3>
      </div>
   )
}

export default Card;