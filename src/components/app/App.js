import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Spinner from '../spinner/spinner';
import Header from '../header/header';

import './App.scss';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/main-page'));
const ComicsPage = lazy(() => import('../pages/comics-page'));
const SingleComicLatout = lazy(() => import('../pages/single-comic-layout/single-comic-layout'));
const SingleCharactersLatout = lazy(() => import('../pages/single-character-layout/single-character-layout'));
const SinglePage = lazy(() => import('../pages/singe-page'));

const App = () => {

  return (
    <Router>
      <div className="app" >
        <Header />
        <main className='container'>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="/comics/:id" element={<SinglePage Component={SingleComicLatout} dataType='comic' />} />
              <Route path="/characters/:id" element={<SinglePage Component={SingleCharactersLatout} dataType='character' />} />
              <Route path='*' element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div >
    </Router>
  );

}

export default App;
