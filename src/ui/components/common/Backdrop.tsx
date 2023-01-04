import React, { memo, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children?: ReactNode;
  [k: string]: any;
}

const Backdrop = ({ children, ...props }: Props) => (
  <Container {...props}>
    {children}
  </Container>
);

export default memo(Backdrop);

const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  width: 100%;
  height: 100%;
  background-color: #00000024;
  z-index: 3001;
`;
