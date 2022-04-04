// import { Component } from 'react';
// import CardImg from '../../assets/img/card/item.jpg';
import './card.scss';

const Card = ({ name, thumbnail }) => {

   return (
      <div className='card' >
         <div className="card__img">
            <img src={thumbnail} alt="hero" />
         </div>
         <h3 className="card__title">
            {name}
         </h3>
      </div>
   )
}

export default Card;