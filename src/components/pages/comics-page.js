import ComicsList from '../comics-list/comics-list';
import AppBanner from '../app-banner/app-banner';

import React from 'react'

const ComicsPage = () => {
   return (
      <>
         <AppBanner />
         <ComicsList />
      </>
   )
}

export default ComicsPage;