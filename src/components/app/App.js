import './App.scss';
import Header from '../header/header';
import Info from '../info/info';
import ProductCards from '../product-cards/product-cards';


function App() {
  return (
    <div className="app">
      <Header />
      <Info />
      <ProductCards />
    </div>
  );
}

export default App;
