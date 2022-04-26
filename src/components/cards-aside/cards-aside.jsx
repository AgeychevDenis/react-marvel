import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import useMarvelService from '../../services/marvel-service';
import setContent from '../../utils/setContent';

import './cards-aside.scss'

const CardsAside = (props) => {
   const [char, setChar] = useState(null);

   const { loading, error, getCharacter, clearError, process, setProcess } = useMarvelService();

   useEffect(() => {
      updateChar()
   }, [props.charId])


   const updateChar = () => {
      const { charId } = props;
      if (!charId) {
         return;
      }
      clearError();
      getCharacter(charId)
         .then(onCharLoaded)
         .then(() => setProcess('confirmed'))
   }

   const onCharLoaded = (char) => {
      setChar(char);
   }



   return (
      <div className="cards-aside">
         <div className="cards-aside__body">
            {setContent(process, View, char)}
         </div>
      </div>
   )
}

const View = ({ data }) => {
   const { name, description, thumbnail, homepage, wiki, comics } = data;

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