import React from 'react';

import GlobalStyles from './ui/core/GlobalStyles';
import Router from './Router';
import { LoadingProvider } from './ui/context/LoadingContext';

const App = () => (
  <LoadingProvider>
    <Router />
    <GlobalStyles />
  </LoadingProvider>
);

export default App;
