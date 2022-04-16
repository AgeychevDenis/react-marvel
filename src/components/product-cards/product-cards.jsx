import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import React from 'react';

import Spinner from '../spinner/spinner';
import MarvelService from '../../services/marvel-service';
import ErrorMessage from '../error-message/error-message';


import './product-cards.scss';

const ProductCards = (props) => {

   const [charList, setCharList] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   const [newItemLoading, setNewItemLoading] = useState(false);
   const [offset, setOffset] = useState(210);
   const [charEnded, setCharEnded] = useState(false);

   const marvelService = new MarvelService();

   useEffect(() => {
      onRequest()
   }, [])

   const onRequest = (offset) => {
      onCharListLoading()
      marvelService.getAllCharacters(offset)
         .then(onCharListLoaded)
         .catch(onError)
   }

   const onCharListLoading = () => {
      setNewItemLoading(true);
   }

   const onCharListLoaded = (newCharList) => {
      let ended = false;
      if (newCharList.length < 9) {
         ended = true;
      }

      setCharList(charList => [...charList, ...newCharList]);
      setLoading(loading => false);
      setNewItemLoading(newItemLoading => false);
      setOffset(offset => offset + 9);
      setCharEnded(charEnded => ended);
   }

   const onError = () => {
      setError(true);
      setLoading(loading => false);
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

   const items = renderItems(charList);
   const errorMessage = error ? <ErrorMessage /> : null;
   const spinner = loading ? <Spinner /> : null;
   const content = !(loading || error) ? items : null;


   return (

      <div className="product__cards-list">
         {errorMessage}
         {spinner}
         {content}
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