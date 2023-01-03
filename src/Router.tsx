import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { PATH } from './lib/constant/path';
import { HomePage } from './ui/pages';

const Router = () => (
  <Routes>
    <Route path={PATH.HOME} element={<HomePage />} />
  </Routes>
);

export default Router;
