import React from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';

const IconType = {
  CREATE: AiOutlinePlus,
  DELETE: MdClose
};

type IconButtonProps = {
  type: keyof typeof IconType;
  size: number;
  onClick: () => void;
  [key: string]: any;
}

const IconButton = ({
  type,
  size,
  onClick,
  ...props
}: IconButtonProps) => {
  const RenderButton = IconType[type];
  return (
    <Button
      onClick={onClick}
      {...props}
    >
      <RenderButton size={size} />
    </Button>
  );
};

export default IconButton;

const Button = styled.button`
  width: auto;
  height: auto;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
`;
