import { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/spinner';
import MarvelService from '../../services/marvel-service';
import ErrorMessage from '../error-message/error-message';



import './product-cards.scss';

class ProductCards extends Component {
   state = {
      charList: [],
      loading: true,
      error: false,
      newItemLoading: false,
      offset: 210,
      charEnded: false
   }

   marvelService = new MarvelService();

   componentDidMount() {
      this.onRequest();
   }

   onRequest = (offset) => {
      this.onCharListLoading()
      this.marvelService.getAllCharacters(offset)
         .then(this.onCharListLoaded)
         .catch(this.onError)
   }

   onCharListLoading = () => {
      this.setState({
         newItemLoading: true
      })
   }

   onCharListLoaded = (newCharList) => {
      let ended = false;
      if (newCharList.length < 9) {
         ended = true;
      }

      this.setState(({ offset, charList }) => ({
         charList: [...charList, ...newCharList],
         loading: false,
         newItemLoading: false,
         offset: offset + 9,
         charEnded: ended
      }))
   }

   onError = () => {
      this.setState({
         error: true,
         loading: false
      })
   }

   renderItems(arr) {
      const items = arr.map((item) => {

         return (
            <div className='card'
               key={item.id}
               onClick={() => this.props.onCharSelected(item.id)}
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

   render() {
      const { charList, loading, error, newItemLoading, offset, charEnded } = this.state;

      const items = this.renderItems(charList);
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
                  onClick={() => this.onRequest(offset)}
                  className="btn mod-btn__width">LOAD MORE
               </button>
            </div>
         </div>
      )
   }
}

ProductCards.propTypes = {
   onCharSelected: PropTypes.func.isRequired
}

export default ProductCards;