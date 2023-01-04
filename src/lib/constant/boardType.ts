import { enumsToOptions } from '../utils/enumsToOptions';

export enum BoardTypeEnum {
  Todo = 'TODO',
  InProgress = 'IN_PROGRESS',
  Done = 'DONE',
}

export const BoardType = {
  [BoardTypeEnum.Todo]: '할 일',
  [BoardTypeEnum.InProgress]: '진행 중',
  [BoardTypeEnum.Done]: '완료',
};

export const [BoardTypeOptions] = [BoardTypeEnum].map(enumsToOptions(BoardType));
