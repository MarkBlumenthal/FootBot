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
      {matches.map((match, index) => (
        <a key={index} href="#" className="list-group-item list-group-item-action">
          {match.homeTeam.name} vs {match.awayTeam.name} - {match.score.fullTime.homeTeam}:{match.score.fullTime.awayTeam}
        </a>
      ))}
    </div>
  );
};


