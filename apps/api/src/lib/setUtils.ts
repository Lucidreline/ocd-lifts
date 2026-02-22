import { setInput } from '../types/workout.types';

export const calcScore = (setBody: setInput) => {
  if (setBody.weightLbs === 0) return setBody.repCount;
  else return setBody.repCount * setBody.weightLbs;
};
