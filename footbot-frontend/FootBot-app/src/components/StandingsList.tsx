import React from 'react';
import { Standing } from '../services/api';

interface StandingsListProps {
  standings: Standing[];
}

export const StandingsList: React.FC<StandingsListProps> = ({ standings }) => {
  if (!standings || standings.length === 0) {
    return <p>No standings available.</p>;
  }

  return (
    <div className="list-group">
      {standings.map((standing, index) => (
        <div key={index} className="my-3">
          <h4>{standing.group}</h4>
          <ul className="list-group">
            {standing.table.map((team) => (
              <li key={team.position} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{team.position}. {team.name}</span>
                <span>{team.points} pts</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
