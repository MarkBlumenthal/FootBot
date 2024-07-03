// footbot-backend/src/routes/scores.ts
import { Router, Request, Response } from 'express';
import { getScores } from '../utils/apiUtils';
import NodeCache from 'node-cache';

const router = Router();
const cache = new NodeCache({ stdTTL: 800 }); // Cache for 60 seconds

router.get('/', async (req: Request, res: Response) => {
  try {
    const cachedScores = cache.get('scores');
    if (cachedScores) {
      console.log('Serving scores from cache');
      return res.json(cachedScores);
    }

    const results = await getScores();
    cache.set('scores', results);
    res.json(results);
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

export { router as scoresRouter };
