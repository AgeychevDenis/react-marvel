import { useState } from 'react';

import Info from '../info/info';
import ProductCards from '../product-cards/product-cards';
import CardsAside from '../cards-aside/cards-aside';
import ErrorBoundary from '../error-boundary/error-boundary';

import ImgBg from '../../assets/img/bg/bg.png'
import CharSearchForm from '../char-search-from/char-search-form';

const MainPage = () => {

   const [selectedChar, setChar] = useState(null);

   const onCharSelected = (id) => {
      setChar(id);
   }

   return (
      <>
         <ErrorBoundary>
            <Info />
         </ErrorBoundary>
         <div className="product__cards" >
            <div className="container">
               <div className="product__cards-wrapper">
                  <ErrorBoundary>
                     <ProductCards onCharSelected={onCharSelected} />
                  </ErrorBoundary>
                  <div>
                     <ErrorBoundary>
                        <CardsAside charId={selectedChar} />
                     </ErrorBoundary>
                     <ErrorBoundary>
                        <CharSearchForm />
                     </ErrorBoundary>
                  </div>
               </div>
            </div >
         </div >
         <img className='main__bg' src={ImgBg} alt="bg" />
      </>
   )
}

export default MainPage;