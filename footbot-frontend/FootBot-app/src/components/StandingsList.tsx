// footbot-frontend/FootBot-app/src/components/StandingsList.tsx
import React from 'react';
import { Standing } from '../services/api';
import { getTeamLogo } from '../utils/getTeamLogo'; // Import the utility function

interface StandingsListProps {
  standings: Standing[];
  leagueId: string; // Add leagueId prop
}

export const StandingsList: React.FC<StandingsListProps> = ({ standings, leagueId }) => {
  if (!standings || standings.length === 0) {
    return <p>No standings available.</p>;
  }

  return (
    <div className="table-responsive">
      {standings.map((standing, index) => (
        <div key={index} className="my-3">
          <h4>{standing.group}</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Position</th>
                <th scope="col">Team</th>
                <th scope="col">PL</th>
                <th scope="col">W</th>
                <th scope="col">D</th>
                <th scope="col">L</th>
                <th scope="col">GF</th>
                <th scope="col">GA</th>
                <th scope="col">GD</th>
                <th scope="col">Pts</th>
              </tr>
            </thead>
            <tbody>
              {standing.table.map((team, idx) => (
                <tr key={`${team.team.name}-${idx}`}>
                  <th scope="row">{idx + 1}</th> {/* Generate position based on index */}
                  <td>
                    <img 
                      src={getTeamLogo(leagueId, team.team.name)} 
                      alt={team.team.name} 
                      style={{ width: '20px', height: '20px', marginRight: '10px' }}
                    />
                    {team.team.name}
                  </td>
                  <td>{team.playedGames}</td>
                  <td>{team.won}</td>
                  <td>{team.draw}</td>
                  <td>{team.lost}</td>
                  <td>{team.goalsFor}</td>
                  <td>{team.goalsAgainst}</td>
                  <td>{team.goalDifference}</td>
                  <td>{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

