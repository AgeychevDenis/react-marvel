import Decoration from '../../assets/img/info/Decoration.png';
import { React, Component } from 'react';
import MarvelService from '../../services/marvel-service';
import ErrorMessage from '../error-message/error-message';
import Spinner from '../spinner/spinner';
import './info.scss';

class Info extends Component {
   state = {
      char: {},
      loading: true,
      error: false
   }

   marvelService = new MarvelService();

   componentDidMount() {
      this.updateChar();
   }

   onCharLoaded = (char) => {
      this.setState({
         char,
         loading: false
      })
   }

   onCharLoading = () => {
      this.setState({
         loading: true
      })
   }

   onError = () => {
      this.setState({
         loading: false,
         error: true
      })
   }

   updateChar = () => {
      const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
      this.onCharLoading();
      this.marvelService
         .getCharacter(id)
         .then(this.onCharLoaded)
         .catch(this.onError);
   }

   render() {
      const { char, loading, error } = this.state;
      const errorMessage = error ? <ErrorMessage /> : null;
      const spinner = loading ? <Spinner /> : null;
      const content = !(loading || error) ? <View char={char} /> : null;

      return (
         <div className='info' >
            <div className="container">
               <div className="info__page">
                  <div className="info__block block-info">
                     {errorMessage}
                     {spinner}
                     {content}
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
                        <button onClick={this.updateChar} className="btn mod-btn">TRY IT</button>
                     </div>
                     <img className='block-info__img-decor' src={Decoration} alt="Decoration" />
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

const View = ({ char }) => {
   const { name, description, thumbnail, homepage, wiki } = char;
   let imgSlyle = { 'objectFit': 'cover' }
   const imgUrl = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
   if (thumbnail === imgUrl) {
      imgSlyle = { 'objectFit': 'contain' }
   }

   return (
      <>
         <div className="block-info__img">
            <img src={thumbnail} alt="Thumbnail" style={imgSlyle} />
         </div>
         <div className="block-info__inner">
            <h4 className="block-info__title">{name}</h4>
            <p className="block-info__subtitle">
               {description}
            </p>
            <div className="block-info__buttons">
               <a href={homepage} className="block-info__link btn">HOMEPAGE</a>
               <a href={wiki} className="block-info__link btn">WIKI</a>
            </div>
         </div>
      </>
   )
}

export default Info;