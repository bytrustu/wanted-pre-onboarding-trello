import React from 'react';
import styled from 'styled-components';

import Backdrop from './Backdrop';

const Loading = () => (
    <Backdrop>
      <Container>
        잠시만 기다려주세요.
      </Container>
    </Backdrop>
  );

export default Loading;

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: 600;
`;
