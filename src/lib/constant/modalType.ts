import { BoardTypeEnum } from './boardType';

export const MODAL_TYPE = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
};

export const MODAL_SUBMIT_NAME = {
  [MODAL_TYPE.CREATE]: '추가',
  [MODAL_TYPE.UPDATE]: '수정',
};

export type ModalType = typeof MODAL_TYPE[keyof typeof MODAL_TYPE];

export interface IssueProps {
  boardType: BoardTypeEnum;
  issueId?: number;
  issueDate?: string;
  owner?: string;
  title?: string;
  content?: string;
}

export const modalFixtures = {
  boardType: BoardTypeEnum.Todo,
  issueDate: '',
  owner: '',
  title: '',
  content: '',
};
