// footbot-frontend/FootBot-app/src/utils/groupByGameWeek.ts
import { Match } from '../services/api';

const MILLISECONDS_IN_A_WEEK = 7 * 24 * 60 * 60 * 1000;

export const groupByGameWeek = (matches: Match[], totalGameWeeks: number): { [key: string]: Match[] } => {
  const sortedMatches = matches.sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime());
  const groupedMatches: { [key: string]: Match[] } = {};

  for (let i = 0; i < totalGameWeeks; i++) {
    groupedMatches[`Game Week ${i + 1}`] = [];
  }

  let currentWeek = 0;
  let weekStartDate = new Date(sortedMatches[0].utcDate).getTime();

  sortedMatches.forEach((match) => {
    const matchDate = new Date(match.utcDate).getTime();
    if (matchDate >= weekStartDate + MILLISECONDS_IN_A_WEEK) {
      currentWeek++;
      weekStartDate = matchDate;
    }

    if (currentWeek < totalGameWeeks) {
      groupedMatches[`Game Week ${currentWeek + 1}`].push(match);
    }
  });

  return groupedMatches;
};
