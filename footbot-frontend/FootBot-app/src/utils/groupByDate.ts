// footbot-frontend/FootBot-app/src/utils/groupByDate.ts
import { Match } from '../services/api';

export const groupByDate = (matches: Match[]): { [date: string]: Match[] } => {
  const groupedMatches: { [date: string]: Match[] } = {};

  matches.forEach((match) => {
    const matchDate = new Date(match.utcDate).toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    if (!groupedMatches[matchDate]) {
      groupedMatches[matchDate] = [];
    }
    groupedMatches[matchDate].push(match);
  });

  return groupedMatches;
};

