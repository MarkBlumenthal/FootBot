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
          <a key={index} href="#" className="list-group-item list-group-item-action">
            <div>
              {match.homeTeam.name} vs {match.awayTeam.name}
            </div>
            <div>
              {match.score.fullTime.homeTeam}:{match.score.fullTime.awayTeam}
            </div>
            <div>{matchDate}</div>
          </a>
        );
      })}
    </div>
  );
};



