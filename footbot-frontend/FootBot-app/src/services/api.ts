// footbot-frontend/FootBot-app/src/services/api.ts
export interface TeamDetails {
  name: string;
}

export interface Team {
  position: number;
  team: TeamDetails;
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
  group: string | null;
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

export interface Match {
  stage: string;
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

export const getKnockoutStages = async (): Promise<Match[]> => {
  try {
    const response = await fetch('http://localhost:3000/api/tables/knockout');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching knockout stages:', error);
    return [];
  }
};

export const getTeamFixtures = async (teamName: string): Promise<Match[]> => {
  try {
    const response = await fetch('http://localhost:3000/api/scores');
    const data = await response.json() as CompetitionMatches[];

    const teamMatches: Match[] = [];
    data.forEach(competition => {
      competition.matches.forEach(match => {
        if (match.homeTeam.name.toLowerCase() === teamName.toLowerCase() || match.awayTeam.name.toLowerCase() === teamName.toLowerCase()) {
          teamMatches.push(match);
        }
      });
    });

    return teamMatches;
  } catch (error) {
    console.error('Error fetching team fixtures:', error);
    return [];
  }
};

