// footbot-frontend/FootBot-app/src/services/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface TeamDetails {
  name: string | null;
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
    const response = await fetch(`${API_BASE_URL}/api/tables`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tables:', error);
    return [];
  }
};

export interface Match {
  stage: string;
  homeTeam: { name: string | null };
  awayTeam: { name: string | null };
  score: {
    winner: string;
    duration: string;
    fullTime: { home: number | null; away: number | null };
    halfTime: { home: number | null; away: number | null };
  };
  utcDate: string;
}

export interface CompetitionMatches {
  competition: string;
  matches: Match[];
}

export const getScores = async (): Promise<CompetitionMatches[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/scores`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching scores:', error);
    return [];
  }
};

export const getKnockoutStages = async (): Promise<Match[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tables/knockout`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching knockout stages:', error);
    return [];
  }
};

export const getTeamFixtures = async (teamName: string): Promise<Match[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/scores`);
    const data = await response.json() as CompetitionMatches[];

    const normalize = (str: string | null | undefined): string => {
      if (!str) return '';
      return str.toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/\b(fc|sc|club|team)\b/g, '')
        .trim();
    };

    const normalizedSearchTerm = normalize(teamName);
    
    if (!normalizedSearchTerm) {
      console.error('No valid search term provided');
      return [];
    }

    const teamMatches: Match[] = [];
    data.forEach(competition => {
      if (competition && competition.matches) {
        competition.matches.forEach(match => {
          if (match && match.homeTeam && match.awayTeam) {
            const homeTeamName = normalize(match.homeTeam.name);
            const awayTeamName = normalize(match.awayTeam.name);

            if (homeTeamName.includes(normalizedSearchTerm) || awayTeamName.includes(normalizedSearchTerm)) {
              teamMatches.push(match);
            }
          }
        });
      }
    });

    return teamMatches;
  } catch (error) {
    console.error('Error fetching team fixtures:', error);
    return [];
  }
};