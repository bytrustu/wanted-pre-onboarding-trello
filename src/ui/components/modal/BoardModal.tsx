import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import Backdrop from '../common/Backdrop';
import IconButton from '../common/IconButton';
import { BoardTypeOptions } from '../../../lib/constant/boardType';
import { IssueProps, MODAL_SUBMIT_NAME, modalFixtures, ModalType } from '../../../lib/constant/modalType';
import SearchInput from '../common/SearchInput';
import { isOwner, ownerList } from '../../../lib/constant/ownerList';

interface BoardModalProps extends IssueProps {
  modalType: ModalType;
  onClose: () => void;
  onSubmit: (issue: IssueProps, modalType: ModalType) => void;
}
const BoardModal = ({
  modalType,
  boardType,
  issueId,
  issueDate,
  owner,
  title,
  content,
  onClose,
  onSubmit,
}: BoardModalProps) => {
  const [issue, setIssue] = useState<Omit<IssueProps, 'issueId'>>(modalFixtures);
  const [searchOwnerList, setSearchOwnerList] = useState<string[]>([]);
  const [isSearchOwnerList, setIsSearchOwnerList] = useState(false);

  const TitleRef = useRef<null | HTMLInputElement>(null);

  const handleOnSubmit = () => {
    if (modalType === MODAL_SUBMIT_NAME.CREATE) {
      onSubmit(issue, modalType);
      return;
    }
    onSubmit({ ...issue, issueId }, modalType);
  };

  const handleChangeSearchInput = (value: string) => {
    if (value === '') {
      setIsSearchOwnerList(false);
      setSearchOwnerList([]);
      return;
    }
    const regexp = new RegExp(value, 'gi');
    const filteredList = ownerList.filter((owner) => owner.match(regexp));
    setSearchOwnerList(filteredList);
    setIsSearchOwnerList(true);
  };

  const handleSearchOwnerClick = (owner: string) => {
    setIssue((prev) => ({
      ...prev,
      owner,
    }));
    setIsSearchOwnerList(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setIssue({
      ...issue,
      [name]: value,
    });
    if (name === 'owner') {
      handleChangeSearchInput(value);
    }
  };

  const handleIsSearchOwnerList = (isShow: boolean) => {
    setIsSearchOwnerList(isShow);
  };

  const isValidation = useMemo(() => Object.entries(issue).every(([k, v]) => {
    if (k === 'owner') {
      return isOwner(v);
    }
    return v !== '';
  }), [issue]);

  useEffect(() => {
    if (modalType === 'UPDATE') {
      setIssue({
        boardType,
        issueDate,
        owner,
        title,
        content,
      });
    }
    if (modalType === 'CREATE') {
      setIssue({
        ...issue,
        boardType,
      });
    }
  }, [modalType]);

  useEffect(() => {
    if (TitleRef.current) {
      TitleRef.current.focus();
    }
  }, [TitleRef]);


  return (
    <Backdrop>
      <Container>
        <Header>
          <Input
            type="text"
            name="title"
            value={issue.title}
            onChange={handleOnChange}
            placeholder="제목을 입력하세요"
            ref={TitleRef}
          />
          <IconButton
            type="DELETE"
            size={24}
            onClick={onClose}
          />
        </Header>
        <Body>
          {
            modalType === 'UPDATE' && (
              <Row>
                <Label>번호</Label>
                <div style={{ width: '80%'}}>{issueId}</div>
              </Row>
            )
          }
          <Row>
            <Label>상태</Label>
            <Select
              name="boardType"
              value={issue.boardType}
              onChange={handleOnChange}
            >
              {
                BoardTypeOptions.map(({ name, value }) => (
                  <option key={value} value={value}>{name}</option>
                ))
              }
            </Select>
          </Row>
          <Row>
            <Label>마감일</Label>
            <Input
              type="datetime-local"
              name="issueDate"
              value={issue.issueDate}
              onChange={handleOnChange}
              placeholder="작성일을 입력하세요" />
          </Row>
          <Row>
            <Label>담당자</Label>
            <SearchInput
              name='owner'
              value={issue.owner || ''}
              onChange={handleOnChange}
              placeholder="담당자 입력하세요"
              searchOwnerList={searchOwnerList}
              isSearchOwnerList={isSearchOwnerList}
              onIsSearchOwnerList={handleIsSearchOwnerList}
              onSearchOwnerClick={handleSearchOwnerClick}
            />
          </Row>
          <Row height="auto">
            <Label>내용</Label>
            <TextArea
              name="content"
              value={issue.content}
              placeholder="내용을 입력하세요"
              onChange={handleOnChange}
              rows={3}
            />
          </Row>
        </Body>
        <Footer>
          <CancelButton
            type="button"
            onClick={onClose}
          >
            취소
          </CancelButton>
          <SubmitButton
            type="button"
            disabled={!isValidation}
            onClick={handleOnSubmit}
          >
            {MODAL_SUBMIT_NAME[modalType]}
          </SubmitButton>
        </Footer>
      </Container>
    </Backdrop>
  );
};

export default BoardModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  padding: 30px 20px;
  width: 500px;
  height: auto;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-top: 10px;

  & > * + * {
    margin-left: 10px;
  }
`;

const Row = styled.p<{height?: string}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${(props) => props?.height || '40px'};
  margin: 0 0 10px 0 ;
`;

const Input = styled.input<{height?: string}>`
  width: 80%;
  height: ${props => props?.height || 'auto'};
  padding: 0 10px;
  border: unset;
  border-radius: 5px;
  outline: none;
`;

const Label = styled.label`
  width: 30%;
  height: 100%;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  width: 80%;
  height: 100%;
  padding: 0 10px;
  border: unset;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 80%;
  padding: 10px;
  border: unset;
  border-radius: 5px;
  outline: none;
  resize: none;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  border: unset;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

const CancelButton = styled(Button)`
  background: #e5e5e5;
  color: #000;
`;

const SubmitButton = styled(Button)`
  background: #000;
  color: #fff;
  &:disabled {
    background: #b4b4b4;
    color: #000;
  }
`;

