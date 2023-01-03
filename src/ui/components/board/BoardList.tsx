import React from 'react';
import styled from 'styled-components';

import BoardItem from './BoardItem';
import IconButton from '../common/IconButton';

type BoardListProps = {
  title: string;
}
const BoardList = ({ title }: BoardListProps) => {
  console.log('board list');
  return (
    <Container>
      <Header>
        <h4>{title}</h4>
        <IconButton type="CREATE" size={24} onClick={() => {}} />
      </Header>
      <Body>
        {
          new Array(50).fill('').map((_, index) => (
            <BoardItem key={index} />
          ))
        }
      </Body>
    </Container>
  );
};

export default BoardList;

const Container = styled.section`
  flex: 1 1 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  & + & {
    margin-left: 40px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e5e5e5;
  height: 60px;
`;

const Body = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: auto;
  margin: 0;
  padding: 0;
`;
