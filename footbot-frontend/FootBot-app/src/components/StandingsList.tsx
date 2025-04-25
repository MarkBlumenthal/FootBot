// footbot-frontend/FootBot-app/src/components/StandingsList.tsx
import React from 'react';
import { Standing } from '../services/api';
import { getTeamLogo } from '../utils/getTeamLogo';

interface StandingsListProps {
  standings: Standing[];
  leagueId: string;
}

const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
  event.currentTarget.style.visibility = 'hidden';
};

export const StandingsList: React.FC<StandingsListProps> = ({ standings, leagueId }) => {
  if (!standings || standings.length === 0) {
    return <p>No standings available.</p>;
  }

  return (
    <div className="table-responsive">
      {standings.map((standing, index) => (
        <div key={index} className="my-3">
          <h4>{standing.group || 'Group'}</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Position</th>
                <th scope="col">Team</th>
                <th scope="col">PL</th>
                <th scope="col">W</th>
                <th scope="col">D</th>
                <th scope="col">L</th>
                <th scope="col" className="gf">GF</th>
                <th scope="col" className="ga">GA</th>
                <th scope="col">GD</th>
                <th scope="col">Pts</th>
              </tr>
            </thead>
            <tbody>
              {standing.table && standing.table.map((team, idx) => (
                <tr key={`${team.team?.name || 'team'}-${idx}`}>
                  <th scope="row">{idx + 1}</th>
                  <td>
                    <div className="team-logo-container">
                      <img 
                        src={getTeamLogo(leagueId, team.team?.name)} 
                        alt="" 
                        onError={handleImageError} 
                        style={{ width: '20px', height: '20px' }}
                      />
                      {team.team?.name || 'Unknown Team'}
                    </div>
                  </td>
                  <td>{team.playedGames || 0}</td>
                  <td>{team.won || 0}</td>
                  <td>{team.draw || 0}</td>
                  <td>{team.lost || 0}</td>
                  <td className="gf">{team.goalsFor || 0}</td>
                  <td className="ga">{team.goalsAgainst || 0}</td>
                  <td>{team.goalDifference || 0}</td>
                  <td>{team.points || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};