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
        userId,
        isArchived: false
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
    const createdExercises = await prisma.$transaction(
      exercises.map((exercise) =>
        prisma.exercise.create({
          data: {
            ...exercise,
            userId: req.userId!,
            muscleGroups: {
              create: exercise.muscleGroups
            }
          }
        })
      )
    );
    res.json(createdExercises);
  } catch (err) {
    res.status(500).json({ error: "Couldn't " });
  }
});

router.put(
  '/:exerciseId',
  authenticate,
  async (req: Request, res: Response) => {
    const { exerciseId } = req.params;
    const body = req.body as exerciseInput;
    try {
      const updatedExercise = await prisma.exercise.update({
        where: {
          id: Number(exerciseId)
        },
        data: {
          name: body.name,
          variation: body.variation,
          repRange: body.repRange,
          muscleGroups: {
            deleteMany: {},
            create: body.muscleGroups
          }
        }
      });
      res.json(updatedExercise);
    } catch (err) {
      res.status(500).json({ error: "Couldn't update your exercise" });
    }
  }
);

router.delete(
  '/:exerciseId',
  authenticate,
  async (req: Request, res: Response) => {
    const { exerciseId } = req.params;

    try {
      const softDeleteExercise = await prisma.exercise.update({
        where: {
          id: Number(exerciseId)
        },
        data: {
          isArchived: true
        }
      });
      res.json(softDeleteExercise);
    } catch (err) {
      res.status(500).json({ error: "Couldn't " });
    }
  }
);

export default router;
