// footbot-frontend/FootBot-app/src/components/KnockoutTree.tsx
import React from 'react';
import { Match } from '../services/api';
import './KnockoutTree.css';
import { normalizeTeamName } from '../utils/normalizeTeamName';

interface KnockoutTreeProps {
  matches: Match[];
}

const stages = ['LAST_16', 'QUARTER_FINALS', 'SEMI_FINALS', 'FINAL'];

const KnockoutTree: React.FC<KnockoutTreeProps> = ({ matches }) => {
  const matchesByStage: { [stage: string]: Match[] } = stages.reduce((acc, stage) => {
    acc[stage] = matches.filter(match => match.stage === stage);
    return acc;
  }, {} as { [stage: string]: Match[] });

  return (
    <div className="knockout-tree">
      {stages.map((stage, index) => (
        <div key={index} className={`stage stage-${stage.toLowerCase()}`}>
          <h4>{stage.replace('_', ' ')}</h4>
          <div className="matches">
            {matchesByStage[stage].map((match, idx) => (
              <div key={idx} className="match">
                <div className="team">{normalizeTeamName(match.homeTeam.name)}</div>
                <div className="score">
                  {match.score.fullTime.home} - {match.score.fullTime.away}
                </div>
                <div className="team">{normalizeTeamName(match.awayTeam.name)}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KnockoutTree;

