import React, { useContext, useMemo, useRef, useState } from 'react';

import { Layout } from '../components/layout';
import BoardList from '../components/board/BoardList';
import { BoardType, BoardTypeEnum } from '../../lib/constant/boardType';
import BoardModal from '../components/modal/BoardModal';
import { IssueProps, modalFixtures, ModalType } from '../../lib/constant/modalType';
import Loading from '../components/common/Loading';
import LoadingContext from '../context/LoadingContext';

const HomePage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('CREATE');
  const [issueState, setIssueState] = useState<Omit<IssueProps, 'issueId'>>(modalFixtures);
  const [issueList, setIssueList] = useState<IssueProps[]>([]);
  const issueIdRef = useRef(1);
  const { loading, onChangeLoading} = useContext(LoadingContext);

  const IssueListByBoardType = useMemo(() => issueList.reduce((acc, cur) => {
    const { boardType } = cur;
    acc[boardType] = acc[boardType] ? [...acc[boardType], cur] : [cur];
    return acc;
  }, {} as { [key in BoardTypeEnum]: IssueProps[] }), [issueList]);

  console.log('IssueListByBoardType >>', IssueListByBoardType);

  const handleModalOpen = (modalType: ModalType, issue?: IssueProps) => {
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

  console.log('확인중', issueList, IssueListByBoardType);

  const handleToggleModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  const handleSubmit = (issue: IssueProps, modalType: ModalType) => {
    console.log('handleSubmit', issue, modalType);
    if (modalType === 'CREATE') {
      setIssueList((prevIssue) => [...prevIssue, { ...issue, issueId: issueIdRef.current++ }]);
      setIsOpenModal(false);
      alert('등록되었습니다.');
    }
    if (modalType === 'UPDATE') {
      setIssueList((prevIssue) => prevIssue.map((prev) => {
        if (prev.issueId === issue.issueId) {
          return issue;
        }
        return prev;
      }));
      setIsOpenModal(false);
      alert('수정되었습니다.');
    }
  };

  const handleIssueDelete = (issueId: number) => {
    setIssueList((prevIssue) => prevIssue.filter((issue) => issue.issueId !== issueId));
    alert('삭제되었습니다.');
  };

  return (
    <>
      {
        loading && <Loading />
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
