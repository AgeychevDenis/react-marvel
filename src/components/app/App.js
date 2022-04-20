import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Spinner from '../spinner/spinner';
import Header from '../header/header';

import './App.scss';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/main-page'));
const ComicsPage = lazy(() => import('../pages/comics-page'));
const SingleComicPage = lazy(() => import('../pages/singe-comic-page'));

const App = () => {

  return (
    <Router>
      <div className="app" >
        <Header />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="/comics/:comicId" element={<SingleComicPage />} />
              <Route path='*' element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div >
    </Router>
  );

}

export default App;
