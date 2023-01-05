import React, { useMemo, useRef, useState } from 'react';

import { Layout } from '../components/layout';
import BoardList from '../components/board/BoardList';
import { BoardType, BoardTypeEnum } from '../../lib/constant/boardType';
import BoardModal from '../components/modal/BoardModal';
import { IssueProps, modalFixtures, ModalType } from '../../lib/constant/modalType';
import useDelay from '../hooks/useDelay';
import Loading from '../components/common/Loading';
// import useDelay from '../hooks/useDelay';

const HomePage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('CREATE');
  const [issueState, setIssueState] = useState<Omit<IssueProps, 'issueId'>>(modalFixtures);
  const [issueList, setIssueList] = useState<IssueProps[]>([]);
  const issueIdRef = useRef(1);
  const { loading, delay } = useDelay();

  const IssueListByBoardType = useMemo(() => issueList.reduce((acc, cur) => {
    const { boardType } = cur;
    acc[boardType] = acc[boardType] ? [...acc[boardType], cur] : [cur];
    return acc;
  }, {} as { [key in BoardTypeEnum]: IssueProps[] }), [issueList]);

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
      setIssueList((prevIssue) => [...prevIssue, { ...issue, issueId: issueIdRef.current++ }]);
      alert('등록되었습니다.');
      setIsOpenModal(false);
    }
    if (modalType === 'UPDATE') {
      setIssueList((prevIssue) => prevIssue.map((prev) => {
        if (prev.issueId === issue.issueId) {
          return issue;
        }
        return prev;
      }));
      alert('수정되었습니다.');
      setIsOpenModal(false);
    }
    await delay(500);
  };

  const handleIssueDelete = async (issueId: number) => {
    setIssueList((prevIssue) => prevIssue.filter((issue) => issue.issueId !== issueId));
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
          issueList={IssueListByBoardType[BoardTypeEnum.Todo] || []}
          onDelete={handleIssueDelete}
        />
        <BoardList
          title={BoardType[BoardTypeEnum.InProgress]}
          boardType={BoardTypeEnum.InProgress}
          onModalOpen={handleModalOpen}
          issueList={IssueListByBoardType[BoardTypeEnum.InProgress] || []}
          onDelete={handleIssueDelete}
        />
        <BoardList
          title={BoardType[BoardTypeEnum.Done]}
          boardType={BoardTypeEnum.Done}
          onModalOpen={handleModalOpen}
          issueList={IssueListByBoardType[BoardTypeEnum.Done] || []}
          onDelete={handleIssueDelete}
        />
      </Layout>
    </>
  );
};

export default HomePage;
