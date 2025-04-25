// footbot-frontend/FootBot-app/src/components/MatchList.tsx
import React from 'react';
import { Match } from '../services/api';
import { normalizeTeamName } from '../utils/normalizeTeamName';
import { getTeamLogo } from '../utils/getTeamLogo';

interface MatchListProps {
  matches: Match[];
  leagueId: string; // Add leagueId prop
}

export const MatchList: React.FC<MatchListProps> = ({ matches, leagueId }) => {
  if (!matches || matches.length === 0) {
    return <p>No matches available.</p>;
  }

  return (
    <div className="list-group">
      {matches.map((match, index) => {
        const matchDate = new Date(match.utcDate).toLocaleDateString(); // Format the date
        const homeTeamName = match.homeTeam.name || '';
        const awayTeamName = match.awayTeam.name || '';
        return (
          <div key={index} className="list-group-item list-group-item-action">
            <div>
              {normalizeTeamName(homeTeamName)}
              <img 
                src={getTeamLogo(leagueId, homeTeamName) || undefined} 
                alt={homeTeamName || undefined} 
              />
            </div>
            <div>
              vs
            </div>
            <div>
              {normalizeTeamName(awayTeamName)}
              <img 
                src={getTeamLogo(leagueId, awayTeamName) || undefined} 
                alt={awayTeamName || undefined} 
              />
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