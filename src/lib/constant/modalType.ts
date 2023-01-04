import { BoardTypeEnum } from './boardType';

export type ModalType = 'CREATE' | 'UPDATE';

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
