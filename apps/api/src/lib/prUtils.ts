import { prisma } from './prisma.js';
import { prInput } from '../types/workout.types.js';

export const isPr = async (body: prInput) => {
  const bestPr = await prisma.pR.findFirst({
    where: { exerciseId: body.exerciseId },
    orderBy: { score: 'desc' }
  });
  return !bestPr || body.score > bestPr.score;
};

export const createPr = async (body: prInput) => {
  const newPr = await prisma.pR.create({
    data: body
  });
  return newPr;
};
