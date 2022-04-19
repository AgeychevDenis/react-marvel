import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { MainPage, ComicsPage, Page404, SingleComicPage } from '../pages';
import Header from '../header/header';

import './App.scss';


const App = () => {

  return (
    <Router>
      <div className="app" >
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/comics" element={<ComicsPage />} />
          <Route path="/comics/:comicId" element={<SingleComicPage />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </div >
    </Router>
  );

}

export default App;
