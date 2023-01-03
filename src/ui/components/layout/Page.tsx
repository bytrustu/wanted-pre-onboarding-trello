import React, { memo } from 'react';
import styled from 'styled-components';

interface Props {
  children?: React.ReactNode;
}

const Page = ({ children }: Props) => (
  <Container>
    {children}
  </Container>
);

export default memo(Page);

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #f3f3f3;
`;
