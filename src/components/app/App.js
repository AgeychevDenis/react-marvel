import { Component } from 'react';

import Header from '../header/header';
import Info from '../info/info';
import ProductCards from '../product-cards/product-cards';
import CardsAside from '../cards-aside/cards-aside';
import ErrorBoundary from '../error-boundary/error-boundary';

import ImgBg from '../../assets/img/bg/bg.png'
import './App.scss';


class App extends Component {
  state = {
    selectedChar: null
  }

  onCharSelected = (id) => {
    this.setState({
      selectedChar: id
    })
  }

  render() {
    return (
      <div className="app" >
        <Header />
        <ErrorBoundary>
          <Info />
        </ErrorBoundary>
        <div className="product__cards" >
          <div className="container">
            <div className="product__cards-wrapper">
              <ErrorBoundary>
                <ProductCards onCharSelected={this.onCharSelected} />
              </ErrorBoundary>
              <ErrorBoundary>
                <CardsAside charId={this.state.selectedChar} />
              </ErrorBoundary>
            </div>
          </div >
        </div >
        <img className='main__bg' src={ImgBg} alt="bg" />
      </div >
    );
  }
}

export default App;
