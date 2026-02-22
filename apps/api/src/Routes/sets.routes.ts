import { authenticate } from '../middleware/authenticate.js';
import { setInput } from '../types/workout.types.js';
import { Request, Response, Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { calcScore } from '../lib/setUtils.js';

// will populate this soon

const router = Router();

router.put('/:setId', authenticate, async (req: Request, res: Response) => {
  const { setId } = req.params;
  const body = req.body as setInput;

  try {
    const updatedSet = await prisma.set.update({
      where: {
        id: Number(setId)
      },
      data: {
        ...body,
        score: calcScore(body)
      }
    });

    res.json(updatedSet);
  } catch (err) {
    res.status(500).json({ error: "Couldn't update your set" });
  }
});

export default router;
