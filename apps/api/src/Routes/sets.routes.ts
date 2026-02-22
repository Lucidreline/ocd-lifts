import { authenticate } from '../middleware/authenticate.js';
import { prInput, setInput } from '../types/workout.types.js';
import { Request, Response, Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { calcScore } from '../lib/setUtils.js';
import { isPr, createPr } from '../lib/prUtils.js';

// will populate this soon

const router = Router();

router.put('/:setId', authenticate, async (req: Request, res: Response) => {
  const { setId } = req.params;
  const body = req.body as setInput;
  const score = calcScore(body);

  try {
    const updatedSet = await prisma.set.update({
      where: {
        id: Number(setId)
      },
      data: {
        ...body,
        score
      }
    });

    const prBody = {
      userId: updatedSet.userId,
      sessionId: updatedSet.sessionId,
      exerciseId: updatedSet.exerciseId,
      setId: updatedSet.id,
      score,
      weightLbs: updatedSet.weightLbs,
      repCount: updatedSet.repCount
    } as prInput;

    // check if this set previously had a PR
    const existingPr = await prisma.pR.findUnique({
      where: { setId: Number(setId) }
    });

    // if yes, delete it since the set data changed
    if (existingPr) {
      await prisma.pR.delete({
        where: { id: existingPr.id }
      });
    }

    // check if the updated set qualifies as a new PR
    const isPrSet = await isPr(prBody);
    const pr = isPrSet ? await createPr(prBody) : null;

    res.json({ ...updatedSet, pr });
  } catch (err) {
    res.status(500).json({ error: "Couldn't update your set" });
  }
});

router.delete('/:setId', authenticate, async (req: Request, res: Response) => {
  const { setId } = req.params;
  try {
    //delete set normally
    const deletedSet = await prisma.set.delete({
      where: {
        id: Number(setId)
      }
    });

    res.json(deletedSet);
    // make sure the PR is deleted as well
  } catch (err) {
    res.status(500).json({ error: "Couldn't delete the set" });
  }
});

export default router;
