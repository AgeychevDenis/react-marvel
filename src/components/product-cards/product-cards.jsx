import React from 'react';
import Card from '../card/card';
import CardsAside from '../cards-aside/cards-aside';
import ImgBg from '../../assets/img/bg/bg.png'
import './product-cards.scss';

function ProductCards() {
   return (
      <div className="product__cards">
         <div className="container">
            <div className="product__cards-wrapper">
               <div className="cards__body">
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <div className="cards__body-btn">
                     <button className="btn mod-btn__width">LOAD MORE</button>
                  </div>
               </div>
               <CardsAside />
            </div>
         </div>
         <img className='main__bg' src={ImgBg} alt="bg" />
      </div>
   )
}

export default ProductCards;