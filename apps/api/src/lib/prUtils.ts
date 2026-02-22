import { prisma } from './prisma.js';
import { prInput } from '../types/workout.types.js';

export const isPr = async (body: prInput) => {
  const bestSet = await prisma.set.findFirst({
    where: {
      exerciseId: body.exerciseId,
      id: { not: body.setId }
    },
    orderBy: { score: 'desc' }
  });
  return !bestSet || body.score > bestSet.score;
};

export const createPr = async (body: prInput) => {
  const newPr = await prisma.pR.create({
    data: body
  });
  return newPr;
};
