import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import React from 'react';

import Spinner from '../spinner/spinner';
import useMarvelService from '../../services/marvel-service';
import ErrorMessage from '../error-message/error-message';


import './product-cards.scss';

const ProductCards = (props) => {

   const [charList, setCharList] = useState([]);
   const [newItemLoading, setNewItemLoading] = useState(false);
   const [offset, setOffset] = useState(210);
   const [charEnded, setCharEnded] = useState(false);

   const { loading, error, getAllCharacters } = useMarvelService();

   useEffect(() => {
      onRequest(offset, true);
   }, [])

   const onRequest = (offset, initial) => {
      initial ? setNewItemLoading(false) : setNewItemLoading(true);
      getAllCharacters(offset)
         .then(onCharListLoaded)
   }

   const onCharListLoaded = (newCharList) => {
      let ended = false;
      if (newCharList.length < 9) {
         ended = true;
      }

      setCharList(charList => [...charList, ...newCharList]);
      setNewItemLoading(newItemLoading => false);
      setOffset(offset => offset + 9);
      setCharEnded(charEnded => ended);
   }

   const itemRefs = useRef([]);

   const focusOnItem = (id) => {
      itemRefs.current.forEach(item => item.classList.remove('card_selected'));
      itemRefs.current[id].classList.add('card_selected');
      itemRefs.current[id].focus();
   }

   function renderItems(arr) {
      const items = arr.map((item, i) => {

         return (
            <div className='card'
               key={item.id}
               ref={el => itemRefs.current[i] = el}
               onClick={() => {
                  props.onCharSelected(item.id);
                  focusOnItem(i);
               }}
            >
               <div className="card__img">
                  <img src={item.thumbnail} alt="hero" />
               </div>
               <h3 className="card__title">
                  {item.name}
               </h3>
            </div>
         )
      });
      return (
         <div className="cards__body">
            {items}
         </div>
      )
   }

   console.log('render');

   const items = renderItems(charList);
   const errorMessage = error ? <ErrorMessage /> : null;
   const spinner = loading && !newItemLoading ? <Spinner /> : null;


   return (

      <div className="product__cards-list">
         {errorMessage}
         {spinner}
         {items}
         <div className="cards__body-btn">
            <button
               disabled={newItemLoading}
               style={{ 'display': charEnded ? 'none' : 'inline-block' }}
               onClick={() => onRequest(offset)}
               className="btn mod-btn__width">LOAD MORE
            </button>
         </div>
      </div>
   )

}

ProductCards.propTypes = {
   onCharSelected: PropTypes.func.isRequired
}

export default ProductCards;