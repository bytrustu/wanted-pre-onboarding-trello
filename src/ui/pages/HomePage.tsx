import React, { useMemo, useRef, useState } from 'react';

import { Layout } from '../components/layout';
import BoardList from '../components/board/BoardList';
import { BoardType, BoardTypeEnum } from '../../lib/constant/boardType';
import BoardModal from '../components/modal/BoardModal';
import { IssueProps, modalFixtures, ModalType } from '../../lib/constant/modalType';

const HomePage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [issueState, setIssueState] = useState<Omit<IssueProps, 'issueId'>>(modalFixtures);
  const [issueList, setIssueList] = useState<IssueProps[]>([]);
  const issueIdRef = useRef(1);

  const IssueListByBoardType = useMemo(() => issueList.reduce((acc, cur) => {
    const { boardType } = cur;
    acc[boardType] = acc[boardType] ? [...acc[boardType], cur] : [cur];
    return acc;
  }, {} as { [key in BoardTypeEnum]: IssueProps[] }), [issueList]);
  const handleModalOpen = (modalType: ModalType, issue?: IssueProps) => {
    if (modalType === 'UPDATE' && issue) {
      setIssueState(issue);
    } else {
      setIssueState((prev) => ({
        ...prev,
        boardType: issue?.boardType || BoardTypeEnum.Todo,
      }));
    }
    setIsOpenModal(true);
  };

  const handleToggleModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  const handleSubmit = (issue: IssueProps, modalType: ModalType) => {
    if (modalType === 'CREATE') {
      setIssueList((prevIssue) => [...prevIssue, { ...issue, issueId: issueIdRef.current++ }]);
      setIsOpenModal(false);
      alert('등록되었습니다.');
    }
    if (modalType === 'UPDATE') {
      console.log('update');
    }
  };

  return (
    <>
      {
        isOpenModal && (
          <BoardModal
            modalType="CREATE"
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
        />
        <BoardList
          title={BoardType[BoardTypeEnum.InProgress]}
          boardType={BoardTypeEnum.InProgress}
          onModalOpen={handleModalOpen}
          issueList={IssueListByBoardType[BoardTypeEnum.InProgress] || []}
        />
        <BoardList
          title={BoardType[BoardTypeEnum.Done]}
          boardType={BoardTypeEnum.Done}
          onModalOpen={handleModalOpen}
          issueList={IssueListByBoardType[BoardTypeEnum.Done] || []}
        />
      </Layout>
    </>
  );
};

export default HomePage;
