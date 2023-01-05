import React, { useRef, useState } from 'react';

import { Layout } from '../components/layout';
import BoardList from '../components/board/BoardList';
import { BoardType, BoardTypeEnum } from '../../lib/constant/boardType';
import BoardModal from '../components/modal/BoardModal';
import { issueListFixtures, IssueListProps, IssueProps, modalFixtures, ModalType } from '../../lib/constant/modalType';
import useDelay from '../hooks/useDelay';
import Loading from '../components/common/Loading';

const HomePage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('CREATE');
  const [issueState, setIssueState] = useState<Omit<IssueProps, 'issueId'>>(modalFixtures);
  const [issueList, setIssueList] = useState<IssueListProps>(issueListFixtures);
  const issueIdRef = useRef(1);
  const { loading, delay } = useDelay();

  const handleModalOpen = async (modalType: ModalType, issue?: IssueProps) => {
    await delay(500);
    if (modalType === 'UPDATE' && issue) {
      setIssueState(issue);
    } else {
      setIssueState((prev) => ({
        ...prev,
        boardType: issue?.boardType || BoardTypeEnum.Todo,
      }));
    }
    setModalType(modalType);
    setIsOpenModal(true);
  };

  const handleToggleModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  const handleSubmit = async (issue: IssueProps, modalType: ModalType) => {
    if (modalType === 'CREATE') {
      setIssueList((prevIssue) => ({
        ...prevIssue,
        [issue.boardType]: [...prevIssue[issue.boardType], { ...issue, issueId: issueIdRef.current++ }],
      }));
      alert('등록되었습니다.');
      setIsOpenModal(false);
    }
    if (modalType === 'UPDATE') {
      const prevIssue = [...issueList.TODO, ...issueList.IN_PROGRESS, ...issueList.DONE].find((issueItem) => issueItem.issueId === issue.issueId);
      if (prevIssue) {
        setIssueList((prev) => {
          const { boardType, issueId } = issue;
          if (prevIssue.boardType === boardType) {
            return {
              ...prev,
              [boardType]: prev[boardType].map((issueItem) => {
                if (issueItem.issueId === issueId) {
                  return issue;
                }
                return issueItem;
              }),
            };
          }
          return {
            ...prev,
            [prevIssue.boardType]: prev[prevIssue.boardType].filter((issueItem) => issueItem.issueId !== issueId),
            [boardType]: [...prev[boardType], issue],
          };
        });
        alert('수정되었습니다.');
        setIsOpenModal(false);
      }
    }
    await delay(500);
  };

  const handleIssueDelete = async (issueId: number) => {
    setIssueList((prevIssueList) => ({
      ...prevIssueList,
      [BoardTypeEnum.Todo]: prevIssueList[BoardTypeEnum.Todo].filter((issue) => issue.issueId !== issueId),
    }));
    alert('삭제되었습니다.');
    await delay(500);
  };

  return (
    <>
      {
        loading && (
          <Loading />
        )
      }
      {
        isOpenModal && (
          <BoardModal
            modalType={modalType}
            onClose={handleToggleModal}
            onSubmit={handleSubmit}
            {...issueState}
          />
        )
      }
      <Layout style={{ display: 'flex', padding: '20px' }}>
        <BoardList
          title={BoardType[BoardTypeEnum.Todo]}
          boardType={BoardTypeEnum.Todo}
          onModalOpen={handleModalOpen}
          issueList={issueList.TODO}
          onDelete={handleIssueDelete}
        />
        <BoardList
          title={BoardType[BoardTypeEnum.InProgress]}
          boardType={BoardTypeEnum.InProgress}
          onModalOpen={handleModalOpen}
          issueList={issueList.IN_PROGRESS}
          onDelete={handleIssueDelete}
        />
        <BoardList
          title={BoardType[BoardTypeEnum.Done]}
          boardType={BoardTypeEnum.Done}
          onModalOpen={handleModalOpen}
          issueList={issueList.DONE}
          onDelete={handleIssueDelete}
        />
      </Layout>
    </>
  );
};

export default HomePage;
