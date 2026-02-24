import { Request, Response, Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authenticate } from '../middleware/authenticate.js';
import { exerciseInput } from '../types/workout.types.js';

const router = Router();

router.get('/', authenticate, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const allUserExercises = await prisma.exercise.findMany({
      where: {
        userId
      },
      include: {
        muscleGroups: true
      }
    });

    res.json(allUserExercises);
  } catch (err) {
    res.status(500).json({ error: "Couldn't find your exercises :(" });
  }
});

router.post('/', authenticate, async (req: Request, res: Response) => {
  const body = req.body as exerciseInput;

  try {
    const newExercise = await prisma.exercise.create({
      data: {
        ...body,
        userId: req.userId!,
        muscleGroups: {
          create: body.muscleGroups
        }
      }
    });
    res.json(newExercise);
  } catch (err) {
    res.status(500).json({ error: `Couldn't create your exersise!!` });
  }
});

router.post('/bulk', authenticate, async (req: Request, res: Response) => {
  const exercises = req.body as exerciseInput[];

  try {
    const created = await prisma.$transaction(
      exercises.map((exercise) =>
        prisma.exercise.create({
          data: {
            ...exercise,
            userId: req.userId!,
            muscleGroups: {
              create: exercise.muscleGroups
            }
          },
          include: {
            muscleGroups: true
          }
        })
      )
    );
    res.json(created);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Couldn't bulk create your exercises!!" });
  }
});

export default router;
