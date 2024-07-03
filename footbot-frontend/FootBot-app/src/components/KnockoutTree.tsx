// footbot-frontend/FootBot-app/src/components/KnockoutTree.tsx
import React, { useEffect } from 'react';
import { Match } from '../services/api';

interface KnockoutTreeProps {
  matches: Match[];
}

const KnockoutTree: React.FC<KnockoutTreeProps> = ({ matches }) => {
  useEffect(() => {
    console.log('Knockout matches:', matches);
    matches.forEach(match => {
      console.log(`Match: ${match.homeTeam.name} vs ${match.awayTeam.name}, Stage: ${match.stage}`);
    });
  }, [matches]);

  // Organize matches by stage
  const stages = ['LAST_16', 'QUARTER_FINALS', 'SEMI_FINALS', 'FINAL'];
  const matchesByStage: { [stage: string]: Match[] } = stages.reduce((acc, stage) => {
    acc[stage] = matches.filter(match => match.stage === stage);
    return acc;
  }, {} as { [stage: string]: Match[] });

  // Render matches for a particular stage
  const renderMatches = (stage: string) => {
    return (
      <div className="stage">
        <h4>{stage.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}</h4>
        {matchesByStage[stage].map((match, index) => (
          <div key={index} className="match">
            <div>{match.homeTeam.name} vs {match.awayTeam.name}</div>
            <div>
              Full Time: {match.score.fullTime.home} - {match.score.fullTime.away}
            </div>
            <div>
              Half Time: {match.score.halfTime.home} - {match.score.halfTime.away}
            </div>
            <div>{new Date(match.utcDate).toLocaleString()}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="knockout-tree">
      {stages.map(stage => (
        <div key={stage} className="stage-container">
          {renderMatches(stage)}
        </div>
      ))}
    </div>
  );
};

export default KnockoutTree;
