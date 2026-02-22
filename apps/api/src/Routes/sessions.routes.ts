import { Request, Response, Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authenticate } from '../middleware/authenticate.js';
import { prInput, sessionInput, setInput } from '../types/workout.types.js';
import { isPr, createPr } from '../lib/prUtils.js';

const router = Router();

router.get('/', authenticate, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const allUserSessions = await prisma.session.findMany({
      where: {
        userId
      }
    });
    res.json(allUserSessions);
  } catch (err) {
    res.status(500).json({ error: `Couldn't find session for user ${userId}` });
  }
});

router.post('/', authenticate, async (req: Request, res: Response) => {
  const body = req.body as sessionInput;
  try {
    const newSession = await prisma.session.create({
      data: {
        ...body,
        userId: req.userId!
      }
    });
    res.json(newSession);
  } catch (err) {
    res.status(500).json({ error: `Couldn't create new session` });
  }
});

// update a session
router.put('/:sessionId', authenticate, async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const body = req.body as sessionInput;

  try {
    const updatedSession = await prisma.session.update({
      where: {
        id: Number(sessionId)
      },
      data: body
    });
    res.json(updatedSession);
  } catch (err) {
    res.status(500).json({ error: "Couldn't Update this session" });
  }
});

// sets
router.get(
  '/:sessionId/sets',
  authenticate,
  async (req: Request, res: Response) => {
    const { sessionId } = req.params;

    try {
      const allSessionSets = await prisma.set.findMany({
        where: {
          userId: req.userId!,
          sessionId: Number(sessionId)
        },
        include: {
          exercise: {
            include: {
              muscleGroups: true,
              PRs: true
            }
          }
        }
      });
      res.json(allSessionSets);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Couldn't find your sets for that session." });
    }
  }
);

router.post(
  '/:sessionId/sets',
  authenticate,
  async (req: Request, res: Response) => {
    const body = req.body as setInput;

    let score;
    if (body.weightLbs === 0) score = body.repCount;
    else score = body.repCount * body.weightLbs;

    const { sessionId } = req.params;
    try {
      const createdSet = await prisma.set.create({
        data: {
          ...body,
          sessionId: Number(sessionId),
          userId: req.userId!,
          score
        }
      });

      const prBody = {
        userId: req.userId!,
        sessionId: Number(sessionId),
        exerciseId: body.exerciseId,
        setId: createdSet.id,
        score,
        weightLbs: body.weightLbs,
        repCount: body.repCount
      } as prInput;

      const isPrSet = await isPr(prBody);

      const pr = isPrSet ? await createPr(prBody) : null;
      res.json({ ...createdSet, pr });
    } catch (err) {
      res.status(500).json({ error: "Couldn't create your set or PR." });
    }
  }
);

export default router;
