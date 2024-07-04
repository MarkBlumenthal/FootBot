// footbot-frontend/FootBot-app/src/components/MatchList.tsx
import React from 'react';
import { Match } from '../services/api';
import { normalizeTeamName } from '../utils/normalizeTeamName';

interface MatchListProps {
  matches: Match[];
}

export const MatchList: React.FC<MatchListProps> = ({ matches }) => {
  if (!matches || matches.length === 0) {
    return <p>No matches available.</p>;
  }

  return (
    <div className="list-group">
      {matches.map((match, index) => {
        const matchDate = new Date(match.utcDate).toLocaleDateString(); // Format the date
        return (
          <div key={index} className="list-group-item list-group-item-action">
            <div>
              {normalizeTeamName(match.homeTeam.name)} vs {normalizeTeamName(match.awayTeam.name)}
            </div>
            <div>
              Full Time: {match.score.fullTime.home} - {match.score.fullTime.away}
            </div>
            <div>{matchDate}</div>
          </div>
        );
      })}
    </div>
  );
};

