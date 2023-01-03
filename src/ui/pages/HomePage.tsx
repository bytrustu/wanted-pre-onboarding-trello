import React from 'react';

import { Layout } from '../components/layout';
import BoardList from '../components/board/BoardList';

const HomePage = () => {
  console.log('home');
  return (
    <Layout style={{ display: 'flex', padding: '20px' }}>
      <BoardList title="할 일" />
      <BoardList title="진행 중" />
      <BoardList title="완료" />
    </Layout>
  );
};

export default HomePage;
