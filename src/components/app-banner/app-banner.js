import './app-banner.scss';
import avengers from '../../assets/img/banner/Avengers.png';
import avengersLogo from '../../assets/img/banner/Avengers_logo.png';

const AppBanner = () => {
   return (
      <div className="app__banner container">
         <img src={avengers} alt="Avengers" />
         <div className="app__banner-text">
            New comics every week!<br />
            Stay tuned!
         </div>
         <img src={avengersLogo} alt="Avengers logo" />
      </div>
   )
}

export default AppBanner;