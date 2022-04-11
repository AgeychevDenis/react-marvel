import { Component } from 'react';
import MarvelService from '../../services/marvel-service';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import Skeleton from '../skeleton/skeleton'
import PropTypes from 'prop-types'

import './cards-aside.scss'

class CardsAside extends Component {
   state = {
      char: null,
      loading: false,
      error: false
   }

   marvelService = new MarvelService();

   componentDidMount() {
      this.updateChar();
   }

   componentDidUpdate(prevProps) {
      if (this.props.charId !== prevProps.charId) {
         this.updateChar();
      }
   }

   updateChar = () => {
      const { charId } = this.props;
      if (!charId) {
         return;
      }

      this.onCharLoading();
      this.marvelService
         .getCharacter(charId)
         .then(this.onCharLoaded)
         .catch(this.onError);
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

   render() {
      const { char, loading, error } = this.state;

      const skeleton = char || loading || error ? null : <Skeleton />
      const errorMessage = error ? <ErrorMessage /> : null;
      const spinner = loading ? <Spinner /> : null;
      const content = !(loading || error || !char) ? <View char={char} /> : null;

      return (
         <div className="cards-aside">
            <div className="cards-aside__body">
               {skeleton}
               {errorMessage}
               {spinner}
               {content}
            </div>
         </div>
      )
   }
}

const View = ({ char }) => {
   const { name, description, thumbnail, homepage, wiki, comics } = char;

   let imgSlyle = { 'objectFit': 'cover' }
   const imgUrl = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
   if (thumbnail === imgUrl) {
      imgSlyle = { 'objectFit': 'contain' }
   }
   return (
      <>
         <div className="cards-aside__header">
            <div className="cards-aside__image">
               <img src={thumbnail} alt={name} style={imgSlyle} />
            </div>
            <div className="cards-aside__wrapper">
               <h4 className="cards-aside__title">{name}</h4>
               <button href={homepage} className='btn'>HOMEPAGE</button>
               <button href={wiki} className='btn'>WIKI</button>
            </div>
         </div>
         <div className="cards-aside__main">
            <p className="cards-aside__discription">
               {description}
            </p>
            <ul className="cards-aside__list aside-list">
               <h4 className="aside-list__title">
                  Comics:
               </h4>
               {comics.length > 0 ? null : 'There is no comics width this character'}
               {
                  comics.map((item, i) => {
                     if (i > 9) return;
                     return (
                        <li key={i} className="aside-list__item">{item.name}</li>
                     )
                  })
               }

            </ul>
         </div>
      </>
   )
}

CardsAside.propTypes = {
   carId: PropTypes.number
}

export default CardsAside;