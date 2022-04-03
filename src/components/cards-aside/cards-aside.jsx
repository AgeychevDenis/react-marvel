import React from 'react';
import CardImg from '../../assets/img/card/item.jpg'
import './cards-aside.scss'

function CardsAside() {
   return (
      <div className="cards-aside">
         <div className="cards-aside__body">
            <div className="cards-aside__header">
               <div className="cards-aside__image">
                  <img src={CardImg} alt="cards-aside" />
               </div>
               <div className="cards-aside__wrapper">
                  <h4 className="cards-aside__title">ABYSS</h4>
                  <button className='btn'>HOMEPAGE</button>
                  <button className='btn'>WIKI</button>
               </div>
            </div>
            <div className="cards-aside__main">
               <p className="cards-aside__discription">
                  In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.
               </p>
               <ul className="cards-aside__list aside-list">
                  <h4 className="aside-list__title">
                     Comics:
                  </h4>
                  <li className="aside-list__item">All-Winners Squad: Band of Heroes (2011) #3</li>
                  <li className="aside-list__item">Alpha Flight (1983) #50</li>
                  <li className="aside-list__item">Amazing Spider-Man (1999) #503</li>
                  <li className="aside-list__item">Amazing Spider-Man (1999) #504</li>
                  <li className="aside-list__item">AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)</li>
                  <li className="aside-list__item">Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)</li>
                  <li className="aside-list__item">Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)</li>
                  <li className="aside-list__item">Vengeance (2011) #4</li>
                  <li className="aside-list__item">Avengers (1963) #1</li>
                  <li className="aside-list__item">Avengers (1996) #1</li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default CardsAside;