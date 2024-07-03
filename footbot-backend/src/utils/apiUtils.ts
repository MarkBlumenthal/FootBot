// footbot-backend/src/utils/apiUtils.ts
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.API_KEY;

const competitions = {
  PL: 'Premier League',
  SA: 'Serie A',
  PD: 'Primera Division',
  BL1: 'Bundesliga',
  CL: 'UEFA Champions League'
};

export const getScores = async () => {
  const results = await Promise.all(Object.keys(competitions).map(async (competition) => {
    const response = await axios.get(`https://api.football-data.org/v4/competitions/${competition}/matches`, {
      headers: { 'X-Auth-Token': API_KEY }
    });
    console.log(`Data for ${competition} matches:`, JSON.stringify(response.data, null, 2));
    return { competition, matches: response.data.matches };
  }));
  return results;
};

export const getTables = async () => {
  const results = await Promise.all(Object.keys(competitions).map(async (competition) => {
    const response = await axios.get(`https://api.football-data.org/v4/competitions/${competition}/standings`, {
      headers: { 'X-Auth-Token': API_KEY }
    });
    console.log(`Data for ${competition} standings:`, JSON.stringify(response.data, null, 2));
    return { competition, standings: response.data.standings };
  }));
  return results;
};
