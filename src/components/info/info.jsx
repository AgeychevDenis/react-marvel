import Decoration from '../../assets/img/info/Decoration.png';
import { React, Component } from 'react';
import MarvelService from '../../services/marvel-service'
import './info.scss';

class Info extends Component {
   constructor(props) {
      super(props);
      this.updateChar();
   }

   state = {
      char: {}
   }

   marvelService = new MarvelService();

   onChatLoaded = (char) => {
      this.setState({ char })
   }

   updateChar = () => {
      const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
      this.marvelService
         .getCharacter(id)
         .then(this.onChatLoaded)
   }

   render() {
      const { char: { name, description, thumbnail, homepage, wiki } } = this.state;
      return (
         <div className='info' >
            <div className="container">
               <div className="info__page">
                  <div className="info__block block-info">
                     <div className="block-info__img">
                        <img src={thumbnail} alt="Thumbnail" />
                     </div>
                     <div className="block-info__inner">
                        <h4 className="block-info__title">{name}</h4>
                        <p className="block-info__subtitle">
                           {description === '' ? "no text" : description}
                        </p>
                        <div className="block-info__buttons">
                           <a href={homepage} className="block-info__link btn">HOMEPAGE</a>
                           <a href={wiki} className="block-info__link btn">WIKI</a>
                        </div>
                     </div>
                  </div>
                  <div className="info__block block-info">
                     <div className="block-info__wrapper">
                        <p className="block-info__text">
                           Random character for today! <br />
                           Do you want to get to know him better?
                        </p>
                        <p className="block-info__text">
                           Or choose another one
                        </p>
                        <button className="btn mod-btn">TRY IT</button>
                     </div>
                     <img className='block-info__img-decor' src={Decoration} alt="Decoration" />
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default Info;