// footbot-frontend/FootBot-app/src/components/MatchList.tsx
import React from 'react';
import { Match } from '../services/api';

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
        const matchDate = new Date(match.utcDate).toLocaleString(); // Format the date
        return (
          <div key={index} className="list-group-item list-group-item-action">
            <div>
              {match.homeTeam.name} vs {match.awayTeam.name}
            </div>
            <div>
              Full Time: {match.score.fullTime.home} - {match.score.fullTime.away}
            </div>
            <div>
              Half Time: {match.score.halfTime.home} - {match.score.halfTime.away}
            </div>
            <div>{matchDate}</div>
          </div>
        );
      })}
    </div>
  );
};
