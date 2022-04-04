import { Component } from 'react';
import MarvelService from '../../services/marvel-service';
import Card from '../card/card';
import CardsAside from '../cards-aside/cards-aside';

import ImgBg from '../../assets/img/bg/bg.png'
import './product-cards.scss';

class ProductCards extends Component {
   state = {
      char: []
   }

   componentDidMount() {
      this.updateChar();
   }

   marvelService = new MarvelService();


   onCharLoaded = (char) => {
      this.setState({ char })
   }

   updateChar = () => {
      this.marvelService
         .getAllCharacters()
         .then(this.onCharLoaded)
   }

   render() {
      const { char } = this.state;
      char.forEach(item => console.log(item))

      return (
         <div className="product__cards" >
            <div className="container">
               <div className="product__cards-wrapper">
                  <div className="cards__body">
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
}

export default ProductCards;