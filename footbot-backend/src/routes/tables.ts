// footbot-backend/src/routes/tables.ts
import { Router, Request, Response } from 'express';
import { getTables } from '../utils/apiUtils';
import NodeCache from 'node-cache';

const router = Router();
const cache = new NodeCache({ stdTTL: 60 }); // Cache for 60 seconds

router.get('/', async (req: Request, res: Response) => {
  try {
    const cachedTables = cache.get('tables');
    if (cachedTables) {
      console.log('Serving tables from cache');
      return res.json(cachedTables);
    }

    const results = await getTables();
    cache.set('tables', results);
    res.json(results);
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

export { router as tablesRouter };
