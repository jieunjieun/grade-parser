import { atom, selector } from 'recoil';
import { calculate } from '../util/process';

export const parsedDataState = atom<string[][]>({
  key: 'parsedDataState',
  default: [],
});

export const editedGradesState = atom<string[][]>({
  key: 'editedGradesState',
  default: [],
});

export const calculatedGrade = selector<number>({
  key: 'calculatedGrade',
  get: ({ get }) => {
    return calculate(get(editedGradesState)) || 0;
  },
});

export const processPercentState = atom<number>({
  key: 'processPercentState',
  default: 0,
});
