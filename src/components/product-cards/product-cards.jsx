import { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import React from 'react';

import Spinner from '../spinner/spinner';
import useMarvelService from '../../services/marvel-service';
import ErrorMessage from '../error-message/error-message';


import './product-cards.scss';

const setContent = (process, Component, newItemLoading) => {
   switch (process) {
      case 'waiting':
         return <Spinner />;
      case 'loading':
         return newItemLoading ? <Component /> : <Spinner />;
      case 'confirmed':
         return <Component />;
      case 'error':
         return <ErrorMessage />;
      default:
         throw new Error('Unexpected process state')
   }
}

const ProductCards = (props) => {

   const [charList, setCharList] = useState([]);
   const [newItemLoading, setNewItemLoading] = useState(false);
   const [offset, setOffset] = useState(210);
   const [charEnded, setCharEnded] = useState(false);

   const { getAllCharacters, process, setProcess } = useMarvelService();

   useEffect(() => {
      onRequest(offset, true);
   }, [])

   const onRequest = (offset, initial) => {
      initial ? setNewItemLoading(false) : setNewItemLoading(true);
      getAllCharacters(offset)
         .then(onCharListLoaded)
         .then(() => setProcess('confirmed'));
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

   const elements = useMemo(() => {
      return setContent(process, () => renderItems(charList), newItemLoading)
   }, [process]);

   return (
      <div className="product__cards-list">
         {elements}
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