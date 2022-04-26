import Decoration from '../../assets/img/info/Decoration.png';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/marvel-service';
import ErrorMessage from '../error-message/error-message';
import Spinner from '../spinner/spinner';
import './info.scss';

const Info = () => {
   const [char, setChar] = useState({});

   const { loading, error, getCharacter, clearError } = useMarvelService();

   useEffect(() => {
      updateChar()
   }, [])

   const onCharLoaded = (char) => {
      setChar(char);
   }

   const updateChar = () => {
      clearError();
      const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
      getCharacter(id)
         .then(onCharLoaded);
   }

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
                     <button onClick={updateChar} className="btn mod-btn">TRY IT</button>
                  </div>
                  <img className='block-info__img-decor' src={Decoration} alt="Decoration" />
               </div>
            </div>
         </div>
      </div>
   )
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
               <a href={wiki} className="block-info__link btn btn-gray">WIKI</a>
            </div>
         </div>
      </>
   )
}

export default Info;