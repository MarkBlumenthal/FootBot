// footbot-frontend/FootBot-app/src/services/api.ts
export interface Match {
  homeTeam: { name: string };
  awayTeam: { name: string };
  score: {
    winner: string;
    duration: string;
    fullTime: { home: number; away: number };
    halfTime: { home: number; away: number };
  };
  utcDate: string; 
}

export interface CompetitionMatches {
  competition: string;
  matches: Match[];
}

export const getScores = async (): Promise<CompetitionMatches[]> => {
  try {
    const response = await fetch('http://localhost:3000/api/scores');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching scores:', error);
    return [];
  }
};

export interface Team {
  name: string;
  position: number;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface Standing {
  stage: string;
  type: string;
  group: string;
  table: Team[];
}

export interface CompetitionStandings {
  competition: string;
  standings: Standing[];
}

export const getTables = async (): Promise<CompetitionStandings[]> => {
  try {
    const response = await fetch('http://localhost:3000/api/tables');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tables:', error);
    return [];
  }
};
