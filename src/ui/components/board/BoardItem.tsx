import React from 'react';
import styled from 'styled-components';

import IconButton from '../common/IconButton';
import { IssueProps } from '../../../lib/constant/modalType';

interface BoardItemProps extends IssueProps {
  onDelete: (issueId: number) => void;
}

const BoardItem = ({
  boardType,
  issueId,
  issueDate,
  owner,
  title,
  content,
  onDelete,
}: BoardItemProps) => {
  const handleDeleteClick = () => {
    if (issueId) {
      // eslint-disable-next-line no-restricted-globals
      const isConfirm = confirm('정말 삭제하시겠습니까?');
      if (isConfirm) {
        onDelete(issueId);
      }
    }
  };
  return (
    <Container draggable>
      <Title>{title}</Title>
      <IconButton type="DELETE" size={16} onClick={handleDeleteClick} />
    </Container>
  );
};

export default BoardItem;

const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  cursor: grab;
  margin-top: 10px;
  padding: 10px;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  display: inline-block;
  max-width: 240px;
  width: 240px;
`;

const DeleteButton = styled.button`
  width: auto;
  height: auto;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
`;
