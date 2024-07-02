// footbot-backend/src/index.ts
import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const cache = new NodeCache({ stdTTL: 60 }); // Cache for 60 seconds

app.use(cors());

const competitions = {
  PL: 'Premier League',
  SA: 'Serie A',
  PD: 'Primera Division',
  BL1: 'Bundesliga',
  CL: 'UEFA Champions League'
};

app.get('/api/scores', async (req: Request, res: Response) => {
  try {
    const cachedScores = cache.get('scores');
    if (cachedScores) {
      console.log('Serving scores from cache');
      return res.json(cachedScores);
    }

    const results = await Promise.all(Object.keys(competitions).map(async (competition) => {
      const response = await axios.get(`https://api.football-data.org/v4/competitions/${competition}/matches`, {
        headers: { 'X-Auth-Token': API_KEY }
      });
      console.log(`Data for ${competition} matches:`, JSON.stringify(response.data, null, 2)); // Log the response data fully expanded
      return { competition, matches: response.data.matches };
    }));

    cache.set('scores', results);
    res.json(results);
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/api/tables', async (req: Request, res: Response) => {
  try {
    const cachedTables = cache.get('tables');
    if (cachedTables) {
      console.log('Serving tables from cache');
      return res.json(cachedTables);
    }

    const results = await Promise.all(Object.keys(competitions).map(async (competition) => {
      const response = await axios.get(`https://api.football-data.org/v4/competitions/${competition}/standings`, {
        headers: { 'X-Auth-Token': API_KEY }
      });
      console.log(`Data for ${competition} standings:`, JSON.stringify(response.data, null, 2)); // Log the response data fully expanded
      return { competition, standings: response.data.standings };
    }));

    cache.set('tables', results);
    res.json(results);
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});








