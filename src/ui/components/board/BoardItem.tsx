import React from 'react';
import styled from 'styled-components';

import IconButton from '../common/IconButton';
import { IssueProps, MODAL_TYPE, ModalType } from '../../../lib/constant/modalType';

interface BoardItemProps extends IssueProps {
  onDelete: (issueId: number) => void;
  onModalOpen: (modalType: ModalType, issue?: IssueProps) => void;
}

const BoardItem = ({
  boardType,
  issueId,
  issueDate,
  owner,
  title,
  content,
  onDelete,
  onModalOpen,
}: BoardItemProps) => {
  const handleDeleteClick = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (issueId) {
      // eslint-disable-next-line no-restricted-globals
      const isConfirm = confirm('정말 삭제하시겠습니까?');
      if (isConfirm) {
        console.log('issueId', issueId);
        console.log(onDelete);
        onDelete(issueId);
      }
    }
  };
  const handleEditClick = () => {
    onModalOpen(MODAL_TYPE.UPDATE, { boardType, issueId, issueDate, owner, title, content });
  };
  return (
    <Container
      onClick={handleEditClick}
    >
      <Title>{title}</Title>
      <IconButton
        type="DELETE"
        size={16}
        onClick={handleDeleteClick}
        style={{ padding: '10px' }}
      />
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
  padding: 10px;
`;

const DeleteButton = styled.button`
  width: auto;
  height: auto;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px;
  margin: 0;
`;
