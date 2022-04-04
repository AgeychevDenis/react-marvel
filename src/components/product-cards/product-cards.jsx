import { Component } from 'react';
import MarvelService from '../../services/marvel-service';
import Card from '../card/card';
import CardsAside from '../cards-aside/cards-aside';

import ImgBg from '../../assets/img/bg/bg.png'
import './product-cards.scss';

class ProductCards extends Component {
   state = {
      charList: []
   }

   componentDidMount() {
      this.updateChar();
   }

   marvelService = new MarvelService();


   onCharLoaded = (charList) => {
      this.setState({ charList })
   }

   updateChar = () => {
      this.marvelService
         .getAllCharacters()
         .then(this.onCharLoaded)
   }

   render() {
      const { charList } = this.state;
      const elements = charList.map(elem => {
         return (
            <Card {...elem} />
         )
      })

      return (
         <div className="product__cards" >
            <div className="container">
               <div className="product__cards-wrapper">
                  <div className="cards__body">
                     {elements}
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
}

export default ProductCards;